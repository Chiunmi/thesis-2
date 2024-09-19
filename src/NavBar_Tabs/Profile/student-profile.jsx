import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Modal from "react-modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import Layout from "../../Components/Layout";
import { useUser } from "../../context/UserContext";
import meme from "./../../assets/meme.jpg";

import "./student-profile.css";

function StudentProfile() {
  const { id } = useParams(); // Get studentId from URL
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
    setFormData({ personal: profile.personal, education: profile.education });
    console.log("f", formData);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Determine if the field belongs to 'personal' or 'education'
    const [section, field] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const fetchProfile = async () => {
    const response = await axios.get(`/profile/${id}`);
    return response.data;
  };

  const editProfile = async () => {
    try {
      const response = await axios.patch(`/profile/${id}`, formData);
      console.log("response.data:asd", response.data);
      return response.data;
    } catch (err) {
      console.log("err", err);
    }
  };

  // Fetching student profile data using studentId
  const {
    data: profile = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: fetchProfile,
    enabled: !!id, // Enable query only if studentId is present
  });

  const editMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", id]);
      toast.success("Updated successfully");
      setEditProfileModalOpen(false); // Close the modal on success
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error updating profile");
    },
  });

  const handleSave = () => {
    editMutation.mutate();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading profile</p>;
  if (!profile || !profile.personal) return <p>No profile data available</p>;

  console.log("profile,", profile);

  return (
    <div className="studentProfile">
      <div className="student-profile-info">
        <h2> Student Health Record</h2>
        <div className="student-column-one">
          <div className="student-name-photo">
            <div className="profile-student-pic">
              <label htmlFor="upload-photo" className="upload-label">
                <img
                  src={profile.pfp}
                  alt="Student Photo"
                  className="student-photo"
                />
                <input type="file" id="upload-photo" className="upload-input" />
                <button className="upload-button">Change Photo</button>
              </label>
            </div>

            <div className="student-profile-top">
              <div className="student-profile-name">
                <h1>{profile.name}</h1>
              </div>
              <div className="student-top-details">
                <p> weight</p>
                <h3> {profile.medical.weight}</h3>
                <p> height</p>
                <h3> {profile.medical.height}</h3>
                <p> BMI</p>
                <h3> {profile.medical.bmi}</h3>
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
                    height: "10vh",
                    maxHeight: "fit-content",
                    margin: "auto",
                    marginTop: "1vh",
                    paddingTop: "80vh",
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
                    <label>First Name: </label>
                    <input
                      type="text"
                      name="personal.firstName"
                      value={formData.personal?.firstName}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Last Name: </label>
                    <input
                      type="text"
                      name="personal.lastName"
                      value={formData.personal?.lastName}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Sex: </label>
                    <input
                      type="radio"
                      name="personal.sex"
                      value="Male"
                      checked={formData.personal?.sex === "Male"}
                      onChange={handleChange}
                    />{" "}
                    Male
                    <input
                      type="radio"
                      name="personal.sex"
                      value="Female"
                      checked={formData.personal?.sex === "Female"}
                      onChange={handleChange}
                    />{" "}
                    Female
                    <br />
                    <label>Civil Status: </label>
                    <input
                      type="text"
                      name="personal.civilStatus"
                      value={formData.personal?.civilStatus}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Birthdate: </label>
                    <input
                      type="date"
                      name="personal.dateOfBirth"
                      value={formData.personal?.dateOfBirth || ""}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Address: </label>
                    <input
                      type="text"
                      name="personal.address"
                      value={formData.personal?.address}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Tel. No.: </label>
                    <input
                      type="tel"
                      name="personal.telNo"
                      value={formData.personal?.telNo}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Religion: </label>
                    <input
                      type="text"
                      name="personal.religion"
                      value={formData.personal?.religion}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Guardian: </label>
                    <input
                      type="text"
                      name="personal.guardian"
                      value={formData.personal?.guardian}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Guardian's Address: </label>
                    <input
                      type="text"
                      name="personal.guardianAddress"
                      value={formData.personal?.guardianAddress}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Guardian's Number: </label>
                    <input
                      type="tel"
                      name="personal.guardianTelNo"
                      value={formData.personal?.guardianTelNo}
                      onChange={handleChange}
                    />
                    <br />
                    <br />
                    <h4>II. Education Information</h4>
                    <label>Education Level: </label>
                    <select
                      name="education.educationLevel"
                      value={formData.education?.educationLevel || ""}
                      onChange={handleChange}
                    >
                      <option value="JHS">JHS</option>
                      <option value="SHS">SHS</option>
                      <option value="College">College</option>
                    </select>
                    <br />
                    <label>Grade: </label>
                    <input
                      type="text"
                      name="education.yearlvl"
                      value={formData.education?.yearlvl || ""}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Section: </label>
                    <input
                      type="text"
                      name="education.section"
                      value={formData.education?.section || ""}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Department: </label>
                    <input
                      type="text"
                      name="education.department"
                      value={formData.education?.department || ""}
                      onChange={handleChange}
                    />
                    <br />
                    <label>Strand: </label>
                    <select
                      name="education.strand"
                      value={formData.education?.strand || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Strand</option>
                      <option value="STEM">STEM</option>
                      <option value="HUMMS">HUMMS</option>
                      <option value="ABM">ABM</option>
                      <option value="IT">IT</option>
                    </select>
                    <br />
                    <label>Course: </label>
                    <select
                      name="education.course"
                      value={formData.education?.course || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Course</option>
                      <option value="BSCS">BSCS</option>
                      <option value="BSA">BSA</option>
                      <option value="BSIT">BSIT</option>
                      <option value="BSE">BSE</option>
                    </select>
                    <br />
                    <label>School Year: </label>
                    <input
                      type="text"
                      name="education.schoolYear"
                      value={formData.education?.schoolYear || ""}
                      onChange={handleChange}
                    />
                    <br />
                    <button
                      type="button"
                      className="save-button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="student-column-two">
          <div className="student-profile-data-i">
            <h4>I.</h4>
            <p>
              Full Name:{" "}
              {profile.personal?.firstName + " " + profile.personal?.lastName}
            </p>
            <p>
              Gr./Section:{" "}
              {profile.education?.yearlvl + " " + profile.education?.section}
            </p>
            <p>Age: {profile.age}</p>
            <p>Sex: {profile.personal?.sex}</p>
            <p>Civil Status: {profile.personal?.civilStatus}</p>
            <p>Birthdate: {profile.personal?.dateOfBirth}</p>
            <p>Address: {profile.personal?.address}</p>
            <p>Tel. No.: {profile.personal?.telNo}</p>
            <p>Religion: {profile.personal?.religion}</p>
            <p>Guardian: {profile.personal?.guardian}</p>
            <p>Guardian's Address: {profile.personal?.guardianAddress}</p>
            <p>Guardian's Number: {profile.personal?.guardianTelNo}</p>
            <p> Department: {profile.education?.department}</p>
          </div>
          <div className="student-profile-data-ii">
            <h4>
              II. Have you ever suffered illnesses involving any of the
              following systems? Specify.
            </h4>

            <p>Respiratory: {profile.medical.respiratory}</p>
            <p>Digestive: {profile.medical.digestive}</p>
            <p>Nervous: {profile.medical.nervous}</p>
            <p>Excretory: {profile.medical.excretory}</p>
            <p>Endocrine: {profile.medical.endocrine}</p>
            <p>Circulatory: {profile.medical.circulatory}</p>
            <p>Skeletal: {profile.medical.skeletal}</p>
            <p>Muscular: {profile.medical.muscular}</p>
            <p>Reproductive: {profile.medical.reproductive}</p>
            <p>Lymphatic: {profile.medical.lymphatic}</p>
          </div>
          <div className="student-profile-data-iii">
            <h4>III.</h4>
            <p>Do you smoke?: {profile.medical.smoke ? "Yes" : "No"}</p>
            <p>Do you drink?: {profile.medical.drink ? "Yes" : "No"}</p>
            <p>Allergy?: {profile.medical.allergy}</p>
            <p>If so, specify: {profile.medical.specifyAllergy}</p>
          </div>
        </div>
        <h3>Physical Examination</h3>

        <div className="student-column-three">
          <div className="student-profile-data-iv">
            <h4>IV.</h4>
            <p>Eyes: {profile.medical.eyes}</p>
            <p>Ear: {profile.medical.ear}</p>
            <p>Nose: {profile.medical.nose}</p>
            <p>Throat: {profile.medical.throat}</p>
            <p>Tonsils: {profile.medical.tonsils}</p>
            <p>Teeth: {profile.medical.teeth}</p>
            <p>Tongue: {profile.medical.tongue}</p>
            <p>Neck: {profile.medical.neck}</p>
            <p>Thyroids: {profile.medical.thyroids}</p>
            <p>Cervical Glands: {profile.medical.cervicalGlands}</p>
          </div>

          <div className="student-profile-data-v">
            <h4>V.</h4>
            <p>Chest: {profile.medical.chest}</p>
            <p>Contour: {profile.medical.contour}</p>
            <p>Heart: {profile.medical.heart}</p>
            <p>Rate: {profile.medical.rate}</p>
            <p>Rhythm: {profile.medical.rhythm}</p>
            <p>BP: {profile.medical.bp}</p>
            <p>Height: {profile.medical.height}</p>
            <p>Weight: {profile.medical.weight}</p>
            <p>BMI: {profile.medical.bmi}</p>
            <p>Lungs: {profile.medical.lungs}</p>
          </div>

          <div className="student-profile-data-vi">
            <h4>VI.</h4>
            <p>Abdomen: {profile.medical.abdomen}</p>
            <p>Contour: {profile.medical.ABcontour}</p>
            <p>Liver: {profile.medical.liver}</p>
            <p>Spleen: {profile.medical.spleen}</p>
            <p>Kidneys: {profile.medical.kidneys}</p>
          </div>

          <div className="student-profile-data-vii">
            <h4>VII.</h4>
            <p>Extremities: {profile.medical.extremities}</p>
            <p>Upper: {profile.medical.upperExtremities}</p>
            <p>Lower: {profile.medical.lowerExtremities}</p>
          </div>
        </div>

        <div className="student-column-four">
          <div className="student-data-v1">
            <h3>Laboratory Examination</h3>
            <h4> VIII. </h4>
            <p> Blood Chemistry: {profile.medical.bloodChemistry}</p>
            <p> CBC:{profile.medical.cbc} </p>
            <p> Urinalysis: {profile.medical.urinalysis}</p>
            <p> Fecalysis: {profile.medical.fecalysis}</p>
          </div>
          <div className="student-data-v2">
            <h3>Diagnostic Procedures</h3>
            <h4> IX. </h4>
            <p> Chest X-Ray Findings: {profile.medical.chestXray}</p>
          </div>
          <div className="student-data-v3">
            <h3>Others(ECG, Ultrasound, etc.)</h3>
            <h4> X. </h4>
            <p> {profile.medical.others}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
