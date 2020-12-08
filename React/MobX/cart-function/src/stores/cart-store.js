/*
 * @Author: NeptLiang
 * @Date: 2020-11-25 15:49:01
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-08 18:23:12
 * @Description: 购物车Store
 */
import { 
    autorun,
    // makeAutoObservable,
    makeObservable,
    observable,
    computed,
    action
} from "mobx"

export default class CartStore {
    cart = []

    get itemCount() {
        return this.cart.length
    }

    constructor() {
        // makeAutoObservable(this)
        makeObservable(this, {
            cart: observable,
            itemCount: computed,
            addATShirt: action
        })
        this.cancelAutorun = autorun(() => {
            console.log(this.cart)
        })
        this.addATShirt = this.addATShirt.bind(this)
    }

    addATShirt(obj) {
        this.cart.push(obj)
        // console.log(this.cart)
    }
}