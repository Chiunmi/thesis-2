const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../utils/config')

const auth = async (req, res, next) => {
    const token = req.cookies.jwtToken; //every frontend request, the backend checks for cookies

    if (!token){
        return res.status(404).json({ error: 'No token found'});
    }
    
    try{
        const data = jwt.verify(token, jwtSecret);
        const user = await User.findById(data.id).select('-email -password -timestamp');
        if (!user) {
            return res.status(404).json({ error: 'No user found '});
        }
        console.log('jwtAuth>Current user: ', user);
        req.user = user
        next();
    }catch(err){
        console.log('auth error: ', err);
        return res.status(404).json({ error: 'Token is not valid'})     
    }
}

module.exports = auth;