const router = require('express').Router();
const MedicalInfo = require('../models/medicalInfo');
const EducationInfo = require('../models/educationInfo');
const PersonalInfo = require('../models/personalInfo');
const User = require('../models/user');
const Assessment = require('../models/assessment');
const Immunization = require('../models/Immunizations');
const Archive = require('../models/archive');

//default = '/medical'

router.get('/', async (req, res) => {
    try {
        const { educationLevel, yearlvl, strand, course, section } = req.query;

        // Query to filter students based on the selected fields
        const students = await EducationInfo.find({
            educationLevel,
            yearlvl,
            strand: strand || { $exists: true },
            course: course || { $exists: true },
            section
        }).populate('userId');

        // Fetch the personal info (only userId, firstname, lastname)
        const combinedData = await Promise.all(students.map(async (student) => {
            const personal = await PersonalInfo.findOne(
                { userId: student.userId },
                'userId firstName lastName'
            );

            return {
                personal
            };
        }));
        console.log('combinedData', combinedData);
        res.json(combinedData);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(404).json({ error: 'Error fetching data' });
    }
});

// In your routes file
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query; 
        const regex = new RegExp(name, 'i');

        const students = await PersonalInfo.find({
            $or: [
                { 'firstName': regex },
                { 'lastName': regex }
            ]
        }).exec(); // Execute the query

        const combinedData = await Promise.all(students.map(async (student) => {
            const personal = await PersonalInfo.findOne(
                { userId: student.userId },
                'userId firstName lastName'
            );
            return {
                personal,
            };
        }));

        if (students.length > 0) {
            res.status(200).json(combinedData);
        } else {
            res.status(404).json({ message: 'No students found' });
        }
    } catch (error) {
        console.error('Error searching students:', error);
        res.status(500).json({ error: 'Error searching students' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
      const Id = req.params.id;
      const currentUser = req.user;
      const updatedFields = req.body;

      console.log('current user', currentUser._id);
  
      if (currentUser.role !== 'admin') {
        return res.status(404).json({ error: 'Not authorized' });
      }
  
      // Fetch the original document
      const originalDocument = await MedicalInfo.findById(Id).lean();
  
      if (!originalDocument) {
        return res.status(404).json({ error: 'Document not found' });
      }
  
      // Update the document
      const medical = await MedicalInfo.findByIdAndUpdate(Id, updatedFields);
  
      // Identify the changed fields
      const changedFields = {};
      for (const key in updatedFields) {
        if (key === '_id' || key === 'userId' || key === 'timestamp') {
            continue;
          }
        if (originalDocument[key] !== updatedFields[key]) {
          changedFields[key] = updatedFields[key];
        }
      }
  
      // Find existing archive document for this record
      let archive = await Archive.findOne({ documentId: Id});
  
      if (archive) {
        // Push the new change to the existing archive document
        archive.changes.push({
          userId: currentUser._id,
          changedFields,
        });
        await archive.save();
      } else {
        // Create a new archive document if none exists
        await Archive.create({
          documentId: Id,
          collectionName: 'Medical Records',
          originalDocument,
          changes: [
            {
              userId: currentUser._id,
              changedFields,
              timestamp: Date.now(),
            },
          ],
        });
      }
  
      res.status(200).json(medical);
    } catch (err) {
      console.error('Error updating document:', err);
      res.status(500).json({ error: 'Error updating document' });
    }
  });
  

router.post('/immunization', async (req, res) => {
    try{
        const currentUser = req.user;
        if (currentUser.role !== 'admin'){
          return res.status(404).json({ error: 'Not authorize'})
        }
        const { medicalInfoId, vaccine, remarks } = req.body;
        const newImmunization = await Immunization.create({
            medicalInfoId,
            vaccine,
            remarks
        });
        res.status(200).json(newImmunization);
    } catch (err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error adding immunization on student' });
    }
});

router.patch('/immunization/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const currentUser = req.user;
        const updatedFields = req.body;

        // Check if the user is authorized
        if (currentUser.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        // Find the existing assessment by ID
        const existingAssessment = await Immunization.findByIdAndUpdate(Id, updatedFields);
        res.status(200).json(existingAssessment);
    } catch (err) {
        console.error('Error updating assessment:', err);
        res.status(500).json({ error: 'Error updating assessment of student' });
    }
});

router.post('/assessment', async (req, res) => {
    try{
        const currentUser = req.user;
          if (currentUser.role !== 'admin'){
            return res.status(404).json({ error: 'Not authorize'})
        }
        const { medicalInfoId, complaints, actions } = req.body;
        const assessment = await Assessment.create({
            medicalInfoId,
            complaints,
            actions
        });
        res.status(200).json(assessment);
    } catch (err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error adding assessment on student' });
    }
});

router.patch('/assessment/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const currentUser = req.user;
        const updatedFields = req.body;

        // Check if the user is authorized
        if (currentUser.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        // Find the existing assessment by ID
        const existingAssessment = await Assessment.findByIdAndUpdate(Id, updatedFields);
        res.status(200).json(existingAssessment);
    } catch (err) {
        console.error('Error updating assessment:', err);
        res.status(500).json({ error: 'Error updating assessment of student' });
    }
});


router.patch('/assessment/:id/followup', async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const { followUpComplaints, followUpActions } = req.body;

        const assessment = await Assessment.findById(assessmentId);
        
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });        
        }

        assessment.followUps = { followUpComplaints, followUpActions };

        // Save the updated assessment
        const updatedAssessment = await assessment.save();
        res.status(200).json(updatedAssessment);
    } catch (err) {
        console.error('Error adding follow-up:', err);
        res.status(500).json({ error: 'Error adding follow-up' });
    }
});

router.patch('/assessment/:id/followup/update', async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const { followUpComplaints, followUpActions } = req.body;

        const assessment = await Assessment.findById(assessmentId);
        console.log('assessment:', assessment);
        if (!assessment) {
            return res.status(404).json({ error: 'Follow-up not found for this assessment' });
        }

        // Update the existing follow-up
        assessment.followUps.followUpComplaints = followUpComplaints;
        assessment.followUps.followUpActions = followUpActions;
        assessment.followUps.date = new Date(); // Update the date

        // Save the updated assessment
        const updatedAssessment = await assessment.save();
        res.status(200).json(updatedAssessment);
    } catch (err) {
        console.error('Error updating follow-up:', err);
        res.status(500).json({ error: 'Error updating follow-up' });
    }
});




module.exports = router;
