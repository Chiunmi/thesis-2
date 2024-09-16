import "./forms.css";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function SpecialLeaveForm() {
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

        <label for="special-leave-reason">Reason for Special Leave:</label>
        <select id="special-leave-reason" required>
          <option value="maternity-leave">Maternity Leave</option>
          <option value="bereavement-leave">Bereavement Leave</option>
          <option value="other">Other (Please specify below)</option>
        </select>

        <label for="additional-info">
          Additional Information (if applicable):
        </label>
        <textarea
          className="text-area"
          id="additional-info"
          rows="4"
        ></textarea>

        <label for="leave-duration">Duration of Leave (Start - End):</label>
        <div className="leave-duration">
          <input type="date" id="start-date" required /> to
          <input type="date" id="end-date" required />
        </div>

        <div className="submit-buttons">
          <button className="submit-form-btn" type="submit">
            Submit Special Leave Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpecialLeaveForm;
