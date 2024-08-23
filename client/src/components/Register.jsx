import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    age: '',
    email: '',
    password: ''
  });

  const { username, name, age, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/users/register`, formData);
      window.location = '/login';
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update(mouseX, mouseY) {
        // Original movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1;
        }

        // Mouse repulsion
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = 100;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;
          
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 1);
        ctx.closePath();
        ctx.fill();
      }
    }

    let particleArray = [];
    const numberOfParticles = 100;
    let mouse = {
      x: undefined,
      y: undefined,
      radius: 150
    };

    const init = () => {
      particleArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleParticles = () => {
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update(mouse.x, mouse.y);
        particleArray[i].draw();
        
        for (let j = i; j < particleArray.length; j++) {
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/1000})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particleArray[i].x, particleArray[i].y);
            ctx.lineTo(particleArray[j].x, particleArray[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    };

    canvas.addEventListener('mousemove', function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    canvas.addEventListener('mouseout', function() {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', null);
      canvas.removeEventListener('mouseout', null);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <Container maxWidth="sm" className="relative z-10">
        <Box mt={5} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-6 rounded-lg">
          <Typography variant="h4" align="center" className="text-white mb-4">Register</Typography>
          <form onSubmit={onSubmit}>
            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-white",
              }}
            />
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-white",
              }}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={age}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-white",
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-white",
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
              InputProps={{
                className: "text-white",
              }}
              InputLabelProps={{
                className: "text-white",
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;