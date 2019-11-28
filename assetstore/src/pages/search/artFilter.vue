<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <div class="title-wrapper">
                <ul><div class="title">美术类资源</div></ul>
                <ul><span style="color:gray">-最具创意的美术项目集合-</span></ul>
            </div>
            <div class="card-wrapper">
                <div class="advise-card" :breadlist="[{fullPath:'/artShow/role',name:'角色'}]"  @click="goPage('/artShow/role')" :style="{backgroundImage: 'url(' + require('../../assets/资源-角色.png') + ')'}"></div>
                <div class="advise-card" :breadlist="[{fullPath:'/artShow/environment',name:'环境'}]" @click="goPage('/artShow/environment')" :style="{backgroundImage: 'url(' + require('../../assets/资源-环境.png') + ')'}"></div>
                <div class="advise-card" :breadlist="[{fullPath:'/artShow/tool',name:'道具'}]" @click="goPage('/artShow/tool')" :style="{backgroundImage: 'url(' + require('../../assets/资源-道具.png') + ')'}"></div>
                <div class="advise-card" :breadlist="[{fullPath:'/artShow/vehicle',name:'载具'}]" @click="goPage('/artShow/vehicle')" :style="{backgroundImage: 'url(' + require('../../assets/资源-载具.png') + ')'}"></div>
                <div class="advise-card" :breadlist="[{fullPath:'/artShow/effect',name:'特效'}]" @click="goPage('/artShow/effect')" :style="{backgroundImage: 'url(' + require('../../assets/资源-特效.png') + ')'}"></div>
                <div class="advise-card" :breadlist="[{fullPath:'/artShow/animation',name:'动画'}]" @click="goPage('/artShow/animation')" :style="{backgroundImage: 'url(' + require('../../assets/资源-动画.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/3d')" :style="{backgroundImage: 'url(' + require('../../assets/资源-3d.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/2d')" :style="{backgroundImage: 'url(' + require('../../assets/资源-2d.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/paint')" :style="{backgroundImage: 'url(' + require('../../assets/资源-原画.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/UI')" :style="{backgroundImage: 'url(' + require('../../assets/资源-UI.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/cute')" :style="{backgroundImage: 'url(' + require('../../assets/资源-q版.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/second')" :style="{backgroundImage: 'url(' + require('../../assets/资源-二次元.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/korea')" :style="{backgroundImage: 'url(' + require('../../assets/资源-日韩.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/occident')" :style="{backgroundImage: 'url(' + require('../../assets/资源-欧美.png') + ')'}"></div>
                <div class="advise-card" @click="goPage('/artShow/china')" :style="{backgroundImage: 'url(' + require('../../assets/资源-国风.png') + ')'}"></div>
            </div>
            <corner></corner>
            <Footer style="position:relative;margin-top: 200px;"></Footer>
        </div>
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
        goPage(url){
            this.$router.push(url)
        }
    },
}
</script>

<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    /* justify-content:center; */
    flex-direction: column;
    align-items:center;
}
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
    align-items: center;
    box-sizing: border-box;
    top: 40px;
    flex: 1;
    width: 75%;
}
.advise-card{
    display: inline-block; 
    cursor: pointer;
    margin-right: 15px; 
    margin-left: 15px; 
    margin-bottom: 40px;
    width: 240px;
    height: 275px;
    background-image: url('../../assets/彩色.jpg');
    /* background-size: 240px 275px; */
    background-size: cover;
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

@media screen and (max-width: 1450px) {
    .advise-card::after{
        content:'';
        display:block;
        width:100%;
        padding-bottom:114.58%;
    }
    .advise-card{
        width:20%;
        height: auto;
        margin: 1.5%;
    }
}
@media screen and (max-width: 650px){
    .title{
        font-size: 18px;
        font-weight: 600;
    }
}
</style>

