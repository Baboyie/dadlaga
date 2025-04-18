import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRooms } from "../api";

export default function RoomCarousel() {
  const [rooms, setRooms] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const navigate = useNavigate(); // ✅
  const currentLanguage = "en";

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 1.5 : 2,
    slidesToScroll: 1,
    arrows: !isMobile,
    centerMode: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: "#E9DDD1", py: 3, position: "relative" }}>
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          mx: "auto",
          position: "relative",
          "& .slick-list": { overflow: "visible", py: 2 },
          "& .slick-slide": { px: isMobile ? 1 : 2 },
          "& .slick-arrow": {
            width: 40,
            height: 40,
            zIndex: 3,
            "&:before": {
              fontSize: 30,
              color: theme.palette.text.primary,
            },
          },
        }}
      >
        <Slider {...settings}>
          {rooms.map((room, index) => (
            <Box
              key={index}
              sx={{ position: "relative", height: "100%", outline: "none" }}
            >
              <Box
                component="img"
                src={room.image}
                alt={room.title[currentLanguage]}
                sx={{
                  width: "100%",
                  height: isMobile ? "300px" : "400px",
                  objectFit: "cover",
                  boxShadow: 3,
                  borderRadius: 0,
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: 6 },
                }}
              />
              <Button
                variant="contained"
                onClick={() => navigate(`/rooms/${room.id}`)} // ✅ navigate on click
                sx={{
                  position: "absolute",
                  bottom: isMobile ? -20 : -25,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#1f1f1f",
                  color: "white",
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                  px: isMobile ? 3 : 5,
                  py: 1,
                  minWidth: isMobile ? "180px" : "220px",
                  boxShadow: 3,
                  borderRadius: 0,
                  "&:hover": { backgroundColor: "#333" },
                  zIndex: 2,
                }}
              >
                {room.title[currentLanguage]}
              </Button>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
