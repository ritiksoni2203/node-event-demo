const Event = require('../models/eventSchema');
const { scheduleEventNotification } = require('./notificationController');

module.exports = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find().populate('invitedUsers');
            const response = {
                status: true,
                message: "All events fetched successfully.",
                data: events
            }
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createEvent: async (req, res) => {
        try {
            const { title, datetime, location, invitedUsers } = req.body;

            const event = await Event.create(req.body);

            for (const userId of invitedUsers) {
                scheduleEventNotification(event._id, userId);
            }

            res.status(201).json(event);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: 'Bad request' });
        }
    }
}
