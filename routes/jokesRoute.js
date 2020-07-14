const express = require('express');
const apiController = require('../api-call/index');

const router = express.Router();

router.get('/', apiController.getJokes);

module.exports = router;