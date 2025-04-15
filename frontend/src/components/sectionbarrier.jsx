import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function SectionBarrier({ text }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        backgroundColor: '#2b2220',
        textAlign: 'center',
        my: 4,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: isMobile ? 32 : 60,
          maxWidth: '800px',
          margin: '0 auto',
          color: '#E9DDD1',
          fontFamily: 'Abhaya Libre',
          letterSpacing: 3,
          lineHeight: 1.2,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
