import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function AppointmentCancellationForm() {
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
      <h3> Appointment Cancellation Form </h3>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />

        <label for="appointment-date">Current Appointment Date:</label>
        <input type="date" id="appointment-date" required />

        <label for="reschedule-date">
          Preferred Rescheduled Date (if rescheduling):
        </label>
        <input type="date" id="reschedule-date" />

        <label for="reason">Reason for Cancellation/Reschedule:</label>
        <textarea
          className="text-area"
          id="reason"
          rows="4"
          required
        ></textarea>

        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Cancellation/Reschedule Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCancellationForm;
