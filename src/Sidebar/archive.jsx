// import "./archive.css";
import jen from "./../assets/jen.png";
import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";

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
      "College of Informatics": {
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
        "Information Technology": {
          "IT-101": [
            {
              name: "Doe, John",
              section: "IT-101",
              age: 18,
              birthdate: "2005-11-30",
            },
          ],
        },
      },
      "College of Education": {
        "Education Program": {
          "ED-101": [
            {
              name: "Alex, Jane D.",
              section: "ED-101",
              age: 18,
              birthdate: "2005-02-14",
            },
          ],
        },
      },
    },
    "2nd Year": {
      "College of Informatics": {
        "Computer Science": {
          "CS-201": [
            {
              name: "Emily Watson",
              section: "CS-201",
              age: 19,
              birthdate: "2004-04-13",
            },
          ],
          "CS-202": [
            {
              name: "William Harris",
              section: "CS-202",
              age: 19,
              birthdate: "2004-08-24",
            },
          ],
        },
      },
      "College of Business": {
        "Business Administration": {
          "BA-201": [
            {
              name: "George Lucas",
              section: "BA-201",
              age: 19,
              birthdate: "2004-05-09",
            },
          ],
        },
      },
    },
  },
};

function Archive() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedStrandOrProgram, setSelectedStrandOrProgram] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedYear("");
    setSelectedGrade("");
    setSelectedDepartment("");
    setSelectedProgram("");
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

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedDepartment("");
    setSelectedProgram("");
    setSelectedSection("");
    setSelectedStudent(null);
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    setSelectedProgram("");
    setSelectedSection("");
    setSelectedStudent(null);
  };

  const handleProgramChange = (program) => {
    setSelectedProgram(program);
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

  const [isScanBMIModalOpen, setScanBMIModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    date: "",
    symptoms: "",
    action: "",
  });

  const openAddModal = () => {
    setModalType("add");
    setIsModalOpen(true);
  };

  const openEditModal = (data) => {
    setFormData(data);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      date: "",
      symptoms: "",
      action: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (modalType === "add") {
      // Handle add logic
    } else if (modalType === "edit") {
      // Update the selected student's data or handle update logic
    }
    closeModal();
  };

  const isDetailsBlank = (item) => {
    return !item.date && !item.symptoms && !item.action;
  };

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const assessmentData = [
    {
      id: 1,
      date: "09/01/24",
      symptoms: "Masakit ulo",
      action: "Gave gatorade and itlog ",
    },
    {
      id: 2,
      date: "09/02/24",
      symptoms: "Sore throat",
      action: "Administered cough syrup",
    },
    {
      id: 3,
      date: "09/03/24",
      symptoms: "Fever",
      action: "Provided antipyretics",
    },
    {
      id: 4,
      date: "09/04/24",
      symptoms: "Headache",
      action: "Recommended rest and hydration",
    },
  ];

  const followUpData = [
    {
      id: 1,
      date: "09/01/24",
      symptoms: "Masakit ulo",
      action: "Followed up on treatment efficacy",
    },
    {
      id: 2,
      date: "09/02/24",
      symptoms: "Sore throat",
      action: "Checked for improvement",
    },
    {
      id: 3,
      date: "09/03/24",
      symptoms: "Fever",
      action: "Scheduled follow-up visit",
    },
    {
      id: 4,
      date: null,
      symptoms: null,
      action: null,
    },
  ];

  const [vaccineData, setVaccineData] = useState([
    {
      id: 1,
      date: "06/02/24",
      vaccine: "Anti-rabies",
      remarks: "Sheeshhhh",
    },
    {
      id: 2,
      date: "07/15/24",
      vaccine: "COVID-19",
      remarks: "Booster dose",
    },
  ]);

  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [vaccineFormData, setVaccineFormData] = useState({
    id: null,
    date: "",
    vaccine: "",
    remarks: "",
  });
  const [vaccineModalType, setVaccineModalType] = useState("add");

  // Modal state functions
  const openVaccineModal = (type, vaccine) => {
    setVaccineModalType(type);
    setVaccineFormData(
      vaccine
        ? { ...vaccine }
        : { id: null, date: "", vaccine: "", remarks: "" }
    );
    setIsVaccineModalOpen(true);
  };

  const closeVaccineModal = () => {
    setIsVaccineModalOpen(false);
  };

  // Handle form data change
  const handleVaccineChange = (e) => {
    const { name, value } = e.target;
    setVaccineFormData({
      ...vaccineFormData,
      [name]: value,
    });
  };

  // Save function for adding or editing a vaccine
  const handleVaccineSave = () => {
    if (vaccineModalType === "add") {
      // Add new vaccine
      setVaccineData([
        ...vaccineData,
        { ...vaccineFormData, id: vaccineData.length + 1 },
      ]);
    } else {
      // Edit existing vaccine
      setVaccineData(
        vaccineData.map((vaccine) =>
          vaccine.id === vaccineFormData.id ? vaccineFormData : vaccine
        )
      );
    }
    closeVaccineModal();
  };
  return (
    <div className="adminProfile">
      <h2> Student Health Record Archive</h2>
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
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search..."
          />
          <SearchRoundedIcon />
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

        {/* Grade/Year Dropdown (Only for JHS and SHS) */}
        {selectedCategory && selectedCategory !== "College" && (
          <select
            onChange={(e) => handleGradeChange(e.target.value)}
            value={selectedGrade}
          >
            <option value="">
              Select {selectedCategory === "College" ? "Year" : "Grade"}
            </option>
            {Object.keys(studentData[selectedCategory] || {}).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        )}

        {/* Year Level Dropdown (Only for College) */}
        {selectedCategory === "College" && (
          <select
            onChange={(e) => handleYearChange(e.target.value)}
            value={selectedYear}
          >
            <option value="">Select Year Level</option>
            {Object.keys(studentData[selectedCategory] || {}).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}

        {/* Department Dropdown */}
        {selectedYear && (
          <select
            onChange={(e) => handleDepartmentChange(e.target.value)}
            value={selectedDepartment}
          >
            <option value="">Select Department</option>
            {Object.keys(studentData[selectedCategory][selectedYear] || {}).map(
              (department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              )
            )}
          </select>
        )}

        {/* Program Dropdown */}
        {selectedDepartment && (
          <select
            onChange={(e) => handleProgramChange(e.target.value)}
            value={selectedProgram}
          >
            <option value="">Select Program</option>
            {Object.keys(
              studentData[selectedCategory][selectedYear][selectedDepartment] ||
                {}
            ).map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        )}

        {/* Section Dropdown */}
        {selectedProgram && (
          <select
            onChange={(e) => handleSectionChange(e.target.value)}
            value={selectedSection}
          >
            <option value="">Select Section</option>
            {Object.keys(
              studentData[selectedCategory][selectedYear][selectedDepartment][
                selectedProgram
              ] || {}
            ).map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        )}

        {/* JHS Sections Dropdown */}
        {selectedGrade && selectedCategory === "JHS" && (
          <select
            onChange={(e) => handleSectionChange(e.target.value)}
            value={selectedSection}
          >
            <option value="">Select Section</option>
            {Object.keys(
              studentData[selectedCategory]?.[selectedGrade] || {}
            ).map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        )}

        {/* SHS Strand/Program Dropdown */}
        {selectedGrade && selectedCategory === "SHS" && (
          <select
            onChange={(e) => handleStrandOrProgramChange(e.target.value)}
            value={selectedStrandOrProgram}
          >
            <option value="">Select Strand</option>
            {Object.keys(
              studentData[selectedCategory]?.[selectedGrade] || {}
            ).map((strand) => (
              <option key={strand} value={strand}>
                {strand}
              </option>
            ))}
          </select>
        )}

        {/* SHS Sections Dropdown */}
        {selectedStrandOrProgram && selectedCategory === "SHS" && (
          <select
            onChange={(e) => handleSectionChange(e.target.value)}
            value={selectedSection}
          >
            <option value="">Select Section</option>
            {Object.keys(
              studentData[selectedCategory]?.[selectedGrade]?.[
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
              {(selectedCategory === "JHS"
                ? studentData[selectedCategory]?.[selectedGrade]?.[
                    selectedSection
                  ]
                : selectedCategory === "SHS"
                ? studentData[selectedCategory]?.[selectedGrade]?.[
                    selectedStrandOrProgram
                  ]?.[selectedSection]
                : studentData[selectedCategory]?.[selectedYear]?.[
                    selectedDepartment
                  ]?.[selectedProgram]?.[selectedSection]
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
                <p>BP : {selectedStudent.bp}</p>
                <p>Height : {selectedStudent.height}</p>
                <p>Weight : {selectedStudent.weight}</p>
                <p>BMI : {selectedStudent.bmi}</p>
                <p>Lungs : {selectedStudent.lungs}</p>
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
                <p>Extremities : {selectedStudent.extremities}</p>
                <p>Upper : {selectedStudent.upperExtremities}</p>
                <p>Lower : {selectedStudent.lowerExtremities}</p>
              </div>
            </div>
            <h3>Laboratory Examination</h3>
            <div className="column-three">
              <div className="student-data-v">
                <h4> VI. </h4>
                <div className="x-ray">
                  <h4> CHEST X-RAY </h4>
                </div>
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

            <div className="column-four">
              <div className="student-data-vii">
                <h3>Assessment</h3>
                <table className="table-style">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Symptoms/Complaints</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.symptoms}</td>
                        <td>{item.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="student-data-viii">
                <br /> <h3>Follow Up</h3>
                <table className="table-style">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Symptoms/Complaints</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followUpData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.symptoms}</td>
                        <td>{item.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="column-five">
              <div className="student-data-ix">
                <h3>Immunizations Administered</h3>
                <table className="vaccine-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Vaccine</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.vaccine}</td>
                        <td>{item.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="archive-staff"
              style={{ fontSize: "14px", margin: "1vw" }}
            >
              Last edited by: (staff name) <br />
              Time stamp: Mar 16 08:12:04
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Archive;