import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import logo from "../../media/logo.png";
import { useTranslation } from "react-i18next";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "mon" ? "MON" : "EN";

  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuOpen = (event) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    setLangAnchorEl(null);
  };

  const menuItems = [
    { label: t("header.homebutton"), path: "/home" },
    { label: t("header.entertainmentbutton"), path: "/entertainment" },
    { label: t("header.roomsbutton"), path: "/rooms" },
    { label: t("header.restaurantbutton"), path: "/restaurant" },
    { label: t("header.aboutUsbutton"), path: "/about-us" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#E9DDD1", width: "100%", zIndex: 1200 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <Link to="/home">
            <img
              src={logo}
              alt="Hotel Logo"
              style={{
                height: isMobile ? "6vh" : "10vh",
                marginRight: "1rem",
                cursor: "pointer", // Optional: adds a pointer cursor on hover
              }}
            />
          </Link>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  fontFamily: "Abhaya Libre",
                  fontSize: "18px",
                  color: "#000",
                  backgroundColor: "transparent",
                  "&:hover": {
                    color: "#4C3F3F",
                    backgroundColor: "transparent", // Keep background transparent
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Language Selector & Mobile Menu */}
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            onClick={handleLangMenuOpen}
            sx={{
              color: "#000",
              fontFamily: "Abhaya Libre",
              fontSize: "18px",
              backgroundColor: "transparent",
              "&:hover": {
                color: "#4C3F3F",
                backgroundColor: "transparent", // Keep background transparent
              },
            }}
            endIcon={<LanguageIcon />}
          >
            {currentLang === "EN" ? t("header.english") : t("header.mongolian")}
          </Button>

          {/* Language Selector Popover */}
          <Popover
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={() => setLangAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#E9DDD1",
                color: "#000",
                borderRadius: "8px",
              },
            }}
          >
            <MenuItem onClick={() => handleLangChange("EN")}>
              {t("header.english")}
            </MenuItem>
            <MenuItem onClick={() => handleLangChange("MON")}>
              {t("header.mongolian")}
            </MenuItem>
          </Popover>

          {/* Mobile Menu Icon */}
          {isMobile && (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "#000",
                  "&:hover": {
                    color: "#4C3F3F",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "#E9DDD1",
                  },
                }}
              >
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={item.path}
                    onClick={handleMenuClose}
                    sx={{
                      color: "#000",
                      "&:hover": {
                        color: "#4C3F3F",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
