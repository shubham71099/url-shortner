const express = require('express');
const { generateShortUrl, expandShortUrl, getUrlAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/url', generateShortUrl);

router.get('/:shortId', expandShortUrl);

router.get('/url/analytics/:shortId', getUrlAnalytics);

module.exports = router;