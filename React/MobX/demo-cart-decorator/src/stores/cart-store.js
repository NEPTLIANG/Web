/*
 * @Author: NeptLiang
 * @Date: 2020-11-25 15:49:01
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-04 11:21:45
 * @Description: 购物车Store
 */
import { 
    // observer
    // computed,
    // action,
    // autorun
} from 'mobx-react'
import { 
    computed, 
    action,
    autorun, 
    observable
} from 'mobx'
// import React from 'react'

export default class CartStore {
    // @observer cart = []
    @observable cart = []
    
    // @computed get itemCount = () => {
    @computed get itemCount() {
        return this.cart.length
    }

    constructor() {
        this.cancelAutorun = autorun(() => {
            console.log(this.cart)
        })
        // this.addATShirt = this.addATShirt.bind(this)
    }

    // @action addATShirt = () => {
    @action.bound addATShirt() {
        this.cart.push({
            name: `T-Shirt${this.itemCount}`,
            price: this.itemCount
        })
        // console.log(this.cart)
    }
}