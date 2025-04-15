import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
    const location = useLocation();
  
    useEffect(() => {
      // Scroll to top when the location changes
      window.scrollTo(0, 0);
    }, [location]);
  
    return null; // This component doesn't render anything
  };
  
  export default ScrollToTop;