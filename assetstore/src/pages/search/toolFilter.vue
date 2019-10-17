<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>     
        <div class="title-wrapper">
            <ul><div class="title">研发类资源</div></ul>
            <ul><span style="color:gray">-程序员哥哥们的好伴侣-</span></ul>
        </div>
        <div class="card-wrapper">
            <!--TODO 点击advise-card会跳转到相应界面 home page 所有卡片相关跳转都没做-->
            <ul><div class="advise-card"><span class="advise-des">可视化脚本</span></div>
            <div class="advise-card"><span class="advise-des">地形</span></div>
            <div class="advise-card"><span class="advise-des">动画编辑器</span></div>
            <div class="advise-card"><span class="advise-des">粒子和效果</span></div></ul>
            <ul><div class="advise-card"><span class="advise-des">其他工具</span></div>
            <div class="advise-card"><span class="advise-des">AI</span></div>
            <div class="advise-card"><span class="advise-des">Unity引擎</span></div>
            <div class="advise-card"><span class="advise-des">Unreal引擎</span></div></ul>
        </div>
        <corner></corner>
        <Footer style="position:relative;"></Footer>
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
    margin-bottom: 200px;
}

.advise-card{
    display: inline-block; 
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

