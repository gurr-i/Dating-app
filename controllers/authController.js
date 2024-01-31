const passport = require("passport");

exports.authenticateGoogle = passport.authenticate("google", { scope: ["profile", "email"] });

exports.googleCallback = passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
});

exports.failure = (req, res) => {
    res.send("Something went wrong");
};

exports.protectedRoute = (req, res) => {
    console.log("Accessing /auth/protected");
    console.log(req.user);
    const name = req.user.displayName;
    const picture =
        req.user.photos && req.user.photos.length > 0
            ? req.user.photos[0].value
            : "default_picture_url";
    res.redirect(
        `http://localhost:3001/success?name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`
    );
};

exports.index = (req, res) => {
    res.send('Welcome to the app!, Server running!');
};

// controllers/authController.js
exports.login = (req, res) => {
    // Implementation for login route
    res.send('Login route');
};

exports.logout = (req, res) => {
    // Implementation for logout route
    res.send('Logout route');
};
