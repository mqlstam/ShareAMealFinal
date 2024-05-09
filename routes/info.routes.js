// routes/info.routes.js
const express = require('express');
const router = express.Router();
const infoController = require('../controllers/info.controller');

router.get('/info', infoController.getInfo);

module.exports = router;