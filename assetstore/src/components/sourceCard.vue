<template>
    <div class="source-card">
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
        <div style="width:240px;">
            <Rate disabled v-model="rate" style="position:relative; left: 5px; bottom: 5px;"></Rate>&emsp;
            <!--<Icon size="18" v-for="n in 4" :key="n" type="md-star" style="color: #FF9933" />
            <Icon size="18" type="ios-star-half" style="color: #FF9933"/>&emsp;&emsp;-->
            <Icon type="ios-eye" size="20" style="position:relative; bottom: 3px;"/>
            <span style="position:relative;bottom:3px;"> {{viewCount}}&emsp;</span>
            <Icon type="md-chatboxes" size="18" style="position:relative;bottom: 3px;" />
            <span style="position:relative;bottom:3px;"> {{chatCount}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "SourceCard",
    data() {
        return {
            // TODO data里面的数据均需从后端拿到
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称',
            sourceDescription: '描述文字帮助用户对资源快速预览以及理解文字',
            favoriteIcon: false,            // defalut favourite is false
            sourceID: 0,                    // TODO从后端得到
        }
    },
    methods:{
        addFavorite(){
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
        }
    }
}
</script>
<style>
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
}

.source-content{
    text-align: left;
    margin-top: 8px;
    margin-left: 12px;
    margin-right: 5px;
    margin-bottom: 27px;
    font-family: MicrosoftYaHei;
}

.ivu-rate > .ivu-rate-star{
    margin-right: 0px;
}
</style>