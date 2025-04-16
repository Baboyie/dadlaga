// src/theme.js
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E9DDD1', // Main color
    },
    secondary: {
      main: '#4C3F3F', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Abhaya Libre, sans-serif', // Custom font if needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#4C3F3F',
          color: '#E9DDD1',
          '&:hover': {
            backgroundColor: '#3C3535', // Darker secondary color on hover
          },
        },
      },
    },
    // You can add more component customizations here...
  },
});

export default theme;
