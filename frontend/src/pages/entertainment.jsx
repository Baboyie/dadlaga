import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import entertainmenthero from "../media/dadlaga/entertainmenthero.png";
import billiardImage from "../media/dadlaga/billiard.jpg";
import pool from "../media/dadlaga/indoorpool.jpg";
import cinema from "../media/dadlaga/cinema.jpg";
import bowling from "../media/dadlaga/bowling.jpg";
import SectionBarrier from "../components/sectionbarrier";
import { useTranslation } from "react-i18next";

export default function Entertainment() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const contentData = [
    {
      title: t("entertainment.billiard.title"),
      image: billiardImage,
      description: t("entertainment.billiard.description"),
      reverse: false,
    },
    {
      title: t("entertainment.pool.title"),
      image: pool,
      description: t("entertainment.pool.description"),
      reverse: true,
    },
    {
      title: t("entertainment.cinema.title"),
      image: cinema,
      description: t("entertainment.cinema.description"),
      reverse: false,
    },
    {
      title: t("entertainment.bowling.title"),
      image: bowling,
      description: t("entertainment.bowling.description"),
      reverse: true,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={entertainmenthero}
          alt="Entertainment Background"
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
              {t("entertainment.title")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Sections */}
      {contentData.map((section, index) => (
        <Box key={index}>
          <SectionBarrier text={section.title.toUpperCase()} />

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: section.reverse ? "row-reverse" : "row",
              },
              justifyContent: "center",
              alignItems: "center",
              px: 2,
              py: { xs: 4, md: 6 },
              gap: 4,
              backgroundColor: "#e9dfd4",
              flexWrap: "wrap",
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
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: "Abhaya Libre" }}
              >
                {section.title}
              </Typography>
              <Typography sx={{ fontFamily: "Georgia, serif", fontSize: 16 }}>
                {section.description}
              </Typography>
            </Box>

            {/* Image Section */}
            <Box
              component="img"
              src={section.image}
              alt={`${section.title} Image`}
              sx={{
                width: "100%",
                maxWidth: 600,
                height: { xs: 250, md: 350 },
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      ))}
    </>
  );
}
