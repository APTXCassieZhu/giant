<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>     
        <div class="title-wrapper">
            <ul><div class="title">研发类资源</div></ul>
            <ul><span style="color:gray">-程序员哥哥们的好伴侣-</span></ul>
        </div>
        <div class="card-wrapper">
            <!--TODO 点击advise-card会跳转到相应界面 home page 所有卡片相关跳转都没做-->
            <ul><div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-可视化脚本.png') + ')'}"></div>
            <!--<div class="advise-card"><span class="advise-des">地形</span></div>-->
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-地形.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-动画编辑器.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-粒子和效果.png') + ')'}"></div></ul>
            <ul><div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-其他工具.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-AI.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-unity.png') + ')'}"></div>
            <div class="advise-card" :style="{backgroundImage: 'url(' + require('../../assets/研发资源-unreal.png') + ')'}"></div></ul>
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
    name:"ToolFilter",
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
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
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

