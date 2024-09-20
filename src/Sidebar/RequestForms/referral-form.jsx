import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function ReferralForm() {
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
      <h3> Referral Form </h3>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />

        <label for="referring-doctor">Referring Doctor's Name:</label>
        <input type="text" id="referring-doctor" required />

        <label for="specialist-name">Specialist Name:</label>
        <input type="text" id="specialist-name" required />

        <label for="reason">Reason for Referral:</label>
        <textarea
          className="text-area"
          id="reason"
          rows="4"
          required
        ></textarea>

        <label for="appointment-date">Preferred Appointment Date:</label>
        <input type="date" id="appointment-date" required />

        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Referral Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReferralForm;
