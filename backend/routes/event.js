const router = require('express').Router();
const Event = require('../models/event/event');
const EventAttendee = require('../models/event/eventAttendee');
const { cloudinary } = require('../utils/config');
const upload = require('../middlewares/multer');

// default = ('/events')

router.get('/', async (req, res) => {
    try{
        const events = await Event.find().sort({ startDate: -1 });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
});

//making event
router.post('/', upload.single('image'), async (req, res) => { 
    const currentUser = req.user;
    const { title, body, limit, startDate, endDate } = req.body;

    try{
        let imgUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'events'
            });
            imgUrl = result.secure_url;
        }

        const newEvent = await Event.create({
            userId: currentUser.id,
            title,
            body,
            url: imgUrl,
            limit,
            startDate: new Date(startDate), 
            endDate: new Date(endDate)
        });

        return res.status(201).json(newEvent);
    }catch(err){
       console.log('error: ', err);
    }
});

//for attending event
router.post('/:id/attend', async (req, res) => { 
    const eventId = req.params.id;
    const currentUserId = req.user._id

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is already attending
        const existingAttendance = await EventAttendee.findOne({ eventId, userId: currentUserId });
        if (existingAttendance) {
            return res.status(400).json({ message: 'You are already attending this event' });
        }

        // Check if the event has reached its limit
        if (event.limit !== null) {
            const attendeeCount = await EventAttendee.countDocuments({ eventId });
            if (attendeeCount >= event.limit) {
                return res.status(400).json({ message: 'Event has reached its limit' });
            }
        }

        // Add the user as an attendee
        const newAttendee = new EventAttendee({
            eventId,
            userId: currentUserId
        });
        await newAttendee.save();

        res.status(200).json({ message: 'Successfully marked as attending' });

    } catch (err) {
        console.log('Error:', err);
        return res.status(500).json({ error: 'Failed to mark notification as read.' });
    }
});


module.exports = router;