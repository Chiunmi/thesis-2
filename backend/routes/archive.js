const router = require("express").Router();
const Archive = require("../models/archive/archive");
const ArchiveChange = require("../models/archive/archiveChanges");
const MedicalInfo = require("../models/medicalRecords/medicalInfo");
const Immunization = require("../models/medicalRecords/immunization");
const Assessment = require("../models/medicalRecords/assessment");

// route = /archive

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user;

    if (currentUser.role !== "admin") {
      return res.status(404).json({ error: "Not authorized" });
    }

    // Fetch medical info
    const medical = await MedicalInfo.findOne({ userId }).lean();
    if (!medical) {
      return res.status(404).json({ error: "Medical record not found" });
    }

    // Fetch all immunization records related to the medical record
    const immunizations = await Immunization.find({
      medicalInfoId: medical._id,
    }).lean();

    // Fetch all assessment records related to the medical record
    const assessments = await Assessment.find({
      medicalInfoId: medical._id,
    }).lean();

    // Fetch the medical archive and its changes
    const [medicalArchiveData] = await Archive.aggregate([
      { $match: { documentId: medical._id } },
      {
        $lookup: {
          from: "archivechanges",
          localField: "_id",
          foreignField: "archiveId",
          as: "changes",
        },
      },
      { $unwind: { path: "$changes", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$_id",
          documentId: { $first: "$documentId" },
          changes: { $push: "$changes" },
        },
      },
    ]).exec();

    // Fetch archives and changes for each immunization
    const immunizationArchives = await Promise.all(
      immunizations.map(async (immunization) => {
        const [archiveData] = await Archive.aggregate([
          { $match: { documentId: immunization._id } },
          {
            $lookup: {
              from: "archivechanges",
              localField: "_id",
              foreignField: "archiveId",
              as: "changes",
            },
          },
          { $unwind: { path: "$changes", preserveNullAndEmptyArrays: true } },
          {
            $group: {
              _id: "$_id",
              documentId: { $first: "$documentId" },
              changes: { $push: "$changes" },
            },
          },
        ]).exec();

        return {
          immunizationId: immunization._id,
          changes: archiveData ? archiveData.changes : [], // Ensure changes is an array
        };
      })
    );

    // Fetch archives and changes for each assessment
    const assessmentArchives = await Promise.all(
      assessments.map(async (assessment) => {
        const [archiveData] = await Archive.aggregate([
          { $match: { documentId: assessment._id } },
          {
            $lookup: {
              from: "archivechanges",
              localField: "_id",
              foreignField: "archiveId",
              as: "changes",
            },
          },
          { $unwind: { path: "$changes", preserveNullAndEmptyArrays: true } },
          {
            $group: {
              _id: "$_id",
              documentId: { $first: "$documentId" },
              changes: { $push: "$changes" },
            },
          },
        ]).exec();

        return {
          assessmentId: assessment._id,
          changes: archiveData ? archiveData.changes : [], // Ensure changes is an array
        };
      })
    );

    // Send the archive with its changes
    res.status(200).json({
      medicalArchive: {
        changes: medicalArchiveData.changes,
      },
      immunizationArchives: immunizationArchives,
      assessmentArchives: assessmentArchives, // Include assessment archives
    });
  } catch (err) {
    console.error("Error searching archive and changes:", err);
    res.status(500).json({ error: "Error fetching archive" });
  }
});

module.exports = router;
