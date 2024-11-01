import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
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
        {t('hero.welcome')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        {t('hero.description')}
      </Typography>
      <Button variant="contained" color="primary">
        {t('hero.button')}
      </Button>
    </Box>
  );
}

export default HeroSection;
