/*
 * @Author: NeptLiang
 * @Date: 2022-04-20 21:42:12
 * @LastEditors: NeptLiang
 * @LastEditTime: 2022-04-20 21:45:18
 * @Description: async-await demo
 */
import fs from 'fs'

const readFile1 = () => new Promise((resolve, reject) => fs.readFile('./res/file1.txt', (err, data) => {
	if (err) { reject({ err1: err}); }
	else { resolve(data.toString()); }
}));
	
const readFile2 = () => new Promise((resolve, reject) => fs.readFile('./res/file2.txt', (err, data) => {
	if (err) { reject({ err2: e}); }
	else { resolve(data.toString()); }
}));

const readFile3 = () => new Promise((resolve, reject) => fs.readFile('./res/file3.txt', (err, data) => {
	if (err) { reject({ err3: e }); }
	else { resolve(data.toString()); }
}));

const asyncReadAllFile = async () => {
	const data1 = await readFile1();
	const data2 = await readFile2();
	const data3 = await readFile3();
	console.log({ data1, data2, data3 });
};

asyncReadAllFile();