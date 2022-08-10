import Log from './Log.js'

(async function main() {
    let log = new Log();
    await log.interaction();
    // console.log(readFile(LOG_PATH, { encoding: 'utf-8' }).then(data => console.log(JSON.parse(data))));
})()