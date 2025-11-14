// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 8, mb: 2 }}>Access Denied</Typography>
      <Typography>You do not have permission to view this page.</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default UnauthorizedPage;