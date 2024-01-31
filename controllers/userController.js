const User = require('../models/user');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;


exports.saveBirthdate = async (req, res) => {
    try {
        const { googleId, birthdate } = req.body;
        console.log(req.body);

        // Find the user by Google ID and update the birthdate
        const user = await User.findOneAndUpdate({ googleId: googleId }, { $set: { birthdate: birthdate } }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found ! ' + { user } });
        }
        if (!birthdate || isNaN(new Date(birthdate))) {
            return res.status(400).send({ error: 'Invalid birthdate format!' });
        }

        // const user = new User({ birthdate });
        await user.save();

        res.status(200).send({ message: 'Birthdate updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while saving the birthdate' });
    }
};

exports.saveuser = async (req, res) => {
    try {
        // const { name, email, googleId } = req.body;
        const userData = req.body;
        console.log('Received user data: backend!', userData);

        const user = new User({
            displayName: userData.name,
            googleId: userData.googleId,
            picture: userData.picture,
            email: userData.email,
            birthdate: userData.birthdate
        });
        await user.save();

        res.json({ success: true, message: 'User data saved successfully on backend!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while saving User data on backend!' });
    }
};