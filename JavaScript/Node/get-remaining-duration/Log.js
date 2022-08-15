import * as readline from 'node:readline/promises';
import { stat, readFile, writeFile } from 'node:fs/promises';
// import { stdin as input, stdout as output } from 'node:process';

const DAY = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
};
const CONF = {
    DEFAULT_LOG_PATH: 'log.json',
    DAY_NUM: 5,
    AVG_TARGET: 11,
    // START_DAY: 'mon',
    END_DAY: 'fri'
};
const SUM_TARGET = CONF.DAY_NUM * CONF.AVG_TARGET;

export default class Log {
    log = [];
    logPath = CONF.DEFAULT_LOG_PATH;
    target = SUM_TARGET;
    
    get sum() {
        let sum = this.log.length ? 
            this.log.reduce((prev, ele) => /* {
                console.log({prev, ele, result: ele ? {
                    hours: [(prev?.hours ?? 0) + ele.hours],
                    minutes: [(prev?.minutes ?? 0) + ele.minutes]
                } : prev})
                return */ typeof ele.hours !== 'undefined' && typeof ele.minutes !== 'undefined' ? {
                hours: (prev?.hours ?? 0) + ele.hours,
                minutes: (prev?.minutes ?? 0) + ele.minutes
            } : prev/* , sum */ /* } */)
            : {
                hours: 0,
                minutes: 0
            };
        sum = this.carry(sum);
        return sum;
    }
    
    get needed() {
        const { sum } = this;
        let needed = sum.minutes ? {
            hours: this.target - sum.hours - 1,
            minutes: 60 - sum.minutes + 2
        } : {
            hours: this.target - sum.hours,
            minutes: 2
        };
        needed = this.carry(needed);
        return needed;
    }

    get predict() {
        console.log(this.log[(new Date(Date.now()).getDay())]);
    }

    get avg() {
        const { 
            sum/* : { hours: sumHours, minutes: sumMinutes } */, 
            needed/* : { hours: neededHours, minutes: neededMinutes }  */
        } = this;
        const currDay = (new Date(Date.now()).getDay());
        // const sumDay = (new Date(Date.now())).getDay() - DAY[CONF.START_DAY];
        const neededDays = DAY[CONF.END_DAY] - currDay + 1;
        // console.log(Math.ceil(((neededHours % neededDays) / neededDays) * 60) + Math.ceil(neededMinutes / neededDays));
        return { 
            needed: this.getAvgTime(needed.hours, needed.minutes, neededDays/* neededHours, neededMinutes, neededDays */), 
            sum: this.getAvgTime(sum.hours, sum.minutes, CONF.DAY_NUM/* sumHours, sumMinutes, CONF.DAY_NUM */)
        };
    }

    constructor(
        logPath = CONF.DEFAULT_LOG_PATH, 
        target = SUM_TARGET
    ) {
        this.logPath = logPath;
        this.target = target;
        // this.getLog();
    }

    getAvgTime(hours, minutes, days) { 
        return this.carry({
            hours: Math.floor(hours / days),
            minutes: Math.ceil(
                ((hours % days) / days) * 60
            ) + Math.ceil(minutes / days)
        });
    }

    /* async */ getCurrDay() {
        /* await */ return new Promise(async (resolve, reject) => {
            const hint = Object.entries(DAY).reduce((prev, ele) => prev + `${ele[0]}: ${ele[1]}; `, '')
            const dayKey = await this.reader.question(`${hint} \n输入字母选项并回车：`);
            // console.log('getting')
            // const dayDiff = new Date(Date.now()).getDay() - DAY[dayKey];
            typeof(DAY[dayKey]) !== 'undefined' ? 
                resolve(DAY[dayKey])
                :
                reject(new Error('请输入范围内的选项'));
            // return dayDiff;
        })
    }

    // /* async */ getDiff() {
    //     /* await */ return new Promise(async (resolve, reject) => {
    //         const dayKey = await this.reader.question(`${
    //             Object.entries(DAY).reduce((prev, ele) => prev + `${ele[0]}: ${ele[1]}; `, '')
    //         } \n输入字母选项并回车：`);
    //         // console.log('getting')
    //         const dayDiff = new Date(Date.now()).getDay() - DAY[dayKey];
    //         if (Number.isNaN(dayDiff)) { reject(new Error('请输入范围内的选项')); /* return; */ }
    //         resolve(dayDiff);
    //         // return dayDiff;
    //     })
    // }

    async interaction() {
        const ACTION = {
            LOG_YESTERDAY: 'y',
            LOG_FORMER: 'f',
            DELETE_FROM_LOG: 'd',
            LOG_TODAY: 't',
            LOG_WEEK_HISTORY: 'w',
            LIST: 'l',
            QUIT: 'q'
        };
        await this.getLog();
        // const avgNeeded = this.avg;
        const { 
            sum/* : { hours: sumHours, minutes: sumMinutes } */, 
            needed/* : { hours: neededHours, minutes: neededMinutes } */, 
            avg: { needed: avgNeeded, sum: avgSum }
        } = this;
        console.log(
            `已有 ${sum.hours}h ${sum.minutes}m，`,
            `均约 ${avgSum.hours}h ${avgSum.minutes} m`,
            `\n尚需 ${needed.hours}h ${needed.minutes}m，`,
            `均约 ${avgNeeded.hours}h ${avgNeeded.minutes} m`,
            this.predict
        );
        const reader = readline.createInterface({ input: process.stdin, output: process.stdout });
        this.reader = reader;
        const hint = `操作： [${
            ACTION.LOG_YESTERDAY}] 录昨日; [${
                ACTION.LOG_FORMER
            }] 录往日; [${
                ACTION.DELETE_FROM_LOG
            }] 删往日; \n\t[${
                ACTION.LIST
            }] 查看列表; [${
                ACTION.QUIT
            }或enter] 退出 \n输入字母选项并回车：`;
        const action = await reader.question(hint);
        switch(action) {
            case ACTION.LOG_YESTERDAY: { await this.logging(); break };    //录昨日
            case ACTION.LOG_FORMER: {     //录往日
                await this.getCurrDay()
                    .then(async day => await this.logging(day))
                    .catch(err => console.error(err.message));
                // await this.getDiff()
                //     .then(async dayDiff => await this.logFormer(dayDiff))
                //     .catch(console.error);
                break; 
            }
            case ACTION.DELETE_FROM_LOG: {     //删往日
                await this.getCurrDay()
                    .then((day => this.deleteFromLog.call(this, day)))
                    .catch(err => console.error(err.message));
                // await this.getDiff()
                //     .then((dayDiff => this.deleteFromLog.call(this, dayDiff)))
                //     .catch(console.error);
            }
            case ACTION.LOG_TODAY: { await this.logToday(); }
            case ACTION.LOG_WEEK_HISTORY: {
                this.logWeekHistory();
            }
            case ACTION.LIST: { console.log(this.log); }
            case ACTION.QUIT: { break; }
        }
        reader.close();
    }

    async logging(day) {
    // async logFormer(dayDiff) {
        const { reader } = this;
        const startHours = await reader.question('始时：');
        const startMinutes = await reader.question('始分：');
        const endHours = await reader.question('终时：');
        const endMinutes = await reader.question('终分：');
        // const startHours = 9;
        // const startMinutes = 46;
        // const endHours = 20;
        // const endMinutes = 45;
        this.refreshLog({
            day,
            // dayDiff,
            startHours,
            startMinutes,
            endHours,
            endMinutes
        });
    }

    async logToday() {
        const { reader } = this;
        const hours = Number.parseInt(await reader.question('始时：'));
        const minutes = Number.parseInt(await reader.question('始分：'));
        const now = new Date(Date.now());
        const currDatePara = {
            year: now.getFullYear(),
            monthIndex: now.getMonth(),
            date: now.getDate(),
            day: now.getDay()
        };
        const start = new Date(
            currDatePara.year,
            currDatePara.monthIndex,
            currDatePara.date, 
            hours, 
            Number.parseInt(minutes) + 1
        );
        const { needed: avgNeeded } = this.avg;
        console.log({hours, minutes, avgNeeded, h: hours + avgNeeded.hours,
            m: minutes + avgNeeded.minutes + 1})
        const end = new Date(
            currDatePara.year,
            currDatePara.monthIndex,
            currDatePara.date,
            hours + avgNeeded.hours,
            minutes + avgNeeded.minutes + 1
        )
        console.log(start.toLocaleString(), end.toLocaleString());
        // const diff = end - start
        this.log[currDatePara.day] = {
        // this.log[currDatePara.day - dayDiff] = {
            // hours: (Math.floor(diff / 3600000)) % 60,
            // minutes: (diff / 60000) % 60,
            predict: {
                hours: end.getHours(),
                minutes: end.getMinutes(),
                details: `[${Object.keys(DAY)[currDatePara.day]}] ${hours}:${minutes} ~ ${end.getHours()}:${end.getMinutes()}`
            }
            // (diff / 1000) % 60, 
            // diff % 1000, 
        }
        writeFile(this.logPath, JSON.stringify(this.log));
    }

    logWeekHistory() {
        console.log(this.avg);
        this.log.history = this.avg.sum;
        writeFile(this.logPath, JSON.stringify(this.log));
    }

    async readLogFile() {
        return await readFile(this.logPath, { encoding: 'utf-8' })
            .then(data => /* console.log( */JSON.parse(data)/* ) */)
            .catch(err => console.error(err.message));
        }

    async getLog() {
        this.log = (
            await stat(this.logPath)
                .then(stat => stat.isFile())
                .catch(_ => {
                    console.error('判断异常');
                    return false;
                })
        ) ?
            await this.readLogFile() 
            :
            []; 
        // console.log('debug', b)
        // this.log = b
    }

    refreshLog({
        day = (new Date(Date.now())).getDay() - 1,
        // dayDiff = 1,
        startHours,
        startMinutes,
        endHours,
        endMinutes
    }) {
        // console.log({dayDiff})
        const now = new Date(Date.now());
        const currDatePara = {
            year: now.getFullYear(),
            monthIndex: now.getMonth(),
            date: now.getDate(),
            day: now.getDay()
        };
        // console.log(currDatePara);
        const start = new Date(
            currDatePara.year,
            currDatePara.monthIndex,
            currDatePara.date, 
            startHours, 
            Number.parseInt(startMinutes) + 1
        );
        const end = new Date(
            currDatePara.year,
            currDatePara.monthIndex,
            currDatePara.date,
            endHours,
            Number.parseInt(endMinutes) - 1
        )
        // console.log(start.toLocaleString(), end.toLocaleString());
        const diff = end - start
        this.log[day] = {
        // this.log[currDatePara.day - dayDiff] = {
            hours: (Math.floor(diff / 3600000)) % 60,
            minutes: (diff / 60000) % 60,
            details: `[${Object.keys(DAY)[currDatePara.day - 1]}] ${startHours}: ${startMinutes} ~ ${endHours}: ${endMinutes}`
            // (diff / 1000) % 60, 
            // diff % 1000, 
        }
        writeFile(this.logPath, JSON.stringify(this.log));
    }

    deleteFromLog(day = 1) {
        // const currDay = new Date(Date.now()).getDay();
        console.log({deleted: day})
        delete this.log[day];
        writeFile(this.logPath, JSON.stringify(this.log));
    }

    // deleteFromLog(dayDiff = 1) {
    //     const currDay = new Date(Date.now()).getDay();
    //     console.log({deleted: this/* .log */})
    //     delete this.log[currDay - dayDiff];
    //     writeFile(this.logPath, JSON.stringify(this.log));
    // }

    carry(time) {
        time.hours += Math.floor(time.minutes / 60);
        time.minutes %= 60;
        return time;
    }
}