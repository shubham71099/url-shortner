const express = require('express');
const urlRouter = require('./routes/url');
const connectDB = require('./connect');
const cors = require('cors');
const app = express();
const { port, mongoUrl, frontendUrl } = require('./config');

connectDB(mongoUrl)
.then(() => {
    console.log('Connected to mongoDB');
})
.catch((err) => {
    console.error('DB connection error:', err);
});

app.use(express.json());
app.use(cors({
  origin: frontendUrl
}));

app.use('/', urlRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});