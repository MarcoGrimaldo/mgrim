import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch } from 'react-redux';
import { updateLikes } from '../../redux/projectsSlice';
import { Button } from '@mui/material';

const CardComponent = ({ title, img, text, likesCount, id, btnText, link }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(likesCount);
  const [likesEnabled, setlikesEnabled] = useState(true);

  const handleLike = () => {
    dispatch(updateLikes(id));
    setLikes(likes + 1);
    setlikesEnabled(false);
  };

  return (
    <Card sx={{ minWidth: 335, maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={title} />
      <CardMedia component="img" height="194" image={img} alt="project" />
      <CardContent>
        <Typography variant="body2" color="text.primaryLight" sx={{ whiteSpace: 'wrap' }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ justifyContent: 'space-between', paddingInline: '15px', marginTop: 'auto' }}>
        <IconButton aria-label="add to favorites" onClick={handleLike} disabled={!likesEnabled}>
          <FavoriteIcon />
          <Typography>{likes}</Typography>
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            window.open(link, '_blank');
          }}>
          {btnText}
        </Button>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {};

export default CardComponent;
