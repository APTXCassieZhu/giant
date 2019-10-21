<template>
    <div class="source-box">
        <div class="upper">
            <div class="font-image">{{sourceName.charAt(0)}}</div>
            <div class="font-title">{{sourceName}}</div>
            <div class="font-content">下载次数&emsp;&emsp;&emsp;关注人数</div>
            <div class="font-num">{{downloadCount}}<span style="margin-left: 63px;">2,019</span></div>
        </div>
        <Row class="font-footer">
            <Col span="8" class="footer-col"><Icon size="25" type="md-download" class="foot-icon" /></Col>
            <Col span="8" class="footer-col"><Icon size="25" type="md-create" class="foot-icon" /></Col>
            <Col span="8" class="footer-col1"><Icon size="25" type="md-more" class="foot-icon" /></Col>
        </Row>
        <!--<div class="font-footer">
           <col>
           <Icon size="25" type="md-download" />
           <Icon size="25" type="md-create" />
           <Icon size="25" type="md-more" />
       </div>-->
    </div>
</template>
<script>
export default {
    name: "SourceBox",
    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            sourceName: '啦啦啦啦',
            rate: 3.5,
            downloadCount: 233,
            likeCount: 2019,
            sourceTitle: '资源名称',
            sourceDescription: '描述文字帮助用户对资源快速预览以及理解文字',
            favoriteIcon: false,            // defalut favourite is false
            sourceID: 0,                    // TODO从后端得到
        }
    },
    methods:{
        cancelFavorite(){
            //TODO add user favourite to favorite list so that they can check in personal
            console.log('favorite')
            this.favoriteIcon = !this.favoriteIcon
            /* 提示用户已关注 */
            if(this.favoriteIcon){
                this.$Message.success('已关注')
                this.$store.commit('ADD_FAVORITE', this.sourceID);
            }else{
                this.$Message.success('已取消关注')
                this.$store.commit('REMOVE_FAVORITE', this.sourceID);
            }  
        },

    }
}
</script>
<style scoped>
.source-box{
    display: inline-block;
    height: 196px; 
    width: 274px;
    margin-top: -30px;
    margin-right: 30px;
    border: solid 2px #eaeaea;
}
.upper{
    padding: 18px 18px 0px 18px;
}
.font-image{
    display: inline-block;
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 44px;
    width: 44px;
    text-align: center;
    line-height: 44px;
}
.font-title{
    display: inline-block;
    position: relative;
    top: -10px;
    right: -10px;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: bold; 
    line-height: 21px;
}
.font-content{
    position: relative;
    font-size: 14px;
    margin-left: 60px;
}
.font-num{
    position: relative;
    font-size: 18px;
    font-weight: bold;
    margin-left: 60px;
}
.font-footer{
    background-color: #eaeaea;  
    color: #7d7d7d;
    width: 270px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    margin-top: 12.5px;
}
.footer-col {
    border-right:2px solid #7d7d7d;
    cursor: pointer;
}
.footer-col1 {
    cursor: pointer;
}
.foot-icon:hover, .foot-icon1:hover{
    color: #1ebf73;
}
</style>