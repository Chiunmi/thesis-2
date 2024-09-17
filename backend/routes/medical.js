const router = require("express").Router();
const MedicalInfo = require("../models/medicalRecords/medicalInfo");
const EducationInfo = require("../models/educationInfo");
const PersonalInfo = require("../models/personalInfo");
const User = require("../models/user");
const Assessment = require("../models/medicalRecords/assessment");
const Immunization = require("../models/medicalRecords/immunization");
const Archive = require("../models/archive/archive");
const ArchiveChange = require("../models/archive/archiveChanges");

//default = '/medical'

router.get("/", async (req, res) => {
  try {
    const { educationLevel, yearlvl, strand, course, section } = req.query;

    // Query to filter students based on the selected fields
    const students = await EducationInfo.find({
      educationLevel,
      yearlvl,
      strand: strand || { $exists: true },
      course: course || { $exists: true },
      section,
    }).populate("userId");

    // Fetch the personal info (only userId, firstname, lastname)
    const combinedData = await Promise.all(
      students.map(async (student) => {
        const personal = await PersonalInfo.findOne(
          { userId: student.userId },
          "userId firstName lastName"
        );

        return {
          personal,
        };
      })
    );
    res.json(combinedData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(404).json({ error: "Error fetching data" });
  }
});

// In your routes file
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(name, "i");

    const students = await PersonalInfo.find({
      $or: [{ firstName: regex }, { lastName: regex }],
    }).exec(); // Execute the query

    const combinedData = await Promise.all(
      students.map(async (student) => {
        const personal = await PersonalInfo.findOne(
          { userId: student.userId },
          "userId firstName lastName"
        );
        return {
          personal,
        };
      })
    );

    if (students.length > 0) {
      res.status(200).json(combinedData);
    } else {
      res.status(404).json({ message: "No students found" });
    }
  } catch (error) {
    console.error("Error searching students:", error);
    res.status(500).json({ error: "Error searching students" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const currentUser = req.user;
    const updatedFields = req.body;

    if (currentUser.role !== "admin") {
      return res.status(404).json({ error: "Not authorized" });
    }

    // Fetch the original document
    const originalDocument = await MedicalInfo.findById(Id).lean();
    if (!originalDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Update the document
    const medical = await MedicalInfo.findByIdAndUpdate(Id, updatedFields);

    // Identify the changed fields
    const changedFields = {};
    for (const key in updatedFields) {
      if (key === "_id" || key === "userId" || key === "timestamp") {
        continue;
      }
      if (originalDocument[key] !== updatedFields[key]) {
        changedFields[key] = updatedFields[key];
      }
    }

    // Find existing archive document for this record
    let archive = await Archive.findOne({ documentId: Id });
    if (!archive) {
      archive = await Archive.create({
        documentId: Id,
        collectionName: "Medical Records",
      });
    }

    const c = await ArchiveChange.create({
      archiveId: archive._id,
      userId: currentUser._id,
      changedFields,
    });
    console.log("aChanges,", c);

    res.status(200).json(medical);
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ error: "Error updating document" });
  }
});

router.post("/immunization", async (req, res) => {
  try {
    const currentUser = req.user;
    if (currentUser.role !== "admin") {
      return res.status(404).json({ error: "Not authorize" });
    }
    const { medicalInfoId, vaccine, remarks } = req.body;
    const newImmunization = await Immunization.create({
      medicalInfoId,
      userId: currentUser._id,
      vaccine,
      remarks,
    });
    res.status(200).json(newImmunization);
  } catch (err) {
    console.error("Error searching students:", err);
    res.status(500).json({ error: "Error adding immunization on student" });
  }
});

router.patch("/immunization/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const currentUser = req.user;
    const updatedFields = req.body;

    if (currentUser.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }
    const originalDocument = await Immunization.findOne({ _id: Id }).lean();

    if (!originalDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    const existingAssessment = await Immunization.findByIdAndUpdate(
      Id,
      updatedFields
    );

    const changedFields = {};
    for (const key in updatedFields) {
      if (key === "_id" || key === "userId" || key === "timestamp") {
        continue;
      }
      if (originalDocument[key] !== updatedFields[key]) {
        changedFields[key] = updatedFields[key];
      }
    }

    // Find existing archive document for this record
    let archive = await Archive.findOne({ documentId: Id });
    if (!archive) {
      archive = await Archive.create({
        documentId: Id,
        collectionName: "Immunization Records",
      });
    }

    await ArchiveChange.create({
      archiveId: archive._id,
      userId: currentUser._id,
      changedFields,
    });

    res.status(200).json(existingAssessment);
  } catch (err) {
    console.error("Error updating assessment:", err);
    res.status(500).json({ error: "Error updating assessment of student" });
  }
});

router.post("/assessment", async (req, res) => {
  try {
    const currentUser = req.user;
    if (currentUser.role !== "admin") {
      return res.status(404).json({ error: "Not authorize" });
    }
    const { medicalInfoId, complaints, actions } = req.body;
    const assessment = await Assessment.create({
      medicalInfoId,
      userId: currentUser.id,
      complaints,
      actions,
    });
    res.status(200).json(assessment);
  } catch (err) {
    console.error("Error searching students:", err);
    res.status(500).json({ error: "Error adding assessment on student" });
  }
});

router.patch("/assessment/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const currentUser = req.user;
    const updatedFields = req.body;

    if (currentUser.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const originalDocument = await Assessment.findOne({ _id: Id }).lean();

    if (!originalDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Find the existing assessment by ID
    const existingAssessment = await Assessment.findByIdAndUpdate(
      Id,
      updatedFields
    );

    const changedFields = {};
    for (const key in updatedFields) {
      if (key === "_id" || key === "userId" || key === "timestamp") {
        continue;
      }
      if (originalDocument[key] !== updatedFields[key]) {
        changedFields[key] = updatedFields[key];
      }
    }

    // Find existing archive document for this record
    let archive = await Archive.findOne({ documentId: Id });
    if (!archive) {
      archive = await Archive.create({
        documentId: Id,
        collectionName: "Assessment Records",
      });
    }

    await ArchiveChange.create({
      archiveId: archive._id,
      userId: currentUser._id,
      changedFields,
    });

    res.status(200).json(existingAssessment);
  } catch (err) {
    console.error("Error updating assessment:", err);
    res.status(500).json({ error: "Error updating assessment of student" });
  }
});

router.patch("/assessment/:id/followup", async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const { followUpComplaints, followUpActions } = req.body;
    const currentUser = req.user;

    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    assessment.followUps = {
      userId: currentUser.id,
      followUpComplaints,
      followUpActions,
    };

    // Save the updated assessment
    const updatedAssessment = await assessment.save();
    res.status(200).json(updatedAssessment);
  } catch (err) {
    console.error("Error adding follow-up:", err);
    res.status(500).json({ error: "Error adding follow-up" });
  }
});

router.patch("/assessment/:id/followup/update", async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const { followUpComplaints, followUpActions } = req.body;
    const currentUser = req.user; // Get the current user

    // Fetch the original assessment document
    const originalAssessment = await Assessment.findById(assessmentId).lean();

    if (!originalAssessment) {
      return res
        .status(404)
        .json({ error: "Follow-up not found for this assessment" });
    }

    // Check if there are any changes to followUpComplaints or followUpActions
    const changedFields = {};
    if (
      originalAssessment.followUps.followUpComplaints !== followUpComplaints
    ) {
      changedFields.followUpComplaints = followUpComplaints;
    }
    if (originalAssessment.followUps.followUpActions !== followUpActions) {
      changedFields.followUpActions = followUpActions;
    }

    if (Object.keys(changedFields).length === 0) {
      return res.status(400).json({ error: "No changes detected" });
    }

    // Update the existing follow-up fields
    originalAssessment.followUps.followUpComplaints = followUpComplaints;
    originalAssessment.followUps.followUpActions = followUpActions;
    originalAssessment.followUps.date = new Date(); // Update the date

    // Save the updated assessment
    const updatedAssessment = await Assessment.findByIdAndUpdate(
      assessmentId,
      { followUps: originalAssessment.followUps },
      { new: true }
    );

    // Find existing archive document for this assessment
    let archive = await Archive.findOne({ documentId: assessmentId });
    if (!archive) {
      archive = await Archive.create({
        documentId: assessmentId,
        collectionName: "Assessment Records",
      });
    }

    // Record the changes in the archive
    await ArchiveChange.create({
      archiveId: archive._id,
      userId: currentUser._id,
      changedFields, // Log the changed fields
    });

    res.status(200).json(updatedAssessment);
  } catch (err) {
    console.error("Error updating follow-up:", err);
    res.status(500).json({ error: "Error updating follow-up" });
  }
});

module.exports = router;
