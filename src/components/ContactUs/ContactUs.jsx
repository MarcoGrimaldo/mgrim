import React from 'react';
import { Box, Container, Typography, TextField, Button, useMediaQuery } from '@mui/material';

const ContactForm = () => {
  const matches = useMediaQuery('(max-width:900px)');

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Box
        sx={{
          width: '300px',
          bgcolor: 'background.tertiary',
          color: 'white',
          p: 3,
          position: 'absolute',
          top: '258vh',
          height: '30%',
          right: '52%',
          zIndex: 2,
          borderRadius: '12px',
          display: matches ? 'none' : 'block'
        }}>
        <Typography variant="h6">Contact Us</Typography>
        <Typography variant="body1">32, Avenue de New York</Typography>
        <Typography variant="body1">32194 New York</Typography>
        <Typography variant="body1">hello@loremipsum.com</Typography>
        <Typography variant="body1">+3356 1589 2105</Typography>
      </Box>
      <Typography variant="h4" sx={{ mt: 5, color: 'text.primary' }}>
        Get in Touch
      </Typography>
      <Box
        sx={{
          width: '65%',
          bgcolor: 'background.secondary',
          p: matches ? '32px' : '32px 32px 32px 200px',
          borderRadius: '12px',
          boxShadow: 3,
          mt: 5, // Adjust this value to overlap the red box
          mb: 10,
          marginLeft: matches ? 'none' : '40%',
          zIndex: 1,
          position: 'relative'
        }}>
        <form>
          <TextField fullWidth label="Your Name" margin="normal" />
          <TextField fullWidth label="Your Email" margin="normal" />
          <TextField
            fullWidth
            label="Typing your Message here..."
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Send
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ContactForm;
