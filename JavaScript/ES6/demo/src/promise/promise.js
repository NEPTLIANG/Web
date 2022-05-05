const fs = require('fs');

// 封装Promise，读取文件1
const readFile = new Promise((resolve, reject) => {
	fs.readFile('./test-file/file1.txt', (err, buffer) => {
		if (err) { 
			reject({ location: 1, err }); 
		}
		resolve([ buffer.toString() ]);
	});
})

// 调用
readFile.then(data => {
	console.log('readedFile1: ', data);
	// 读取文件2 	
	return new Promise((resolve, reject) => {
		fs.readFile('./test-file/file2.txt', (err, buffer) => {
			if (err) { reject({ location: 2, err}); }
			resolve([
				...data,
				buffer.toString()
			]);
		});
	})
}).then(data => {
	console.log('readedFile2:', data);
	// 读取文件3
	return new Promise((resolve, reject) => {
		fs.readFile('./test-file/file3.txt', (err, buffer) => {
			if (err) { reject({ location: 3, err}); }
			resolve([ ...data, buffer.toString() ]);
		});
	})
}).then(results => {
	console.log('results:', results.join(''));
	return results;
}).catch(err => {
	throw err;
});
