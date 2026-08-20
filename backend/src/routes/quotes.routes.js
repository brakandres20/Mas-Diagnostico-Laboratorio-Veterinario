const { Router } = require('express');
const { createQuote } = require('../controllers/quotes.controller');

const router = Router();

router.post('/', createQuote);

module.exports = router;