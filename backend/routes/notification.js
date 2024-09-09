const router = require('express').Router();
const ReadStatus = require('../models/notification/readStatus');
const Notification = require('../models/notification/notification');


router.get('/', async (req, res) => {
    try {
      const userId = req.user._id;
  
      const notifications = await Notification.aggregate([
        {
          $lookup: {
            from: 'readstatuses',  // Collection name in the database (to be joined)
            localField: '_id', // Field from the Notification collection
            foreignField: 'notificationId', // Field from the ReadStatus collection
            as: 'readStatus' // Name of the new array field
          }
        },
        {
          $addFields: {  
            isRead: { //A new field being added to each document.
              $in: [userId, '$readStatus.userId'] 
              // Check if the current userId is present in the readStatus.userId array
            }
          }
        },
        {
          $sort: { timestamp: -1 } // Sort by timestamp, most recent first
        }
      ]);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error });
    }
  });

router.post('/:id', async (req, res) => { //mark as read
    const notificationId = req.params.id;
    const currentUserId = req.user._id

    try {
        // Create a read status entry
        let readStatus = await ReadStatus.findOne({ notificationId, userId: currentUserId});

        if (readStatus) {
            return res.status(200).json(readStatus);
        }

        readStatus = await ReadStatus.create({
            notificationId,
            userId: currentUserId
        });

        return res.status(200).json(readStatus);
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).json({ error: 'Failed to mark notification as read.' });
    }
});


module.exports = router;