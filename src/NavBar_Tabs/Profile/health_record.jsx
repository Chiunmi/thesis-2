import ProfileLayout from "../../Components/layout_profile";
import "./admin_profile.css";
import jen from "./../../assets/jen.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

function HealthRecord() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStrand, setSelectedStrand] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchName, setSearchName] = useState("");

  const resetSelections = () => {
    setSelectedGrade("");
    setSelectedStrand("");
    setSelectedCourse("");
    setSelectedSection("");
    setSelectedDepartment("");
    setStudents([]);
    setSelectedStudent(null);
    setSearchName("");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    resetSelections();
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    setSelectedSection("");
    setStudents([]);
    setSelectedStudent(null);
  };

  const handleStrandChange = (strand) => {
    setSelectedStrand(strand);
    setSelectedSection("");
    setStudents([]);
    setSelectedStudent(null);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedSection("");
    setStudents([]);
    setSelectedStudent(null);
  };

  const handleDepartmentChange = (course) => {
    setSelectedDepartment(course);
    setSelectedCourse("");
    setSelectedSection("");
    setStudents([]);
    setSelectedStudent(null);
  };

  const handleSectionChange = async (section) => {
    setSelectedSection(section);
    setSelectedStudent(null);

    // Make API call to fetch filtered students
    try {
      const response = await axios.get("/medical", {
        params: {
          educationLevel: selectedCategory,
          yearlvl: selectedGrade,
          strand: selectedStrand,
          course: selectedCourse,
          section: section,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchProfile = async (studentId) => {
    try {
      const response = await axios.get(`/profile/${studentId}`);
      setSelectedStudent(response.data);
      console.log("Profile", selectedStudent);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const searchStudents = async () => {
    try {
      const response = await axios.get("/medical/search", {
        params: {
          name: searchName,
        },
      });
      setStudents(response.data);
      setSelectedCategory("");
      setSelectedGrade("");
      setSelectedCourse("");
      setSelectedSection("");
    } catch (error) {
      console.error("Error searching students:", error);
    }
  };

  const [isScanBMIModalOpen, setScanBMIModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'
  const [formData, setFormData] = useState({});
  const [followUpFormData, setFollowUpFormData] = useState({});

  const openAddModal = () => {
    setFormData({ complaints: "", actions: "" });
    setModalType("add");
    setIsModalOpen(true);
  };

  const openEditAssessmentModal = (item) => {
    setFormData({
      _id: item._id,
      complaints: `${item.complaints}`,
      actions: `${item.actions}`,
    });
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openAddFollowUpModal = (item) => {
    setFollowUpFormData({ _id: item._id, complaints: "", actions: "" });
    setModalType("followUpAdd");
    setIsModalOpen(true);
  };

  const openEditFollowUpModal = (item) => {
    setFollowUpFormData({
      _id: item._id,
      followUpComplaints: item.followUps.followUpComplaints,
      followUpActions: item.followUps.followUpActions,
    });
    setModalType("followUpEdit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFollowUpChange = (e) => {
    const { name, value } = e.target;
    setFollowUpFormData({
      ...followUpFormData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (modalType === "add") {
      try {
        const response = await axios.post(`/medical/assessment`, {
          medicalInfoId: selectedStudent.medical._id, // Replace with the actual user ID
          complaints: formData.complaints,
          actions: formData.actions,
        });
        toast.success("Student assessment added successfully");
        // Fetch the updated list of assessments
        const updatedStudentResponse = await axios.get(
          `/profile/${selectedStudent.medical.userId}`
        );
        const updatedStudent = updatedStudentResponse.data;

        // Update the selectedStudent state with the new assessments
        setSelectedStudent((prev) => ({
          ...prev,
          assessment: updatedStudent.assessment,
        }));
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    } else if (modalType === "edit") {
      try {
        const response = await axios.patch(
          `/medical/assessment/${formData._id}`,
          formData
        );

        toast.success("Student edited successfully");

        const updatedStudentResponse = await axios.get(
          `/profile/${selectedStudent.medical.userId}`
        );
        const updatedStudent = updatedStudentResponse.data;

        // Update the selectedStudent state with the new assessments
        setSelectedStudent((prev) => ({
          ...prev,
          assessment: updatedStudent.assessment,
        }));
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    } else if (modalType === "followUpAdd") {
      try {
        const response = await axios.patch(
          `/medical/assessment/${followUpFormData._id}/followup`,
          {
            followUpActions: followUpFormData.followUpActions,
            followUpComplaints: followUpFormData.followUpComplaints,
          }
        );
        const updatedStudentResponse = await axios.get(
          `/profile/${selectedStudent.medical.userId}`
        );
        const updatedStudent = updatedStudentResponse.data;
        setSelectedStudent((prev) => ({
          ...prev,
          assessment: updatedStudent.assessment,
        }));
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    } else if (modalType === "followUpEdit") {
      try {
        console.log("followUpFormData", followUpFormData);
        const response = await axios.patch(
          `/medical/assessment/${followUpFormData._id}/followup/update`,
          {
            followUpActions: followUpFormData.followUpActions,
            followUpComplaints: followUpFormData.followUpComplaints,
          }
        );

        const updatedStudentResponse = await axios.get(
          `/profile/${selectedStudent.medical.userId}`
        );
        const updatedStudent = updatedStudentResponse.data;
        setSelectedStudent((prev) => ({
          ...prev,
          assessment: updatedStudent.assessment,
        }));
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    }
    closeModal();
  };

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [studentFormData, setStudentFormData] = useState({});

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
    setStudentFormData(selectedStudent.medical);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const handleStudentFormDataChange = (event) => {
    const { name, value, type } = event.target;

    setStudentFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value === "true" : value, // Convert radio "true"/"false" to Boolean, leave other inputs as they are
    }));
  };

  const handleStudentSave = async () => {
    try {
      const response = await axios.patch(
        `/medical/${studentFormData._id}`,
        studentFormData
      );

      setSelectedStudent((prev) => ({
        ...prev,
        medical: {
          ...prev.medical,
          ...studentFormData,
        },
      }));

      setEditProfileModalOpen(false);
      toast.success("Student information updated successfully");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [vaccineFormData, setVaccineFormData] = useState({});
  const [vaccineModalType, setVaccineModalType] = useState("");

  // Modal state functions

  const openVaccineModal = () => {
    setVaccineModalType("add");
    setVaccineFormData({ vaccine: "", remarks: "" });
    setIsVaccineModalOpen(true);
  };

  const openEdiVaccineModal = (item) => {
    setVaccineFormData({
      _id: item._id,
      vaccine: `${item.vaccine}`,
      remarks: `${item.remarks}`,
    });
    setVaccineModalType("edit");
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
  const handleVaccineSave = async () => {
    if (vaccineModalType === "add") {
      try {
        const response = await axios.post(`/medical/immunization`, {
          medicalInfoId: selectedStudent.medical._id, // Replace with the actual user ID
          vaccine: vaccineFormData.vaccine,
          remarks: vaccineFormData.remarks,
        });
        toast.success("Student immunization added successfully");
        // Fetch the updated list of assessments
        const updatedStudentResponse = await axios.get(
          `/profile/${selectedStudent.medical.userId}`
        );
        const updatedStudent = updatedStudentResponse.data;

        // Update the selectedStudent state with the new assessments
        setSelectedStudent((prev) => ({
          ...prev,
          immunization: updatedStudent.immunization,
        }));
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    } else {
      try {
        const response = await axios.patch(
          `/medical/immunization/${vaccineFormData._id}`,
          vaccineFormData
        );

        toast.success("Student edited immunization successfully");

        const updatedStudentResponse = await axios.get(
          `/profile/${selectedStudent.medical.userId}`
        );
        const updatedStudent = updatedStudentResponse.data;

        // Update the selectedStudent state with the new assessments
        setSelectedStudent((prev) => ({
          ...prev,
          immunization: updatedStudent.immunization,
        }));
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
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
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <button
            onClick={() => searchStudents()}
            disabled={!searchName.trim()}
          >
            {" "}
            <SearchRoundedIcon />
          </button>
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

        {selectedCategory && (
          <select
            onChange={(e) => handleGradeChange(e.target.value)}
            value={selectedGrade}
          >
            <option value="">Select Grade Level</option>
            {selectedCategory === "JHS" &&
              ["7", "8", "9", "10"].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            {selectedCategory === "SHS" &&
              ["11", "12"].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            {selectedCategory === "College" &&
              ["1", "2", "3", "4"].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
          </select>
        )}

        {selectedCategory === "SHS" && selectedGrade && (
          <select
            onChange={(e) => handleStrandChange(e.target.value)}
            value={selectedStrand}
          >
            <option value="">Select Strand</option>
            {["STEM", "HUMMS", "ABM", "IT"].map((strand) => (
              <option key={strand} value={strand}>
                {strand}
              </option>
            ))}
          </select>
        )}

        {selectedCategory === "College" && selectedGrade && (
          <select
            onChange={(e) => handleDepartmentChange(e.target.value)}
            value={selectedDepartment}
          >
            <option value="">Select Department</option>
            {["COI", "YES"].map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        )}

        {selectedCategory === "College" &&
          selectedGrade &&
          selectedDepartment && (
            <select
              onChange={(e) => handleCourseChange(e.target.value)}
              value={selectedCourse}
            >
              <option value="">Select Course</option>
              {["BSCS", "BSA", "BSIT", "BSE"].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          )}

        {((selectedCategory === "JHS" && selectedGrade) ||
          (selectedCategory === "SHS" && selectedStrand) ||
          (selectedCategory === "College" && selectedCourse)) && (
          <select
            onChange={(e) => handleSectionChange(e.target.value)}
            value={selectedSection}
          >
            <option value="">Select Section</option>
            {["A", "B", "C", "D"].map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        )}

        {selectedSection && students.length === 0 ? (
          <p>No students</p>
        ) : students.length > 0 && !selectedStudent ? (
          <div>
            <h3>Filtered Students:</h3>
            <ul>
              {students.map((student, index) => (
                <li
                  key={index}
                  onClick={() => fetchProfile(student.personal.userId)}
                >
                  {student.personal.firstName} {student.personal.lastname} (ID:{" "}
                  {student.personal.userId})
                </li>
              ))}
            </ul>
          </div>
        ) : null}

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
                  {selectedStudent.education.yearlvl +
                    selectedStudent.education.section}
                </h3>
              </div>
            </div>

            <div className="column-one">
              <div className="student-data-i">
                <h3>{selectedStudent.name}</h3>
                <div className="archive-student-pic">
                  <img
                    src={selectedStudent.pfp ? selectedStudent.pfp : jen}
                    alt="this is a pfp"
                    className="jen"
                  />
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
                        paddingTop: "185vh",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        border: "none",
                        overflowY: "auto",
                      },
                    }}
                  >
                    <div className="edit-profile-modal">
                      <h3>Edit Profile</h3>
                      <form>
                        <h4>II. Illnesses Involving Systems</h4>
                        <label>Respiratory: </label>
                        <input
                          type="text"
                          name="respiratory"
                          value={studentFormData.respiratory}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Digestive: </label>
                        <input
                          type="text"
                          name="digestive"
                          value={studentFormData.digestive}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Nervous: </label>
                        <input
                          type="text"
                          name="nervous"
                          value={studentFormData.nervous}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Excretory: </label>
                        <input
                          type="text"
                          name="excretory"
                          value={studentFormData.excretory}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Endocrine: </label>
                        <input
                          type="text"
                          name="endocrine"
                          value={studentFormData.endocrine}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Circulatory: </label>
                        <input
                          type="text"
                          name="circulatory"
                          value={studentFormData.circulatory}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Skeletal: </label>
                        <input
                          type="text"
                          name="skeletal"
                          value={studentFormData.skeletal}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Muscular: </label>
                        <input
                          type="text"
                          name="muscular"
                          value={studentFormData.muscular}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Reproductive: </label>
                        <input
                          type="text"
                          name="reproductive"
                          value={studentFormData.reproductive}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Lymphatic: </label>
                        <input
                          type="text"
                          name="lymphatic"
                          value={studentFormData.lymphatic}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>III. Habits and Allergies</h4>
                        <label>Do you smoke?: </label>
                        <input
                          type="radio"
                          name="smoke"
                          value="true"
                          checked={studentFormData.smoke === true}
                          onChange={handleStudentFormDataChange}
                        />
                        Yes
                        <input
                          type="radio"
                          name="smoke"
                          value="false"
                          checked={studentFormData.smoke === false}
                          onChange={handleStudentFormDataChange}
                        />
                        No
                        <br />
                        <label>Do you drink?: </label>
                        <input
                          type="radio"
                          name="drink"
                          value="true"
                          checked={studentFormData.drink === true}
                          onChange={handleStudentFormDataChange}
                        />
                        Yes
                        <input
                          type="radio"
                          name="drink"
                          value="false"
                          checked={studentFormData.drink === false}
                          onChange={handleStudentFormDataChange}
                        />
                        No
                        <br />
                        <label>Allergy?: </label>
                        <input
                          type="text"
                          name="allergy"
                          value={studentFormData.allergy}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>If so, specify: </label>
                        <input
                          type="text"
                          name="specificAllergy"
                          value={studentFormData.specificAllergy}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>IV. Physical Examinations</h4>
                        <label>Eyes: </label>
                        <input
                          type="text"
                          name="eyes"
                          value={studentFormData.eyes}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Ear: </label>
                        <input
                          type="text"
                          name="ear"
                          value={studentFormData.ear}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Nose: </label>
                        <input
                          type="text"
                          name="nose"
                          value={studentFormData.nose}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Throat: </label>
                        <input
                          type="text"
                          name="throat"
                          value={studentFormData.throat}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Tonsils: </label>
                        <input
                          type="text"
                          name="tonsils"
                          value={studentFormData.tonsils}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Teeth: </label>
                        <input
                          type="text"
                          name="teeth"
                          value={studentFormData.teeth}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Tongue: </label>
                        <input
                          type="text"
                          name="tongue"
                          value={studentFormData.tongue}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Neck: </label>
                        <input
                          type="text"
                          name="neck"
                          value={studentFormData.neck}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Thyroids: </label>
                        <input
                          type="text"
                          name="thyroids"
                          value={studentFormData.thyroids}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Cervical Glands: </label>
                        <input
                          type="text"
                          name="cervicalGlands"
                          value={studentFormData.cervicalGlands}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>V. Chest and Cardiovascular System</h4>
                        <label>Chest: </label>
                        <input
                          type="text"
                          name="chest"
                          value={studentFormData.chest}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Contour: </label>
                        <input
                          type="text"
                          name="contour"
                          value={studentFormData.contour}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Heart: </label>
                        <input
                          type="text"
                          name="heart"
                          value={studentFormData.heart}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Rate: </label>
                        <input
                          type="text"
                          name="rate"
                          value={studentFormData.rate}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Rhythm: </label>
                        <input
                          type="text"
                          name="rhythm"
                          value={studentFormData.rhythm}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>BP: </label>
                        <input
                          type="text"
                          name="bp"
                          value={studentFormData.bp}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Height: </label>
                        <input
                          type="text"
                          name="height"
                          value={studentFormData.height}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Weight: </label>
                        <input
                          type="text"
                          name="weight"
                          value={studentFormData.weight}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>BMI: </label>
                        <input
                          type="text"
                          name="bmi"
                          value={studentFormData.bmi}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Lungs: </label>
                        <input
                          type="text"
                          name="lungs"
                          value={studentFormData.lungs}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>VI. Abdomen</h4>
                        <label>Abdomen: </label>
                        <input
                          type="text"
                          name="abdomen"
                          value={studentFormData.abdomen}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Contour: </label>
                        <input
                          type="text"
                          name="ABcontour"
                          value={studentFormData.ABcontour}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Liver: </label>
                        <input
                          type="text"
                          name="liver"
                          value={studentFormData.liver}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Spleen: </label>
                        <input
                          type="text"
                          name="spleen"
                          value={studentFormData.spleen}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Kidneys: </label>
                        <input
                          type="text"
                          name="kidneys"
                          value={studentFormData.kidneys}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>VII. Extremities</h4>
                        <label>Extremities: </label>
                        <input
                          type="text"
                          name="extremities"
                          value={studentFormData.extremities}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Upper Extremities: </label>
                        <input
                          type="text"
                          name="upperExtremities"
                          value={studentFormData.upperExtremities}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Lower Extremities: </label>
                        <input
                          type="text"
                          name="lowerExtremities"
                          value={studentFormData.lowerExtremities}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>VIII. Laboratory Examination</h4>
                        <label>Blood Chemistry: </label>
                        <input
                          type="text"
                          name="bloodChemistry"
                          value={studentFormData.bloodChemistry}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>CBC: </label>
                        <input
                          type="text"
                          name="cbc"
                          value={studentFormData.cbc}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Urinalysis: </label>
                        <input
                          type="text"
                          name="urinalysis"
                          value={studentFormData.urinalysis}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <label>Fecalysis: </label>
                        <input
                          type="text"
                          name="fecalysis"
                          value={studentFormData.fecalysis}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4> IX. Diagnostic Procedures</h4>
                        <label>Chest X-Ray Findings: </label>
                        <input
                          type="text"
                          name="chestXray"
                          value={studentFormData.chestXray}
                          onChange={handleStudentFormDataChange}
                        />
                        <br />
                        <h4>X. Others</h4>
                        <input
                          type="text"
                          name="others"
                          value={studentFormData.others}
                          onChange={handleStudentFormDataChange}
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
                        <button
                          className="save-btn"
                          onClick={handleStudentSave}
                        >
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
                <p>
                  {" "}
                  Full Name:{" "}
                  {selectedStudent.personal.firstName +
                    " " +
                    selectedStudent.personal.lastName}
                </p>
                <p>
                  Gr./Section:{" "}
                  {selectedStudent.education.yearlvl +
                    " " +
                    selectedStudent.education.section}
                </p>
                <p>Civil Status: {selectedStudent.personal.civilStatus}</p>
                <p>Birthdate: {selectedStudent.personal.dateOfBirth}</p>
                <p>Address: {selectedStudent.personal.address}</p>
                <p>Tel. No.: {selectedStudent.personal.telNo}</p>
                <p>Religion: {selectedStudent.personal.religion}</p>
                <p>Guardian: {selectedStudent.personal.guardian}</p>
                <p>
                  Guradian's Address: {selectedStudent.personal.guardianAddress}
                </p>
                <p>
                  {" "}
                  Guardian's Number: {selectedStudent.personal.guardianTelNo}
                </p>
                <p> Department: {selectedStudent.personal.department}</p>
              </div>
              <div className="student-data-ii">
                <h4> II. </h4>
                <h4>
                  Have you ever suffered illnesses involving any of the
                  following systems? Specify.
                </h4>
                <p>Respiratory : {selectedStudent.medical.respiratory}</p>
                <p>Digestive : {selectedStudent.medical.digestive}</p>
                <p>Nervous : {selectedStudent.medical.nervous}</p>
                <p>Excretory: {selectedStudent.medical.excretory}</p>
                <p>Endocrine : {selectedStudent.medical.endocrine}</p>
                <p>Circulatory : {selectedStudent.medical.circulatory}</p>
                <p>Skeletal : {selectedStudent.medical.skeletal}</p>
                <p>Muscular : {selectedStudent.medical.muscular}</p>
                <p>Reproductive : {selectedStudent.medical.reproductive}</p>
                <p>Lymphatic : {selectedStudent.medical.lymphatic}</p>
                <br />
                <h4> III. </h4>
                <p>
                  Do you smoke? : {selectedStudent.medical.smoke ? "Yes" : "No"}
                </p>
                <p>
                  Do you drink? : {selectedStudent.medical.drink ? "Yes" : "No"}
                </p>
                <p>
                  Allergy? :
                  {selectedStudent.medical.allergy === "N/A"
                    ? selectedStudent.medical.specificAllergy
                    : selectedStudent.medical.allergy}
                </p>
              </div>
            </div>
            <h3>Physical Examination</h3>
            <div className="column-two">
              <div className="student-data-iii">
                <h4> IV. </h4>
                <p>Eyes : {selectedStudent.medical.eyes}</p>
                <p>Ear : {selectedStudent.medical.ear}</p>
                <p>Nose : {selectedStudent.medical.nose}</p>
                <p>Throat: {selectedStudent.medical.throat}</p>
                <p>Tonsils : {selectedStudent.medical.tonsils}</p>
                <p>Teeth : {selectedStudent.medical.teeth}</p>
                <p>Tongue : {selectedStudent.medical.tongue}</p>
                <p>Neck : {selectedStudent.medical.neck}</p>
                <p>Thyroids : {selectedStudent.medical.thyroids}</p>
                <p>
                  Cervical Glands : {selectedStudent.medical.cervicalGlands}
                </p>
                <br />
                <h4> V. </h4>

                <p>Chest : {selectedStudent.medical.chest}</p>
                <p>Contour : {selectedStudent.medical.contour}</p>
                <p>Heart : {selectedStudent.medical.heart}</p>
                <p>Rate : {selectedStudent.medical.rate}</p>
                <p>Rhythm : {selectedStudent.medical.rhythm}</p>
                <p>BP : {selectedStudent.medical.bp}</p>
                <p>Height : {selectedStudent.medical.height}</p>
                <p>Weight : {selectedStudent.medical.weight}</p>
                <p>BMI : {selectedStudent.medical.bmi}</p>
                <p>Lungs : {selectedStudent.medical.lungs}</p>
              </div>

              <div className="student-data-iv">
                <h4> VI. </h4>

                <p>Abdomen : {selectedStudent.medical.abdomen}</p>
                <p>Contour : {selectedStudent.medical.ABcontour}</p>
                <p>Liver : {selectedStudent.medical.liver}</p>
                <p>Spleen : {selectedStudent.medical.spleen}</p>
                <p>Kidneys : {selectedStudent.medical.kidneys}</p>
                <br />
                <h4> VII. </h4>
                <p>Extremities : {selectedStudent.medical.extremities}</p>
                <p>Upper : {selectedStudent.medical.upperExtremities}</p>
                <p>Lower : {selectedStudent.medical.lowerExtremities}</p>
              </div>
            </div>
            <h3>Laboratory Examination</h3>
            <div className="column-three">
              <div className="student-data-v1">
                <h3>Laboratory Examination</h3>
                <h4> VIII. </h4>
                <p>Blood Chemistry: {selectedStudent.medical.bloodChemistry}</p>
                <p> CBC: {selectedStudent.medical.cbc} </p>
                <p> Urinalysis: {selectedStudent.medical.urinalysis}</p>
                <p> Fecalysis: {selectedStudent.medical.fecalysis}</p>
              </div>
              <div className="student-data-v2">
                <h3>Diagnostic Procedures</h3>
                <h4> IX. </h4>
                <p>Chest X-ray Findings: {selectedStudent.medical.chestXray}</p>
              </div>
              <div className="student-data-v3">
                <h3>Others(ECG, Ultrasound, etc.)</h3>
                <h4> X. </h4>
                <p> {selectedStudent.medical.others}</p>
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
                    {selectedStudent.assessment &&
                    selectedStudent.assessment.length > 0 ? (
                      selectedStudent.assessment.map((item) => (
                        <tr key={item._id}>
                          <td>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
                          <td>{item.complaints}</td>
                          <td>{item.actions}</td>
                          <td>
                            {
                              <DriveFileRenameOutlineRoundedIcon
                                style={{ color: "green", cursor: "pointer" }}
                                onClick={() => openEditAssessmentModal(item)}
                              />
                            }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No assessments available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="student-data-viii">
                <h3>Follow-Up</h3>
                <table className="table-style">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Follow-Up Complaints</th>
                      <th>Follow-Up Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.assessment &&
                    selectedStudent.assessment.length > 0 ? (
                      selectedStudent.assessment.map((item) =>
                        item.followUps ? (
                          <tr key={`follow-up-${item._id}`}>
                            <td>
                              {new Date(
                                item.followUps.date
                              ).toLocaleDateString()}
                            </td>
                            <td>{item.followUps.followUpComplaints}</td>
                            <td>{item.followUps.followUpActions}</td>
                            <td>
                              <DriveFileRenameOutlineRoundedIcon
                                style={{ color: "green", cursor: "pointer" }}
                                onClick={() => openEditFollowUpModal(item)}
                              />
                            </td>
                          </tr>
                        ) : (
                          <tr key={`no-follow-up-${item._id}`}>
                            <td colSpan="3">No follow-ups available</td>
                            <td>
                              <PostAddRoundedIcon
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => openAddFollowUpModal(item)}
                              />
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="4">No assessments available</td>
                      </tr>
                    )}
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
                        : modalType === "followUpAdd"
                        ? "Add Follow-Up"
                        : modalType === "followUpEdit"
                        ? "Edit Follow-Up"
                        : "Edit Assessment"}
                    </h3>
                    {(modalType === "followUpAdd" ||
                      modalType === "followUpEdit") && (
                      <>
                        <label>Follow-Up Complaints:</label>
                        <input
                          type="text"
                          name="followUpComplaints"
                          value={followUpFormData.followUpComplaints || ""}
                          onChange={handleFollowUpChange}
                          required
                        />
                        <label>Follow-Up Actions:</label>
                        <input
                          type="text"
                          name="followUpActions"
                          value={followUpFormData.followUpActions || ""}
                          onChange={handleFollowUpChange}
                          required
                        />
                      </>
                    )}
                    {modalType === "add" || modalType === "edit" ? (
                      <>
                        <label>Symptoms/Complaints:</label>
                        <input
                          type="text"
                          name="complaints"
                          value={formData.complaints || ""}
                          onChange={handleChange}
                          required
                        />
                        <label>Actions:</label>
                        <input
                          type="text"
                          name="actions"
                          value={formData.actions || ""}
                          onChange={handleChange}
                          required
                        />
                      </>
                    ) : null}
                  </div>
                  <div className="stock-btn">
                    <button className="close-btn" onClick={closeModal}>
                      Close
                    </button>
                    <button
                      className={
                        modalType === "add" ||
                        modalType === "followUpAdd" ||
                        modalType === "followUpEdit"
                          ? "save-assessment-btn"
                          : "edit-assessment-btn"
                      }
                      onClick={handleSave}
                    >
                      {modalType === "add" ||
                      modalType === "followUpAdd" ||
                      modalType === "followUpEdit"
                        ? "Add"
                        : "Save"}
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
                    {selectedStudent.immunization &&
                    selectedStudent.immunization.length > 0 ? (
                      selectedStudent.immunization.map((item) => (
                        <tr key={item._id}>
                          <td>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
                          <td>{item.vaccine}</td>
                          <td>{item.remarks}</td>
                          <td>
                            {
                              <DriveFileRenameOutlineRoundedIcon
                                style={{ color: "green", cursor: "pointer" }}
                                onClick={() => openEdiVaccineModal(item)}
                              />
                            }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No assessments available</td>
                      </tr>
                    )}
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
