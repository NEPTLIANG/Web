const fs = require('fs');

fs.readFile('./file.txt', (err, buffer) => {
	if (err) { throw err; }
	console.log(buffer.toString());
});
