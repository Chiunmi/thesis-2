import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function TelehealthAppointmentRequestForm() {
  return (
    <div className="request-forms">
      <div className="back-forms">
        <Link to="/request-forms">
          <button className="form-back-button">
            <ArrowBackRoundedIcon />
          </button>
        </Link>
      </div>
      <p className="form-warning">
        {" "}
        Fabricating information or providing false details can lead to
        consequences and may impact your credibility and trustworthiness.
      </p>
      <h3>Telehealth Appointment Request Form </h3>
      <h4> Available Consultations</h4>
      <div className="telemed-choices">
        <div className="telemed-container">
          <p className="telemed-title"> Dental Consultation</p>
          <div className="call-button">
            <p>
              Connect with a dental professional for telemedicine services
              related to dental care and queries
            </p>
          </div>
        </div>

        <div className="telemed-container">
          <p className="telemed-title"> Nursing Consultation</p>
          <div className="call-button">
            <p>
              Interact with nursing professionals for telemedicine services such
              as patient care guidance and health educationo interact with
              nursing professionals for telemedicine services such as patient
              care guidance and health education.
            </p>
          </div>
        </div>
        <div className="telemed-container">
          <p className="telemed-title"> Medical Consultation</p>
          <div className="call-button">
            <p>
              Access telemedicine services provided by medical professionals,
              including general healthcare and medical advice.
            </p>
          </div>
        </div>
      </div>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />
        <label for="telehealth-type">Telehealth Consultaion:</label>
        <select id="telehealth-type" required>
          <option value="dental-consultation">Dental Consultation</option>
          <option value="nursing-consultation">Nursing Consultation</option>
          <option value="medical-consultation">Medical Consultation</option>
        </select>

        <label for="telehealth-date">
          Preferred Telehealth Appointment Date:
        </label>
        <input type="date" id="telehealth-date" required />

        <label for="telehealth-time">
          Preferred Telehealth Appointment Time:
        </label>
        <input type="time" id="telehealth-time" required />

        <label for="reason">Reason for Telehealth Appointment:</label>
        <textarea
          className="text-area"
          id="reason"
          rows="4"
          required
        ></textarea>

        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Telehealth Appointment Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelehealthAppointmentRequestForm;
