const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Google OAuth setup
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Routes
app.use('/api/users', require('./routes/userRoutes')); // Adjusted path

// OAuth routes
app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.readonly']
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  req.session.tokens = tokens;
  // Save tokens to your database
  res.redirect('/api/users/store-tokens');
});

app.get('/share-access', (req, res) => {
  if (!req.session.tokens) {
    return res.redirect('/auth');
  }
  // Store tokens in your database and associate with the user
  res.send('Access granted and stored securely.');
});

app.get('/use-shared-access', async (req, res) => {
  // Retrieve the tokens from the database
  const tokens = req.session.tokens; // This should be fetched from your database
  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const response = await youtube.channels.list({
    part: 'snippet,contentDetails,statistics',
    mine: true
  });

  res.json(response.data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
