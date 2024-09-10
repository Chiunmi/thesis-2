import "./request_forms.css";
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
          <p className="form-title"> Student Absence Form</p>
          <h3>
            For students who need to report an absence, fill out the "Student
            Absence Form." Include details such as your name, student ID,
            date(s) of absence, reason, and any required supporting documents.
          </h3>
        </div>
        <div className="form-button">
          <button
            className="request-form-btn"
            onClick={() => {
              window.open("https://forms.gle/xjxbJs7QtZBhxErg6", "_blank");
            }}
          >
            Submit a Form
          </button>
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
            <button className="request-form-btn">Submit a Form</button>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="request-form">
          <p className="form-title"> Medical Leave Form:</p>
          <h3>
            If you require medical leave due to illness or medical reasons,
            complete the "Medical Leave Form." Provide your personal
            information, diagnosis (if applicable), expected duration of leave,
            and any medical certificates or doctor's notes.
          </h3>

          <div className="form-button">
            <button className="request-form-btn">Submit a Form</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestForms;
