import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function MedicalRecordRequestForm() {
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
      <h3> Medical Record Request/Release Form </h3>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />

        <label for="requester-name">Requester's Name:</label>
        <input type="text" id="requester-name" required />

        <label for="release-to">
          Release Medical Records To (Doctor/Clinic):
        </label>
        <input type="text" id="release-to" required />

        <label for="purpose">Purpose of Request:</label>
        <textarea
          className="text-area"
          id="purpose"
          rows="4"
          required
        ></textarea>

        <label for="supporting-docs">
          Upload Supporting Documents (if required):
        </label>
        <input type="file" id="supporting-docs" accept=".pdf,.jpg,.png" />

        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Medical Record Request/Release Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecordRequestForm;
