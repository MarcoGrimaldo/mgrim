import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Card from './Card';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../redux/projectsSlice';

const Projects = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error: {error}</Typography>;
  }
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
        {t('projects.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2em',
          overflow: 'auto',
          whiteSpace: 'nowrap'
        }}>
        {projects.map((project) => (
          <Card
            key={project.id}
            id={project.id}
            title={project.name}
            img={project.img}
            text={project.description}
            likesCount={project.likes}
            link={project.link}
            btnText={t('projects.btnSee')}
          />
        ))}
      </Box>
    </Box>
  );
};

Projects.propTypes = {};

export default Projects;
