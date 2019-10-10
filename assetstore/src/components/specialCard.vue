<template>
    <div class="source-card">
        <div class="image">
            <strong class="heart" id="heart" @click="addFavorite()">
                <Icon size="30" type="md-heart-outline" v-show="!favoriteIcon"/>
                <Icon size="30" type="md-heart" v-show="favoriteIcon"/>
            </strong>
        </div>
        <div class="source-content">
            <br>
            <h3>{{sourceTitle}}</h3>
            <span>{{sourceDescription}}</span>
            <br>
            <Icon size="18" v-for="n in 4" :key="n" type="md-star" style="color: #FF9933" />
            <Icon size="18" type="ios-star-half" style="color: #FF9933"/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <Icon type="ios-eye" size="20" />{{viewCount}}&emsp;
            <Icon type="md-chatboxes" size="18"/>{{chatCount}}
        </div>
    </div>
</template>
<script>
export default {
    name: "SpecialCard",
    data() {
        return {
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称范例文字^_^',
            sourceDescription: '这是一段帮助用户理解资源内容的描述',
            favoriteIcon: false,            // defalut favourite is false
        }
    },
    methods:{
        addFavorite(){
            // TO DO add user favourite to favorite list so that they can check in personal
            console.log('favorite')
            this.favoriteIcon = !this.favoriteIcon
        }
    }
}
</script>
<style scoped>
.image {
    height: 150px; 
    width: 306px;
    background-image: url("../assets/绿.jpg");
    background-size: 306px 150px;
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
    width: 306px; 
    height: 265px;
    border: 1px solid #ffffff;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2)
}

.source-content{
    margin-left: 10px;
    margin-right: 5px;
}

.ivu-rate-star{
    margin-right: 0px;
}
</style>