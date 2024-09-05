const router = require('express').Router();
const MedicalInfo = require('../models/medicalInfo');
const EducationInfo = require('../models/educationInfo');
const PersonalInfo = require('../models/personalInfo');
const User = require('../models/user');
const Assessment = require('../models/assessment');

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
    try{
        const Id = req.params.id;
        const currentUser = req.user;
        const updatedFields = req.body;

        if (currentUser.role !== 'admin'){
            return res.status(404).json({ error: 'Not authorize'})
        }

        console.log('id:', Id);
        const medical = await MedicalInfo.findByIdAndUpdate(Id, updatedFields); 
        res.status(200).json(medical);
        console.log('medical:', medical);
        } catch(err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error updating student' });
    }
})

router.post('/assessment', async (req, res) => {
    try{
        const currentUser = req.user;
          if (currentUser.role !== 'admin'){
            return res.status(404).json({ error: 'Not authorize'})
        }
        const { userId, complain, actions } = req.body;
        const assessment = await Assessment.create({
            userId,
            complain,
            actions
        });
        res.status(200).json(assessment);
    } catch (err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error adding assessment on student' });
    }
});

router.post('/assessment/:id/followup', async (req, res) => {
    try {
        const assessmentId = req.params.id;
        const { followUpComplaints, followUpActions } = req.body;

        const assessment = await Assessment.findById(assessmentId);

        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }

        assessment.followUps.push({ followUpComplaints, followUpActions });

        // Save the updated assessment
        const updatedAssessment = await assessment.save();
        res.status(200).json(updatedAssessment);
    } catch (err) {
        console.error('Error adding follow-up:', err);
        res.status(500).json({ error: 'Error adding follow-up' });
    }
});



module.exports = router;
