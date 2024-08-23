import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Register from './components/Register';
import Login from './components/Login';
import ShareAccount from './components/ShareAccount';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/Landingpage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background color
    },
  },
  typography: {
    allVariants: {
      color: '#ffffff', // White text
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/share" element={<ShareAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
