const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");
const PersonalInfo = require("../models/personalInfo");
const MedicalInfo = require("../models/medicalRecords/medicalInfo");
const EducationInfo = require("../models/educationInfo");
const { clientId, clientSecret } = require("./config");

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        /* 
        Check if the email ends with @pcu.edu
        const email = profile.emails[0].value;

        if (!email.endsWith('@pcu.edu.ph')) {
             console.log('Only @pcu.edu emails are allowed')
             return done(null, false, { message: 'Only @pcu.edu emails are allowed' });
         }
        */
        console.log("profile:", profile);
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            pfp: profile.photos[0].value,
            email: profile.emails[0].value,
          });

          await PersonalInfo.create({
            userId: user._id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });

          await MedicalInfo.create({
            userId: user._id,
          });

          await EducationInfo.create({
            userId: user._id,
          });
        } else {
          user.pfp = profile.photos[0].value;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
