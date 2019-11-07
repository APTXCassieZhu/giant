<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <div class="title-wrapper">
                "<span style="color: #1ebf73">{{getSearchContent}}</span>"的搜索结果
            </div>
            <div class="empty-content">
                <img src="../../assets/notFound.png" style="width:276px;height: 244px"/>
                <div class="apologize">很抱歉，未能找到“<span style="color: #1ebf73">{{getSearchContent}}</span>”相关内容，来看看这些资源吧～</div>
            </div>
            <div class="subtitle-wrapper">
                精选美术资源
                <div style="font-size: 12px;font-weight: 300;color: #7f7f7f;">最具创意的美术项目精选</div>
            </div>
            <div class="card-wrapper">
                <source-card v-for="n in 5" :key="n" class="card-style"></source-card>
            </div>
            <div class="subtitle-wrapper">
                研发类资源
                <div style="font-size: 12px;font-weight: 300;color: #7f7f7f;">程序员哥哥们的好助力</div>
            </div>
            <div class="card-wrapper">
                <source-card v-for="n in 5" :key="n" class="card-style"></source-card>
            </div>
            <corner></corner>
            <Footer style="position:relative;bottom: 0px;margin-top:200px"></Footer>
        </div>     
    </div>
</template>

<script>
import storage from 'good-storage'
import TopNavigation from '../../components/TopNav.vue'
import SourceCard from '../../components/sourceCard.vue'
import Corner from '../../components/corner.vue'
import Footer from '../../components/footer.vue'
export default {
    name:"SearchEmpty",
    // inject: ['reload'],
    components:{
        TopNavigation, Corner, SourceCard,
        Footer,
    },
    data() {
        return {
            // TODO 需后端互动得到
            searchReplace: [],              //存放历史搜索
            searchForm: {content:""},
        }
    },
    methods:{
    },
    computed:{
        getSearchContent(){
            return this.$store.state.searchContent;
        }
    },
    mounted(){
    },
}
</script>

<style scoped>
.body-style{
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 140px;
}
.title-wrapper{
    position: relative;
    left: 4%;
    top: 15px;
    font-size: 24px;
    font-weight: bold;
}
.empty-content{
    text-align: center;
}
.apologize{
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 1.5px;
    color: #262626;
    margin-bottom: 58px;
}
.subtitle-wrapper{
    position: relative;
    left: 4%;
    top: 15px;
    font-size: 22px;
    font-weight: 600;
    color: #1ebf73;
}
.card-wrapper {
    position: relative;
    left: 4%;
    top: 20px;
    width: 80%;
    margin-bottom: 30px;
}
.card-style{
    display: inline-block; 
    margin-right: 50px; 
    margin-bottom: 40px;
    text-align: center;
}

</style>

