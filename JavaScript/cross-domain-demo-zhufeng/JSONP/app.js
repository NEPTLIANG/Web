const express = require('express');
const { resolve } = require('path');

const app = express();

require('./api/sugrec')(app);

app.use(express.static(resolve(__dirname, './client')));

const PORT = 3000;
app.listen(PORT, () => console.log(PORT));