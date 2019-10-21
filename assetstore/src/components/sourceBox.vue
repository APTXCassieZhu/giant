<template>
    <div class="source-box">
       
    </div>
</template>
<script>
export default {
    name: "SourceBox",
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
        cancelFavorite(){
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
<style scoped>
.source-box{
    display: inline-block;
    height: 196px; 
    width: 274px;
    margin-top: 30px;
    margin-right: 30px;
    border: solid 2px #eaeaea;
}
</style>