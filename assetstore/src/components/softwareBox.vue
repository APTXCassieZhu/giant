<template>
    <div class="source-box">
        <div class="upper">
            <div v-if="software.image != null" class="font-image"><img class="font-image" :src="software.image"></div>
            <div v-else class="font-image">{{software.name.charAt(0)}}</div>
            <div class="font-title">{{software.name}}</div>
            <div class="font-content">当前版本<span style="margin-left:10px;">{{software.downloadedVersion}}</span></div>
            <div v-if="getShowDot && dot" class="font-content font-content-update" @click="download()">
                有新版本
                <span style="margin-left:5px;">
                    {{software.version}}<Icon type="md-cloud-download" size="20" style="margin-left:7px;"/>
                </span>
            </div>
            <div v-else class="font-content">最后更新<span style="margin-left:10px;">{{getYYMMDD(software.updatedAt)}}</span></div>
        </div>
        <Row class="font-footer">
            <Col span="12" class="footer-col" @click.native="download()">
                <sup v-if="getShowDot && dot" class="footer-dot"></sup>
                <font-awesome-icon :icon="['fas','download']" class="foot-icon"/>
            </Col>
            <Col span="12" class="footer-col" @click.native="deleteSW()">
                <Divider type="vertical" class="foot-divider"/>
                <font-awesome-icon :icon="['far','trash-alt']" class="foot-icon"/>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: "SoftwareBox",
    props: {
        software: {
            type: Object,
            default: () => {},
        },
    },
    computed:{
        getShowDot(){
            return this.software.version != this.software.downloadedVersion;
        }
    },
    data() {
        return {
            dot: true,
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
        getYYMMDD(t){
            let time = new Date(t)
            let [yy,mm,dd] = [
                time.getFullYear(),
                time.getMonth()+1,
                time.getDate()
            ]
            if(mm<10){
                mm = '0' + mm
            }
            return  yy+'-'+mm+'.'+dd
  
        },
        deleteSW(){
            this.$Modal.confirm({
                title: `确认删除${this.software.name}？`,
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    axios.delete(`/api/software/${this.software.id}`).then((res)=>{
                        if(res.data.code == 0){
                            setTimeout(() => {
                                this.$Modal.success({
                                    title: '软件已删除',
                                })
                                this.$emit('swDel', this.software.id)
                            }, 1000);
                        }
                    })
                },
            });
        },
        // TODO
        download(){
            this.dot = false
            console.log('aaaa')
        }
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
.footer-dot{
    position: absolute;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transform-origin: 0 center;
    transform-origin: 0 center;
    top: 18px;
    right: 48px;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    background: #ed4014;
    z-index: 10;
    -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
}
.font-content-update{
    color: #1ebf73;
    cursor: pointer;
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