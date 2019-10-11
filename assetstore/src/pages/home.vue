<template>
<div>
    <div style="position: relative; height: 480px;">
        <HomeTopNavigation></HomeTopNavigation>   
        <HomeSearch></HomeSearch>  
    </div>
    <br><br>
    <h1 style="position: relative; text-align: center; color: #0066FF">美术类资源</h1>
    <div style="position: relative; text-align: center; color: gray;">-最具创意的美术项目集合-</div>
    <strong><div class="more" @click='goArtFilter()'>查看更多<Icon size="18" type="md-arrow-dropright" /></div></strong>
    <div class="card-wrapper">
        <source-card v-for="n in 5" :key="n" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></source-card>
    </div>
    <br><br>
    <h1 style="position: relative; text-align: center; color: #0066FF">推荐分类</h1>
    <div style="position: relative; text-align: center; color: gray;">-各类高实用性的项目集合-</div>
    <strong><div class="more">查看更多<Icon size="18" type="md-arrow-dropright" /></div></strong>
    <div class="card-wrapper">
        <!--TODO 点击advise-card会跳转到相应界面 home page 所有卡片相关跳转都没做-->
        <div class="advise-card"><span class="advise-des">3D</span></div>
        <div class="advise-card"><span class="advise-des">2D</span></div>
        <div class="advise-card"><span class="advise-des">贴图与材质</span></div>
        <div class="advise-card"><span class="advise-des">模板</span></div>
        <div class="advise-card"><span class="advise-des">人物</span></div>
    </div>
    <br><br>
    <h1 style="position: relative; text-align: center; color: #0066FF">精选美术资源</h1>
    <div style="position: relative; text-align: center; color: gray;">-最具创意的美术项目精选-</div>
    <Carousel autoplay arrow="always" trigger="click" dots="none" autoplay-speed="5000" loop style="text-align:center; width: 80%; left: 10%">
        <CarouselItem>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        </CarouselItem>
        <CarouselItem>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>        
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>        
        </CarouselItem>
        <CarouselItem>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>        
            <special-card style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>        
        </CarouselItem>
    </Carousel>
    <br><br>
    <h1 style="position: relative; text-align: center; color: #0066FF">研发类资源</h1>
    <div style="position: relative; text-align: center; color: gray;">-程序员哥哥们的好伴侣-</div>
    <div class="card-wrapper">
        <special-card ref="child" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <special-card ref="child3" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <special-card ref="child4" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <special-card ref="child5" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
    </div>
    <div class="card-wrapper">    
        <special-card ref="child6" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <special-card ref="child7" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <special-card ref="child8" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <special-card ref="child9" style="display: inline-block; margin-right: 30px; margin-bottom: 40px;"></special-card>
        <br><br><br>
    </div>
    <corner></corner>
    <Footer style="position: relative;"></Footer>
</div>
</template>

<script>
import HomeTopNavigation from '../components/HomeTopNav.vue'
import HomeSearch from '../components/homeSearch.vue'
import SourceCard from '../components/sourceCard.vue'
import SpecialCard from '../components/specialCard.vue'
import Footer from '../components/footer.vue'
import Corner from '../components/corner.vue'
/*var searchContent = document.getElementById("search")
addEventListener(searchContent, "focus", function() {

})*/

export default {
    name:"Home",
    components: {HomeTopNavigation,HomeSearch,SourceCard,SpecialCard,Footer,Corner},
    mounted() {
        this.$refs.child.special = "image-02";
        this.$refs.child3.special = "image-03";
        this.$refs.child4.special = "image-04";
        this.$refs.child5.special = "image-05";
        this.$refs.child6.special = "image-06";
        this.$refs.child7.special = "image-07";
        this.$refs.child8.special = "image-08";
        this.$refs.child9.special = "image-09";
    },
    methods:{
        goArtFilter(){
            this.$router.push('/artFilter')
        },
    }
}

</script>

<style scoped>
.card-wrapper{
    position: relative;
    /*left: 15%;*/
    text-align:center;
    /*width:80%;*/
}
.more{
    position: relative; 
    left: 81%;
    color: #0066FF;
    cursor: pointer;
}
.advise-card{
    display: inline-block; 
    margin-right: 30px; 
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
</style>
