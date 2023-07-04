const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './static')));

const STATIC_PORT = 3000;
app.listen(STATIC_PORT, () => console.log(`Pages server running at port ${STATIC_PORT}`));