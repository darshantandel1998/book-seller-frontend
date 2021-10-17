const express = require('express');
const path = require('path');

const app = express();

const dist = path.join(__dirname, '/dist/book-seller-frontend');

app.use(express.static(dist));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: dist })
});

app.listen(process.env.PORT || 8081);
