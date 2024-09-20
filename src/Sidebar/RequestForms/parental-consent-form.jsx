import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function ParentalConsentForm() {
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
      <h3> Parental Consent Form </h3>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />

        <label for="parent-name">Parent/Guardian Name:</label>
        <input type="text" id="parent-name" required />

        <label for="minor-name">Minor's Name:</label>
        <input type="text" id="minor-name" required />

        <label for="appointment-date">Appointment Date:</label>
        <input type="date" id="appointment-date" required />

        <label for="consent">Parental Consent:</label>
        <textarea
          className="text-area"
          id="consent"
          rows="4"
          placeholder="I, [Parent/Guardian Name], give my consent for [Minor's Name] to attend the appointment on [Appointment Date]."
          required
        ></textarea>

        <label for="e-signature-upload">
          Upload Handwritten E-Signature (image file):
        </label>
        <input
          type="file"
          id="e-signature-upload"
          accept=".jpg,.png,.pdf"
          required
        />

        <label for="consent-confirm">
          <input type="checkbox" id="consent-confirm" required />I agree that
          the e-signature provided is legally binding.
        </label>

        <input type="hidden" id="timestamp" value="" />

        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Parental Consent Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParentalConsentForm;
