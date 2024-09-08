const router = require('express').Router();

const Post = require('../models/post');
const PersonalInfo = require('../models/personalInfo');
const Notification = require('../models/notification/notification');

const { cloudinary } = require('../utils/config');
const upload = require('../middlewares/multer');

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find().sort({ timestamp: -1 });
        res.status(200).json(posts);
    } catch (err) {
        return res.status(400).json({ error: 'No Post found'});
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const currentUser = req.user;
    const { title, body } = req.body;

    try{
        let imgUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'posts'
            });
            imgUrl = result.secure_url;
        }

        const newPost = await Post.create({
            title,
            body,
            url: imgUrl,
            userId: currentUser.id
        });

        const userDetails = await PersonalInfo.findOne({
            userId: currentUser.id
        }).select('firstName lastName');

        await Notification.create({
            userId: currentUser._id,
            title: `${userDetails.firstName + " " + userDetails.lastName} made a post!`,
            documentId: newPost._id,
            documentType: 'post',
            recipientIds: [], 
        });

        return res.status(200).json(newPost);
    }catch(err){
       console.log('error: ', err);
    }
});

module.exports = router;