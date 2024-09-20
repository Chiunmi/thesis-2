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
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />

        <label for="telehealth-date">
          Preferred Telehealth Appointment Date:
        </label>
        <input type="date" id="telehealth-date" required />

        <label for="telehealth-time">
          Preferred Telehealth Appointment Time:
        </label>
        <input type="time" id="telehealth-time" required />

        <label for="platform">
          Preferred Telehealth Platform (Zoom, Teams, etc.):
        </label>
        <input type="text" id="platform" required />

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
