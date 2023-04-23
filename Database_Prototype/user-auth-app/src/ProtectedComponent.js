import React from 'react';
import { Container, Typography } from '@mui/material';

const ProtectedComponent = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Protected Component
      </Typography>
      <Typography align="center">
        This component is only accessible to logged-in users.
      </Typography>
    </Container>
  );
};

export default ProtectedComponent;