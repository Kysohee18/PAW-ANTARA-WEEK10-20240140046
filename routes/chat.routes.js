const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput.middleware');
const { chat, getHistory } = require('../controllers/chat.controller');

// endpoint public, user gak perlu login buat nanya ke CS bot
router.post('/', validateChatInput, chat);

// endpoint read riwayat percakapan
router.get('/', getHistory);
router.get('/history', getHistory);

module.exports = router;
