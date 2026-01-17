const shortid = require('shortid');
const validator = require('validator');
const URL = require('../models/url');
const { baseUrl } = require('../config');

async function generateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let validatedUrl = body.url;
  if (!validator.isURL(validatedUrl, { require_protocol: true })) {
    validatedUrl = `https://${validatedUrl}`;
  }

  if (!validator.isURL(validatedUrl, { require_protocol: true })) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const existingUrl = await URL.findOne({ redirectUrl: validatedUrl });
  if (existingUrl) {
    return res.json({ id: `${baseUrl}/${existingUrl.shortId}` });
  }

  try {
    const shortId = shortid();
    const newUrl = await URL.create({
      shortId: shortId,
      redirectUrl: validatedUrl,
      visitHistory: [],
    });
    return res.json({ id: `${baseUrl}/${newUrl.shortId}` });
  } catch (err) {
    const existing = await URL.findOne({ redirectUrl: validatedUrl });
    return res.json({ id: `${baseUrl}/${existing.shortId}` });
  }
}

async function expandShortUrl(req, res) {
    try {
    const { shortId } = req.params;
    const url = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!url) {
      return res.status(404).send('Invalid short URL');
    }

    let redirectUrl = url.redirectUrl;
    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
      redirectUrl = 'https://' + redirectUrl;
    }
    res.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error : '+err);
  }
}

async function getUrlAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({  
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
        createdAt: result.createdAt,
    });
}

module.exports = {
    generateShortUrl,
    expandShortUrl,
    getUrlAnalytics,
};