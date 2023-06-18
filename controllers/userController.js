const User = require('../models/userSchema');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'Bad request' });
    }
}