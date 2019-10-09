<template>
    <div class="source-card">
        <div class="image">
            <strong class="heart" id="heart" @click="addFavorite()">
                <Icon size="30" type="md-heart-outline" v-show="!favoriteIcon"/>
                <Icon size="30" type="md-heart" v-show="favoriteIcon"/>
            </strong>
        </div>
        <div class="source-content">
            <h3>{{sourceTitle}}</h3>
            <span>{{sourceDescription}}</span>
        </div>
        <Divider style="margin: 15px 0px 5px 0px;"/>
        <span>
            <Rate disabled allow-half v-model="rate"/>
            <Icon type="ios-eye" size="20" />{{viewCount}}&emsp;
            <Icon type="md-chatboxes" size="18"/>{{chatCount}}
        </span>
    </div>
</template>
<script>
export default {
    name: "SourceCard",
    data() {
        return {
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称',
            sourceDescription: '描述文字帮助用户对资源快速预览以及理解文字',
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
    width: 250px;
    background-image: url("../assets/1111.jpg");
    background-size: 250px 150px;
    background-repeat: no-repeat;
}
.heart{
    position: relative; 
    float: right; 
    top: 10px;
    right: 10px;
    cursor: pointer;
}
.source-card{
    width: 250px; 
    height: 280px;
    border: 1px solid #ffffff;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2)
}

.source-content{
    margin-left: 5px;
    margin-right: 5px;
}

.ivu-rate-star{
    margin-right: 0px;
}
</style>