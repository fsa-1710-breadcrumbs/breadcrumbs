const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 1337;

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
