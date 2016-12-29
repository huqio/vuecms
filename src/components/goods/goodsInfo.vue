<template>
    <div class="tmpl">
        <!--1.0 商品图片滚动区域-->
        <comp-swipe class="compswipe" :list="imglist"></comp-swipe>

        <!--2.0 商品购物区-->
        <div class="shopinfo">
            <div class="title">
                <h1 class="">Shinco/新科 S2300 无线麦克风 无线手持话筒 双手麦 KTV 舞台</h1>
            </div>
            <ul>
                <li>
                    <span>市场价：</span><s>￥269.00</s>
                    <label class="sellpricetitle">销售价：</label>
                    <span class="sellprice">￥99.00</span>
                </li>
                <li class="sell">
                    <div class="sellcount">购买数量：</div>
                    <input-Number v-on:val="getnum" class="inputnumber"></input-Number>
                </li>
                <li>
                    <mt-button type="primary" size="small" @click="buy">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="intoShopCar">加入购物车</mt-button>
                </li>
            </ul>
        </div>

        <!--3.0 商品参数区-->
        <div class="goodsvalue">
            <div class="title">商品参数</div>
            <ul>
                <li>
                    <label>商品货号：</label>
                    <span>SD000011</span>
                </li>
                <li>
                    <label>库存情况：</label>
                    <span>415件</span>
                </li>
                <li>
                    <label>上架时间：</label>
                    <span>2016-2-2 12:00:00</span>
                </li>
            </ul>

        </div>

        <!--4.0 图文介绍和评论区-->
        <div class="desc">
            <mt-button plain type="primary" size="large" @click="todesc">图文介绍</mt-button>
            <br />
            <mt-button plain type="danger" size="large" @click="tocomment">商品评论</mt-button>
        </div>

    </div>
</template>
<style>
    .tmpl{
        font-size: 12px;
    }
   /*商品图片滚动区begin*/
     .compswipe,.desc,.shopinfo,.goodsvalue{
        border: 1px solid #f3f3f3;
         margin: 5px;
         -webkit-box-shadow: 0 0 2px  #666;
         -moz-box-shadow: 0 0 2px  #666;
         box-shadow: 0 0 2px  #666;
         -webkit-border-radius:5px;
         -moz-border-radius:5px;
         border-radius:5px;
         padding: 10px;
         color: #53575e;
     }
   /*商品图片滚动区end*/


   /*2.0 商品购物区*/
  .shopinfo ul{
      padding-left: 5px;
  }
    .shopinfo > ul > li{
        margin: 10px;
    }
  .shopinfo .sell{
      display:flex;
  }
    .shopinfo .sellcount{
        flex: 0 0 60px;
        line-height: 30px;
    }
    .shopinfo .inputnumber{
        flex:1;
    }

  .shopinfo .title h1{
      color:#0088D1;
      font-size:18px;
  }
  .shopinfo .sellprice{
      color:red;
      font-size: 21px;
  }
  .shopinfo .sellpricetitle{
      margin-left: 20px;;
  }

   /*3.0 商品参数区*/
   .goodsvalue{

   }
   .goodsvalue li,.shopinfo li{
       list-style: none;
   }

   .goodsvalue .title,.shopinfo .title{
       padding-bottom: 10px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
   }
    /*4.0 商品介绍和评论*/
    .desc{

    }

</style>
<script>
    import common from  '../../kits/common.js'
    import CompSwipe from '../subcomp/swipe'
    import InputNumber from '../subcomp/inputnumber'

    export default{
        data(){
            return{
                count:1, //购买数量
                imgdomain:common.imgDomain,     //图片的7牛域名
                imglist:[] //商品图片滚动区的图片数组
            }
        },
        created(){
            this.getimgList();
        },
        methods:{
            //1.0 获取滚动图片数组
            getimgList:function(){
                let id=  this.$route.params.id;
                this.$http.get(common.dataApiDomain+'/api/getthumimages/'+id)
                        .then((res)=>{
                    var imgs = res.body.message;
                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].img=  this.imgdomain+imgs[i].src;
                    imgs[i].url = '#';
                    delete imgs[i].src;
                };
                this.imglist = imgs;
            })
            },
            //2.0 跳转到评论组件
            tocomment:function(){
                let id=  this.$route.params.id;
//                this.$route.push('/goods/comment/'+id);
                this.$router.push({ name: 'goodscomment',params: { id: id } })
            },
            //2.0.1 跳转到图文描述组件
            todesc:function () {
                let id = this.$route.params.id;
                this.$router.push({ name: 'goodsdesc',params:{ id: id } });
            },
            //3.0 加入购物车
            intoShopCar:function(){
                this.$emit('shopcarcount',this.count);
            },
            //4.0 立即购买
            buy:function () {
                
            },
            //5.0 获取购买数量值
            getnum:function(count){
                this.count = count;
            }
        },
        components:{
            CompSwipe,
            InputNumber
        }
    }
</script>
