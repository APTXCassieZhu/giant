<template>
    <div class="source-card" @click="goPage(`/resourceDetail/${resource.id}`)">
        <div id="special" class="image" :style="backgroundStyle">
            <!-- <img :src="concatImgUrl" class="resource-image"/> -->
            <strong class="heart" id="heart" @click="addFavorite()">
                <Icon size="30" type="md-heart-outline" style="color: #ec5b6e" v-show="favoriteIcon == undefined || !favoriteIcon  "/>
                <Icon size="30" type="md-heart" style="color: #ec5b6e" v-show="favoriteIcon"/>
            </strong>
        </div>
        <div class="source-des">
            <p class="source-des-name">{{resource.name}}</p>
            <p>{{sourceDescription}}</p>
        </div>
        <div class="source-content">
            <Rate disabled icon="md-star" v-model="getRateAvg" style="position:relative; left: 2px;"></Rate>
            <span class="source-card-footer-icon">
                <font-awesome-icon :icon="['fas','eye']"/>
                <span> {{resource.viewCount||0}}</span>
            </span>
            <span class="source-card-footer-icon">
                <font-awesome-icon :icon="['fas','comment']"/>
                <span> {{resource.commendCount||0}}</span>
            </span>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons'
library.add(faComment, faEye)
export default {
    name: "FineSourceCard",
    props: {
        resource: {
            type: Object,
            default: () => {},
        },
        breadlist:{
            type:Array,
            default: []
        },
        isLike:{
            type: Boolean,
            default: false,
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
        },
    },
    mounted(){
        this.resource
        debugger
        let $img = document.createElement('img')
        $img.onload = ()=>{
            this.backgroundStyle = {
                backgroundImage:`url(${this.concatImgUrl})`
            }
        }
        $img.src = this.concatImgUrl
    },
    data() {
        return {
            sourceTitle: '资源名称范例文字^_^',
            sourceDescription: '这是一段帮助用户理解资源内容的描述',
            favoriteIcon: this.isLike,           
            jumpOrNot: true,
            backgroundStyle:{}
        }
    },
    mounted(){
        let $img = document.createElement('img')
        $img.onload = ()=>{
            this.backgroundStyle = {
                backgroundImage:`url(${this.concatImgUrl})`
            }
        }
        $img.src = this.concatImgUrl
    },
    methods:{
        addFavorite(){
            console.log('favorite')
            this.jumpOrNot = false
            this.favoriteIcon = !this.favoriteIcon
            /* 提示用户已关注 */
            if(this.favoriteIcon){
                this.$Message.success('已关注')
            }else{
                this.$Message.success('已取消关注')
            }         
        },
        goPage(url){

            //debugger
             this.$store.commit('SAVE_BREADLIST', {
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
.carousel-style > .ivu-carousel-arrow > *{
    vertical-align: center;
}
</style>
</style>
<style scoped>
.image {
    height: 184px;
    width: 306px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../assets/绿.jpg');
}
.resource-image{
    width: 304px;
    height: 184px;
}
.heart{
    position: relative; 
    float: right; 
    top: 10px;
    right: 20px;
    cursor: pointer;
}

.source-card{
    width: 306px; 
    height: 265px;
    font-family: MicrosoftYaHei;
    border: 1px solid #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    background-color: #ffffff;
    cursor: pointer;
}
.source-des{
    text-align: left;
    position:relative;
    left: 15px;
    top: 8px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
}
.source-des-name{
    font-size: 14px;
    letter-spacing: 1.17px;
    color: #262626;
}
.source-content{
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 7px;
    font-size: 12px;
    color: #7f7f7f;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.source-content-icon{
    position:relative;
    top: 5px;
    left: 70px;
}
.ivu-rate-star{
    margin-right: 0px;
}
.source-card-footer-icon{
    position:relative; 
    right: 8px;
    margin-top: 10px;
}
</style>