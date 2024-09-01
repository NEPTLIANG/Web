const getType = (val) => {
    const type = typeof val;
    if (type !== 'object') {
        return type;
    }
    return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1');
};
export default class NumberConversion {
    constructor(val) {
        this.val = 0;
        this.initVal = val;
        const action = {
            number: () => {
                typeof val === 'number' ?
                    this.convertNumber(val) : NaN;
            },
            string: () => {
                typeof val === 'string' ?
                    this.convertString(val) : NaN;
            },
            boolean: () => {
                typeof val === 'boolean' ?
                    this.convertBoolean(val) : NaN;
            },
            Null: () => {
                val === null ?
                    this.convertNullOrUndefined(val) : NaN;
            },
            undefined: () => {
                val === undefined ?
                    this.convertNullOrUndefined(val) : NaN;
            },
            symbol: () => {
                typeof val === 'symbol' ?
                    this.convertSymbol(val) : NaN;
            }
        };
        action[this.initType]();
        // this.val = new Number(val);
    }
    get initType() {
        // const type = getType(this.initVal);
        return getType(this.initVal) /* type */;
    }
    [Symbol.toPrimitive]() {
        return this.initType;
    }
    convertNumber(val) {
        this.val = new Number(val);
    }
    judgeIntegerStr(val) {
        var _a;
        console.log({ val });
        const NUMBER_PATTERN = [
            /^[+-]?(\d+\.)?\d+/,
            /^([+-]?0b[12]+)/,
            /^([+-]?0o[0~8]+)/,
            /^([+-]?0x[0~9a~fA~F]+)/
        ];
        console.log({ val });
        for (const pattern of NUMBER_PATTERN) {
            if (!pattern.test(val)) {
                continue;
            }
            const subResult = (_a = val.match(pattern)) === null || _a === void 0 ? void 0 : _a[1];
            if (subResult === null || subResult === undefined) {
                continue;
            }
            const int = Number.parseFloat(subResult);
            return new Number(int);
        }
        ;
        return null;
    }
    judgeFloatStr(val) {
        var _a;
        const PATTERN = /^[+-]?(\d+\.)?\d+/;
        if (!PATTERN.test(val)) {
            return null;
        }
        const subResult = (_a = val.match(PATTERN)) === null || _a === void 0 ? void 0 : _a[1];
        if (subResult === undefined || subResult === null) {
            return null;
        }
        return new Number(subResult);
    }
    convertString(val) {
        // if (typeof val !== 'string') { break; }
        if (val === '') {
            this.val = 0;
            return;
        }
        const judgeIntResult = this.judgeIntegerStr(val);
        if (judgeIntResult !== null) {
            this.val = judgeIntResult;
            return;
        }
        const judgeFloatResult = this.judgeFloatStr(val);
        if (judgeFloatResult !== null) {
            this.val = judgeFloatResult;
            return;
        }
        this.val = NaN;
    }
    convertBoolean(val) {
        this.val = val ? 1 : 0;
    }
    convertNullOrUndefined(val) {
        this.val = 0;
    }
    convertSymbol(val) {
        this.val = NaN;
    }
}
