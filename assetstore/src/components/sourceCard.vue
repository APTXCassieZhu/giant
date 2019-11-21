<template>
    <div class="source-card" @click="goPage(`/resourceDetail/${sourceID}`)">
        <div class="image">
            <strong class="heart" id="heart" @click="addFavorite()">
                <Icon size="30" type="md-heart-outline" style="color: #ec5b6e" v-show="!favoriteIcon"/>
                <Icon size="30" type="md-heart" style="color: #ec5b6e" v-show="favoriteIcon"/>
            </strong>
        </div>
        <div class="source-content">
            <h3>{{sourceTitle}}</h3>
            <span>{{sourceDescription}}</span>
        </div>
        <Divider style="margin: 15px 0px 5px 0px;"/>
        <div class="source-card-footer">
            <Rate disabled icon="md-star" v-model="rate" style="position:relative; left: 8px; bottom: 8px;"></Rate>
            <span class="source-card-footer-icon">
                <font-awesome-icon :icon="['fas','eye']"/>
                <span> {{viewCount}}&emsp;</span>
                <font-awesome-icon :icon="['fas','comment']"/>
                <span> {{chatCount}}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "SourceCard",
    // props: {
    //     sourceID: {
    //         type: String,
    //         default: 233,
    //     },
    //     styname:{
    //         type:String,
    //         default:'默认分类是？'
    //     }
    // },
    props:['sourceID','breadlist'],


    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称',
            sourceDescription: '描述文字帮助用户对资源快速预览以及理解文字',
            favoriteIcon: false,            // defalut favourite is false
            jumpOrNot: true,
        }
    },
    methods:{
        addFavorite(){
            //TODO add user favourite to favorite list so that they can check in personal
            console.log('favorite')
            this.jumpOrNot = false
            this.favoriteIcon = !this.favoriteIcon
            /* 提示用户已关注 */
            if(this.favoriteIcon){
                axios.post(`/api/${this.source.id}/star`, {'star':true},{emulateJSON:true}).then((res)=>{
                    if(res.data.code === 0){
                        this.$Message.success('已关注')
                    }
                })
            }else{
                axios.post(`/api/${this.source.id}/star`, {'star':true},{emulateJSON:false}).then((res)=>{
                    if(res.data.code === 0){
                        this.$Message.success('已取消关注')
                    }
                })
            }
        },
        goPage(url){
            // debugger

            //debugger
            this.$store.commit('SAVE_BREADLIST', {
                // breadlist:[
                //     {fullPath:'/home',name: this.styname}  
                // ],
                breadlist:[
                    ...this.breadlist
                ],
                resourceId:this.sourceID
                
            })

            if(this.jumpOrNot){
                this.$router.push(url)
            }
            this.jumpOrNot = true
        },
    }
}
</script>
<style>
.ivu-rate > .ivu-rate-star-chart{
    margin-right: 0px;
}
</style>
<style scoped>
.image {
    height: 140px; 
    width: 250px;
    background-image: url("../assets/白绿.jpg");
    background-size: 240px 150px;
    background-repeat: no-repeat;
}
.heart{
    position: relative; 
    float: right; 
    top: 10px;
    right: 20px;
    cursor: pointer;
}
.source-card{
    width: 240px; 
    height: 275px;
    font-family: MicrosoftYaHei;
    border: 1px solid #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    background-color: #ffffff;
    cursor: pointer;
}

.source-content{
    text-align: left;
    margin-top: 8px;
    margin-left: 12px;
    margin-right: 5px;
    margin-bottom: 27px;
    font-family: MicrosoftYaHei;
}
.source-card-footer{
    width:240px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    text-align: left;
}
.source-card-footer-icon{
    position:relative;
    bottom:3px;
    left:35px;
}
</style>