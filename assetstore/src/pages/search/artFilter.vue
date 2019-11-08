<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        
        <div class="title-wrapper">
            <ul><div class="title">美术类资源</div></ul>
            <ul><span style="color:gray">-最具创意的美术项目集合-</span></ul>
        </div>
        <div class="card-wrapper">
            <!--TODO 点击advise-card会跳转到相应界面 home page 所有卡片相关跳转都没做-->
            <ul><div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-角色.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-环境.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-道具.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-载具.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-特效.png') + ')'}"></div></ul>
            <ul><div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-动画.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-3d.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-2d.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-原画.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-UI.png') + ')'}"></div></ul>
            <ul><div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-q版.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-二次元.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-日韩.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-欧美.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/资源-国风.png') + ')'}"></div></ul>
        </div>
        <corner></corner>
        <Footer style="position:relative;margin-top: 200px;"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'
export default {
    name:"ArtFilter",
    components:{
        TopNavigation,
        Footer,
        Corner,
    },
    data() {
        return {    
        }
    },
    mounted(){
        
    },
    methods:{
    },
}
</script>

<style scoped>
.title-wrapper{
    position: relative;
    text-align: center;
    top: 20px;
}
.title{
    font-family: MicrosoftYaHei;
    font-size: 24px;
    font-weight: 600;
    color:#1ebf73;
}
.card-wrapper {
    position: relative;
    text-align: center;
    top: 40px;
}

.advise-card{
    display: inline-block; 
    cursor: pointer;
    margin-right: 30px; 
    margin-bottom: 40px;
    width: 240px;
    height: 275px;
    background-image: url('../../assets/彩色.jpg');
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

