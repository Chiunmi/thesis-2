// import "./archive.css";
import jen from "./../assets/jen.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

function Archive() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStrand, setSelectedStrand] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [profile, setprofile] = useState(null);
  const [searchName, setSearchName] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [archiveData, setArchiveData] = useState(null);

  const handleOpenModal = (userId) => {
    setShowModal(true);
    fetchArchive(userId);
    console.log("userId", userId);
  };

  const handleCloseModal = () => setShowModal(false);

  const fetchArchive = async (userId) => {
    try {
      const response = await axios.get(`/archive/${userId}`);
      const archiveFetched = response.data;

      setArchiveData(archiveFetched);
      console.log("archive:", archiveFetched);
    } catch (error) {
      console.error("Failed to fetch archive:", error);
    }
  };

  const resetSelections = () => {
    setSelectedGrade("");
    setSelectedStrand("");
    setSelectedCourse("");
    setSelectedSection("");
    setSelectedDepartment("");
    setStudents([]);
    setprofile(null);
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
    setprofile(null);
  };

  const handleStrandChange = (strand) => {
    setSelectedStrand(strand);
    setSelectedSection("");
    setStudents([]);
    setprofile(null);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedSection("");
    setStudents([]);
    setprofile(null);
  };

  const handleDepartmentChange = (course) => {
    setSelectedDepartment(course);
    setSelectedCourse("");
    setSelectedSection("");
    setStudents([]);
    setprofile(null);
  };

  const handleSectionChange = async (section) => {
    setSelectedSection(section);
    setprofile(null);

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
      setprofile(response.data);
      console.log("Profile", profile);
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
        ) : students.length > 0 && !profile ? (
          <div>
            <h3>Filtered Students:</h3>
            <ul>
              {students.map((student, index) => (
                <li
                  key={index}
                  onClick={() => fetchProfile(student.personal?.userId)}
                >
                  {student.personal?.firstName} {student.personal?.lastname}{" "}
                  (ID: {student.personal?.userId})
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Display Selected Student Information */}
        {profile && (
          <div className="student-info">
            <div className="student-header">
              <div className="section">
                <ArrowBackRoundedIcon style={{ marginTop: "1vh" }} />
                <h3
                  className="selected-section-header"
                  onClick={() => setprofile(null)}
                >
                  {profile.education?.yearlvl + profile.education?.section}
                </h3>
              </div>
            </div>

            <div className="column-one">
              <div className="student-data-i">
                <h3>{profile.name}</h3>
                <div className="archive-student-pic">
                  <img
                    src={profile.pfp ? profile.pfp : jen}
                    alt="this is a pfp"
                    className="jen"
                  />
                </div>
                <h4> I. </h4>
                <p>
                  {" "}
                  Full Name:{" "}
                  {profile.personal?.firstName +
                    " " +
                    profile.personal?.lastName}
                </p>
                <p>
                  Gr./Section:{" "}
                  {profile.education?.yearlvl +
                    " " +
                    profile.education?.section}
                </p>
                <p>Civil Status: {profile.personal?.civilStatus}</p>
                <p>Birthdate: {profile.personal?.dateOfBirth}</p>
                <p>Address: {profile.personal?.address}</p>
                <p>Tel. No.: {profile.personal?.telNo}</p>
                <p>Religion: {profile.personal?.religion}</p>
                <p>Guardian: {profile.personal?.guardian}</p>
                <p>Guradian's Address: {profile.personal?.guardianAddress}</p>
                <p> Guardian's Number: {profile.personal?.guardianTelNo}</p>
                <p> Department: {profile.personal?.department}</p>
              </div>
              <div className="student-data-ii">
                <h4> II. </h4>
                <h4>
                  Have you ever suffered illnesses involving any of the
                  following systems? Specify.
                </h4>
                <p>Respiratory : {profile.medical.respiratory}</p>
                <p>Digestive : {profile.medical.digestive}</p>
                <p>Nervous : {profile.medical.nervous}</p>
                <p>Excretory: {profile.medical.excretory}</p>
                <p>Endocrine : {profile.medical.endocrine}</p>
                <p>Circulatory : {profile.medical.circulatory}</p>
                <p>Skeletal : {profile.medical.skeletal}</p>
                <p>Muscular : {profile.medical.muscular}</p>
                <p>Reproductive : {profile.medical.reproductive}</p>
                <p>Lymphatic : {profile.medical.lymphatic}</p>
                <br />
                <h4> III. </h4>
                <p>Do you smoke? : {profile.medical.smoke ? "Yes" : "No"}</p>
                <p>Do you drink? : {profile.medical.drink ? "Yes" : "No"}</p>
                <p>
                  Allergy? :
                  {profile.medical.allergy === "N/A"
                    ? profile.medical.specificAllergy
                    : profile.medical.allergy}
                </p>
              </div>
            </div>
            <h3>Physical Examination</h3>
            <div className="column-two">
              <div className="student-data-iii">
                <h4> IV. </h4>
                <p>Eyes : {profile.medical.eyes}</p>
                <p>Ear : {profile.medical.ear}</p>
                <p>Nose : {profile.medical.nose}</p>
                <p>Throat: {profile.medical.throat}</p>
                <p>Tonsils : {profile.medical.tonsils}</p>
                <p>Teeth : {profile.medical.teeth}</p>
                <p>Tongue : {profile.medical.tongue}</p>
                <p>Neck : {profile.medical.neck}</p>
                <p>Thyroids : {profile.medical.thyroids}</p>
                <p>Cervical Glands : {profile.medical.cervicalGlands}</p>
                <br />
                <h4> V. </h4>

                <p>Chest : {profile.medical.chest}</p>
                <p>Contour : {profile.medical.contour}</p>
                <p>Heart : {profile.medical.heart}</p>
                <p>Rate : {profile.medical.rate}</p>
                <p>Rhythm : {profile.medical.rhythm}</p>
                <p>BP : {profile.medical.bp}</p>
                <p>Height : {profile.medical.height}</p>
                <p>Weight : {profile.medical.weight}</p>
                <p>BMI : {profile.medical.bmi}</p>
                <p>Lungs : {profile.medical.lungs}</p>
              </div>

              <div className="student-data-iv">
                <h4> VI. </h4>

                <p>Abdomen : {profile.medical.abdomen}</p>
                <p>Contour : {profile.medical.ABcontour}</p>
                <p>Liver : {profile.medical.liver}</p>
                <p>Spleen : {profile.medical.spleen}</p>
                <p>Kidneys : {profile.medical.kidneys}</p>
                <br />
                <h4> VII. </h4>
                <p>Extremities : {profile.medical.extremities}</p>
                <p>Upper : {profile.medical.upperExtremities}</p>
                <p>Lower : {profile.medical.lowerExtremities}</p>
              </div>
            </div>
            <h3>Laboratory Examination</h3>
            <div className="column-three">
              <div className="student-data-v1">
                <h3>Laboratory Examination</h3>
                <h4> VIII. </h4>
                <p>Blood Chemistry: {profile.medical.bloodChemistry}</p>
                <p> CBC: {profile.medical.cbc} </p>
                <p> Urinalysis: {profile.medical.urinalysis}</p>
                <p> Fecalysis: {profile.medical.fecalysis}</p>
              </div>
              <div className="student-data-v2">
                <h3>Diagnostic Procedures</h3>
                <h4> IX. </h4>
                <p>Chest X-ray Findings: {profile.medical.chestXray}</p>
              </div>
              <div className="student-data-v3">
                <h3>Others(ECG, Ultrasound, etc.)</h3>
                <h4> X. </h4>
                <p> {profile.medical.others}</p>
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
                    {profile.assessment && profile.assessment.length > 0 ? (
                      profile.assessment.map((item) => (
                        <tr key={item._id}>
                          <td>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
                          <td>{item.complaints}</td>
                          <td>{item.actions}</td>
                          <td></td>
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
                    {profile.assessment && profile.assessment.length > 0 ? (
                      profile.assessment.map((item) =>
                        item.followUps ? (
                          <tr key={`follow-up-${item._id}`}>
                            <td>
                              {new Date(
                                item.followUps.date
                              ).toLocaleDateString()}
                            </td>
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
                    {profile.immunization && profile.immunization.length > 0 ? (
                      profile.immunization.map((item) => (
                        <tr key={item._id}>
                          <td>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
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
              <button onClick={() => handleOpenModal(profile.medical.userId)}>
                View Archive
              </button>
              {showModal && archiveData && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>Document Archive</h3>

                    <div>
                      <h4>Changes History</h4>
                      {showModal && archiveData && (
                        <div className="modal">
                          <div className="modal-content">
                            <h3>Document Archive</h3>

                            {/* Medical Archive Changes */}
                            <div>
                              <h4>Medical Record Changes</h4>
                              {archiveData.medicalArchive.changes.length > 0 ? (
                                <ul>
                                  {archiveData.medicalArchive.changes.map(
                                    (change, index) => (
                                      <li key={index}>
                                        <p>
                                          Change #{index + 1} (By User ID:{" "}
                                          {change.userId} on{" "}
                                          {new Date(
                                            change.timestamp
                                          ).toLocaleString()}
                                          ):
                                        </p>
                                        <ul>
                                          {Object.keys(
                                            change.changedFields
                                          ).map((field) => (
                                            <li key={field}>
                                              {field}:{" "}
                                              {change.changedFields[field]}
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <p>No changes found for the medical record.</p>
                              )}
                            </div>

                            {/* Immunization Archive Changes */}
                            <div>
                              <h4>Immunization Record Changes</h4>
                              {archiveData.immunizationArchives.length > 0 ? (
                                archiveData.immunizationArchives.map(
                                  (immunizationArchive, idx) => (
                                    <div key={idx}>
                                      <h5>
                                        Immunization ID:{" "}
                                        {immunizationArchive.immunizationId}
                                      </h5>
                                      {immunizationArchive.changes.length >
                                      0 ? (
                                        <ul>
                                          {immunizationArchive.changes.map(
                                            (change, index) => (
                                              <li key={index}>
                                                <p>
                                                  Change #{index + 1} (By User
                                                  ID: {change.userId} on{" "}
                                                  {new Date(
                                                    change.timestamp
                                                  ).toLocaleString()}
                                                  ):
                                                </p>
                                                <ul>
                                                  {Object.keys(
                                                    change.changedFields
                                                  ).map((field) => (
                                                    <li key={field}>
                                                      {field}:{" "}
                                                      {
                                                        change.changedFields[
                                                          field
                                                        ]
                                                      }
                                                    </li>
                                                  ))}
                                                </ul>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : (
                                        <p>
                                          No changes found for this immunization
                                          record.
                                        </p>
                                      )}
                                    </div>
                                  )
                                )
                              ) : (
                                <p>No immunization records found.</p>
                              )}
                            </div>

                            {/* Assessment Archive Changes */}
                            <div>
                              <h4>Assessment Record Changes</h4>
                              {archiveData.assessmentArchives.length > 0 ? (
                                archiveData.assessmentArchives.map(
                                  (assessmentArchive, idx) => (
                                    <div key={idx}>
                                      <h5>
                                        Assessment ID:{" "}
                                        {assessmentArchive.assessmentId}
                                      </h5>
                                      {assessmentArchive.changes.length > 0 ? (
                                        <ul>
                                          {assessmentArchive.changes.map(
                                            (change, index) => (
                                              <li key={index}>
                                                <p>
                                                  Change #{index + 1} (By User
                                                  ID: {change.userId} on{" "}
                                                  {new Date(
                                                    change.timestamp
                                                  ).toLocaleString()}
                                                  ):
                                                </p>
                                                <ul>
                                                  {Object.keys(
                                                    change.changedFields
                                                  ).map((field) => (
                                                    <li key={field}>
                                                      {field}:{" "}
                                                      {
                                                        change.changedFields[
                                                          field
                                                        ]
                                                      }
                                                    </li>
                                                  ))}
                                                </ul>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : (
                                        <p>
                                          No changes found for this assessment
                                          record.
                                        </p>
                                      )}
                                    </div>
                                  )
                                )
                              ) : (
                                <p>No assessment records found.</p>
                              )}
                            </div>

                            <button onClick={handleCloseModal}>Close</button>
                          </div>
                        </div>
                      )}
                    </div>

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
