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
    END_DAY: 'fri'
};
const SUM_TARGET = CONF.DAY_NUM * CONF.AVG_TARGET;

export default class Log {
    data = {};
    logPath = '';
    target = '';
    
    get sum() {
        let sum = (
            this.data.list?.length ? 
                this.data.list.reduce((prev, ele) => typeof ele?.hours !== 'undefined' && typeof ele?.minutes !== 'undefined' ? {
                    hours: (prev?.hours ?? 0) + ele.hours,
                    minutes: (prev?.minutes ?? 0) + ele.minutes
                } : prev)
                : {
                    hours: 0, minutes: 0
                }
        ) ?? { hours: 0, minutes: 0 };
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
        const now = new Date(Date.now());
        const { predict } = this.data.list[now.getDay()] ?? {};
        if(!predict) { return; }
        const { needed: avgNeeded } = this.avg;
        const end = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            predict.hour + avgNeeded.hours,
            predict.minute + avgNeeded.minutes + 1
        );
        return {
            hour: end.getHours(),
            minute: end.getMinutes()
        };
    }

    get avg() {
        const { sum, needed } = this;
        const currDay = (new Date(Date.now())).getDay();
        // const sumDay = (new Date(Date.now())).getDay() - DAY[CONF.START_DAY];
        const neededDays = DAY[CONF.END_DAY] - currDay + 1;
        return { 
            needed: this.getAvgTime(needed.hours, needed.minutes, neededDays), 
            sum: this.getAvgTime(sum.hours, sum.minutes, CONF.DAY_NUM)
        };
    }

    constructor(
        logPath = CONF.DEFAULT_LOG_PATH, 
        target = SUM_TARGET
    ) {
        this.logPath = logPath;
        this.target = target;
    }

    getAvgTime(hours, minutes, days) { 
        return this.carry({
            hours: Math.floor(hours / days),
            minutes: Math.ceil(
                ((hours % days) / days) * 60
            ) + Math.ceil(minutes / days)
        });
    }

    readDayInput() {
        return new Promise(async (resolve, reject) => {
            const hint = Object.entries(DAY).reduce((prev, ele) => prev + `${ele[0]}: ${ele[1]}; `, '')
            const dayKey = await this.reader.question(`${hint} \n输入字母选项并回车：`);
            typeof(DAY[dayKey]) !== 'undefined' ? 
                resolve(DAY[dayKey])
                :
                reject(new Error('请输入范围内的选项'));
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
            LOG_YESTERDAY: 'y',     //录昨日
            LOG_FORMER: 'f',    //录往日
            DELETE_FROM_LOG: 'd',   //删往日
            LOG_TODAY: 't',     //录今日用于预计
            LOG_WEEK_HISTORY: 'w',      //录入一周均值
            LIST: 'l',      //显示日志
            CLEAN: 'Clean up the log',      //清空日志
            QUIT: 'q'
        };
        await this.getLog();
        const { 
            sum, 
            needed, 
            avg: { needed: avgNeeded, sum: avgSum },
            predict
        } = this;
        const now = new Date(Date.now());
        const predictInfo = typeof predict !== 'undefined' ?
            `，预计${(
                new Date(
                    now.getFullYear(), 
                    now.getMonth(), 
                    now.getDate(), 
                    predict.hour, 
                    predict.minute
                )
            ).toTimeString().match(/^(\d\d:\d\d):\d\d GMT\+\d\d\d\d.*$/)[1]}`
            : ''
        console.log(
            `已有 ${sum.hours}h ${sum.minutes}m，`,
            `均约 ${avgSum.hours}h ${avgSum.minutes}m`,
            `\n尚需 ${needed.hours}h ${needed.minutes}m，`,
            `均约 ${avgNeeded.hours}h ${avgNeeded.minutes}m`,
            predictInfo
        );
        const reader = readline.createInterface({ 
            input: process.stdin, 
            output: process.stdout 
        });
        this.reader = reader;
        const hint = `操作： [${
            ACTION.LOG_YESTERDAY}] 录昨日; [${
                ACTION.LOG_FORMER
            }] 录往日; [${
                ACTION.DELETE_FROM_LOG
            }] 删往日; \n\t[${
                ACTION.LOG_TODAY
            }]: 录今日; [${
                ACTION.LOG_WEEK_HISTORY
            }]: 录本周均值; \n\t[${
                ACTION.CLEAN
            }]; 清空日志列表 \n\t[${
                ACTION.LIST
            }] 查看列表; [${
                ACTION.QUIT
            }或enter] 退出 \n输入字母选项并回车：`;
        const action = await reader.question(hint);
        switch(action) {
            case ACTION.LOG_YESTERDAY: { await this.logging(); break; };
            case ACTION.LOG_FORMER: {
                await this.readDayInput()
                    .then(async day => await this.logging(day))
                    .catch(err => console.error(err.message));
                break; 
            }
            case ACTION.DELETE_FROM_LOG: {
                await this.readDayInput()
                    .then(day => this.deleteFromLog.call(this, day))
                    .catch(err => console.error(err.message));
                break;
            }
            case ACTION.LOG_TODAY: { await this.logToday(); break; }
            case ACTION.LOG_WEEK_HISTORY: { this.logWeekHistory(); break; }
            case ACTION.LIST: { console.log(this.data); break; }
            case ACTION.CLEAN: { this.cleanLog(); break; }
            case ACTION.QUIT: { break; }
        }
        reader.close();
    }

    async logging(day) {
        const { reader } = this;
        const startHours = await reader.question('始时：');
        const startMinutes = await reader.question('始分：');
        const endHours = await reader.question('终时：');
        const endMinutes = await reader.question('终分：');
        this.refreshLog({
            day,
            startHours,
            startMinutes,
            endHours,
            endMinutes
        });
    }

    async logToday() {
        const { reader } = this;
        const hour = Number.parseInt(await reader.question('始时：'));
        const minute = Number.parseInt(await reader.question('始分：'));
        const now = new Date(Date.now());
        const { needed: avgNeeded } = this.avg;
        const end = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour + avgNeeded.hours,
            minute + avgNeeded.minutes + 1
        );
        const currDay = now.getDay();
        this.data.list[currDay] = {
            predict: {
                hour,
                minute,
                detail: `[${
                    Object.keys(DAY)[currDay]
                }] ${hour}:${minute} ~ ${end.getHours()}:${end.getMinutes()}`
            }
        };
        // console.log('logging', JSON.stringify(this.data))
        writeFile(this.logPath, JSON.stringify(this.data));
    }

    logWeekHistory() {
        this.data.history = this.avg.sum;
        writeFile(this.logPath, JSON.stringify(this.data));
    }

    cleanLog() {
        writeFile('log_staled.json', JSON.stringify(this.data));
        this.data.list = [];
        writeFile(this.logPath, JSON.stringify(this.data));
    }

    async readLogFile() {
        return await readFile(this.logPath, { encoding: 'utf-8' })
            .then(JSON.parse)
            .catch(err => console.error(err.message));
    }

    async getLog() {
        this.data = (
            await stat(this.logPath)
                .then(stat => stat.isFile())
                .catch(_ => false)
        ) ?
            (await this.readLogFile()) ?? { list: [] }
            :
            { list: [] }; 
    }

    refreshLog({
        day = (new Date(Date.now())).getDay() - 1,
        // dayDiff = 1,
        startHours,
        startMinutes,
        endHours,
        endMinutes
    }) {
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
        const diff = end - start
        this.data.list[day] = {
            hours: (
                Math.floor(diff / 3600000)
            ) % 60,
            minutes: (diff / 60000) % 60,
            detail: `[${
                Object.keys(DAY)[currDatePara.day - 1]
            }] ${startHours}: ${startMinutes} ~ ${endHours}: ${endMinutes}`
        }
        writeFile(this.logPath, JSON.stringify(this.data));
    }

    deleteFromLog(day) {
        delete this.data.list[day];
        writeFile(this.logPath, JSON.stringify(this.data));
    }

    carry(time) {
        time.hours += Math.floor(time.minutes / 60);
        time.minutes %= 60;
        return time;
    }
}