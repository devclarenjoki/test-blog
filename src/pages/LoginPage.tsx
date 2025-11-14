// src/pages/LoginPage.tsx
import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container, Grid, Paper, Typography, TextField, Button,
  Box, Divider, Avatar
} from '@mui/material';
import { Google, GitHub } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { login as loginService, socialLogin } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const paperRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(paperRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo(formRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.4');
  }, []);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { user, token } = await loginService(data);
      login(user, token);
      
      // Navigate to the dashboard after successful login
      navigate('/dashboard', { replace: true }); // `replace: true` prevents going back to the login page

    } catch (error) {
      console.error('Login failed:', error);
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    }
  };
  
  // ... also update the social login handler
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
        const { user, token } = await socialLogin(provider);
        login(user, token);
        navigate('/dashboard', { replace: true });
    } catch (error) {
        console.error('Social login failed:', error);
        alert('Social login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container>
        <Grid
          size={{sm:4, md:7}}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px 0 0 16px',
          }}
        />
        <Grid size={{xs:12, sm:8, md:5}} component={Paper} elevation={6} square ref={paperRef}>
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
            <Typography component="h1" variant="h5">Sign In</Typography>
            <Box component="form" ref={formRef} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} fullWidth label="Email Address" margin="normal" error={!!errors.email} helperText={errors.email?.message} />}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} fullWidth label="Password" type="password" margin="normal" error={!!errors.password} helperText={errors.password?.message} />}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
              <Divider sx={{ my: 2 }}>OR</Divider>
              <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ mb: 1 }}>Login with Google</Button>
              <Button fullWidth variant="outlined" startIcon={<GitHub />}>Login with GitHub</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;