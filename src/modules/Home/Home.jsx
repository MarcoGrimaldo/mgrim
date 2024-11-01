import NavBar from '../../components/Navbar/Navbar';
import Hero from '../../components/HeroContent/Hero';

import React, { useRef } from 'react';
import Projects from '../../components/ProyectsLayout/Projects';
import AboutMe from '../../components/AboutMe/AboutMe';
import ContactForm from '../../components/ContactUs/ContactUs';
import Footer from '../../components/Footer/Footer';
import { Box } from '@mui/material';

const Home = () => {
  const aboutMeRef = useRef(null);

  const scrollToAboutMe = () => {
    aboutMeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <NavBar />
      <Hero handleButton={scrollToAboutMe} />
      <Projects />
      <AboutMe forwardedRef={aboutMeRef} />
      <ContactForm />
      <Footer />
    </Box>
  );
};

export default Home;
