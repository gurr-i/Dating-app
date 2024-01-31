const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('./models/user.js');
require("dotenv").config();


// const UserSchema = new mongoose.Schema({
//   googleId: String,
//   email: String,
//   displayName: String,
//   photos: Array,
//   birthdate: Date,
//   // add other fields as needed
// });

// const User = mongoose.model("User", UserSchema);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("GoogleStrategy callback called");
      // Check if the email domain is of the specific college
      try {
        console.log("User profile:", profile);
        const emailDomain = profile.emails[0].value.split("@")[1];
        if (emailDomain === "btech.nitdgp.ac.in") {
          console.log("User profile:", profile);

          const user = await User.findOneAndUpdate(
            { googleId: profile.id },
            {
              email: profile.emails[0].value,
              displayName: profile.displayName,
              photos: profile.photos,
            },
            { upsert: true, new: true }
          );

          if (!user) {
            console.error("Error inserting user");
            cb(new Error("Error inserting user"));
          } else {
            console.log("User inserted");
            cb(null, user);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        cb(err);
      }
    }
  )
);
