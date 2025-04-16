import React from 'react';
import { Box, Typography } from '@mui/material';
import './ThreeImageDisplay.css';

const ThreeImageDisplay = ({ leftImg, centerImg, rightImg }) => {
  return (
    <Box className="image-zone">
      <Box className="img-wrapper">
        <img src={leftImg} alt="Left" className="linked-img" />
      </Box>

      <Box className="img-wrapper center">
        <img src={centerImg} alt="Center" className="linked-img" />
        <Typography className="overlay">See More</Typography>
      </Box>

      <Box className="img-wrapper">
        <img src={rightImg} alt="Right" className="linked-img" />
      </Box>  
    </Box>
  );
};

export default ThreeImageDisplay;
