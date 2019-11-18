<template>
    <div class="source-box" v-if="!deleteOrNot">
        <div class="upper">
            <div v-if="source.images != null" ><img class="font-image" :src="source.images[0]"></div>
            <div v-else class="font-image">{{source.name.charAt(0)}}</div>
            <div class="font-title">{{source.name}}</div>
            <div class="font-content">来源: <span style="margin-left:10px;">{{getWhoShared}}</span></div>
            <Rate class="font-content" icon="md-star" disabled v-model="source.rateAvg" />
        </div>
        <Row class="font-footer">
            <Col span="12" class="footer-col">
                <Icon size="25" type="md-download" class="foot-icon" />
            </Col>
            <Col span="12" class="footer-col">
                <Divider type="vertical" class="foot-divider"/>
                <Icon size="25" type="md-heart" class="foot-icon" @click.native="cancelFavorite()"/>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: "LikeBox",
    inject: ['reload'],
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed:{
        getWhoShared(){
            return this.source.user.nickName == null ? this.source.user.name : this.source.user.nickName
        }
    },
    data() {
        return {
            // default
            deleteOrNot: false,
        }
    },
    methods:{
        cancelFavorite(){
            //TODO add user favourite to favorite list so that they can check in personal
            this.$Modal.confirm({
                title: '确认取消关注此条资源？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    setTimeout(() => {
                        this.$Modal.success({
                            title: '已取消关注',
                        })
                        this.$store.commit('REMOVE_FAVORITE', this.sourceID); 
                        // TODO 告诉后端这个已取消关注
                        this.deleteOrNot = true
                    }, 1000);
                },
            });
            this.deleteOrNot = true
        },

    }
}
</script>
<style>
.font-content > .ivu-rate-star-chart{
    margin-right: 0px;
}
</style>
<style scoped>
.source-box{
    display:inline-block;
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