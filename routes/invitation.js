const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');

router.post('/', invitationController.sendInvitation);
router.put('/:invitationId/accept', invitationController.acceptInvitation);

module.exports = router;