const express = require('express');
const apiController = require('../api-call/index');

const router = express.Router();

router.get('/', apiController.response);

module.exports = router;