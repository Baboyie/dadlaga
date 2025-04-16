import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button, Grid, TextField } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import PhoneIcon from "@mui/icons-material/Phone";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ShowerIcon from "@mui/icons-material/Shower";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ConstructionIcon from "@mui/icons-material/Construction";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { getRooms, addRoom, updateRoom, removeRoom } from "../../api";

const amenityIcons = {
  wifi: <WifiIcon fontSize="small" />,
  tv: <TvIcon fontSize="small" />,
  minibar: <LocalBarIcon fontSize="small" />,
  phone: <PhoneIcon fontSize="small" />,
  fridge: <KitchenIcon fontSize="small" />,
  shower: <ShowerIcon fontSize="small" />,
  microwave: <MicrowaveIcon fontSize="small" />,
  hairdryer: <DryCleaningIcon fontSize="small" />,
  service: <RoomServiceIcon fontSize="small" />,
  tools: <ConstructionIcon fontSize="small" />,
  tea: <EmojiFoodBeverageIcon fontSize="small" />,
};

const allowedAmenityKeys = [
  "tv",
  "phone",
  "wifi",
  "minibar",
  "fridge",
  "shower",
  "microwave",
  "hairdryer",
  "service",
  "tools",
  "tea",
];

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState({
    title: { en: "", mon: "" },
    description: { en: "", mon: "" },
    price: "",
    guest: "",
    bed: "",
    image: "",
    items: Object.fromEntries(allowedAmenityKeys.map((key) => [key, false])),
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const roomsData = await getRooms();
      if (Array.isArray(roomsData)) {
        setRooms(roomsData);
        setError("");
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch rooms");
      if (err.message.includes("authentication")) {
        navigate("/login");
      }
    }
  };

  const handleSaveRoom = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        ...roomData,
        price: Number(roomData.price),
        guest: Number(roomData.guest),
        bed: Number(roomData.bed),
      };

      if (editingRoomId) {
        await updateRoom(editingRoomId, payload);
      } else {
        await addRoom(payload);
      }

      await fetchRooms();
      handleResetForm();
    } catch (err) {
      setError(err.message || "Room save failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await removeRoom(id);
      await fetchRooms();
    } catch (err) {
      setError("Failed to delete room");
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoomId(room.id);
    setRoomData({
      title: room.title,
      description: room.description,
      price: room.price.toString(),
      guest: room.guest.toString(),
      bed: room.bed.toString(),
      image: room.image,
      items: { ...roomData.items, ...room.items },
    });
  };

  const handleResetForm = () => {
    setRoomData({
      title: { en: "", mon: "" },
      description: { en: "", mon: "" },
      price: "",
      guest: "",
      bed: "",
      image: "",
      items: Object.fromEntries(allowedAmenityKeys.map((key) => [key, false])),
    });
    setEditingRoomId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("title.") || name.startsWith("description.")) {
      const [field, lang] = name.split(".");
      setRoomData({
        ...roomData,
        [field]: { ...roomData[field], [lang]: value },
      });
    } else {
      setRoomData({ ...roomData, [name]: value });
    }
  };

  const toggleAmenity = (key) => {
    setRoomData((prev) => ({
      ...prev,
      items: { ...prev.items, [key]: !prev.items[key] },
    }));
  };

  const AmenityBox = ({ itemKey, selected }) => (
    <Box
      onClick={() => toggleAmenity(itemKey)}
      sx={{
        border: selected ? "2px solid #1976d2" : "1px solid #ccc",
        borderRadius: "8px",
        p: 1,
        m: 0.5,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: selected ? "#e3f2fd" : "#fff",
        width: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {amenityIcons[itemKey]}
      <Typography variant="caption">{itemKey}</Typography>
    </Box>
  );

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Room Management
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSaveRoom}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title (English)"
                name="title.en"
                value={roomData.title.en}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title (Mongolian)"
                name="title.mon"
                value={roomData.title.mon}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description (English)"
                name="description.en"
                value={roomData.description.en}
                onChange={handleInputChange}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description (Mongolian)"
                name="description.mon"
                value={roomData.description.mon}
                onChange={handleInputChange}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={roomData.price}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Guest Capacity"
                name="guest"
                type="number"
                value={roomData.guest}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bed Count"
                name="bed"
                type="number"
                value={roomData.bed}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={roomData.image}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Amenities:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {allowedAmenityKeys.map((itemKey) => (
                  <AmenityBox
                    key={itemKey}
                    itemKey={itemKey}
                    selected={roomData.items[itemKey] || false}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ mr: 1 }}
            >
              {isLoading
                ? "Saving..."
                : editingRoomId
                ? "Update Room"
                : "Create Room"}
            </Button>
            {editingRoomId && (
              <Button variant="outlined" onClick={handleResetForm}>
                Cancel
              </Button>
            )}
          </Box>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Existing Rooms
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        {rooms.length > 0 ? (
          <Grid container spacing={2}>
            {rooms.map((room) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
                <Paper sx={{ p: 2, height: "100%" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {room.title?.en} / {room.title?.mon}
                  </Typography>
                  <Typography variant="body2">Price: ${room.price}</Typography>
                  <Typography variant="body2">Guests: {room.guest}</Typography>
                  <Typography variant="body2">Beds: {room.bed}</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {room.description?.en}
                    </Typography>
                  </Box>
                  {room.image && (
                    <Box sx={{ mt: 1 }}>
                      <img
                        src={room.image}
                        alt={room.title?.en}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}
                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditRoom(room)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No rooms available</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default RoomManagement;
