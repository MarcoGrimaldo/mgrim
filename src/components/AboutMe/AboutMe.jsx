import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Avatar,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { LinkedIn, GitHub, Twitter, Email } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import image from '../../assets/image.png';

const AboutMe = ({ forwardedRef }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', py: 5 }} ref={forwardedRef}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} align="center">
            <Avatar
              alt="Your Name"
              src={image} // Replace with your image URL
              sx={{ width: 170, height: 170, mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {t('aboutMe.name')}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.primaryLight' }}>
              Full Stack Web Developer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 2 }}
              href="https://drive.google.com/file/d/1ahd1HfaaDtEtjujHnFJLLOkVrjI7Loae/view?usp=sharing">
              {t('aboutMe.resumeButton')}
            </Button>
            <Box mt={2}>
              <IconButton
                href="https://www.linkedin.com/in/marco-a-grimaldo-peralta-83468a1a2/"
                color="primary">
                <LinkedIn />
              </IconButton>
              <IconButton href="https://github.com/MarcoGrimaldo" color="primary">
                <GitHub />
              </IconButton>
              <IconButton href="mailto:mgrimdev@gmail.com" color="primary">
                <Email />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* About Me Section */}
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          {t('aboutMe.aboutMeTitle')}
        </Typography>
        <Typography>{t('aboutMe.aboutMeText')}</Typography>

        {/* Education Section */}
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          {t('aboutMe.educationTitle')}
        </Typography>
        <Card sx={{ mt: 2, backgroundColor: 'background.secondary' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              {t('aboutMe.educationText')}
            </Typography>
            <Typography>{t('aboutMe.educationSchool')}</Typography>
          </CardContent>
        </Card>

        {/* Work Experience Section */}
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          {t('aboutMe.workExpTitle')}
        </Typography>
        <Card sx={{ mt: 2, backgroundColor: 'background.secondary' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              <b> {t('aboutMe.workExpPSL_comp')} </b> - {t('aboutMe.workExpPSL_pos')}
            </Typography>
            <Typography>{t('aboutMe.workExpPSL_time')}</Typography>
            <Typography>{t('aboutMe.workExpPSL_resume')}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2, backgroundColor: 'background.secondary' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              <b> {t('aboutMe.workExpVey_comp')} </b> - {t('aboutMe.workExpVey_pos')}
            </Typography>
            <Typography>{t('aboutMe.workExpVey_time')}</Typography>
            <Typography>{t('aboutMe.workExpVey_resume')}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2, backgroundColor: 'background.secondary' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              <b> {t('aboutMe.workExpCii_comp')} </b> - {t('aboutMe.workExpCii_pos')}
            </Typography>
            <Typography>{t('aboutMe.workExpCii_time')}</Typography>
            <Typography>{t('aboutMe.workExpCii_resume')}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutMe;
