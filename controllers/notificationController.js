const cron = require('node-cron');
const Event = require('../models/eventSchema');
const User = require('../models/userSchema');

module.exports = {
    scheduleEventNotification: async (eventId, userId) => {
        const event = await Event.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            throw new Error('Event or user not found');
        }

        const notificationTime = new Date(event.datetime.getTime() - 10 * 60000);

        const task = cron.schedule(notificationTime.getMinutes() + ' ' + notificationTime.getHours() + ' ' + notificationTime.getDate() + ' ' + (notificationTime.getMonth() + 1) + ' *', () => {
            console.log(`Sending notification to user ${user.username} for event ${event.title}`);
            task.stop();
        });

        task.start();
    }
}
