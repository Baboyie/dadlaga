import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import logo from '../media/logo.png'; // Adjust the path as necessary

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#2b2220', color: 'white', py: 6,mt:4, textAlign: 'center' }}>
      
      {/* Logo on top */}
      <Box
        component="img"
        src={logo}
        alt="Hotel Logo"
        sx={{
          height: '200px', // Adjust size as needed
          mb: 4,
        }}
      />

      {/* Footer Content */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1 ,px: 15}}>Contact</Typography>
          <Typography variant="body2">99110001</Typography>
          <Typography variant="body2">royalhotel.gmail.com</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1 ,px: 15}}>Social</Typography>
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
          <IconButton color="inherit">
            <Instagram />
          </IconButton>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1,px: 15}}>Location</Typography>
          <Typography variant="body2">J.Sambuu St, Chingeltei district</Typography>
          <Typography variant="body2">5th horoo, Ulaanbaatar</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1,px: 15}}>FAQ</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
