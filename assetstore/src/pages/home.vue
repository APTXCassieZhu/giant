<template>
<div>
    <div style="position: relative; height: 480px;">
        <HomeTopNavigation></HomeTopNavigation>   
        <HomeSearch></HomeSearch>  
    </div>
    <br><br>
    <div class="type-title" @click="goPage('/artShow')">美术类资源</div>
    <div style="text-align:center;position:relative;">-最具创意的美术项目集合-
        <strong><div class="more" @click="goPage('/artShow')">查看更多
            <Icon size="23" style="position:absolute;bottom:0.4px;" type="md-arrow-dropright" /></div>
        </strong>
    </div>
    <div class="card-wrapper">
        <!-- <source-card v-for="n in 5" :key="n" styname="美术类资源" :sourceID="n+''" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></source-card> -->
        <span v-for="(item, n) in this.commonArtList" :key="n" >
            <source-card :resource="item" :isLike="item.isStar"
            :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" 
            :sourceID="n+''" class="fine-resource-card"></source-card>
        </span>
    </div>
    <div class="type-title" @click="goPage('/artFilter')">推荐分类</div>
    <div style="text-align:center;position:relative;">-各类高实用性的项目集合-
        <strong><div class="more" @click="goPage('/artFilter')">查看更多
            <Icon size="23" style="position:absolute;bottom:0.4px" type="md-arrow-dropright" /></div>
        </strong>
    </div>
    <div class="card-wrapper">
        <!--TODO 点击advise-card会跳转到相应界面 home page 所有卡片相关跳转都没做-->
        <!-- <span v-for="(item, x) in recommendClass" :key="x">
            <div class="advise-card" :style="{backgroundImage: 'url(' + require(`../assets/资源-${item.name}.png`) + ')'}"></div>
        </span> -->
        <div class="advise-card" @click="goPage('/artshow/3d')" :style="{backgroundImage: 'url(' + require(`../assets/资源-3d.png`) + ')'}"></div>
        <div class="advise-card" @click="goPage('/artshow/2d')" :style="{backgroundImage: 'url(' + require('../assets/资源-2d.png') + ')'}"></div>
        <div class="advise-card" @click="goPage('/artshow/texture')" :style="{backgroundImage: 'url(' + require('../assets/资源-贴图与材质.png') + ')'}"></div>
        <div class="advise-card" @click="goPage('/artshow/template')" :style="{backgroundImage: 'url(' + require('../assets/资源-模板.png') + ')'}"></div>
        <div class="advise-card" @click="goPage('/artshow/role')" :style="{backgroundImage: 'url(' + require('../assets/资源-角色.png') + ')'}"></div>
    </div>
    <div class="type-title" @click="goPage('/artShow')">精选美术资源</div>
    <div style="position: relative; text-align: center; color: gray;">-最具创意的美术项目精选-</div>

    <Carousel autoplay arrow="always" trigger="hover" :autoplay-speed="speed" class="carousel-style">
        <CarouselItem>
            <span v-for="item in this.fineArtList.slice(0,3)">
                <fine-source-card :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" :resource="item" class="fine-resource-card" :isLike="item.isStar"></fine-source-card>
            </span>
        </CarouselItem>
        <CarouselItem>
            <span v-for="item in this.fineArtList.slice(0,3)">
                <fine-source-card :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" :resource="item" class="fine-resource-card" :isLike="item.isStar"></fine-source-card>
            </span>
        </CarouselItem>
        <CarouselItem>
            <span v-for="item in this.fineArtList.slice(0,3)">
                <fine-source-card :breadlist="[{fullPath:'/artShow',name:'美术类资源'}]" :resource="item" class="fine-resource-card" :isLike="item.isStar"></fine-source-card>
            </span>
        </CarouselItem>
    </Carousel>
    <div class="type-title" @click="goPage('/toolFilter')">研发类资源</div>
    <div style="position: relative; text-align: center; color: gray;">-程序员哥哥们的好伴侣-</div>
    <div class="card-wrapper" style="margin-bottom: 0px;">
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="111" ref="child2" class="fine-resource-card"></special-card>
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="222" ref="child3" class="fine-resource-card"></special-card>
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="333" ref="child4" class="fine-resource-card"></special-card>
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="444" ref="child5" class="fine-resource-card"></special-card>
    </div>
    <div class="card-wrapper" style="margin-top: 0px; margin-bottom: 200px;">    
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="555" ref="child6" class="fine-resource-card"></special-card>
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="666" ref="child7" class="fine-resource-card"></special-card>
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="777" ref="child8" class="fine-resource-card"></special-card>
        <special-card :breadlist="[{fullPath:'/home#dev',name:'研发类资源'}]" sourceID="999" ref="child9" class="fine-resource-card"></special-card>
    </div>
    <corner></corner>
    <Footer style="position: relative;"></Footer>
</div>
</template>

<script>
import HomeTopNavigation from '../components/HomeTopNav.vue'
import HomeSearch from '../components/homeSearch.vue'
import SourceCard from '../components/sourceCard.vue'
import FineSourceCard from '../components/fineSourceCard.vue'
import SpecialCard from '../components/specialCard.vue'
import Footer from '../components/footer.vue'
import Corner from '../components/corner.vue'
/*var searchContent = document.getElementById("search")
addEventListener(searchContent, "focus", function() {

})*/

export default {
    name:"Home",
    components: {HomeTopNavigation,HomeSearch,SourceCard,FineSourceCard,SpecialCard,Footer,Corner},
    data() {
        return {
            speed: 5000,
            commonArtList: [],
            recommendClass: [],
            fineArtList: [],
            devList: [],
            curCarousel: 0,
        }
    },
    mounted() {
        this.$refs.child2.special = "image-02";
        this.$refs.child3.special = "image-03";
        this.$refs.child4.special = "image-04";
        this.$refs.child5.special = "image-05";
        this.$refs.child6.special = "image-06";
        this.$refs.child7.special = "image-07";
        this.$refs.child8.special = "image-08";
        this.$refs.child9.special = "image-09";
        // 拿到普通美术资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 5,
                type: 'art',
                recommend: false,
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.commonArtList = res.data.data.list
                }
        })
        // 拿到精选美术资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 5,
                type: 'art',
                recommend: true,
            }}).then((res)=>{
                if(res.data.code == 0){
                    this.fineArtList = res.data.data.list
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
        // 拿到研发类资源
        axios.get('/api/resource',{
            params:{
                page: 1,
                pageSize: 5,
                type: 'dev',
                recommend: false,
            }}).then((res)=>{
            if(res.data.code == 0){
                this.devList = res.data.data.list
            }
        })
        console.log('matched:', this.$route.matched)
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        // unFavorite(lid){
        //     for (var i = 0; i < this.commonArtList.length; i++) {
        //         if (this.commonArtList[i].id == lid) {
        //             this.commonArtList[i].isStar = false;
        //             break;
        //         }
        //     }
        // },
        // favorite(lid){
        //     for (var i = 0; i < this.commonArtList.length; i++) {
        //         if (this.commonArtList[i].id == lid) {
        //             this.commonArtList[i].isStar = true;
        //             break;
        //         }
        //     }
        // },
    }
}

</script>
<style>
.carousel-style > .ivu-carousel-arrow > .ivu-icon{
    vertical-align: middle;
    text-align: center;
}
</style>
<style scoped>
.card-wrapper{
    position: relative;
    /*left: 15%;*/
    text-align:center;
    /*width:80%;*/
    margin-top: 20px;
    margin-bottom: 50px;
}
.type-title{
    position: relative; 
    text-align: center; 
    color: #1ebf73;
    font-family: MicrosoftYaHei;
    font-size: 22px;
    font-weight: 600;
    /* z-index: 10; */
    cursor:pointer;
}
.more{
    position: absolute;
    top: 1.5px;
    right: 280px;
    /*color: rgb(0, 140, 255);*/
    color: #1ebf73;
    cursor: pointer;
    width: 100px;
    padding: 0;
    margin: 0;
}
.carousel-style{
    text-align:center; 
    width: 80%; 
    left: 10%;
    margin-top: 20px;
    margin-bottom: 50px;
}
.fine-resource-card{
    display: inline-block;
    margin-bottom: 40px;
    margin-left: 15px;
    margin-right: 15px;
}
.advise-card{
    display: inline-block; 
    cursor: pointer;
    margin-left: 15px; 
    margin-right: 15px; 
    margin-bottom: 40px;
    width: 240px;
    height: 275px;
    background-image: url('../assets/彩色.jpg');
    background-size: 240px 275px;
    background-repeat: no-repeat;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);
    color: white;
}
.advise-des{
    position:relative;
    float: left;
    top: 230px;
    left: 10px;
    font-size: 28px;
}
@media only screen and (max-width: 1366px) {
    .more{
        right: 10px;
    }
}
</style>