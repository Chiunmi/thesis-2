import React, { useState } from "react";
import Layout from "../../Components/Layout";
import meme from "./../../assets/meme.jpg";
import Modal from "react-modal";
import "./student-profile.css";
function StudentProfile() {
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const handleChange = (event) => {
    // Handle input changes
  };

  const handleSave = () => {
    // Handle save logic
  };

  const selectedStudent = {
    name: "Jenine Carpio",
    section: "BSCS4",
    age: 21,
    civilstatus: "Single",
    birthdate: "2002-09-01",
    address: "123 Main St",
    telNum: "555-5555",
    religion: "None",
    guardian: "Jane Doe",
    guardianAddress: "456 Elm St",
    guardianNum: "555-5556",
    department: "COI",

    respiratory: "None",
    digestive: "None",
    nervous: "None",
    excretory: "None",
    endocrine: "None",
    circulatory: "None",
    skeletal: "None",
    muscular: "None",
    reproductive: "None",
    lymphatic: "None",
    smoke: "No",
    drink: "No",
    allergy: "None",
    specifyAllergy: "",
    eyes: "Normal",
    ear: "Normal",
    nose: "Normal",
    throat: "Normal",
    tonsils: "Normal",
    teeth: "Normal",
    tongue: "Normal",
    neck: "Normal",
    thyroids: "Normal",
    cervicalGlands: "Normal",
    chest: "Normal",
    contour: "Normal",
    heart: "Normal",
    rate: "Normal",
    rhythm: "Normal",
    bp: "120/80",
    height: "180 cm",
    weight: "75 kg",
    bmi: "23.1",
    lungs: "Normal",
    abdomen: "Normal",
    liver: "Normal",
    spleen: "Normal",
    kidneys: "Normal",
    extremities: "Normal",
    upperExtremities: "Normal",
    lowerExtremities: "Normal",
  };

  return (
    <div className="studentProfile">
      <div className="student-profile-info">
        <h2> Student Health Record</h2>
        <div className="student-column-one">
          <div className="student-name-photo">
            <div className="profile-student-pic">
              <label htmlFor="upload-photo" className="upload-label">
                <img src={meme} alt="Student Photo" className="student-photo" />
                <input type="file" id="upload-photo" className="upload-input" />
                <button className="upload-button">Change Photo</button>
              </label>
            </div>

            <div className="student-profile-top">
              <div className="student-profile-name">
                <h1>{selectedStudent.name}</h1>
              </div>
              <div className="student-top-details">
                <p> weight</p>
                <h3> {selectedStudent.weight}</h3>
                <p> height</p>
                <h3> {selectedStudent.height}</h3>
                <p> BMI</p>
                <h3> {selectedStudent.bmi}</h3>
              </div>
              <div>
                <button
                  className="student-edit-profile-btn"
                  onClick={openEditProfileModal}
                >
                  Edit Profile
                </button>
              </div>
              <Modal
                isOpen={isEditProfileModalOpen}
                onRequestClose={closeEditProfileModal}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    boxShadow: "none",
                  },
                  content: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50vw",
                    height: "4vh",
                    maxHeight: "fit-content",
                    margin: "auto",
                    marginTop: "5vh",
                    paddingTop: "120vh",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    border: "none",
                    overflowY: "auto",
                  },
                }}
              >
                <div className="edit-profile-modal">
                  <h3>Edit Profile</h3>
                  <form>
                    <h4>I. Personal Information</h4>
                    <label>Full Name: </label>
                    <input
                      type="text"
                      name="name"
                      value={selectedStudent.name}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Gr./Section: </label>
                    <input
                      type="text"
                      name="section"
                      value={selectedStudent.section}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Age: </label>
                    <input
                      type="number"
                      name="age"
                      value={selectedStudent.age}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Civil Status: </label>
                    <input
                      type="text"
                      name="civilstatus"
                      value={selectedStudent.civilstatus}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Birthdate: </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={selectedStudent.birthdate}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Address: </label>
                    <input
                      type="text"
                      name="address"
                      value={selectedStudent.address}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Tel. No.: </label>
                    <input
                      type="tel"
                      name="telNum"
                      value={selectedStudent.telNum}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Religion: </label>
                    <input
                      type="text"
                      name="religion"
                      value={selectedStudent.religion}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Guardian: </label>
                    <input
                      type="text"
                      name="guardian"
                      value={selectedStudent.guardian}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Guardian's Address: </label>
                    <input
                      type="text"
                      name="guardianAddress"
                      value={selectedStudent.guardianAddress}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Guardian's Number: </label>
                    <input
                      type="tel"
                      name="guardianNum"
                      value={selectedStudent.guardianNum}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Department: </label>
                    <input
                      type="text"
                      name="department"
                      value={selectedStudent.department}
                      onChange={handleChange}
                    />
                    <br />
                    <h4>II. Illnesses Involving Systems</h4>
                    <label>Respiratory: </label>
                    <input
                      type="text"
                      name="respiratory"
                      value={selectedStudent.respiratory}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Digestive: </label>
                    <input
                      type="text"
                      name="digestive"
                      value={selectedStudent.digestive}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Nervous: </label>
                    <input
                      type="text"
                      name="nervous"
                      value={selectedStudent.nervous}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Excretory: </label>
                    <input
                      type="text"
                      name="excretory"
                      value={selectedStudent.excretory}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Endocrine: </label>
                    <input
                      type="text"
                      name="endocrine"
                      value={selectedStudent.endocrine}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Circulatory: </label>
                    <input
                      type="text"
                      name="circulatory"
                      value={selectedStudent.circulatory}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Skeletal: </label>
                    <input
                      type="text"
                      name="skeletal"
                      value={selectedStudent.skeletal}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Muscular: </label>
                    <input
                      type="text"
                      name="muscular"
                      value={selectedStudent.muscular}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Reproductive: </label>
                    <input
                      type="text"
                      name="reproductive"
                      value={selectedStudent.reproductive}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Lymphatic: </label>
                    <input
                      type="text"
                      name="lymphatic"
                      value={selectedStudent.lymphatic}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Psychological: </label>
                    <input
                      type="text"
                      name="psychological"
                      value={selectedStudent.psychological}
                      onChange={handleChange}
                    />
                    <br />
                    <label>If so, specify: </label>
                    <input
                      type="text"
                      name="specifyPsychological"
                      value={selectedStudent.specifPsychological}
                      onChange={handleChange}
                    />
                    <h4>III. Habits and Allergies</h4>
                    <label>Do you smoke?: </label>
                    <input
                      type="radio"
                      name="smoke"
                      value="Yes"
                      checked={selectedStudent.smoke === "Yes"}
                      onChange={handleChange}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="smoke"
                      value="No"
                      checked={selectedStudent.smoke === "No"}
                      onChange={handleChange}
                    />{" "}
                    No
                    <br />
                    <label>Do you drink?: </label>
                    <input
                      type="radio"
                      name="drink"
                      value="Yes"
                      checked={selectedStudent.drink === "Yes"}
                      onChange={handleChange}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="drink"
                      value="No"
                      checked={selectedStudent.drink === "No"}
                      onChange={handleChange}
                    />{" "}
                    No
                    <br />
                    <label>Allergy?: </label>
                    <input
                      type="text"
                      name="allergy"
                      value={selectedStudent.allergy}
                      onChange={handleChange}
                    />
                    <br />
                    <label>If so, specify: </label>
                    <input
                      type="text"
                      name="specifyAllergy"
                      value={selectedStudent.specifyAllergy}
                      onChange={handleChange}
                    />
                    <br />
                  </form>
                  <div className="edit-account-btn">
                    <button
                      className="close-btn"
                      onClick={closeEditProfileModal}
                    >
                      Close
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="student-column-two">
          <div className="student-profile-data-i">
            <h4>I.</h4>
            <p>Full Name: {selectedStudent.name}</p>
            <p>Gr./Section: {selectedStudent.section}</p>
            <p>Age: {selectedStudent.age}</p>
            <p>Sex: {selectedStudent.sex}</p>
            <p>Civil Status: {selectedStudent.civilstatus}</p>
            <p>Birthdate: {selectedStudent.birthdate}</p>
            <p>Address: {selectedStudent.address}</p>
            <p>Tel. No.: {selectedStudent.telNum}</p>
            <p>Religion: {selectedStudent.religion}</p>
            <p>Guardian: {selectedStudent.guardian}</p>
            <p>Guardian's Address: {selectedStudent.guradianAddress}</p>
            <p>Guardian's Number: {selectedStudent.guardianNum}</p>
            <p> Department: {selectedStudent.department}</p>
          </div>
          <div className="student-profile-data-ii">
            <h4>
              II. Have you ever suffered illnesses involving any of the
              following systems? Specify.
            </h4>

            <p>Respiratory: {selectedStudent.respiratory}</p>
            <p>Digestive: {selectedStudent.digestive}</p>
            <p>Nervous: {selectedStudent.nervous}</p>
            <p>Excretory: {selectedStudent.excretory}</p>
            <p>Endocrine: {selectedStudent.endocrine}</p>
            <p>Circulatory: {selectedStudent.circulatory}</p>
            <p>Skeletal: {selectedStudent.skeletal}</p>
            <p>Muscular: {selectedStudent.muscular}</p>
            <p>Reproductive: {selectedStudent.reproductive}</p>
            <p>Lymphatic: {selectedStudent.lymphatic}</p>
          </div>
          <div className="student-profile-data-iii">
            <h4>III.</h4>
            <p>Do you smoke?: {selectedStudent.smoke}</p>
            <p>Do you drink?: {selectedStudent.drink}</p>
            <p>Allergy?: {selectedStudent.allergy}</p>
            <p>If so, specify: {selectedStudent.specifyAllergy}</p>
          </div>
        </div>
        <h3>Physical Examination</h3>

        <div className="student-column-three">
          <div className="student-profile-data-iv">
            <h4>IV.</h4>
            <p>Eyes: {selectedStudent.respiratory}</p>
            <p>Ear: {selectedStudent.digestive}</p>
            <p>Nose: {selectedStudent.nervous}</p>
            <p>Throat: {selectedStudent.excretory}</p>
            <p>Tonsils: {selectedStudent.endocrine}</p>
            <p>Teeth: {selectedStudent.circulatory}</p>
            <p>Tongue: {selectedStudent.skeletal}</p>
            <p>Neck: {selectedStudent.muscular}</p>
            <p>Thyroids: {selectedStudent.reproductive}</p>
            <p>Cervical Glands: {selectedStudent.lymphatic}</p>
          </div>

          <div className="student-profile-data-v">
            <h4>V.</h4>
            <p>Chest: {selectedStudent.smoke}</p>
            <p>Contour: {selectedStudent.smoke}</p>
            <p>Heart: {selectedStudent.drink}</p>
            <p>Rate: {selectedStudent.drink}</p>
            <p>Rhythm: {selectedStudent.drink}</p>
            <p>BP: {selectedStudent.bp}</p>
            <p>Height: {selectedStudent.height}</p>
            <p>Weight: {selectedStudent.weight}</p>
            <p>BMI: {selectedStudent.bmi}</p>
            <p>Lungs: {selectedStudent.lungs}</p>
          </div>

          <div className="student-profile-data-vi">
            <h4>VI.</h4>
            <p>Abdomen: {selectedStudent.smoke}</p>
            <p>Contour: {selectedStudent.smoke}</p>
            <p>Liver: {selectedStudent.drink}</p>
            <p>Spleen: {selectedStudent.drink}</p>
            <p>Kidneys: {selectedStudent.drink}</p>
          </div>

          <div className="student-profile-data-vii">
            <h4>VII.</h4>
            <p>Extremities: {selectedStudent.extremities}</p>
            <p>Upper: {selectedStudent.upperExtremities}</p>
            <p>Lower: {selectedStudent.lowerExtremities}</p>
          </div>
        </div>

        <div className="student-column-four">
          <div className="student-data-v1">
            <h3>Laboratory Examination</h3>
            <h4> VIII. </h4>
            <p> Blood Chemistry: {selectedStudent.bloodChemistry}</p>
            <p> CBC:{selectedStudent.cbc} </p>
            <p> Urinalysis: {selectedStudent.urinalysis}</p>
            <p> Fecalysis: {selectedStudent.fecalysis}</p>
          </div>
          <div className="student-data-v2">
            <h3>Diagnostic Procedures</h3>
            <h4> IX. </h4>
            <p> Chest X-Ray Findings: {selectedStudent.chestXray}</p>
          </div>
          <div className="student-data-v3">
            <h3>Others(ECG, Ultrasound, etc.)</h3>
            <h4> X. </h4>
            <p> {selectedStudent.others}</p>
          </div>
        </div>
        <div
          className="archive-staff"
          style={{ fontSize: "14px", margin: "1vw" }}
        >
          Last edited: Mar 16 08:12:04
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
