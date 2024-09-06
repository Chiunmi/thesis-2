const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { mongodUrl, atlasUrl, port } = require('./utils/config');

const userRoute = require('./routes/user');
const medicalRoute = require('./routes/medical');

const passport = require('./utils/passport');
const auth = require('./middlewares/jwtAuth');

const app = express();

const startServer = async () => {
    mongoose.connect(mongodUrl)
        .then(() => {
            app.listen(3000, () => {
                console.log(`Connected to DB, listening on port: ${port}`);
            })
        })
        .catch((err) => {
            console.log('Error:', err);
        });

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(passport.initialize());

    app.use('/', userRoute);
    app.use('/medical', auth, medicalRoute);

}

startServer();
