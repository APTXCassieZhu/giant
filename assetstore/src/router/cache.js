const SEARCH_KEY='_search'
// 本地历史搜索最大缓存 10 条
const SEARCH_MAX_LENGTH=10

// arr存储的数据，val传入存储的值，compare前后比较的函数，maxlen存入的最大长度
function insertArray(arr, val, compare, maxlen) {
    const index = arr.findIndex(compare);
    if(index===0) {
        return
    }
    if(index > 0) {
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxlen && arr.length>maxlen) {
        arr.pop()
    }
}

import storage from 'good-storage'  
export function saveSearch(query){  
    let searches=storage.get(SEARCH_KEY,[])  
    //最后一次搜索的结果放到搜索历史的第一个
    insertArray(searches,query,(item)=>{       
        return item===query //这是传入的一个比较函数 说明query在这个数组中  
    },SEARCH_MAX_LENGTH)  
    storage.set(SEARCH_KEY,searches)  
    return searches  
} 