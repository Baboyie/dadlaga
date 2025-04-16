import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRooms } from "../api"; // Assuming you've exported the getRooms function

export default function RoomCarousel() {
  const [rooms, setRooms] = useState([]); // State to store fetched rooms
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  var currentLanguage = "en";

  // Fetch rooms when component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms(); // Call the getRooms API function
        setRooms(data); // Set fetched rooms to state
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []); // Empty dependency array ensures this runs once on mount

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
          centerMode: false,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E9DDD1",
        py: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          mx: "auto",
          position: "relative",
          "& .slick-list": {
            overflow: "visible",
            py: 2,
          },
          "& .slick-slide": {
            px: isMobile ? 1 : 2,
          },
          "& .slick-arrow": {
            width: 40,
            height: 40,
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
              sx={{
                position: "relative",
                height: "100%",
                outline: "none",
              }}
            >
              <Box
                component="img"
                src={room.image} // Assuming room data contains 'image' field
                alt={room.title[currentLanguage]} // Use currentLanguage to access the right title
                sx={{
                  width: "100%",
                  height: isMobile ? "300px" : "400px",
                  objectFit: "cover",
                  boxShadow: 3,
                  borderRadius: 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              />
              <Button
                variant="contained"
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
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                  zIndex: 2,
                }}
              >
                {room.title[currentLanguage]}{" "}
                {/* Render title based on the current language */}
              </Button>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
