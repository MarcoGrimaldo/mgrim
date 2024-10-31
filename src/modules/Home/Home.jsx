import NavBar from '../../components/Navbar/Navbar';
import Hero from '../../components/HeroContent/Hero';

import React from 'react';
import Projects from '../../components/ProyectsLayout/Projects';
import AboutMe from '../../components/AboutMe/AboutMe';
import ContactForm from '../../components/ContactUs/ContactUs';
import Footer from '../../components/Footer/Footer';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <NavBar />
      <Hero />
      <Projects />
      <AboutMe />
      <ContactForm />
      <Footer />
    </Box>
  );
};

export default Home;
