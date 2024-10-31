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

const AboutMe = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', py: 5 }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} align="center">
            <Avatar
              alt="Your Name"
              src="https://via.placeholder.com/150" // Replace with your image URL
              sx={{ width: 120, height: 120, mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Your Name
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.primaryLight' }}>
              Full Stack Web Developer
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
              Resume
            </Button>
            <Box mt={2}>
              <IconButton href="https://linkedin.com" color="primary">
                <LinkedIn />
              </IconButton>
              <IconButton href="https://github.com" color="primary">
                <GitHub />
              </IconButton>
              <IconButton href="https://twitter.com" color="primary">
                <Twitter />
              </IconButton>
              <IconButton href="mailto:your.email@example.com" color="primary">
                <Email />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* About Me Section */}
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          About Me
        </Typography>
        <Typography>
          I am a passionate full-stack developer with experience in building modern web applications
          using React, Node.js, and other cutting-edge technologies. I love creating efficient and
          scalable solutions that enhance user experiences.
        </Typography>

        {/* Education Section */}
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          Education
        </Typography>
        <Card sx={{ mt: 2, backgroundColor: 'background.secondary' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              Bachelor's in Computer Science
            </Typography>
            <Typography>University Name, 2020</Typography>
          </CardContent>
        </Card>

        {/* Work Experience Section */}
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          Work Experience
        </Typography>
        <Card sx={{ mt: 2, backgroundColor: 'background.secondary' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
              Full Stack Developer at XYZ Company
            </Typography>
            <Typography>January 2021 - Present</Typography>
            <Typography>
              Worked on developing and maintaining web applications using JavaScript, React, and
              Node.js. Collaborated with cross-functional teams to deliver high-quality software
              solutions.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutMe;
