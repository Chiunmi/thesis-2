import "./location.css";

function Location() {
  return (
    <div className="location-page">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3866.3226720384446!2d120.9598773!3d14.2926752!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d58d4dacc433%3A0xf230c6ed6578a37e!2sPhilippine%20Christian%20University!5e0!3m2!1sen!2sph!4v1702017052465!5m2!1sen!2sph"
          title="Google Maps"
          frameBorder="0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Location;
