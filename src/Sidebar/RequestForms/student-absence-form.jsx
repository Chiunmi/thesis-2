import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function StudentAbsenceForm() {
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
      <h3> Student Absence Form </h3>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />

        <label for="absence-date">Date of Absence:</label>
        <input type="date" id="absence-date" required />

        <label for="reason">Reason for Absence:</label>
        <textarea
          className="text-area"
          id="reason"
          rows="4"
          required
        ></textarea>

        <label for="supporting-docs">
          Upload Supporting Documents (if required):
        </label>
        <input type="file" id="supporting-docs" accept=".pdf,.jpg,.png" />
        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Absence Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentAbsenceForm;
