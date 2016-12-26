<template>
    <div class="tmpl">
        <header class="mui-bar mui-bar-nav">
            <router-link to="/photolist" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">返回</router-link>
            <h1 class="mui-title">图片详情</h1>
        </header>

        <!--图片标题-->
        <div class="meta">
            <h1 class="meta-tit">{{article.title}}</h1>
            <p class="meta-info">
                <span class="time">{{article.add_time | dateFmt('YYYY-MM-DD') }}</span>
                <span class="view">{{article.click}} 次浏览</span>
                分类：经济民生
            </p>
        </div>

    <div class="thumbimg">
                <!--
                作者：ivanyb@qq.com
                时间：2016-12-06
                描述：九宫格区域
            -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in thumImages">
               <img class="preview-img" v-bind="{src:item.src}" height="109px"  width="109px"  @click="$preview.open(index, thumImages)">
              
            </li>
        </ul>
    </div>
        <div class="entry" v-html="article.content">
            
        </div>

    <div>
    </div>
    </div>
</template>
<style scoped>

    @import '../../../statics/css/muihead.css';

    /* 全局CSS
    ----------------------------------------------------------------------*/
    body{ font-family:"Microsoft Yahei",helvetica,arial; }
    a,a:link{ text-decoration:none; }
    .red{ color:#F00; }

    /*标题样式*/
    .meta{ margin:1em auto auto auto; padding-bottom:10px;padding-left:5px; border-bottom:1px solid #EEE; }
    .meta .meta-tit{ color:#0088D1; font-size:19px; margin:0 0 10px; }
    .meta .meta-info{ font-size:12px; color:#999; }
    .meta .meta-info span{ margin-right:0.5em; }

    .entry{
        color:#5c5c5c; 
        margin-bottom: 50px;
        padding: 5px;
    }


    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border:0px solid #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
          border:0px solid #fff;
    }

</style>
<script>
import common from  '../../kits/common.js' 

    export default{
        data(){
            return{
                imgdomain:common.imgDomain,                
                thumImages: [],
                article:{title:'标题',add_time:'2016-12-12',click:12,content:'<p>123</p>'}
            }
        },
        created(){
            this.getThumbImages();
            this.getimageinfo();
        },
        monuted(){       
        },
        methods:{
            getThumbImages:function(){
              let id=  this.$route.params.id;
              this.$http.get(common.dataApiDomain+'/api/getimage/'+id)
              .then((res)=>{
                var imgs = res.body.message;
                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].w = 600;
                    imgs[i].h = 400;
                    imgs[i].src=  this.imgdomain+imgs[i].src;
                };
                this.thumImages = imgs;

              })
            },
            getimageinfo:function(){
                let id=  this.$route.params.id;
                 this.$http.get(common.dataApiDomain+'/api/getimageInfo/'+id).
                 then((res)=>{
                    this.article = res.body.message[0];
                 });
            }
        }
    }
</script>
