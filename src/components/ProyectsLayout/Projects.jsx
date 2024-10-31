import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Card from './Card';

const Projects = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '3em 1em',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}>
      <Typography variant="h3" sx={{ paddingBlock: '2rem', textAlign: 'center' }}>
        Proyects
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2em',
          overflow: 'auto',
          whiteSpace: 'nowrap'
        }}>
        <Card
          title={'Test'}
          img={'https://picsum.photos/200/300/'}
          text={'Teeeeee e e e e e e est'}
          likesCount={'32'}
        />
        <Card
          title={'Test'}
          img={'https://picsum.photos/200/300/'}
          text={'Teeeeee e e e e e e est'}
          likesCount={'32'}
        />
        <Card
          title={'Test'}
          img={'https://picsum.photos/200/300/'}
          text={'Teeeeee e e e e e e est'}
          likesCount={'32'}
        />
      </Box>
    </Box>
  );
};

Projects.propTypes = {};

export default Projects;
