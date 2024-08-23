import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  const { email, password } = formData;

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 100.00,
          minWidth: 100.00,
          backgroundColor: 0x000000,
          baseColor: 0xfa59,
          amplitudeFactor: 1,
          size: 1.00,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/users/login`, formData, { withCredentials: true });
      window.location = '/share';
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div ref={vantaRef} style={{ position: 'fixed', width: '100%', height: '100%' }}>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
      <Box mt={5} className="bg-slate-900 bg-opacity-80 backdrop-filter backdrop-blur-sm p-6 rounded-lg">
          <Typography variant="h4" align="center" sx={{ color: 'white' }}>Login</Typography>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              sx={{ 
                backgroundColor: 'black',
                borderRadius: 1,
              
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              sx={{ 
                backgroundColor: 'black',
                borderRadius: 1
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;