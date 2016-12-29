/*
 手工刷新购物车件数 :reloadCount
 和刷新购物车商品列表:reloadShopCarList
* */
const key  = 'shopcardata';
//localStorage来存储购物车数据
const locstorage = window.localStorage;

function reloadCount(){
    let datas = locstorage.getItem(key);
    if(!datas){
        return 0;
    }
    let shopCardatas = JSON.parse(datas);
    let tmpcount = 0;
    shopCardatas.forEach((item)=>{
        tmpcount+=item.count;
    });
    return tmpcount;
}

function reloadShopCarList(){
    let datas = locstorage.getItem(key);
    if(!datas){
        return [];
    }
    let shopCardatas = JSON.parse(datas);
    return shopCardatas;
}

export default {
    reloadCount,
    reloadShopCarList
}