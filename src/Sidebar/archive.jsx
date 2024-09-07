// import "./archive.css";
import jen from "./../assets/jen.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from "react-modal";


function Archive() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStrand, setSelectedStrand] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchName, setSearchName] = useState("");
  
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const resetSelections = () => {
      setSelectedGrade("");
      setSelectedStrand("");
      setSelectedCourse("");
      setSelectedSection("");
      setSelectedDepartment("");
      setStudents([]);
      setSelectedStudent(null);
      setSearchName('');
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
          const response = await axios.get('/medical', {
              params: {
                  educationLevel: selectedCategory,
                  yearlvl: selectedGrade,
                  strand: selectedStrand,
                  course: selectedCourse,
                  section: section
              }
          });
          setStudents(response.data);
      } catch (error) {
          console.error('Error fetching students:', error);
      }
  };

  const fetchProfile = async (studentId) => {
      try {
          const response = await axios.get(`/profile/${studentId}`);
          setSelectedStudent(response.data);
          console.log('Profile', selectedStudent);
      } catch (error) {
          console.error("Error fetching student profile:", error);
      }
  };

  const searchStudents = async () => {
      try {
          const response = await axios.get('/medical/search', {
              params: {
                  name: searchName
              }
          });
          setStudents(response.data);
          setSelectedCategory("");
          setSelectedGrade('');
          setSelectedCourse('');
          setSelectedSection('');
      } catch (error) {
          console.error('Error searching students:', error);
      }
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
          placeholder="Search by name" 
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
         
          <button 
                onClick={() => searchStudents()}
                disabled={!searchName.trim()}
                > <SearchRoundedIcon />
          </button>
        </div>
      </div>

      <div className="container">
        {/* Category Dropdown */}
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
            <option value="">Select Category</option>
            <option value="JHS">Junior High School</option>
            <option value="SHS">Senior High School</option>
            <option value="College">College</option>
        </select>

        {selectedCategory && (
          <select onChange={(e) => handleGradeChange(e.target.value)} value={selectedGrade}>
              <option value="">Select Grade Level</option>
              {selectedCategory === 'JHS' && ['7', '8', '9', '10'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
              ))}
              {selectedCategory === 'SHS' && ['11', '12'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
              ))}
              {selectedCategory === 'College' && ['1', '2', '3', '4'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
        )}

        {selectedCategory === 'SHS' && selectedGrade && (
          <select onChange={(e) => handleStrandChange(e.target.value)} value={selectedStrand}>
              <option value="">Select Strand</option>
              {['STEM', 'HUMMS', 'ABM', 'IT'].map(strand => (
                  <option key={strand} value={strand}>{strand}</option>
              ))}
          </select>
        )}

        {selectedCategory === 'College' && selectedGrade && (
          <select onChange={(e) => handleDepartmentChange(e.target.value)} value={selectedDepartment}>
              <option value="">Select Department</option>
              {['COI', 'YES'].map(course => (
                  <option key={course} value={course}>{course}</option>
              ))}
          </select>
        )}

        {selectedCategory === 'College' && selectedGrade && selectedDepartment && (
            <select onChange={(e) => handleCourseChange(e.target.value)} value={selectedCourse}>
                <option value="">Select Course</option>
                {['BSCS', 'BSA', 'BSIT', 'BSE'].map(course => (
                    <option key={course} value={course}>{course}</option>
                ))}
            </select>
        )}

        {((selectedCategory === 'JHS' && selectedGrade) || 
        (selectedCategory === 'SHS' && selectedStrand) || 
        (selectedCategory === 'College' && selectedCourse)) && (
            <select onChange={(e) => handleSectionChange(e.target.value)} value={selectedSection}>
                <option value="">Select Section</option>
                {['A', 'B', 'C', 'D'].map((section) => (
                    <option key={section} value={section}>{section}</option>
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
                              {student.personal.firstName} {student.personal.lastname} (ID: {student.personal.userId})
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
                  { selectedStudent.education.yearlvl + selectedStudent.education.section}
                </h3>
              </div>
            </div>

            <div className="column-one">
              <div className="student-data-i">
                <h3>{selectedStudent.name}</h3>
                <div className="archive-student-pic">
                  <img src={selectedStudent.pfp ? selectedStudent.pfp : jen} alt="this is a pfp" className="jen"/>
                </div>
                <h4> I. </h4>
                <p> Full Name: {selectedStudent.personal.firstName + " " + selectedStudent.personal.lastName}</p>
                <p>Gr./Section: {selectedStudent.education.yearlvl + " " + selectedStudent.education.section}</p>
                <p>Civil Status: {selectedStudent.personal.civilStatus}</p>
                <p>Birthdate: {selectedStudent.personal.dateOfBirth}</p>
                <p>Address: {selectedStudent.personal.address}</p>
                <p>Tel. No.: {selectedStudent.personal.telNo}</p>
                <p>Religion: {selectedStudent.personal.religion}</p>
                <p>Guardian: {selectedStudent.personal.guardian}</p>
                <p>Guradian's Address: {selectedStudent.personal.guardianAddress}</p>
                <p> Guardian's Number: {selectedStudent.personal.guardianTelNo}</p>
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
                <p>Do you smoke? : {selectedStudent.medical.smoke ? "Yes": "No"}</p>
                <p>Do you drink? : {selectedStudent.medical.drink ? "Yes": "No"}</p>
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
                <p>Cervical Glands : {selectedStudent.medical.cervicalGlands}</p>
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
                    {selectedStudent.assessment && selectedStudent.assessment.length > 0 ? (
                      selectedStudent.assessment.map((item) => (
                        <tr key={item._id}>
                          <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                          <td>{item.complaints}</td>
                          <td>{item.actions}</td>
                          <td>
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
                    {selectedStudent.assessment && selectedStudent.assessment.length > 0 ? (
                      selectedStudent.assessment.map((item) =>
                        item.followUps ? (
                          <tr key={`follow-up-${item._id}`}>
                            <td>{new Date(item.followUps.date).toLocaleDateString()}</td>
                            <td>{item.followUps.followUpComplaints}</td>
                            <td>{item.followUps.followUpActions}</td>
                          </tr>
                        ) : (
                          <tr key={`no-follow-up-${item._id}`}>
                            <td colSpan="3">No follow-ups available</td>                            
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {selectedStudent.immunization && selectedStudent.immunization.length > 0 ? (
                      selectedStudent.immunization.map((item) => (
                      <tr key={item._id}>
                        <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                        <td>{item.vaccine}</td>
                        <td>{item.remarks}</td>
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
            </div>

            <div
              className="archive-staff"
              style={{ fontSize: "14px", margin: "1vw" }}
            >
            <button onClick={handleOpenModal}>View Archive</button>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Document Archive</h3>
                  <ul>
                    {/* Placeholder content for archives */}
                    <li>Archive 1 - Edited by Staff A on Mar 15 08:12:04</li>
                    <li>Archive 2 - Edited by Staff B on Mar 14 08:12:04</li>
                    {/* Add more archives as needed */}
                  </ul>
                  <button onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Archive;