import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import roomsbackground from "../media/dadlaga/roomsbackground.png";
import SectionBarrier from "../components/sectionbarrier.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getRooms } from "../api"; // Import the API function

export default function Rooms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        if (roomsData && Array.isArray(roomsData)) {
          setRooms(roomsData);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err.message || "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={roomsbackground}
          alt="Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(2px)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              width: "100%",
              py: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Abhaya Libre",
                fontSize: isMobile ? 32 : 50,
                color: "#000",
                letterSpacing: isMobile ? 6 : 20,
              }}
            >
              {t("home.rooms.title")}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={roomsbackground}
          alt="Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(2px)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {error}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* Hero Section - Kept exactly as you had it */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={roomsbackground}
          alt="Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(2px)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              width: "100%",
              py: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Abhaya Libre",
                fontSize: isMobile ? 32 : 50,
                color: "#000",
                letterSpacing: isMobile ? 6 : 20,
              }}
            >
              {t("home.rooms.title")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Rooms Section - Now using data from backend */}
      {rooms.map((room, index) => (
        <Box key={room.id}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <SectionBarrier
              text={
                currentLanguage === "en"
                  ? room.title.en.toUpperCase()
                  : room.title.mon.toUpperCase()
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                py: { xs: 4, md: 6 },
                gap: 4,
                backgroundColor: "#e9dfd4",
                flexWrap: "wrap",
                position: "relative",
                "&:hover": {
                  "&::before": {
                    opacity: 1,
                  },
                  "& .room-overlay": {
                    opacity: 1,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 1,
                },
              }}
            >
              {/* Text Section */}
              <Box
                sx={{
                  backgroundColor: "#f7f0eb",
                  padding: isMobile ? 3 : 5,
                  maxWidth: isMobile ? "100%" : 400,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 2,
                  minHeight: isMobile ? "auto" : 300,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontFamily: "Abhaya Libre" }}
                >
                  {currentLanguage === "en" ? room.title.en : room.title.mon}
                </Typography>
                <Typography sx={{ fontFamily: "Georgia, serif", fontSize: 16 }}>
                  {currentLanguage === "en"
                    ? room.description.en
                    : room.description.mon}
                </Typography>
                <Typography sx={{ mt: 2, fontStyle: "italic" }}>
                  {room.guest} {t("room.people")}, {room.bed}{" "}
                  {room.bed === 1 ? t("room.bed") : t("room.beds")}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  ${room.price}/{t("room.night")}
                </Typography>
              </Box>

              {/* Image Section */}
              <Link to={`/rooms/${room.id}`} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 600,
                    height: { xs: 250, md: 350 },
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={room.image}
                    alt={
                      currentLanguage === "en" ? room.title.en : room.title.mon
                    }
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                  />
                  <Box
                    className="room-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "Abhaya Libre",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: "0 0 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      {t("room.seeMore")}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Box>
          </motion.div>
        </Box>
      ))}
    </>
  );
}
