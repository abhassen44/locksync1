import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

const ShareAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    account: ''
  });
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  const { email, account } = formData;

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
          backgroundColor:0x131a43,
          baseColor: 0x000000,
          amplitudeFactor:1 ,
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
      await axios.post(`http://localhost:5000/api/users/share`, formData, { withCredentials: true });
      alert('Account shared successfully');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div ref={vantaRef} style={{ position: 'fixed', width: '100%', height: '100%' }}>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box mt={5} className="bg-slate-900 bg-opacity-80 backdrop-filter backdrop-blur-sm p-6 rounded-lg">
          <Typography variant="h4" align="center" sx={{ color: 'white' }}>Share Account</Typography>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email of user to share with"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              sx={{ 
                backgroundColor: 'black',
                borderRadius: 1
              }}
            />
            <TextField
              label="Account to share"
              name="account"
              value={account}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              sx={{ 
                backgroundColor: 'black',
                borderRadius: 1
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>Share Account</Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default ShareAccount;