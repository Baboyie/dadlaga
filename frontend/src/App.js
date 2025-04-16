import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Rooms from "./pages/rooms";
import Footer from "./components/footer";
import Restaurant from "./pages/restaurant";
import AboutUs from "./pages/about";
import ScrollToTop from "./components/scrolltotop";
import LoginPage from "./pages/loginpage";
import { isAuthenticated } from "./authUtils/authUtils";
import { Navigate } from "react-router-dom";
import AdminPanel from "./pages/adminpanel";
import Entertainment from "./pages/entertainment";
import RoomDetails from "./pages/roomdetail";
import "./i18n"; // import this FIRST
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import RoomManagement from "./pages/admin/roommanagement";
import FAQ from "./pages/faq";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />{" "}
        {/* Ensures that the default styles are reset and apply the theme */}
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                !isAuthenticated() ? <LoginPage /> : <Navigate to="/admin" />
              }
            />{" "}
            <Route
              path="/admin"
              element={
                isAuthenticated() ? <AdminPanel /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/admin/rooms"
              element={
                isAuthenticated() ? (
                  <RoomManagement />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Admin Login route */}
            <Route path="/home" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
