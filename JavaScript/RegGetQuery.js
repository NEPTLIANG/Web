/*
 * @Author: NeptLiang
 * @Date: 2021-02-19 18:47:48
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-02-23 17:51:33
 * @Description: 正则获取GET参数
 */

/**
 * 正则获取GET参数
 * @param {boolean} decodeUC 是否decodeURIComponent参数
 */
function regGetQuery(decodeUC = true, query = {}) {
    location.search.match(/(\w+=[^?&]*)/g).forEach(q => {
        query[q.split('=')[0]] = decodeUC ? decodeURIComponent(q.split('=')[1]) : q.split('=')[1];;
    })
    return query;
};

regGetQuery()