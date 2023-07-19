const Invitation = require('../models/invitationSchema');
const User = require('../models/userSchema');
const Event = require('../models/eventSchema');

module.exports = {
  sendInvitation: async (event, sender, recipient, message) => {
    const events = await Event.findById(event);
    if (!events) {
      throw new Error('Event not found');
    }

    const senders = await User.findById(sender);
    if (!senders) {
      throw new Error('Sender not found');
    }

    const userRecord = await User.findOne({ _id: recipient });
    if (!userRecord) {
      throw new Error('One or more recipients not found');
    }

    const invitation = {
      event: event,
      sender: sender,
      recipient: recipient,
      message: message,
    };

    const invitationRecord = await Invitation.create(invitation);
    return invitationRecord;
  },

  getInvitationsByRecipient: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const invitations = await Invitation.find({ recipient: userId })
      .populate('event', 'title date location')
      .populate('sender', 'username')
      .select('-recipient');

    return invitations;
  },

  acceptInvitation: async (invitationId, status) => {
    const invitation = await Invitation.findByIdAndUpdate(invitationId, { status }, { new: true });
    return invitation;
  },
};
