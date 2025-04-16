import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const managementCards = [
    {
      title: "Room Management",
      description: "Manage hotel rooms, amenities, and pricing",
      path: "/admin/rooms",
      available: true,
    },
    {
      title: "Booking Management",
      description: "View and manage guest bookings",
      path: "/admin/bookings",
      available: false,
    },
    {
      title: "User Management",
      description: "Manage admin and staff accounts",
      path: "/admin/users",
      available: false,
    },
    {
      title: "Content Management",
      description: "Manage website content and pages",
      path: "/admin/content",
      available: false,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {managementCards.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography sx={{ mb: 2 }}>{card.description}</Typography>
              <Button
                variant="contained"
                onClick={() => navigate(card.path)}
                disabled={!card.available}
              >
                {card.available ? "Manage" : "Coming Soon"}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminPanel;
