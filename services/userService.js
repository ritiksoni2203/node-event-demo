const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

module.exports = {
    registerUser: async (username, password) => {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        return newUser;
    },

    loginUser: async (username, password) => {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, '05ebb14a84aabcf4747f7481859dceea01b591f225cf7580a353fc3122fd7539');
        return token;
    }
}
