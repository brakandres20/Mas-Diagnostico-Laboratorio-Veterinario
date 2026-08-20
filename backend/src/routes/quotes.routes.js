const { Router } = require('express');
const { createQuote, listQuotes, updateStatus } = require('../controllers/quotes.controller');

const router = Router();

router.post('/', createQuote);
router.get('/', listQuotes);
router.patch('/:id', updateStatus);

module.exports = router;