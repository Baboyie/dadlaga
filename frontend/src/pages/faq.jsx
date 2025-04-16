import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import faqBackground from "../media/dadlaga/aboutusbackground.png";
import { useTranslation } from "react-i18next";
import SectionBarrier from "../components/sectionbarrier";

export default function FAQ() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const faqs = [
    { question: "home.faq.q1", answer: "home.faq.a1" },
    { question: "home.faq.q2", answer: "home.faq.a2" },
    { question: "home.faq.q3", answer: "home.faq.a3" },
    { question: "home.faq.q4", answer: "home.faq.a4" },
    { question: "home.faq.q5", answer: "home.faq.a5" },
    { question: "home.faq.q6", answer: "home.faq.a6" },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={faqBackground}
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
            px: 2,
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
                fontSize: isMobile ? "clamp(28px, 6vw, 36px)" : 50,
                color: "#000",
                letterSpacing: isMobile ? 4 : 20,
              }}
            >
              {t("home.faq.title")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Section Divider */}
      <Box>
        <SectionBarrier text={"FREQUENTLY ASKED QUESTIONS"} />
      </Box>

      {/* FAQ Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          pb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            style={{ width: "100%", maxWidth: "900px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontSize: isMobile ? "clamp(18px, 4.5vw, 22px)" : 32,
                    fontWeight: 500,
                  }}
                >
                  {t(faq.question)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    fontSize: isMobile ? "clamp(16px, 4vw, 20px)" : 20,
                    color: "#555",
                  }}
                >
                  {t(faq.answer)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Box>
    </>
  );
}
