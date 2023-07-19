const invitationService = require('../services/invitationService');

module.exports = {
    sendInvitation: async (req, res) => {
        try {
            const { event, sender, recipient, message } = req.body;
            const invitationRecord = await invitationService.sendInvitation(event, sender, recipient, message);
            res.status(201).json(invitationRecord);
        } catch (err) {
            console.log(err);
            res.status(404).json({ error: err.message });
        }
    },

    getInvitations: async (req, res) => {
        try {
            const { userId } = req;
            const invitations = await invitationService.getInvitationsByRecipient(userId);
            const response = {
                status: true,
                message: 'All invitations fetched successfully.',
                data: invitations,
            };
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(404).json({ error: err.message });
        }
    },

    acceptInvitation: async (req, res) => {
        try {
            const { invitationId } = req.params;
            const { status } = req.body;
            const invitation = await invitationService.acceptInvitation(invitationId, status);
            res.json(invitation);
        } catch (err) {
            console.log(err);
            res.status(404).json({ error: err.message });
        }
    },
};
