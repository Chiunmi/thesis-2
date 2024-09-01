import ProfileLayout from "../../Components/layout_profile";
import "./admin_profile.css";
import jen from "./../../assets/jen.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Chart from "./chart";

import Modal from "react-modal";
const studentData = {
  JHS: {
    "Grade 7": {
      "G7-Compassion": [
        {
          name: "Jenine Carpio",
          section: "G7-Counsel",
          age: 13,
          sex: "Female",
          civilstatus: "Single",
          birthdate: "June 25, 2010",
          address: "Amadeo, Cavite",
          telNum: "09750862327",
          religion: "Catholic",
          guardian: "Jessica Carpio",
          guradianAddress: "Dagatan, Amadeo, Cavite",
          guardianNum: "09558574497",
          department: "COI",

          respiratory: "N/A",
          digestive: "N/A",
          nervous: "N/A",
          excretory: "N/A",
          endocrine: "N/A",
          circulatory: "N/A",
          skeletal: "N/A",
          muscular: "N/A",
          reproductive: "N/A",
          lymphatic: "N/A",

          smoke: "No",
          drink: "No",
          allergy: "N/A",
          specifyAllergy: "N/A",
        },
        {
          name: "Bdjgd Loejd C.",
          section: "G7-Compassion",
          age: 13,
          birthdate: "2008-07-21",
        },
      ],
      "G7-Courage": [
        {
          name: "Csjfjds Opsdfkdf S.",
          section: "G7-Courage",
          age: 13,
          birthdate: "2008-09-14",
        },
      ],
    },
    "Grade 8": {
      "G8-Compassion": [
        {
          name: "Ahehi, Lobarn A.",
          section: "G8-Compassion",
          age: 13,
          birthdate: "2008-05-12",
        },
        {
          name: "Bdjgd Loejd C.",
          section: "G8-Compassion",
          age: 13,
          birthdate: "2008-07-21",
        },
      ],
      "G8-Courage": [
        {
          name: "Csjfjds Opsdfkdf S.",
          section: "G8-Courage",
          age: 13,
          birthdate: "2008-09-14",
        },
      ],
    },
  },
  SHS: {
    "Grade 11": {
      STEM: {
        "Section 1": [
          {
            name: "Ahehi, Lobarn A.",
            section: "STEM - Section 1",
            age: 16,
            birthdate: "2007-05-12",
          },
        ],
        "Section 2": [
          {
            name: "Bdjgd Loejd C.",
            section: "STEM - Section 2",
            age: 16,
            birthdate: "2007-07-21",
          },
        ],
      },
      ABM: {
        "Section A": [
          {
            name: "Example Student 1",
            section: "ABM - Section A",
            age: 17,
            birthdate: "2006-02-20",
          },
        ],
      },
    },
    "Grade 12": {
      STEM: {
        "Section 1": [
          {
            name: "Ahehi, Lobarn A.",
            section: "STEM - Section 1",
            age: 16,
            birthdate: "2007-05-12",
          },
        ],
        "Section 2": [
          {
            name: "Bdjgd Loejd C.",
            section: "STEM - Section 2",
            age: 16,
            birthdate: "2007-07-21",
          },
        ],
      },
      ABM: {
        "Section A": [
          {
            name: "Example Student 1",
            section: "ABM - Section A",
            age: 17,
            birthdate: "2006-02-20",
          },
        ],
      },
    },
  },
  College: {
    "1st Year": {
      "Computer Science": {
        "CS-101": [
          {
            name: "Ahehi, Lobarn A.",
            section: "CS-101",
            age: 18,
            birthdate: "2005-05-12",
          },
          {
            name: "Bdjgd Loejd C.",
            section: "CS-101",
            age: 18,
            birthdate: "2005-07-21",
          },
        ],
        "CS-102": [
          {
            name: "Csjfjds Opsdfkdf S.",
            section: "CS-102",
            age: 18,
            birthdate: "2005-09-14",
          },
        ],
      },
    },
    "2nd Year": {
      "Computer Science": {
        "CS-101": [
          {
            name: "Ahehi, Lobarn A.",
            section: "CS-101",
            age: 18,
            birthdate: "2005-05-12",
          },
          {
            name: "Bdjgd Loejd C.",
            section: "CS-101",
            age: 18,
            birthdate: "2005-07-21",
          },
        ],
        "CS-102": [
          {
            name: "Csjfjds Opsdfkdf S.",
            section: "CS-102",
            age: 18,
            birthdate: "2005-09-14",
          },
        ],
      },
    },
  },
};

function AdminProfile() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStrandOrProgram, setSelectedStrandOrProgram] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedGrade("");
    setSelectedStrandOrProgram("");
    setSelectedSection("");
    setSelectedStudent(null);
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    setSelectedStrandOrProgram("");
    setSelectedSection("");
    setSelectedStudent(null);
  };

  const handleStrandOrProgramChange = (strandOrProgram) => {
    setSelectedStrandOrProgram(strandOrProgram);
    setSelectedSection("");
    setSelectedStudent(null);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSelectedStudent(null);
  };

  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [isScanBMIModalOpen, setScanBMIModalOpen] = useState(false);

  return (
    <div className="adminProfile">
      <span className="healthRecord"> Health Record </span>

      <div className="buttons">
        <div className="dept">
          <button
            className={`button-jhs ${
              selectedCategory === "JHS" ? "active-button" : ""
            }`}
            onClick={() => handleCategoryChange("JHS")}
          >
            Junior High School
          </button>
          <button
            className={`button-shs ${
              selectedCategory === "SHS" ? "active-button" : ""
            }`}
            onClick={() => handleCategoryChange("SHS")}
          >
            Senior High School
          </button>
          <button
            className={`button-college ${
              selectedCategory === "College" ? "active-button" : ""
            }`}
            onClick={() => handleCategoryChange("College")}
          >
            College
          </button>
        </div>
        <div className="admin-search">
          <input type="text" className="search-input" placeholder="Search..." />
          <SearchRoundedIcon />
        </div>

        {/* mga button sa right side */}
        <div className="admin-button">
          <button
            onClick={() => setCreateAccountModalOpen(true)}
            className="button-create"
          >
            Create Account
          </button>
          <Modal
            isOpen={isCreateAccountModalOpen}
            onRequestClose={() => setCreateAccountModalOpen(false)}
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
                width: "600px",
                height: "900px",
                margin: "auto",
                marginTop: "0.3vh",
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "none",
              },
            }}
          >
            <div className="modal-content">
              <h3>Create Account</h3>
              <div className="form">
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="First Name" />
                <input type="number" placeholder="Age" />
                <select>
                  <option value="" disabled selected>
                    Sex
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select>
                  <option value="" disabled selected>
                    Civil Status
                  </option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                <input type="text" placeholder="Tel No" />
                <input type="text" placeholder="Address" />
                <label> Birthdate:</label>
                <input type="date" />
                <input type="text" placeholder="Religion" />
                <input type="text" placeholder="Guardian" />
                <input type="text" placeholder="Guardian's Address" />
                <input type="text" placeholder="Guardian's Tel No" />
                <input type="text" placeholder="Department" />
              </div>
              <div className="create-account-btn">
                <button
                  className="close-btn"
                  onClick={() => setCreateAccountModalOpen(false)}
                >
                  Close
                </button>
                <button className="save-btn">Save</button>
              </div>
            </div>
          </Modal>
          <Link to="/manage">
            <button className="button-manage">Manage Stock</button>
          </Link>
        </div>
      </div>

      <div className="container">
        {/* Category Dropdown */}
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Select Category</option>
          <option value="JHS">Junior High School</option>
          <option value="SHS">Senior High School</option>
          <option value="College">College</option>
        </select>

        {/* Grade Dropdown */}
        {selectedCategory && (
          <select
            onChange={(e) => handleGradeChange(e.target.value)}
            value={selectedGrade}
          >
            <option value="">Select Grade</option>
            {Object.keys(studentData[selectedCategory] || {}).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        )}

        {/* Section Dropdown for JHS */}
        {selectedGrade && selectedCategory === "JHS" && (
          <select
            onChange={(e) => handleSectionChange(e.target.value)}
            value={selectedSection}
          >
            <option value="">Select Section</option>
            {Object.keys(
              studentData[selectedCategory][selectedGrade] || {}
            ).map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        )}

        {/* Strand/Program Dropdown for SHS and College */}
        {selectedGrade &&
          (selectedCategory === "SHS" || selectedCategory === "College") && (
            <select
              onChange={(e) => handleStrandOrProgramChange(e.target.value)}
              value={selectedStrandOrProgram}
            >
              <option value="">Select Strand/Program</option>
              {Object.keys(
                studentData[selectedCategory][selectedGrade] || {}
              ).map((strandOrProgram) => (
                <option key={strandOrProgram} value={strandOrProgram}>
                  {strandOrProgram}
                </option>
              ))}
            </select>
          )}

        {/* Section Dropdown for SHS and College */}
        {selectedStrandOrProgram &&
          (selectedCategory === "SHS" || selectedCategory === "College") && (
            <select
              onChange={(e) => handleSectionChange(e.target.value)}
              value={selectedSection}
            >
              <option value="">Select Section</option>
              {Object.keys(
                studentData[selectedCategory][selectedGrade][
                  selectedStrandOrProgram
                ] || {}
              ).map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          )}

        {/* List of Students */}
        {selectedSection && !selectedStudent && (
          <div className="name-list">
            <h3>{selectedSection}</h3>
            <ul>
              {(
                studentData[selectedCategory]?.[selectedGrade]?.[
                  selectedStrandOrProgram
                ]?.[selectedSection] ||
                studentData[selectedCategory]?.[selectedGrade]?.[
                  selectedSection
                ] ||
                []
              ).map((student) => (
                <li
                  className="student-name"
                  key={student.name}
                  onClick={() => setSelectedStudent(student)}
                >
                  {student.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Selected Student Information */}
        {selectedStudent && (
          <div className="student-info">
            <div className="student-header">
              <div className="section">
                <ArrowBackRoundedIcon style={{ marginTop: "1vh" }} />
                <h3
                  className="selected-section-header"
                  onClick={() => setSelectedStudent(null)}
                >
                  {selectedSection}
                </h3>
              </div>{" "}
            </div>

            <div className="column-one">
              <div className="student-data-i">
                <h3>{selectedStudent.name}</h3>
                <div className="archive-student-pic">
                  <img src={jen} alt="" className="jen" />
                </div>

                <button
                  onClick={() => setScanBMIModalOpen(true)}
                  className="button-bmi"
                >
                  Scan BMI
                </button>
                <Modal
                  isOpen={isScanBMIModalOpen}
                  onRequestClose={() => setScanBMIModalOpen(false)}
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
                      width: "350px",
                      height: "900px",
                      margin: "auto",
                      marginTop: "0.3vh",
                      marginLeft: "45vw",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      border: "none",
                    },
                  }}
                >
                  <div className="modal-content">
                    <h3>Scan BMI</h3>
                    <div className="bmi-form">
                      <label>
                        Height: <input type="number" />{" "}
                      </label>

                      <label>
                        Weight: <input type="number" />
                      </label>

                      <label>
                        BMI: <input type="number" />
                      </label>
                    </div>
                    <div className="scan-bmi-btn">
                      <button
                        className="close-btn"
                        onClick={() => setScanBMIModalOpen(false)}
                      >
                        Close
                      </button>
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                </Modal>
                <h4> I. </h4>
                <p> Full Name: {selectedStudent.name}</p>
                <p>Gr./Section: {selectedStudent.section}</p>
                <p>Age: {selectedStudent.age}</p>
                <p>Civil Status: {selectedStudent.civilstatus}</p>
                <p>Birthdate: {selectedStudent.birthdate}</p>
                <p>Address: {selectedStudent.address}</p>
                <p>Tel. No.: {selectedStudent.telNum}</p>
                <p>Religion: {selectedStudent.religion}</p>
                <p>Guardian: {selectedStudent.guardian}</p>
                <p>Guradian's Address: {selectedStudent.guradianAddress}</p>
                <p> Guardian's Number: {selectedStudent.guardianNum}</p>
                <p> Department: {selectedStudent.department}</p>
              </div>
              <div className="student-data-ii">
                {" "}
                <h4> II. </h4>
                <h4>
                  {" "}
                  Have you ever suffered illnesses involving any of the
                  following systems? Specify.
                </h4>
                <p>Respiratory : {selectedStudent.respiratory}</p>
                <p>Digestive : {selectedStudent.digestive}</p>
                <p>Nervous : {selectedStudent.nervous}</p>
                <p>Excretory: {selectedStudent.excretory}</p>
                <p>Endocrine : {selectedStudent.endocrine}</p>
                <p>Circulatory : {selectedStudent.circulatory}</p>
                <p>Skeletal : {selectedStudent.skeletal}</p>
                <p>Muscular : {selectedStudent.muscular}</p>
                <p>Reproductive : {selectedStudent.reproductive}</p>
                <p>Lymphatic : {selectedStudent.lymphatic}</p>
                <br />
                <h4> III. </h4>
                <p>Do you smoke? : {selectedStudent.smoke}</p>
                <p>Do you drink? : {selectedStudent.drink}</p>
                <p>Allergy? : {selectedStudent.allergy}</p>
                <p>If so, specify? : {selectedStudent.specifyAllergy}</p>
              </div>
            </div>
            <h3>Physical Examination</h3>
            <div className="column-two">
              <div className="student-data-iii">
                <h4> IV. </h4>
                <p>Eyes : {selectedStudent.respiratory}</p>
                <p>Ear : {selectedStudent.digestive}</p>
                <p>Nose : {selectedStudent.nervous}</p>
                <p>Throat: {selectedStudent.excretory}</p>
                <p>Tonsils : {selectedStudent.endocrine}</p>
                <p>Teeth : {selectedStudent.circulatory}</p>
                <p>Tongue : {selectedStudent.skeletal}</p>
                <p>Necj : {selectedStudent.muscular}</p>
                <p>Thyroids : {selectedStudent.reproductive}</p>
                <p>Cervical Glands : {selectedStudent.lymphatic}</p>
                <br />
                <h4> V. </h4>

                <p>Chest : {selectedStudent.smoke}</p>
                <p>Contour : {selectedStudent.smoke}</p>
                <p>Heart : {selectedStudent.drink}</p>
                <p>Rate : {selectedStudent.drink}</p>
                <p>Rhythm : {selectedStudent.drink}</p>
                <p>BP : {selectedStudent.specifyAllergy}</p>
                <p>Height : {selectedStudent.allergy}</p>
                <p>Weight : {selectedStudent.specifyAllergy}</p>
                <p>BMI : {selectedStudent.specifyAllergy}</p>
                <p>Lungs : {selectedStudent.specifyAllergy}</p>
              </div>

              <div className="student-data-iv">
                <h4> VI. </h4>

                <p>Abdomen : {selectedStudent.smoke}</p>
                <p>Contour : {selectedStudent.smoke}</p>
                <p>Liver : {selectedStudent.drink}</p>
                <p>Spleen : {selectedStudent.drink}</p>
                <p>Kidneys : {selectedStudent.drink}</p>
                <br />
                <h4> VII. </h4>
                <p>Extremities : {selectedStudent.specifyAllergy}</p>
                <p>Upper : {selectedStudent.allergy}</p>
                <p>Lower : {selectedStudent.specifyAllergy}</p>
              </div>
            </div>
            <h3>Laboratory Examination</h3>
            <div className="column-three">
              <div className="student-data-v">
                <h4> VI. </h4>
                <h4> CHEST X-RAY </h4>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p> Others: (If indicated)</p>
              </div>
            </div>
            <div className="archive-staff">
              Last edited by: (staff name) <br />
              Time stamp: Mar 16 08:12:04
            </div>
          </div>
        )}
      </div>
      <Chart />
    </div>
  );
}

export default AdminProfile;
