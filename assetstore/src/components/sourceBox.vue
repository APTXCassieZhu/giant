<template>
<div class="source-box-wrapper">
    <div class="source-box">
        <div class="upper">
            <div class="font-image">{{source.charAt(0)}}</div>
            <div class="font-title">{{source}}</div>
            <div class="font-content">下载次数&emsp;&emsp;&emsp;关注人数</div>
            <div class="font-num">{{downloadCount}}<span style="margin-left: 63px;">2,019</span></div>
        </div>
        <Row class="font-footer">
            <Col span="8" class="footer-col">
                <font-awesome-icon :icon="['fas','sync-alt']" class="foot-icon" />
            </Col>
            <Col span="8" class="footer-col">
                <Divider type="vertical" class="foot-divider"/>
                <Icon size="25" type="md-create" class="foot-icon" />
            </Col>
            <Col span="8" class="footer-col1">
                <Divider type="vertical" class="foot-divider"/>
                <Icon size="25" type="md-more" class="foot-icon" @click="openDrop=true"/>
            </Col>
        </Row>
    </div>
    <!-- <div v-if="openDrop==true" @on-clickoutside="closeDrop()" class="dropdown">
            <p @click="changeState" class="dropdown-text">{{state}}共享</p>
            <p @click="deleteSource" class="dropdown-text-delete">删除</p>
    </div> -->
</div>
</template>
<script>
export default {
    name: "SourceBox",
    props: {
        sourceName: {
            type: String,
        },
    },
    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            source: this.sourceName,        //'啦啦啦啦',
            rate: 3.5,
            downloadCount: 233,
            likeCount: 2019,
            favoriteIcon: false,            // defalut favourite is false
            sourceID: 0,                    // TODO从后端得到
            state: '关闭',
            // default
            openDrop: false,
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
        changeState(){
            if(this.state == '关闭')
                this.state = '打开'
            else
                this.state = '关闭'
        },
        deleteSource(){

        },
        closesDrop(){
            console.log(this.openDrop)
            this.openDrop=false
            debugger
        }
    }
}
</script>
<style scoped>
.source-box-wrapper{
    float: left;
    height:296px;
    width: 274px;
    margin-right: 30px;
}
.source-box{
    height: 196px; 
    width: 274px;
    margin-top: 30px;
    margin-right: 30px;
    border: solid 2px #eaeaea;
}
.upper{
    padding: 18px 18px 0px 18px;
    margin-bottom: 10px;
}
.font-image{
    display: inline-block;
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 44px;
    width: 44px;
    line-height: 44px;
    text-align: center;
}
.font-title{
    display: inline-block;
    position: relative;
    left: 10px;
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
}
.footer-col {
    /*border-right:2px solid #7d7d7d;*/
    cursor: pointer;
    color:#7d7d7d;
}
.footer-col1 {
    cursor: pointer;
}

.foot-icon:hover, .foot-icon1:hover, .footer-col:hover, .footer-col1:hover{
    color: #1ebf73;
}
.foot-icon-hover{
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
.dropdown{
    position: absolute;
    width: 92px;
    height: 100px;
    top: 285px;
    left: 485px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 4, 0.1);
    z-index: 1000;
}
.dropdown-text, .dropdown-text-delete{
    font-size: 14px;
    font-weight: 600;
    color:#7f7f7f;
    text-align:center;
    line-height: 50px;
    cursor: pointer;
}
.dropdown-text:hover{
    color: #1ebf73;
}
.dropdown-text-delete:hover{
    color: #e81735;
}
</style>