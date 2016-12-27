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
        <!--
                       作者：ivanyb@qq.com
                       时间：2016-12-06
                       描述：九宫格区域
                   -->
    <div class="thumbimg">

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in thumImages">
               <img class="preview-img" v-bind="{src:item.src}" height="109px"  width="109px"  @click="$preview.open(index, thumImages)">
              
            </li>
        </ul>
    </div>
        <!--
               作者：ivanyb@qq.com
               时间：2016-12-06
               描述：详情内容区域
           -->
        <div class="entry" v-html="article.content">
            
        </div>

        <!--
               作者：ivanyb@qq.com
               时间：2016-12-06
               描述：评论标题区域
           -->
        <div class="commenttitle">
            <h3>提交评论</h3>
            <span></span>
        </div>
        <!--
                       作者：ivanyb@qq.com
                       时间：2016-12-06
                       描述：评论区域
                   -->
        <div class="comment">
            <textarea ref="commenttxt" placeholder="请输入评论内容..."  id="commenttxt">

            </textarea>
            <mt-button type="primary" size="large" @click="submitComment()">发表</mt-button>
        </div>

        <!--
                      作者：ivanyb@qq.com
                      时间：2016-12-06
                      描述：评论列表区域
                  -->
        <div class="commenttitle">
            <h3>评论列表</h3>
            <span>44条评论</span>
        </div>
        <div class="commentlist">

            <div class="outwarp" v-for="comment in commentlist">
                <div class="content" v-text="comment.content"></div>
                <div class="username" v-text="comment.user_name"></div>
                <div class="addtime">{{comment.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>

        </div>
        <!--
             作者：ivanyb@qq.com
             时间：2016-12-06
             描述：加载更多
         -->
        <mt-button plain type="danger" size="large" @click="loadmore">加载更多</mt-button>

    </div>
</template>
<style scoped>

    @import '../../../statics/css/muihead.css';
    .tmpl{
        margin-bottom: 70px;
    }
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
    .commenttitle{
        height: 60px;
        clear:both;
        border-bottom: 1px solid #c8c8cd;
        padding:10px 0 10px 10px;
    }

    .commenttitle h3{
        width: 200px;
        float: left;
    }
    .commenttitle span{
        float: right;
        width:100px;
        line-height: 40px;
        font-size:12px;
        color:#5c5c5c;
    }
    #commenttxt{
        display: block;
        width:100%;
        height: 100px;
    }
    .comment{
        padding:10px;
        border-bottom: 1px solid #c8c8cd;
    }
   .commentlist{
       padding: 10px;

   }
    .commentlist .outwarp:nth-child(1n + 2){
        clear: both;
        padding-top: 10px;
        border-top: 1px solid #c8c8cd;
    }
    .commentlist .content{
        margin-bottom: 10px;
        color:#5c5c5c;
    }
    .commentlist .username{
        width: 50%;
        float: left;
        color:#0094ff;
        padding:10px 0 10px 0 ;
    }
    .commentlist .addtime{
        width: 50%;
        float: right;
        color:#5c5c5c;
        padding:10px 0 10px 0 ;
    }
</style>
<script>
import common from  '../../kits/common.js'
import { Toast } from 'mint-ui'

    export default{
        data(){
            return{
                pageindex:1,  //评论内容分页索引
                imgdomain:common.imgDomain,     //图片的7牛域名
                thumImages: [],  //缩略图数组
                article:{title:'标题',add_time:'2016-12-12',click:12,content:'<p>123</p>'},//资讯详情
                commentlist:[] //评论内容
            }
        },
        created(){
            this.getThumbImages();
            this.getimageinfo();
            this.getcomment(this.pageindex);
        },
        monuted(){       
        },
        methods:{
            //获取缩略图
            getThumbImages:function(){
              let id=  this.$route.params.id;
              this.$http.get(common.dataApiDomain+'/api/getthumimages/'+id)
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
            //获取图片详细描述
            getimageinfo:function(){
                let id=  this.$route.params.id;
                 this.$http.get(common.dataApiDomain+'/api/getimageInfo/'+id).
                 then((res)=>{
                    this.article = res.body.message[0];
                 });
            },
            //获取图片的评论
            getcomment:function(pageindex){
                let id=  this.$route.params.id;
                this.$http.get(common.dataApiDomain+'/api/getcomments/'+id+'?pageindex='+pageindex).
                then((res)=>{
                    this.commentlist= this.commentlist.concat(res.body.message);
            });
            },
            //提交评论
            submitComment:function(){
                let id=  this.$route.params.id;
                //获取通过 ref="commenttxt"的dom对象的vlaue值（评论数据）
                let content = this.$refs.commenttxt.value;
                if(!content ||  content.trim() == '')
                {
                    return Toast({
                        message: '评论内容不能为空',
                        duration: 2000
                    });
                }

                //提交
                this.$http.post(common.dataApiDomain+'/api/postcomment/'+id,
                        {content:content}
                        ,{emulateJSON:true})
                        .then((res)=> {
                    // 刷新评论
                    this.getcomment(1)
                //清空评论框内容
                this.$refs.commenttxt.value = ''
                //提示成功
                    Toast({
                        message: res.body.message,
                        duration: 2000
                    });
                });
            },
            //加载更多
            loadmore:function(){
                this.pageindex ++;
                this.getcomment(this.pageindex);
            }
        }
    }
</script>
