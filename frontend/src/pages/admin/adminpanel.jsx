import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
    // Optional: You might want to add a success message here

    window.location.reload();
    alert("Logged out!");
  };

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
    <Box sx={{ p: 3, mt: 10 }}>
      {/* Added AppBar with logout button */}
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

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
