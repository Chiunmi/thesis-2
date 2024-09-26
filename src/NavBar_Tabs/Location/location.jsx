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

    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGW1QpsdvXbsBLUkzC3Moo5p8b4BWQR4Q`; // Removed the callback parameter
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          initMap(); // Initialize the Street View panorama after script is loaded
        };
      } else {
        initMap(); // If script is already loaded, just initialize the map
      }
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className="location-page">
      <h3> Philippine Christian University Clinic</h3>
      <div id="pano" style={{ width: "98%", height: "80vh" }}></div>
    </div>
  );
};

export default Location;
