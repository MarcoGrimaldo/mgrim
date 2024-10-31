import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function HeroSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh', // Adjust height as needed
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 4
      }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Website SEO Analyst
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Typography>
      <Button variant="contained" color="primary">
        Learn More
      </Button>
    </Box>
  );
}

export default HeroSection;
