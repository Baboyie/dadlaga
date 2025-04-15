import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { rooms } from "../data/rooms";
import CheckIcon from "@mui/icons-material/Check";
import TvIcon from "@mui/icons-material/Tv";
import PhoneIcon from "@mui/icons-material/Phone";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ShowerIcon from "@mui/icons-material/Shower";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import HairDryerIcon from "@mui/icons-material/Blender";
import { useTranslation } from "react-i18next";

export default function RoomDetails() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const room = rooms.find((r) => r.id === parseInt(id));
  if (!room) return <Typography variant="h6">{t("room.notFound")}</Typography>;

  // Get the first item for amenities (since your new structure has items array)
  const roomItem = room.items?.[0] || {};
  const { title, description, guest, bed, price, image } = room;

  const amenitiesMap = {
    tv: "TV",
    phone: "Phone",
    wifi: "Wi-Fi",
    minibar: "Mini-bar",
    fridge: "Fridge",
    shower: "Shower",
    microwave: "Microwave",
    hairdryer: "Hairdryer",
    service: "Room Service",
    tools: "Toiletries",
    tea: "Tea & Coffee",
    champagne: "Champagne",
    flowers: "Flowers",
  };

  const amenitiesIcons = {
    tv: <TvIcon fontSize={isMobile ? "medium" : "large"} />,
    phone: <PhoneIcon fontSize={isMobile ? "medium" : "large"} />,
    wifi: <WifiIcon fontSize={isMobile ? "medium" : "large"} />,
    minibar: <LocalBarIcon fontSize={isMobile ? "medium" : "large"} />,
    fridge: <KitchenIcon fontSize={isMobile ? "medium" : "large"} />,
    shower: <ShowerIcon fontSize={isMobile ? "medium" : "large"} />,
    microwave: <MicrowaveIcon fontSize={isMobile ? "medium" : "large"} />,
    hairdryer: <HairDryerIcon fontSize={isMobile ? "medium" : "large"} />,
    service: <RoomServiceIcon fontSize={isMobile ? "medium" : "large"} />,
    tools: <ContentCutIcon fontSize={isMobile ? "medium" : "large"} />,
    tea: <LocalCafeIcon fontSize={isMobile ? "medium" : "large"} />,
    champagne: <LocalBarIcon fontSize={isMobile ? "medium" : "large"} />,
    flowers: <LocalCafeIcon fontSize={isMobile ? "medium" : "large"} />,
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 5,
        maxWidth: 1200,
        mx: "auto",
        pt: { md: "15vh", xs: "9vh" },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={currentLanguage === "en" ? title.en : title.mon}
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 2,
          mb: 4,
        }}
      />

      {/* Main Info */}
      <Typography variant="h4" sx={{ fontFamily: "Abhaya Libre", mb: 2 }}>
        {currentLanguage === "en" ? title.en : title.mon}
      </Typography>
      <Typography sx={{ fontSize: 18, fontFamily: "Georgia", mb: 1 }}>
        {currentLanguage === "en" ? description.en : description.mon}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        {t("room.maxOccupancy")}: {guest} | {t("room.beds")}: {bed}
      </Typography>

      {/* Price and Book Now */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6">
          ${price}/{t("room.night")}
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#a08c7d" }}>
          {t("room.bookNow")}
        </Button>
      </Box>

      {/* Services */}
      <Typography
        variant="h5"
        sx={{
          mt: 6,
          mb: 2,
          fontFamily: "Abhaya Libre",
          textAlign: "center",
        }}
      >
        {t("room.servicesAmenities")}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? 1 : 3,
        }}
      >
        {Object.entries(roomItem).map(([key, value]) => {
          if (!amenitiesMap[key] || !value) return null;

          return (
            <Box
              key={key}
              sx={{
                border: isMobile ? "none" : "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "row" : "column",
                gap: 1,
                minHeight: 100,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: isMobile ? "none" : 3,
                  borderColor: isMobile ? "none" : "#a08c7d",
                },
              }}
            >
              {isMobile ? (
                <CheckIcon fontSize="small" color="success" />
              ) : (
                amenitiesIcons[key]
              )}
              <Typography>{amenitiesMap[key]}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
