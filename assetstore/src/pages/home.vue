<template>
<div>
    <div style="position: relative; height: 500px;">
        <HomeTopNavigation style="position:fixed; z-index: 10000"></HomeTopNavigation>   
        <HomeSearch style="position: relative; top: 84px;"></HomeSearch>  
    </div>
    <div class="middle-card-wrapper">
        <div class="middle-card">
            <div class="choice-select">
                <div :class="this.tabIndex===0?'choice-item-active':'choice-item'" @click="chooseItem(0)">
                    <div style="text-align:center">
                        <span class="choice-cn">推荐</span>
                        <span class="choice-en">Features</span>
                    </div>
                    <div class="orange-underline" v-if="tabIndex === 0"></div>
                </div>
                <div :class="this.tabIndex===1?'choice-item-active':'choice-item'" @click="chooseItem(1)">
                    <div style="text-align:center">
                        <span class="choice-cn">更新</span>
                        <span class="choice-en">Update</span>
                    </div>
                    <div class="orange-underline" v-if="tabIndex === 1"></div>
                </div>
                <div :class="this.tabIndex===2?'choice-item-active':'choice-item'" @click="chooseItem(2)">
                    <div style="text-align:center">
                        <span class="choice-cn">研发类</span>
                        <span class="choice-en">Dev Asset</span>
                    </div>
                    <div class="orange-underline" v-if="tabIndex === 2"></div>
                </div>
                <div :class="this.tabIndex===3?'choice-item-active':'choice-item'" @click="chooseItem(3)">
                    <div style="text-align:center">
                        <span class="choice-cn">美术类</span>
                        <span class="choice-en">Art Asset</span>
                    </div>
                    <div class="orange-underline" v-if="tabIndex === 3"></div>
                </div>
            </div>
        </div>
        <div class="card-wrapper">
            <div v-for="(item, n) in this.list" :key="n" class="fine-resource-card">
                <source-card :resource="{...item}" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                ></source-card>
            </div>
        </div>
        <!-- <div class="card-wrapper" v-if="tabIndex === 1">
            <div v-for="(item, n) in this.list" :key="'b'+n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                ></source-card>
            </div>
        </div>
        <div class="card-wrapper" v-if="tabIndex === 2">
            <div v-for="(item, n) in this.devList" :key="'bb'+n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                ></source-card>
            </div>
        </div>
        <div class="card-wrapper" v-if="tabIndex === 3">
            <div v-for="(item, n) in this.artList" :key="'bbb'+n" class="fine-resource-card">
                <source-card :resource="item" :isLike="item.isStar"
                :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
                ></source-card>
            </div>
        </div> -->
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
            list: [],
            curCarousel: 0,
            tabIndex:1,
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
        // axios.get('/api/resource/home',{
        //     params:{
        //         page: 1,
        //         pageSize: 30,
        //         recommend: true,
        //     }}).then((res)=>{
        //         if(res.data.code == 0){
        //             this.recommendList = res.data.data.list
        //         }
        // })
        // // 拿到美术资源
        // axios.get('/api/resource/home',{
        //     params:{
        //         page: 1,
        //         pageSize: 30,
        //         type: 'art',
        //     }}).then((res)=>{
        //         if(res.data.code == 0){
        //             this.artList = res.data.data.list
        //         }
        // })
        // 拿到研发类资源
        // axios.get('/api/resource/home',{
        //     params:{
        //         page: 1,
        //         pageSize: 30,
        //         type: 'dev',
        //     }}).then((res)=>{
        //     if(res.data.code == 0){
        //         this.devList = res.data.data.list
        //     }
        // })
        // 拿到最新更新资源
        axios.get('/api/resource/home',{
            params:{
                page: 1,
                pageSize: 30,
            }}).then((res)=>{
            if(res.data.code == 0){
                this.list = res.data.data.list
            }
        })
        // 拿到推荐分类
        // axios.get('/api/tag/lastitems',{
        //     params:{
        //         type: 'art_classify',
        //     }}).then((res)=>{
        //         if(res.data.code == 0){
        //             this.recommendClass = res.data.data.list
        //         }
        // })
        // console.log('matched:', this.$route.matched)
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        chooseItem(type){
            this.tabIndex=type
            const query={
                 page: 1,
                pageSize: 30,
            }
            switch(type){
                case 0:
                    query.recommend=true
                    break;
                case 1:
                    break;
                case 2:
                    query.type="dev"
                    break;
                case 3:
                default:
                    query.type="art"
                    break;
            }
            axios.get('/api/resource/home',{
                    params:query
                })
                .then((res)=>{
                    if(res.data.code == 0){
                        this.list = res.data.data.list
                    }
                })
            // if(type=='推荐'){
            //     this.choiceItem1 = 'choice-item-active'
            //     this.choiceItem2 = 'choice-item'
            //     this.choiceItem3 = 'choice-item'
            //     this.choiceItem4 = 'choice-item'
            //     this.activeTab = '推荐'
            //     axios.get('/api/resource/home',{
            //         params:{
            //             page: 1,
            //             pageSize: 30,
            //             recommend: true,
            //         }
            //     }).then((res)=>{
            //         if(res.data.code == 0){
            //             this.recommendList = res.data.data.list
            //         }
            //     })
            // }else if(type=='更新'){
            //     this.choiceItem1 = 'choice-item'
            //     this.choiceItem2 = 'choice-item-active'
            //     this.choiceItem3 = 'choice-item'
            //     this.choiceItem4 = 'choice-item'
            //     this.activeTab = '更新'
            //     axios.get('/api/resource/home',{
            //         params:{
            //             page: 1,
            //             pageSize: 30,
            //         }}).then((res)=>{
            //         if(res.data.code == 0){
            //             this.updateList = res.data.data.list
            //         }
            //     })
            // }else if(type=='研发类'){
            //     this.choiceItem1 = 'choice-item'
            //     this.choiceItem2 = 'choice-item'
            //     this.choiceItem3 = 'choice-item-active'
            //     this.choiceItem4 = 'choice-item'
            //     this.activeTab = '研发类'
            //     axios.get('/api/resource/home',{
            //         params:{
            //             page: 1,
            //             pageSize: 30,
            //             type: 'dev',
            //         }}).then((res)=>{
            //         if(res.data.code == 0){
            //             this.devList = res.data.data.list
            //         }
            //     })
            // }else{
            //     this.choiceItem1 = 'choice-item'
            //     this.choiceItem2 = 'choice-item'
            //     this.choiceItem3 = 'choice-item'
            //     this.choiceItem4 = 'choice-item-active'
            //     this.activeTab = '美术类'
            //     axios.get('/api/resource/home',{
            //         params:{
            //             page: 1,
            //             pageSize: 30,
            //             type: 'art',
            //         }}).then((res)=>{
            //         if(res.data.code == 0){
            //             this.artList = res.data.data.list
            //         }
            //     })
            // }
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
    width: 600px;
    margin-bottom: 24px;
    justify-content: space-between;
}
.choice-item{
    color: #707070;
    cursor: pointer;
    transition: .2s linear;
    width: 140px;
    display: flex;
    flex-direction: column-reverse;
}
.choice-item:hover{
    color: #FA541C;
}
.choice-item-active{
    color: #FA541C;
    cursor: pointer;
    width: 140px;
    display: flex;
    flex-direction: column-reverse;
}
.choice-cn{
    font: 600 18px Microsoft YaHei;
    
}
.choice-en{
    font: 14px Microsoft YaHei;
}
@keyframes longer { 
    from { 
        transform: scaleX(0); 
    } 
    to { 
        transform: scaleX(1); 
    } 
}
.orange-underline{
    position: absolute;
    animation-name: longer; 
    animation-duration: 0.3s;
    margin-top: 10px;
    width: 140px;
    height: 3px;
    border-radius: 5px;
    background-color: #FA541C;
}

.card-wrapper{
    width: 100%;
    max-width: 1380px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
}
.fine-resource-card{
    position: relative;
    margin-right: 15px; 
    margin-left: 15px; 
    margin-bottom: 30px;
    width: 360px;
    height: 300px;
}
@media screen and (max-width: 2000px) {
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