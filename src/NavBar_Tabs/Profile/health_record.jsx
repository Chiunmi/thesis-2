import ProfileLayout from "../../Components/layout_profile";
import "./admin_profile.css";
import jen from "./../../assets/jen.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          educationLevel: "JHS",
          yearlvl: "7",
          section: "G7-Counsel",
          strand: "ABM",
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
          psychological: "N/A",
          specifyPsychological: "N/A",

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

function HealthRecord() {
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
      <div className="back-to-admin">
        <ArrowBackRoundedIcon style={{ color: "white", marginTop: "0.3vh" }} />
        <Link to="/admin" className="back-to-admin-btn-link">
          <h3 className="back-to-admin-btn">Back to Admin</h3>
        </Link>
      </div>
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

                <div className="profile-btn">
                  <button
                    className="edit-profile"
                    onClick={openEditProfileModal}
                  >
                    Edit Profile
                  </button>
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
                        height: "10vh",
                        maxHeight: "fit-content",
                        margin: "auto",
                        marginTop: "5vh",
                        paddingTop: "320vh",
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
                        <div className="form-group">
                          <label>Education Level: </label>
                          <select
                            name="educationLevel"
                            value={selectedStudent.educationLevel}
                            onChange={handleChange}
                          >
                            <option value="">Select Education Level</option>
                            <option value="JHS">JHS</option>
                            <option value="SHS">SHS</option>
                            <option value="College">College</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Department: </label>
                          <select
                            name="department"
                            value={selectedStudent.department}
                            onChange={handleChange}
                          >
                            <option value="">Select Department</option>
                            <option value="CBAA">CBAA</option>
                            <option value="CHTM">CHTM</option>
                            <option value="COI">COI</option>
                            <option value="CET">CET</option>
                            <option value="COE">COE</option>
                            <option value="CASSW">CASSW</option>
                            <option value="CNAH">CNAH</option>
                            <option value="COCRIM">COCRIM</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Strand/Program: </label>
                          <select
                            name="strand"
                            value={selectedStudent.strand}
                            onChange={handleChange}
                          >
                            <option value="">Select Strand/Program</option>
                            <option value="STEM">STEM</option>
                            <option value="ABM">ABM</option>
                            <option value="HUMSS">HUMSS</option>
                            <option value="TVL-ICT">TVL-ICT</option>
                            <option value="TVL-HE">TVL-HE</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Grade/Year: </label>
                          <select
                            name="yearlvl"
                            value={selectedStudent.yearlvl}
                            onChange={handleChange}
                          >
                            <option value="">Select Grade/Year</option>
                            <option value="grade 7">Grade 7</option>
                            <option value="grade 8">Grade 8</option>
                            <option value="grade 9">Grade 9</option>
                            <option value="grade 10">Grade 10</option>
                            <option value="grade 11">Grade 11</option>
                            <option value="grade 12">Grade 12</option>
                            <option value="1st year">1st Year</option>
                            <option value="2nd year">2nd Year</option>
                            <option value="3rd year">3rd Year</option>
                            <option value="4th year">4th Year</option>
                            <option value="5th year">5th Year</option>
                          </select>
                        </div>
                        <label>Section: </label>
                        <input
                          type="text"
                          name="section"
                          value={selectedStudent.section}
                          onChange={handleChange}
                        />
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
                        <br />
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
                        <h4>IV. Physical Examinations</h4>
                        <label>Eyes: </label>
                        <input
                          type="text"
                          name="eyes"
                          value={selectedStudent.eyes}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Ear: </label>
                        <input
                          type="text"
                          name="ear"
                          value={selectedStudent.ear}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Nose: </label>
                        <input
                          type="text"
                          name="nose"
                          value={selectedStudent.nose}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Throat: </label>
                        <input
                          type="text"
                          name="throat"
                          value={selectedStudent.throat}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Tonsils: </label>
                        <input
                          type="text"
                          name="tonsils"
                          value={selectedStudent.tonsils}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Teeth: </label>
                        <input
                          type="text"
                          name="teeth"
                          value={selectedStudent.teeth}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Tongue: </label>
                        <input
                          type="text"
                          name="tongue"
                          value={selectedStudent.tongue}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Neck: </label>
                        <input
                          type="text"
                          name="neck"
                          value={selectedStudent.neck}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Thyroids: </label>
                        <input
                          type="text"
                          name="thyroids"
                          value={selectedStudent.thyroids}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Cervical Glands: </label>
                        <input
                          type="text"
                          name="cervicalGlands"
                          value={selectedStudent.cervicalGlands}
                          onChange={handleChange}
                        />
                        <br />
                        <h4>V. Chest and Cardiovascular System</h4>
                        <label>Chest: </label>
                        <input
                          type="text"
                          name="chest"
                          value={selectedStudent.chest}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Contour: </label>
                        <input
                          type="text"
                          name="contour"
                          value={selectedStudent.contour}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Heart: </label>
                        <input
                          type="text"
                          name="heart"
                          value={selectedStudent.heart}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Rate: </label>
                        <input
                          type="text"
                          name="rate"
                          value={selectedStudent.rate}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Rhythm: </label>
                        <input
                          type="text"
                          name="rhythm"
                          value={selectedStudent.rhythm}
                          onChange={handleChange}
                        />
                        <br />
                        <label>BP: </label>
                        <input
                          type="text"
                          name="bp"
                          value={selectedStudent.bp}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Height: </label>
                        <input
                          type="text"
                          name="height"
                          value={selectedStudent.height}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Weight: </label>
                        <input
                          type="text"
                          name="weight"
                          value={selectedStudent.weight}
                          onChange={handleChange}
                        />
                        <br />
                        <label>BMI: </label>
                        <input
                          type="text"
                          name="bmi"
                          value={selectedStudent.bmi}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Lungs: </label>
                        <input
                          type="text"
                          name="lungs"
                          value={selectedStudent.lungs}
                          onChange={handleChange}
                        />
                        <br />
                        <h4>VI. Abdomen</h4>
                        <label>Abdomen: </label>
                        <input
                          type="text"
                          name="abdomen"
                          value={selectedStudent.abdomen}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Contour: </label>
                        <input
                          type="text"
                          name="contour"
                          value={selectedStudent.contour}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Liver: </label>
                        <input
                          type="text"
                          name="liver"
                          value={selectedStudent.liver}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Spleen: </label>
                        <input
                          type="text"
                          name="spleen"
                          value={selectedStudent.spleen}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Kidneys: </label>
                        <input
                          type="text"
                          name="kidneys"
                          value={selectedStudent.kidneys}
                          onChange={handleChange}
                        />
                        <br />
                        <h4>VII. Extremities</h4>
                        <label>Extremities: </label>
                        <input
                          type="text"
                          name="extremities"
                          value={selectedStudent.extremities}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Upper Extremities: </label>
                        <input
                          type="text"
                          name="upperExtremities"
                          value={selectedStudent.upperExtremities}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Lower Extremities: </label>
                        <input
                          type="text"
                          name="lowerExtremities"
                          value={selectedStudent.lowerExtremities}
                          onChange={handleChange}
                        />
                        <br />
                        <h4>VIII. Laboratory Examination</h4>
                        <label>Blood Chemistry: </label>
                        <input
                          type="text"
                          name="bloodChemistry"
                          value={selectedStudent.bloodChemistry}
                          onChange={handleChange}
                        />
                        <br />
                        <label>CBC: </label>
                        <input
                          type="text"
                          name="cbc"
                          value={selectedStudent.cbc}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Urinalysis: </label>
                        <input
                          type="text"
                          name="urinalysis"
                          value={selectedStudent.urinalysis}
                          onChange={handleChange}
                        />
                        <br />
                        <label>Fecalysis: </label>
                        <input
                          type="text"
                          name="fecalysis"
                          value={selectedStudent.fecalysis}
                          onChange={handleChange}
                        />
                        <br />
                        <h4> IX. Diagnostic Procedures</h4>
                        <label>Chest X-Ray Findings: </label>
                        <input
                          type="text"
                          name="chestXray"
                          value={selectedStudent.chestXray}
                          onChange={handleChange}
                        />
                        <br />
                        <h4>X. Others</h4>
                        <input
                          type="text"
                          name="others"
                          value={selectedStudent.others}
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

                  <button
                    onClick={() => setScanBMIModalOpen(true)}
                    className="button-bmi"
                  >
                    Scan BMI
                  </button>
                </div>
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
                  <div className="scan-bmi-modal">
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
                <p>Education Level: {selectedStudent.educationLevel}</p>
                <p>Grade/Year: {selectedStudent.yearlvl}</p>
                <p>Section: {selectedStudent.section}</p>
                <p>Strand/Program: {selectedStudent.strand}</p>
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
                <p>Psychological : {selectedStudent.psychological}</p>
                <p>If so, specify? : {selectedStudent.specifyPsychological}</p>
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

            <div className="column-three">
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
                <p> Chest X-ray Findings: {selectedStudent.chestXray}</p>
              </div>
              <div className="student-data-v3">
                <h3>Others(ECG, Ultrasound, etc.)</h3>
                <h4> X. </h4>
                <p> {selectedStudent.others}</p>
              </div>
            </div>

            <div className="column-four">
              <div className="student-data-vii">
                <button onClick={openAddModal} className="add-assessment-btn">
                  Add
                </button>

                <h3>Assessment</h3>
                <table className="table-style">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Symptoms/Complaints</th>
                      <th>Action</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.symptoms}</td>
                        <td>{item.action}</td>
                        <td>
                          {isDetailsBlank(item) ? (
                            <PostAddRoundedIcon
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => openEditModal(item)}
                            />
                          ) : (
                            <DriveFileRenameOutlineRoundedIcon
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={() => openEditModal(item)}
                            />
                          )}
                        </td>
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
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followUpData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.symptoms}</td>
                        <td>{item.action}</td>
                        <td>
                          {isDetailsBlank(item) ? (
                            <PostAddRoundedIcon
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => openEditModal(item)}
                            />
                          ) : (
                            <DriveFileRenameOutlineRoundedIcon
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={() => openEditModal(item)}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    boxShadow: "none",
                  },
                  content: {
                    width: "700px",
                    height: "300px",
                    margin: "auto",
                    borderRadius: "24px",
                    border: "none",
                    backgroundColor: "#f8f8ff",
                    color: "black",
                  },
                }}
              >
                <div className="assessment-content">
                  <div className="assessment-modal">
                    <h3>
                      {modalType === "add"
                        ? "New Assessment"
                        : "Edit Assessment"}
                    </h3>
                    <label>Date:</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                    <label>Symptoms/Complaints:</label>
                    <input
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                    />
                    <label>Actions:</label>
                    <input
                      type="text"
                      name="action"
                      value={formData.action}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="stock-btn">
                    <button className="close-btn" onClick={closeModal}>
                      Close
                    </button>
                    <button
                      className={
                        modalType === "add"
                          ? "save-assessment-btn"
                          : "edit-assessment-btn"
                      }
                      onClick={handleSave}
                    >
                      {modalType === "add" ? "Add" : "Save"}
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="column-five">
              <div className="student-data-ix">
                <button
                  className="add-vaccine-btn"
                  onClick={() => openVaccineModal("add")}
                >
                  Add
                </button>
                <h3>Immunizations Administered</h3>
                <table className="vaccine-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Vaccine</th>
                      <th>Remarks</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.vaccine}</td>
                        <td>{item.remarks}</td>
                        <td>
                          <button
                            className="edit-vaccine-btn"
                            onClick={() => openVaccineModal("edit", item)}
                          >
                            <DriveFileRenameOutlineRoundedIcon
                              style={{ color: "green", cursor: "pointer" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal
                  isOpen={isVaccineModalOpen}
                  onRequestClose={closeVaccineModal}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1,
                      boxShadow: "none",
                    },
                    content: {
                      width: "700px",
                      height: "300px",
                      margin: "auto",
                      borderRadius: "24px",
                      border: "none",
                      backgroundColor: "#f8f8ff",
                      color: "black",
                    },
                  }}
                >
                  <div className="vaccine-content">
                    <div className="vaccine-modal">
                      <h3>
                        {vaccineModalType === "add"
                          ? "Add Vaccine"
                          : "Edit Vaccine"}
                      </h3>
                      <label>Date:</label>
                      <input
                        type="date"
                        name="date"
                        value={vaccineFormData.date}
                        onChange={handleVaccineChange}
                      />
                      <label>Vaccine:</label>
                      <input
                        type="text"
                        name="vaccine"
                        value={vaccineFormData.vaccine}
                        onChange={handleVaccineChange}
                      />
                      <label>Remarks:</label>
                      <input
                        type="text"
                        name="remarks"
                        value={vaccineFormData.remarks}
                        onChange={handleVaccineChange}
                      />
                    </div>
                    <div className="vaccine-btn">
                      <button className="close-btn" onClick={closeVaccineModal}>
                        Close
                      </button>
                      <button
                        className={
                          vaccineModalType === "add"
                            ? "save-vaccine-btn"
                            : "edit-vaccine-btn"
                        }
                        onClick={handleVaccineSave}
                      >
                        {vaccineModalType === "add" ? "Add" : "Save"}
                      </button>
                    </div>
                  </div>
                </Modal>
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

export default HealthRecord;
