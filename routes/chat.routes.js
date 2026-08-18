const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput.middleware');
const { chat } = require('../controllers/chat.controller');

// endpoint public, user gak perlu login buat nanya ke CS bot
router.post('/', validateChatInput, chat);

module.exports = router;
