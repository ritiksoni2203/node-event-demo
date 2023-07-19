const userService = require('../services/userService');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            await userService.registerUser(username, password);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const token = await userService.loginUser(username, password);

            res.json({ token });
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}
