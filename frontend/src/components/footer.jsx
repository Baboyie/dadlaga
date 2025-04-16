import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import logo from "../media/logo.png"; // Keep your original path
import { useNavigate } from "react-router-dom"; // If using React Router

const Footer = () => {
  const navigate = useNavigate();

  const handleFaqClick = () => {
    navigate("/faq");
  };

  return (
    <Box
      sx={{
        bgcolor: "#2b2220",
        color: "white",
        py: 6,
        mt: 4,
        textAlign: "center",
      }}
    >
      {/* Logo on top */}
      <Box
        component="img"
        src={logo}
        alt="Hotel Logo"
        sx={{
          height: "200px",
          mb: 4,
        }}
      />

      {/* Footer Content */}
      <Grid container spacing={4} justifyContent="center">
        {/* Contact */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1, px: 15 }}>
            Contact
          </Typography>
          <Typography variant="body2">99110001</Typography>
          <Typography variant="body2">royalhotel.gmail.com</Typography>
        </Grid>

        {/* Social */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1, px: 15 }}>
            Social
          </Typography>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </IconButton>
        </Grid>

        {/* Location */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 1, px: 15 }}>
            Location
          </Typography>
          <MuiLink
            href="https://maps.app.goo.gl/Bjhy8YDvJL71A3868"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            J.Sambuu St, Chingeltei district <br /> 5th horoo, Ulaanbaatar
          </MuiLink>
        </Grid>

        {/* FAQ */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            onClick={handleFaqClick}
            sx={{
              mb: 1,
              px: 15,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "#ccc",
              },
            }}
          >
            FAQ
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
