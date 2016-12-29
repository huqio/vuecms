<template>
    <div class="tmpl">
        <ul>
            <li v-for="item in shopCarDatas">
                goodsid=  {{item.goodsid}} ----  count= {{item.count}}
            </li>
        </ul>

    </div>
</template>
<style>


</style>
<script>
    import shopcarkits from '../goods/shopcarkits.js'
    export default{
        data(){
            return {
                shopCarDatas:[]
            }
        },
        created(){
            // 1.0 合并商品id相同的count
            let datas = shopcarkits.reloadShopCarList();
            if(!datas)
            {
                return;
            }
            // 2.0 合并相同id的count作为goods的key
            let goods={};
            datas.forEach((item)=>{
                //item 的格式为-> {goodsid:1,count:1}
                if(goods[item.goodsid]){
                goods[item.goodsid] = goods[item.goodsid]+item.count;
            }else{
                goods[item.goodsid] = item.count;
            }
            });

            // 3.0 遍历goods中所有key获取商品数据
            let keys = [];
            for(let key in goods){
                keys.push(key);
            }
            let keyStr = keys.join(',');

            //4.0 请求服务器获取数据

           this.shopCarDatas =datas
        }
    }

</script>
