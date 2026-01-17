require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  mongoUrl: process.env.MONGO_URL,
  baseUrl: process.env.BASE_URL,
  frontendUrl: process.env.FORNTEND_URL,
};