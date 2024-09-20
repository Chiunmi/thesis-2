import "./request_forms.css";
import { Link } from "react-router-dom";
function RequestForms() {
  return (
    <div className="request-form-page">
      Fill out the appropriate leave form based on your situation. Please wait
      for confirmation or approval after submitting the form.
      <p className="form-warning">
        {" "}
        Fabricating information or providing false details can lead to
        consequences and may impact your credibility and trustworthiness.
      </p>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Appointment Request Form</p>
          <h3>
            Allows students to request appointments with doctors, nurses, or
            counselors. It should capture preferred dates, times, and the reason
            for the visit.
          </h3>

          <div className="form-button">
            <Link to="/appointment-request-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title">
            {" "}
            Appointment Cancellation/Reschedule Form
          </p>
          <h3>
            A form for students to cancel or reschedule their appointments,
            indicating the reason for the change and new preferred dates.
          </h3>

          <div className="form-button">
            <Link to="/appointment-cancellation-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Medical Leave Form</p>
          <h3>
            If you require medical leave due to illness or medical reasons,
            complete the "Medical Leave Form." Provide your personal
            information, diagnosis (if applicable), expected duration of leave,
            and any medical certificates or doctor's notes.
          </h3>

          <div className="form-button">
            <Link to="/medical-leave-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Medical Record Request/Release Form</p>
          <h3>
            Allows students to request or authorize the release of their medical
            records to another healthcare provider.
          </h3>

          <div className="form-button">
            <Link to="/medical-record-request-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title">
            {" "}
            Parental Consent for Appointment (for minors)
          </p>
          <h3>
            Required for students under a certain age to schedule appointments,
            with parental or guardian consent.
          </h3>

          <div className="form-button">
            <Link to="/parental-consent-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Referral Form</p>
          <h3>
            Used by the clinic to refer students to specialists or external
            healthcare providers.
          </h3>

          <div className="form-button">
            <Link to="/referral-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Special Leave Request Form</p>
          <h3>
            For unique or special leave requests (e.g., maternity leave,
            bereavement leave), use the "Special Leave Request Form." Specify
            the reason for the special leave, duration, and any additional
            information required.
          </h3>

          <div className="form-button">
            <Link to="/special-leave-form">
              <button className="request-form-btn">Submit a Form</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Student Absence Form</p>
          <h3>
            For students who need to report an absence, fill out the "Student
            Absence Form." Include details such as your name, student ID,
            date(s) of absence, reason, and any required supporting documents.
          </h3>
        </div>
        <div className="form-button">
          <Link to="/student-absence-form">
            <button className="request-form-btn">Submit a Form</button>
          </Link>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Telehealth Appointment Request Form</p>
          <h3>
            For scheduling virtual appointments or teleconsultations, especially
            important for remote or online services.
          </h3>
        </div>
        <div className="form-button">
          <Link to="/telehealth-form">
            <button className="request-form-btn">Submit a Form</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RequestForms;
