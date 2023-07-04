const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '.')));

const PORT2 = 4000;
app.listen(PORT2, () => console.log(`Server 2 is running at port ${PORT2}`));