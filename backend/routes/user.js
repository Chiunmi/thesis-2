const router = require('express').Router();
const jwt = require('jsonwebtoken');

const passport = require('../utils/passport');
const { hashPassword, comparePassword } = require('../utils/bcrypted');
const { frontendLink, jwtSecret } = require('../utils/config');

const User = require('../models/user');
const PersonalInfo = require('../models/personalInfo');
const MedicalInfo = require('../models/medicalInfo');
const EducationInfo = require('../models/educationInfo');
const Assessment = require('../models/assessment');
const Immunization = require('../models/Immunizations');
const auth = require('../middlewares/jwtAuth');

//default rotue = '/'

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false, failureRedirect: frontendLink }, (err, user) => {
        if (err || !user) {
            return res.redirect(frontendLink);
        }

        const token = jwt.sign({ id: user.id }, jwtSecret);
        res.cookie('jwtToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
        res.redirect(`${frontendLink}`);
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    console.log('this is running on logout server');
    res.clearCookie('jwtToken', { httpOnly: true, secure: true, sameSite: 'None' }).json({ message: 'Logged out successfully' });
});

router.get('/', auth, async (req, res) => {
    try{
        const user = req.user;
        res.status(200).json(user);
    }catch (err) {
        console.log('User Route> Error fetching user:', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).json({ error: 'User already exist'})
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            role: 'staff'
        });

        await PersonalInfo.create({
            userId: newUser._id
        });

        await MedicalInfo.create({
            userId: newUser._id
        });

        await EducationInfo.create({
            userId: newUser._id
        });
        
        const token = jwt.sign({ id: newUser.id }, jwtSecret);
        res.cookie('jwtToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({ message: 'Register Successful'});
    }catch (err) {
        console.log('error:', err);
        res.status(404).json({ error: 'error registering'})
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'User not found'});
        }
        
        const match = await comparePassword(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user.id }, jwtSecret);
            res.cookie('jwtToken', token, { httpOnly: true, secure: true, sameSite: 'None' });
            return res.status(200).json({ message: 'Login Successful'});
        } else {
            return res.status(400).json({ error: 'Password do not match'});
        }
    }catch (err) {
        console.log('error:', err);
        res.status(404).json({ error: 'error logging in'})
    }
})

router.get('/profile/:id', auth, async (req, res) => {
    try{
        const userId = req.params.id;
        const currentUser = req.user;
        if (currentUser.role !== 'admin' && currentUser.id !== userId){
            return res.status(404).json({ error: 'Not authorize'})
        }
        const personal = await PersonalInfo.findOne({userId});
        const medical = await MedicalInfo.findOne({userId});
        const education = await EducationInfo.findOne({userId});
        const user = await User.findById(userId, 'pfp');
        

        const assessment = await Assessment.find({medicalInfoId: medical._id});
        const immunization = await Immunization.find({medicalInfoId: medical._id})
        if (personal) {
            return res.status(200).json({
                personal,
                medical,
                education,
                assessment,
                immunization,
                pfp: user.pfp,
            });
        } else {
            console.log('User not found');
            return res.status(400).json({ error: 'User not found'});
        }

    }catch (err) {
        console.log('error:', err);
        res.status(404).json({ error: 'error fetching user'})
    }
});



module.exports = router;
