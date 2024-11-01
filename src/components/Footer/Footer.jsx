import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          © {new Date().getFullYear()} {t('footer.text')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
