const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './static')));

const PORT1 = 3000;
app.listen(PORT1, () => console.log(`Server 1 is running at port ${PORT1}`));