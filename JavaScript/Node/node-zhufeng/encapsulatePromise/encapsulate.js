const fs = require('fs');
const path = require('path');

function promisify(fn) {
    return (...args) => new Promise((resolve, reject) => {
        fn(...args, (error, data) => {
            if (error) { return reject(error); }
            resolve(data);
        });
    });
}

//test
const readFile = promisify(fs.readFile);
readFile(path.resolve(__dirname, 'a.txt'), 'utf8').then(data => {
    console.log(data);
}, err => {});