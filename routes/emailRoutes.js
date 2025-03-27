const express = require('express');
const { authenticateGmail, handleGmailCallback, listGmailEmails } = require('../src/gmailService');
const router = express.Router();

// Gmail Routes

// router.get('/home', homePage);
router.get('/gmail/authenticate', authenticateGmail);
router.get('/auth/google/callback', handleGmailCallback); // Handles the redirect //iske sath code ata hai or uska use karna hota hai
router.get('/gmail/list', listGmailEmails);

module.exports = router;
