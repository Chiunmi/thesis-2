const router = require('express').Router();
const Archive = require('../models/archive');

router.get('/', async (req, ress) => {
    try{

    } catch (err) {
        console.error('Error searching students:', err);
        res.status(500).json({ error: 'Error fetching archive' });
    }
})


module.exports = router;