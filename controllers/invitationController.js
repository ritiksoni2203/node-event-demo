const Invitation = require('../models/invitationSchema');

exports.sendInvitation = async (req, res) => {
    try {
        const invitation = new Invitation(req.body);
        await invitation.save();
    } catch (err) {
        res.status(400).json({ error: 'Bad Request' });
    }
};

exports.acceptInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;
        const invitation = await Invitation.findByIdAndUpdate(
            invitationId,
            { status: 'accepted' },
            { new: true }
        );
        res.json(invitation);
    }
    catch (err) {
        res.status(400).json({ error: 'Bad request' });
    }
};