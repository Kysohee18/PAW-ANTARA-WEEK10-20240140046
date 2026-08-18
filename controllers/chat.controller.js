const { askGemini } = require('../services/gemini.service');
const { ChatHistory } = require('../models');
const sendResponse = require('../utils/response');

async function chat(req, res) {
  try {
    const { message, save_history } = req.body;

    const reply = await askGemini(message);

    if (save_history === true) {
      await ChatHistory.create({
        message,
        response: reply,
      });
    }

    return sendResponse(res, {
      message: 'Berhasil dapat balasan',
      data: { reply },
    });
  } catch (err) {
    console.error('Gemini error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

async function getHistory(req, res) {
  try {
    const history = await ChatHistory.findAll({
      order: [['createdAt', 'ASC']],
    });

    return sendResponse(res, {
      message: 'Berhasil mengambil riwayat percakapan',
      data: history,
    });
  } catch (err) {
    console.error('Get history error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal mengambil riwayat percakapan',
    });
  }
}

module.exports = {
  chat,
  getHistory,
};
