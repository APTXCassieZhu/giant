<template>
    <div class="source-box">
        <div class="upper" @click="goPage(`/resourceDetail/${source.id}`)">
            <img v-if="source.images != null" class="font-image" :src="concatImgUrl">
            <div v-else class="font-image">{{source.name.charAt(0)}}</div>
            <div class="font-title">{{source.name}}</div>
            <div class="font-content">来源: <span style="margin-left:10px;">{{getWhoShared}}</span></div>
            <Rate class="font-content" style="font-size: 18px;" icon="md-star" disabled v-model="getRate" />
        </div>
        <Row class="font-footer">
            <Col span="12" class="footer-col" @click.native="download()">
                <font-awesome-icon :icon="['fas','download']" class="foot-icon"/>
            </Col>
            <Col span="12" class="footer-col"  @click.native="cancelFavorite()">
                <Divider type="vertical" class="foot-divider"/>
                <Icon size="22" type="md-heart" class="heart-icon"/>
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
        },
        getRate(){
            return this.source.rateAvg || 5
        },
        concatImgUrl(){
            return `//192.168.94.238:3000/file/download/${this.source.images[0].id}?token=${this.$store.state.token}`
        },
    },
    data() {
        return {
            // default
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        cancelFavorite(){
            this.$Modal.confirm({
                title: '确认取消关注此条资源？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    axios.post(`/api/resource/${this.source.id}/star`,{"star": false},{emulateJSON:true}).then((res)=>{
                        if(res.data.code === 0) {
                            setTimeout(() => {
                                this.$Modal.success({
                                    title: '已取消关注',
                                })
                                this.$emit('unFavorite',this.source.id)
                            }, 1000);
                        }
                    })
                },
            });
        },
        download(){
            var fileid = this.source.vers[0].file.id;
            location.href = `//192.168.94.238:3000/file/download/${fileid}/?token=${this.$store.state.token}`
        }
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
    cursor: pointer;
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
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold; 
    line-height: 21px;
}
.font-content{
    position: relative;
    font-size: 14px;
    margin-left: 60px;
    top: -15px;
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
    margin-top: 25.5px;
}
.footer-col {
    /*border-right:2px solid #7d7d7d;*/
    cursor: pointer;
}
.heart-icon{
    color: red;
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