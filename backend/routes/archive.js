const router = require('express').Router();
const Archive = require('../models/archive');
const MedicalInfo = require('../models/medicalInfo');
const Immunization = require('../models/Immunizations');

//route = /archive

router.get('/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const currentUser = req.user;

        if (currentUser.role !== 'admin'){
            return res.status(404).json({ error: 'Not authorize'})
        }
        const medical = await MedicalInfo.findOne({userId});
        const archive = await Archive.findOne({documentId: medical._id});

        // const immunization = await Immunization.findOne({medicalInfoId: medical._id});
        // // const immunizationArchive = await Archive.findOne({documentId: immunization._id});

        // const combinedArchives = {
        //     medicalArchive,
        //     immunizationArchive
        // };

        res.status(200).json(archive);

    } catch (err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error fetching archive' });
    }
})


module.exports = router;