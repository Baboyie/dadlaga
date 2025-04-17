import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import homebackground from "../../media/dadlaga/homebackground1.jpg";
import logo from "../../media/logo.png";
import SectionBarrier from "../../components/common/sectionbarrier";
import { motion } from "framer-motion";
import RoomCarousel from "../../components/roomcarousel";
import restaurantbg from "../../media/dadlaga/restaurantbg.jpg";
import EntertainmentCarousel from "../../components/entertainmentcarousel";
import ResponsiveMap from "../../components/location";
import { useTranslation } from "react-i18next";
import TransWithBreaks from "../../components/common/transwithbreaks";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../../api"; // Import the API function to get rooms

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [hoverRestaurant, setHoverRestaurant] = useState(false);
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch rooms data when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms(); // Fetch rooms from the backend
        setRooms(data); // Set rooms data to state
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchRooms();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <Box sx={{ backgroundColor: "#E9DDD1", overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: isMobile ? "70vh" : "100vh",
          overflow: "hidden",
        }}
      >
        {/* Background Image - Fixed */}
        <Box
          component={motion.img}
          src={homebackground}
          alt="Main"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(2px)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        {/* Logo overlay - Centered */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            width: "100%",
            textAlign: "center",
            px: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -45 }}
            transition={{ duration: 1 }}
          >
            <Box
              component="img"
              src={logo}
              alt="Hotel Logo"
              sx={{
                height: isMobile ? "200px" : isTablet ? "350px" : "500px",
                maxWidth: "90%",
                objectFit: "contain",
              }}
            />
          </motion.div>
        </Box>
      </Box>

      {/* Content Sections */}
      <Box sx={{ pt: isMobile ? 2 : 4 }}>
        <SectionBarrier text={t("home.rooms.title")} />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: isMobile ? 18 : 24,
            px: 2,
          }}
        >
          {t("home.rooms.description")}
        </Typography>

        {/* Loading state for rooms */}
        {loading ? (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {t("home.rooms.loading")}
          </Typography>
        ) : (
          <RoomCarousel rooms={rooms} /> // Pass rooms data to RoomCarousel component
        )}

        <SectionBarrier text={t("home.restaurant.title")} />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: isMobile ? 18 : 24,
            mb: 3,
            px: 2,
          }}
        >
          <TransWithBreaks i18nKey="home.restaurant.description" />
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            mb: 4,
            mx: "auto",
            width: isMobile ? "90%" : "70%",
            height: isMobile ? "200px" : "450px",
          }}
          onMouseEnter={() => setHoverRestaurant(true)}
          onMouseLeave={() => setHoverRestaurant(false)}
        >
          <Box
            component="img"
            src={restaurantbg}
            alt="Restaurant"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: hoverRestaurant ? "blur(4px)" : "blur(0)",
              transition: "all 0.3s ease",
              borderRadius: "4px",
              boxShadow: 2,
            }}
          />

          {hoverRestaurant && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: "4px",
              }}
            >
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate("/restaurant")}
                sx={{
                  backgroundColor: "rgba(31, 31, 31, 0.9)",
                  color: "white",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "rgba(51, 51, 51, 0.9)",
                  },
                }}
              >
                {t("home.restaurant.seeMore")}
              </Button>
            </Box>
          )}
        </Box>

        {/* ENTERTAINMENT SECTION */}
        <SectionBarrier text={t("home.entertainment.title")} />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: isMobile ? 18 : 24,
            px: 2,
          }}
        >
          {t("home.entertainment.description")}
        </Typography>
        <EntertainmentCarousel />

        {/* LOCATION */}
        <SectionBarrier text={t("home.location.title")} />
        <Typography
          sx={{
            textAlign: "center",
            fontSize: isMobile ? 18 : 24,
            mb: 3,
            px: 2,
          }}
        >
          <TransWithBreaks i18nKey="home.location.address" />
        </Typography>
        <ResponsiveMap />
      </Box>
    </Box>
  );
}
