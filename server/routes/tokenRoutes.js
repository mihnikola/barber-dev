const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

router.post('/send-notification', tokenController.sendNotification);
router.post('/save-token',tokenController.saveToken);
// router.post('/', tokenController.postTokenToFCM);

module.exports = router;
