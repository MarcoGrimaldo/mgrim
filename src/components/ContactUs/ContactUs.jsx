import React from 'react';
import { Box, Container, Typography, TextField, Button, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
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
          top: '305vh',
          height: '30%',
          right: '52%',
          zIndex: 2,
          borderRadius: '12px',
          display: matches ? 'none' : 'block'
        }}>
        <Typography variant="h6">{t('contactMe.moreInfo')}</Typography>
        <Typography variant="body1">{t('contactMe.location')}</Typography>
        <Typography variant="body1">{t('contactMe.email')}</Typography>
        <Typography variant="body1">{t('contactMe.phoneNum')}</Typography>
      </Box>
      <Typography variant="h4" sx={{ mt: 5, color: 'text.primary' }}>
        {t('contactMe.title')}
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
          <TextField fullWidth label={t('contactMe.nameInput')} margin="normal" />
          <TextField fullWidth label={t('contactMe.emailInput')} margin="normal" />
          <TextField
            fullWidth
            label={t('contactMe.msgInput')}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            {t('contactMe.send')}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ContactForm;
