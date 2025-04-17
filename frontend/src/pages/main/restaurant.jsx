import React from "react";
import { Box, Typography } from "@mui/material";
import restaurantbackground from "../../media/dadlaga/restaurantbackground.png";
import cookspicture from "../../media/dadlaga/restaurant/cooks.png";
import SectionBarrier from "../../components/common/sectionbarrier";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThreeImageDisplay from "../../components/foodmenu";
import img1 from "../../media/dadlaga/restaurant/menu1.jpg";
import img2 from "../../media/dadlaga/restaurant/menu2.jpg";
import img3 from "../../media/dadlaga/restaurant/menu3.jpg";
import { useTranslation } from "react-i18next";
import TransWithBreaks from "../../components/common/transwithbreaks";
export default function Restaurant() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Box
          component="img"
          src={restaurantbackground}
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
                fontSize: { xs: 30, sm: 40, md: 50 },
                color: "#000",
                letterSpacing: { xs: 10, sm: 20, md: 20 },
              }}
            >
              {t("home.restaurant.title")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <SectionBarrier text={t("home.restaurant.barrier1")} />

      {/* Paragraph Section */}
      <Box
        sx={{
          px: 4,
          pb: 4,
          backgroundColor: "#E9DDD1",
          mt: 0,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 18, sm: 20, md: 30 },
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <TransWithBreaks i18nKey="home.restaurant.text1" />
        </Typography>
      </Box>

      {/* Image and Text Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stacks on mobile, side-by-side on desktop
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: 4,
          backgroundColor: "#E9DDD1",
        }}
      >
        {/* Left: Image */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "auto", md: "90vh" },
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={cookspicture}
            alt="Our Chefs"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              marginTop: 0, // Ensure no top margin or padding
            }}
          />

          {/* Text Box on the Image */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: "0", md: "2%" }, // 0% for mobile to keep text centered
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              width: { xs: "90%", sm: "80%", md: "35%" }, // Text box width on mobile/desktop
              height: "auto",
              textAlign: "left",
              boxShadow: 4,
              borderRadius: 0,
              padding: { xs: 2, sm: 3, md: 4 },
              zIndex: 2,
              display: { xs: "none", sm: "block" }, // Hide on extra small screens
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                lineHeight: 1.5,
                textAlign: "center",
                overflowY: "auto",
                pr: 1,
              }}
            >
              Head Chef: John Miller – Over 15 years of culinary experience,
              master of international fusion cuisine. <br />
              <br />
              Sous Chefs: 3 talented chefs ensuring high-quality preparation and
              consistency. <br />
              <br />
              Wait Staff: Friendly and trained team ready to provide top-tier
              service. <br />
              <br />
              Support Crew: Cleanliness, safety, and seamless service ensured
              behind the scenes.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Paragraph Below Image */}
      <Box
        sx={{
          px: 4,
          py: 6,
          backgroundColor: "#E9DDD1",
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: 30, sm: 40, md: 50 },
          }}
        >
          {t("home.restaurant.pagetitle1")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 24, sm: 30, md: 36 },
            maxWidth: "800px",
            margin: "0 auto",
            mt: 4,
          }}
        >
          <TransWithBreaks i18nKey="home.restaurant.text2" />
        </Typography>
      </Box>
      {/* Add Icon Inside Section Barrier Text */}
      <SectionBarrier
        text={
          <>
            <>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <AccessTimeIcon
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                    verticalAlign: "middle",
                    mb: { xs: "2px", sm: 0 }, // minor tweak for mobile
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 500,
                    display: "inline",
                  }}
                >
                  {t("home.restaurant.barrier2")}
                </Typography>
              </Box>
            </>
          </>
        }
      />

      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 24, sm: 28, md: 32 },
            fontWeight: 500,
            mb: 2,
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          {t("home.restaurant.pagetitle2")}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 20, sm: 22, md: 24 },
            lineHeight: 1.8,
            color: "#3a3a3a",
            textAlign: "center",
          }}
        >
          {t("home.restaurant.text3")}
        </Typography>
      </Box>
      <SectionBarrier text={t("home.restaurant.barrier3")} />
      <ThreeImageDisplay leftImg={img1} centerImg={img2} rightImg={img3} />
    </>
  );
}
