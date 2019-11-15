<template>
    <div class="source-box">
        <div class="upper">
            <div class="font-image">{{softwareName.charAt(0)}}</div>
            <div class="font-title">{{softwareName}}</div>
            <div class="font-content">当前版本<span style="margin-left:10px;">{{currentVersion}}</span></div>
            <div class="font-content">最后更新<span style="margin-left:10px;">{{lastestUpgrade}}</span></div>
        </div>
        <Row class="font-footer">
            <Col span="12" class="footer-col">
                <Icon size="25" type="md-download" class="foot-icon" />
            </Col>
            <Col span="12" class="footer-col">
                <Divider type="vertical" class="foot-divider"/>
                <font-awesome-icon :icon="['fas','trash']" class="foot-icon"/>
                <!--<Icon size="25" type="ios-trash-outline" class="foot-icon" />-->
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: "SoftwareBox",
    props: {
        sourceID: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            softwareName: '申请的软件名称',
            rate: 3.5,
            downloadCount: 233,
            likeCount: 2019,
            currentVersion: '9.0.1',
            lastestUpgrade: '2019.05.04',
            favoriteIcon: false,            // defalut favourite is false
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
                this.$store.commit('ADD_FAVORITE', this.sourceID)
            }else{
                this.$Message.success('已取消关注')
                this.$store.commit('REMOVE_FAVORITE', this.sourceID)
            }  
        },

    }
}
</script>
<style scoped>
.source-box{
    float: left;
    height: 196px; 
    width: 274px;
    margin-top: 30px;
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
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold; 
    line-height: 21px;
}
.font-content{
    position: relative;
    font-size: 14px;
    margin-left: 60px;
    margin-top: 8px;
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
    margin-top: 16px;
}
.footer-col {
    /*border-right:2px solid #7d7d7d;*/
    cursor: pointer;
}

.foot-icon:hover, .footer-col:hover{
    color: #1ebf73;
}
.foot-divider{
    position:relative;
    float:left;
    top: 13px;
    width: 2px;
    height: 25px;
    color: #7d7d7d;
    margin: 0px;
}
</style>