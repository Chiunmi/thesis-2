import "./telemed.css";
function Telemed() {
  return (
    <div className="telemed-page">
      <span> To join various telemedicine consultations:</span>

      <div className="telemed-container">
        <div className="link">
          <p className="telemed-title"> Dental Consultation</p>
        </div>
        <div className="call-button">
          <h3>
            Join the call to connect with a dental professional for telemedicine
            services related to dental care and queries
          </h3>
          <button
            className="join-call-btn"
            onClick={() => {
              window.open("https://meet.google.com/xdb-naxn-ewa", "_blank");
            }}
          >
            Join Call
          </button>
        </div>
      </div>

      <div className="telemed-container">
        <div className="link">
          <p className="telemed-title"> Medical Consultation</p>
        </div>
        <div className="call-button">
          <h3>
            Join the call to access telemedicine services provided by medical
            professionals, including general healthcare and medical advice.
          </h3>
          <button
            className="join-call-btn"
            onClick={() => {
              window.open("https://meet.google.com/xdb-naxn-ewa", "_blank");
            }}
          >
            Join Call
          </button>
        </div>
      </div>

      <div className="telemed-container">
        <div className="link">
          <p className="telemed-title"> Nursing Consultation</p>
        </div>
        <div className="call-button">
          <h3>
            Join the call to interact with nursing professionals for
            telemedicine services such as patient care guidance and health
            educationo interact with nursing professionals for telemedicine
            services such as patient care guidance and health education
          </h3>
          <button
            className="join-call-btn"
            onClick={() => {
              window.open("https://meet.google.com/xdb-naxn-ewa", "_blank");
            }}
          >
            Join Call
          </button>
        </div>
      </div>

      <p className="trouble">
        {" "}
        Having Trouble? <a href="#">Click here.</a>
      </p>
    </div>
  );
}

export default Telemed;
