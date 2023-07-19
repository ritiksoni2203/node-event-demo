const express = require('express');
const router = express.Router();
const { isAuthorized: checkAuth } = require('../middleware/checkAuth');
const invitationController = require('../controllers/invitationController');

router.post('/', invitationController.sendInvitation);
router.get('/', checkAuth, invitationController.getInvitations);
router.put('/:invitationId/accept', invitationController.acceptInvitation);

module.exports = router;