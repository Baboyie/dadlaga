import { useState, useEffect } from 'react';

const ResponsiveMap = ({ 
  location = "J.Sambuu St, Chingeltei district 5th horoo, Ulaanbaatar",
  zoom = 15,
  className = "",
  style = {}
}) => {
  const [dimensions, setDimensions] = useState({
    width: '100%',
    height: '400px'
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: '100%',
        height: `${window.innerWidth > 768 ? '500px' : '300px'}`
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create the embed URL without API key
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10694.885097977785!2d106.89816057192482!3d47.92243034488224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969366c8b6b9a7%3A0x46313f3d850bf7cc!2sMN%20Tower%20Mongolia!5e0!3m2!1smn!2smn!4v1744363968356!5m2!1smn!2smn`;

  return (
    <div 
      style={{ 
        position: 'relative',
        width: dimensions.width, 
        height: dimensions.height,
        margin: '20px 0',
        ...style
      }}
      className={className}
    >
   <iframe
  title={`Google Map - ${location}`}
  style={{
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50vw', // 50% of the viewport width
    height: '100%',
    border: 'none',
    borderRadius: '8px',
  }}
  src={mapUrl}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

    </div>
  );
};

export default ResponsiveMap;