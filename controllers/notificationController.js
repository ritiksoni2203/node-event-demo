const nodemailer = require('nodemailer');
const Event = require('../models/eventSchema');
const User = require('../models/userSchema');
const cron = require('node-cron')

module.exports = {
    scheduleEventNotification: async (eventId, userId) => {
        const event = await Event.findById(eventId);
        const user = await User.findById(userId);

        if (!event || !user) {
            throw new Error('Event or user not found');
        }

        const notificationTime = new Date(event.datetime.getTime() - 10 * 60000);
        
        const task = cron.schedule(notificationTime.getMinutes() + ' ' + notificationTime.getHours() + ' ' + notificationTime.getDate() + ' ' + (notificationTime.getMonth() + 1) + ' *', async () => {

            try {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'ritiksoni.dignizant@gmail.com',
                        pass: 'vodrnbazxdosrrea',
                    },
                });

                await transporter.sendMail({
                    from: 'ritiksoni.dignizant@gmail.com',
                    to: user.username,
                    subject: 'Event Notification',
                    text: `Hello, you have an upcoming event "${event.title}" scheduled at ${event.datetime} in ${event.location}.`,
                });

                console.log('Email sent successfully.');
            } catch (error) {
                console.error('Error sending email:', error);
            }

            task.stop();
        });

        task.start();
    }
}
