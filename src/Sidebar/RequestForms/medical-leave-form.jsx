import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function MedicalLeaveForm() {
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
      <h3> Medical Leave Form </h3>
      <div className="form-content">
        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" required />
        <label for="diagnosis">Reason for Medical Leave/Diagnosis:</label>
        <textarea
          className="text-area"
          id="diagnosis"
          rows="4"
          required
        ></textarea>
        <label for="leave-duration">
          Expected Duration of Leave (Start - End):
        </label>
        <div className="leave-duration">
          <input type="date" id="start-date" required /> to
          <input type="date" id="end-date" required />
        </div>
        <label for="medical-certificate">
          Upload Medical Certificate/Doctor's Note:
        </label>
        <input
          type="file"
          id="medical-certificate"
          accept=".pdf,.jpg,.png"
          required
        />
        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Medical Leave Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicalLeaveForm;
