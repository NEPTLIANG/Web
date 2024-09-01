const getType = (val: unknown): string => {
    const type = typeof val;
    if (type !== 'object') { return type; }
    return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1');
}

export default class NumberConversion {
    private initVal: unknown;
    public val: Number = 0;

    get initType(): string {
        // const type = getType(this.initVal);
        return getType(this.initVal) /* type */;
    }

    constructor(val: unknown) {
        this.initVal = val;
        const action: { [key: string]: () => void } = {
            number: () => {
                typeof val === 'number' ? 
                    this.convertNumber(val) : NaN
            },
            string: () => {
                typeof val === 'string' ? 
                    this.convertString(val) : NaN
            },
            boolean: () => {
                typeof val === 'boolean' ?
                    this.convertBoolean(val) : NaN
            },
            Null: () => {
                val === null ?
                    this.convertNullOrUndefined(val) : NaN
            },
            undefined: () => {
                val === undefined ?
                    this.convertNullOrUndefined(val) : NaN
            },
            symbol: () => {
                typeof val === 'symbol' ?
                    this.convertSymbol(val) : NaN
            }
        };
        action[this.initType]();
        // this.val = new Number(val);
    }

    [Symbol.toPrimitive](): string {
        return this.initType;
    }

    convertNumber (val: number): void { 
        this.val = new Number(val); 
    }

    judgeIntegerStr(val: string): Number | null {
        console.log({val});
        const NUMBER_PATTERN = [
            /^[+-]?(\d+\.)?\d+/,     // '113..41=241.012a34.1324a'.match(/^[+-]?(\d+\.)?\d+/)
            /^([+-]?0b[12]+)/,
            /^([+-]?0o[0~8]+)/,
            /^([+-]?0x[0~9a~fA~F]+)/
        ]
        console.log({val}) 
        for (const pattern of NUMBER_PATTERN) {
            if (!pattern.test(val)) { continue; }
            const subResult = val.match(pattern)?.[1];
            if (subResult === null || subResult === undefined) { continue; }
            const int = Number.parseFloat(subResult);
            return new Number(int);
        };
        return null;
    }

    judgeFloatStr(val: string): Number | null {
        const PATTERN = /^[+-]?(\d+\.)?\d+/;
        if (!PATTERN.test(val)) { return null; }
        const subResult = val.match(PATTERN)?.[1]
        if (subResult === undefined || subResult === null) { return null; }
        return new Number(subResult);
    }

    convertString (val: string): void {
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

    convertBoolean(val: boolean): void {
        this.val = val ? 1 : 0;
    }

    convertNullOrUndefined(val: null | undefined): void {
        this.val = 0;
    }

    convertSymbol(val: Symbol): void {
        this.val = NaN;
    }
}