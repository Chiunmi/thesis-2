import React, { useEffect } from "react";
import "./location.css";

const Location = () => {
  useEffect(() => {
    const initMap = () => {
      const location = { lat: 14.2919996, lng: 120.9604942 }; // Coordinates from the provided link

      // Create a Street View panorama centered at the location
      const panorama = new window.google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
          position: location,
          pov: {
            heading: 158.57, // Set heading (horizontal view direction)
            pitch: 0, // Set pitch (camera angle up/down)
          },
          zoom: 1, // Initial zoom level
        }
      );
    };

    // Load Google Maps script and initialize the map
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGW1QpsdvXbsBLUkzC3Moo5p8b4BWQR4Q&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initMap;
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="location-page">
      <div id="pano" style={{ width: "100%", height: "87vh" }}></div>
    </div>
  );
};

export default Location;
