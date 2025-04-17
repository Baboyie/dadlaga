import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import aboutusbackground from "../../media/dadlaga/aboutusbackground.png";
import aboutuspicbetweentext from "../../media/dadlaga/about_us_picbetweentext.png";
import { useTranslation } from "react-i18next";
import TransWithBreaks from "../../components/common/transwithbreaks";
export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={aboutusbackground}
          alt="Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(2px)",
            position: "absolute",
            top: 30,
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
                fontSize: 50,
                color: "#000",
                letterSpacing: 20,
              }}
            >
              {t("home.aboutus.title")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Paragraph Section - move this outside */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        <Typography variant="body1" sx={{ fontSize: 30, textAlign: "center" }}>
          <TransWithBreaks i18nKey="home.aboutus.description1" />
        </Typography>
        <motion.img
          src={aboutuspicbetweentext}
          alt="About Us Decoration"
          style={{
            display: "block",
            margin: "2rem auto",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "600px",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <Typography variant="body1" sx={{ fontSize: 30, textAlign: "center" }}>
          <TransWithBreaks i18nKey="home.aboutus.description2" />
        </Typography>
      </Box>
    </>
  );
}
