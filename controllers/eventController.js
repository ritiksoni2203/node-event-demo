const Event = require('../models/eventSchema');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('invitedUsers');
        res.json(events);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Bad request' });
    }
}