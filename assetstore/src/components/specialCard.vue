<template>
    <div class="source-card">
        <div id="special" :class="special" style="height: 184px;width: 306px;background-size: 306px 184px;background-repeat: no-repeat;">
            <strong class="heart" id="heart" @click="addFavorite()">
                <Icon size="30" type="md-heart-outline" style="color: #ec5b6e" v-show="!favoriteIcon"/>
                <Icon size="30" type="md-heart" style="color: #ec5b6e" v-show="favoriteIcon"/>
            </strong>
        </div>
        <div class="source-des">
            <p class="source-des-name">{{sourceTitle}}</p>
            <p>{{sourceDescription}}</p>
        </div>
        <div class="source-content">
            <Rate disabled icon="md-star" v-model="rate" style="position:relative; left: 2px;"></Rate>
            <span class="source-content-icon">
                <font-awesome-icon icon="eye"/>
                <span> {{viewCount}}&emsp;&emsp;</span>
                <font-awesome-icon icon="comment"/>
                <span> {{chatCount}}</span>
            </span>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons'
library.add(faComment, faEye)
export default {
    name: "SpecialCard",
    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称范例文字^_^',
            sourceDescription: '这是一段帮助用户理解资源内容的描述',
            favoriteIcon: false,            // defalut favourite is false
            special: 'image',
        }
    },
    methods:{
        addFavorite(){
            // TODO add user favourite to favorite list so that they can check in personal
            console.log('favorite')
            this.favoriteIcon = !this.favoriteIcon
            /* 提示用户已关注 */
            if(this.favoriteIcon){
                this.$Message.success('已关注')
            }else{
                this.$Message.success('已取消关注')
            }         
        }
    }
}
</script>
<style scoped>
.image {
    background-image: url("../assets/绿.jpg");  
}
.image-02 {
    background-image: url("../assets/tool-02.png");
}
.image-03 {
    background-image: url("../assets/tool-03.png");
}
.image-04 {
    background-image: url("../assets/tool-04.png");
}
.image-05 {
    background-image: url("../assets/tool-05.png");
}
.image-06 {
    background-image: url("../assets/tool-06.png");
}
.image-07 {
    background-image: url("../assets/tool-07.png");
}
.image-08 {
    background-image: url("../assets/tool-08.png");
}
.image-09 {
    background-image: url("../assets/tool-09.png");
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
    text-align: left;
    font-family: MicrosoftYaHei;
}
.source-content-icon{
    position:relative;
    top: 5px;
    left: 70px;
}
.ivu-rate-star{
    margin-right: 0px;
}
</style>