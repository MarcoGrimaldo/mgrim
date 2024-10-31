import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CardComponent = ({ title, img, text, likesCount }) => {
  return (
    <Card sx={{ minWidth: 335, maxWidth: 345 }}>
      <CardHeader title={title} />
      <CardMedia component="img" height="194" image={img} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.primaryLight">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <Typography>{likesCount}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {};

export default CardComponent;
