<template>
<div>
    <div style="position: relative; height: 500px;">
        <HomeTopNavigation style="position:fixed; z-index: 10000"></HomeTopNavigation>   
        <HomeSearch style="position: relative; top: 84px;"></HomeSearch>  
    </div>
    <div class="middle-card-wrapper">
        <div class="middle-card">
            <div class="choice-select">
                <div :class="choiceItem1" @click="chooseItem('推荐')">
                    <span class="choice-cn">推荐</span>
                    <span class="choice-en">Features</span>
                    <!-- TODO  点击时，变长，原来的active慢慢变短到没有-->
                    <div class="orange-underline" v-if="activeTab == '推荐'"></div>
                </div>
                <div :class="choiceItem2" @click="chooseItem('更新')">
                    <span class="choice-cn">更新</span>
                    <span class="choice-en">Update</span>
                    <div class="orange-underline" v-if="activeTab == '更新'"></div>
                </div>
                <div :class="choiceItem3" @click="chooseItem('研发类')">
                    <span class="choice-cn">研发类</span>
                    <span class="choice-en">Dev Asset</span>
                    <div class="orange-underline" v-if="activeTab == '研发类'"></div>
                </div>
                <div :class="choiceItem4" @click="chooseItem('美术类')">
                    <span class="choice-cn">美术类</span>
                    <span class="choice-en">Art Asset</span>
                    <div class="orange-underline" v-if="activeTab == '美术类'"></div>
                </div>
            </div>
        </div>
        <div class="card-wrapper" v-if="activeTab == '推荐'">
            <div v-for="(item, n) in this.recommendList" :key="n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                :sourceID="n+''"></source-card>
            </div>
        </div>
        <div class="card-wrapper" v-if="activeTab == '更新'">
            <div v-for="(item, n) in this.updateList" :key="'b'+n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                :sourceID="n+''"></source-card>
            </div>
        </div>
        <div class="card-wrapper" v-if="activeTab == '研发类'">
            <div v-for="(item, n) in this.devList" :key="'bb'+n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                :sourceID="n+''"></source-card>
            </div>
        </div>
        <div class="card-wrapper" v-if="activeTab == '美术类'">
            <div v-for="(item, n) in this.artList" :key="'bbb'+n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                :sourceID="n+''"></source-card>
            </div>
        </div>
    </div>
    <corner></corner>
    <Footer style="position: relative; margin-top: 200px;"></Footer>
</div>
</template>

<script>
import HomeTopNavigation from '../components/homeTopNav.vue'
import HomeSearch from '../components/homeSearch.vue'
import SourceCard from '../components/sourceCard.vue' 
import FineSourceCard from '../components/fineSourceCard.vue'
import SpecialCard from '../components/specialCard.vue'
import Footer from '../components/footer.vue'
import Corner from '../components/corner.vue'

export default {
    name:"Home",
    components: {HomeTopNavigation,HomeSearch,SourceCard,FineSourceCard,SpecialCard,Footer,Corner},
    data() {
        return {
            recommendClass: [],
            artList: [],
            devList: [],
            recommendList: [],
            updateList: [],
            curCarousel: 0,
            // choiceItem：tab active和不active的css class
            choiceItem1: 'choice-item',
            choiceItem2: 'choice-item-active',
            choiceItem3: 'choice-item',
            choiceItem4: 'choice-item',
            activeTab: '更新',
            action: '更新',                 // 反复切换tab时，这个是最新的请求，确保axios不要频发请求
        }
    },
    mounted() {
        // this.$refs.child2.special = "image-02";
        // this.$refs.child3.special = "image-03";
        // this.$refs.child4.special = "image-04";
        // this.$refs.child5.special = "image-05";
        // this.$refs.child6.special = "image-06";
        // this.$refs.child7.special = "image-07";
        // this.$refs.child8.special = "image-08";
        // this.$refs.child9.special = "image-09";
        // 拿到推荐资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 30,
                recommend: true,
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.recommendList = res.data.data.list
                }
        })
        // 拿到美术资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 30,
                type: 'art',
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.artList = res.data.data.list
                }
        })
        // 拿到研发类资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 30,
                type: 'dev',
            }}).then((res)=>{
            if(res.data.code == 0){
                this.devList = res.data.data.list
            }
        })
        // 拿到最新更新资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 30,
            }}).then((res)=>{
            if(res.data.code == 0){
                this.updateList = res.data.data.list
            }
        })
        // 拿到推荐分类
        axios.get('/api/tag/lastitems',{
            params:{
                type: 'art_classify',
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.recommendClass = res.data.data.list
                }
        })
        console.log('matched:', this.$route.matched)
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        chooseItem(type){
            if(type=='推荐'){
                this.choiceItem1 = 'choice-item-active'
                this.choiceItem2 = 'choice-item'
                this.choiceItem3 = 'choice-item'
                this.choiceItem4 = 'choice-item'
                this.activeTab = '推荐'
                this.action = '推荐'
                setTimeout(() => {
                    if(this.action == '推荐'){
                        axios.get('/api/resource',{
                            params:{
                                page: 1,
                                pageSize: 30,
                                recommend: true,
                            }}).then((res)=>{
                            if(res.data.code == 0){
                                this.devList = res.data.data.list
                            }
                        })
                    }
                }, 3000);
            }else if(type=='更新'){
                this.choiceItem1 = 'choice-item'
                this.choiceItem2 = 'choice-item-active'
                this.choiceItem3 = 'choice-item'
                this.choiceItem4 = 'choice-item'
                this.activeTab = '更新'
                this.action = '更新'
                setTimeout(() => {
                    if(this.action == '更新'){
                        axios.get('/api/resource',{
                            params:{
                                page: 1,
                                pageSize: 30,
                            }}).then((res)=>{
                            if(res.data.code == 0){
                                this.devList = res.data.data.list
                            }
                        })
                    }
                }, 3000);
            }else if(type=='研发类'){
                this.choiceItem1 = 'choice-item'
                this.choiceItem2 = 'choice-item'
                this.choiceItem3 = 'choice-item-active'
                this.choiceItem4 = 'choice-item'
                this.activeTab = '研发类'
                this.action = '研发'
                setTimeout(() => {
                    if(this.action == '研发'){
                        axios.get('/api/resource',{
                            params:{
                                page: 1,
                                pageSize: 30,
                                type: 'dev',
                            }}).then((res)=>{
                            if(res.data.code == 0){
                                this.devList = res.data.data.list
                            }
                        })
                    }
                }, 3000);
            }else{
                this.choiceItem1 = 'choice-item'
                this.choiceItem2 = 'choice-item'
                this.choiceItem3 = 'choice-item'
                this.choiceItem4 = 'choice-item-active'
                this.activeTab = '美术类'
                this.action = '美术'
                setTimeout(() => {
                    if(this.action == '美术'){
                        axios.get('/api/resource',{
                            params:{
                                page: 1,
                                pageSize: 30,
                                type: 'art',
                            }}).then((res)=>{
                            if(res.data.code == 0){
                                this.devList = res.data.data.list
                            }
                        })
                    }
                }, 3000);
            }
        }
    }
}

</script>
<style>

</style>
<style scoped>
.middle-card-wrapper{
    margin-top: 24px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.middle-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1380px;
}
.choice-select{
    display: flex;
    flex-direction: row;
    min-width: 567px;
    max-width: 530px;
    margin-bottom: 24px;
    justify-content: space-between;
}
.choice-item{
    color: #707070;
    cursor: pointer;
}
.choice-item-active{
    color: #FA541C;
    cursor: pointer;
}
.choice-cn{
    font: 600 18px Microsoft YaHei;
    
}
.choice-en{
    font: 14px Microsoft YaHei;
}
.orange-underline{
    width: 90px;
    height: 5px;
    border-radius: 5px;
    color: #FA541C;
}
.card-wrapper{
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.fine-resource-card{
    margin-right: 15px; 
    margin-left: 15px; 
    margin-bottom: 30px;
    width: 360px;
    height: 300px;
}
@media screen and (max-width: 1889px) {
    .fine-resource-card::after{
        content:'';
        display:block;
        width:100%;
        padding-bottom: 83.33%;
    }
    .fine-resource-card{
        width: 20%;
        min-width: 140px;
        height: auto;
        margin: 1.5%;
    }
}
</style>