<template>
    <div>
        <TopNavigation style="z-index: 100"></TopNavigation>
        <div class="body-style">
            <div class="empty-content">
                <img src="../../assets/notFound.png" style="width:276px;height: 244px;"/>
                <div class="apologize">抱歉，没有搜索到相关内容</div>
                <div class="suggestion">
                    请尝试更换关键词，或是切换
                    <span style="color: #FA541C"> 筛选器 </span>和 
                    <span style="color: #003A8C"> 筛选条件 </span> 试试看
                </div>
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
    width: 50%;
    top: 15px;
    font-size: 24px;
    font-weight: bold;
}
.empty-content{
    text-align: center;
    margin-top: 70px;
}
.apologize{
    font-size: 18px;
    font-weight: 600;
    color: #707070;
    margin-top: 30px;
}
.suggestion{
    font-size: 16px;
    color: #707070;
    margin-top: 18px;

}
</style>

