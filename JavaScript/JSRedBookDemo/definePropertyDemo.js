class ATM {
    query() {
        console.log('Query result:', this.balance_)
    }
}

Object.defineProperty(ATM.prototype, 'balance', {
    set(value) {
        this.balance_ = value;
    }
})

const atm = new ATM();
atm.balance = 50;
atm.query();
console.log(atm.balance);