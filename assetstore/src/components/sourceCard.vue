<template>
    <div class="source-card" @click="goPage(`/resourceDetail/${resource.id}`)">
        <div class="upper">
            <img :src="concatImgUrl" class="image"/>
            <strong class="heart" id="heart" @click="addFavorite()">
                <Icon v-show="resource.isStar" size="30" type="md-heart" style="color: #ec5b6e;" />
                <Icon v-show="!resource.isStar" size="30" type="md-heart-outline" style="color: #ec5b6e;" />
            </strong>
        </div>
        <div class="source-content">
            <p style="font-weight: 600;color: black;">{{resource.name}}</p>
            <p style="min-height:45px">{{getElText}}</p>
        </div>
        <Divider style="margin: 15px 0px 5px 0px;"/>
        <div class="source-card-footer">
            <Rate disabled icon="md-star" v-model="getRateAvg" style="position:relative; left: 8px; bottom: 8px;"></Rate>
            <span class="source-card-footer-icon"> 
                <font-awesome-icon :icon="['fas','eye']"/>
                <span> {{resource.viewCount||0}}</span>
            </span>
            <span class="source-card-footer-icon" style="position:relative; right: 8px;">
                <font-awesome-icon :icon="['fas','comment']"/>
                <span> {{resource.commentCount||0}}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "SourceCard",
    props: {
        resource: {
            type: Object,
            default: () => {},
        },
        breadlist:{
            type:Array,
            default: []
        }
    },
    computed:{
        getRateAvg(){
            return this.resource.rateAvg || 5;
        },
        getElText(){
            var text = ''
            var $d = document.createElement('div')
            document.body.appendChild($d)
            $d.innerHTML = this.resource.description
            
            text = $d.textContent
            document.body.removeChild($d)
            return text.length>=45? text.slice(0,45)+'...' : text
            
        },
        concatImgUrl(){
            return `//192.168.94.238:3000/file/download/${this.resource.images[0].id}?token=${this.$store.state.token}`
        }
    },
    data() {
        return {
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称',
            sourceDescription: '描述文字帮助用户对资源快速预览以及理解文字',

            jumpOrNot: true,
        }
    },
    methods:{
        addFavorite(){
            console.log('favorite')
            this.jumpOrNot = false
            /* 提示用户已关注 */
            if(!this.resource.isStar){
                axios.post(`/api/resource/${this.resource.id}/star`, {'star':true},{emulateJSON:true}).then((res)=>{
                    if(res.data.code === 0){
                        this.$Message.success('已关注')
                        console.log(this.resource.isStar)
                        this.resource.isStar = !this.resource.isStar
                        console.log(this.resource.isStar)
                    }else{
                        alert(res)
                    }
                })
            }else{
                axios.post(`/api/resource/${this.resource.id}/star`, {'star':false},{emulateJSON:true}).then((res)=>{
                    if(res.data.code === 0){
                        this.$Message.success('已取消关注')
                        console.log(this.resource.isStar)
                        this.resource.isStar = !this.resource.isStar
                        console.log(this.resource.isStar)
                    }else{
                        alert(res)
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
.upper {
    height: 140px; 
    width: 240px;
    background-image: url("../assets/白绿.jpg");
    background-size: 240px 150px;
    background-repeat: no-repeat;
}
.image{
    width: 240px;
    height: 140px;
}
.heart{
    position: absolute; 
    float: right; 
    top: 9px;
    right: 9px;
    cursor: pointer;
}
.source-card{
    position: relative;
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
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
}
.source-card-footer{
    width:240px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    /* text-align: left; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.source-card-footer-icon{
    position:relative;
    /* bottom:2px; */
}
</style>