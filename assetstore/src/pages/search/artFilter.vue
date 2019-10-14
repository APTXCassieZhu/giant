<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        
        <div class="title-wrapper">
            <ul><div class="title">美术类资源</div></ul>
            <ul><span style="color:gray">-最具创意的美术项目集合-</span></ul>
        </div>
        <div class="card-wrapper">
            <!--TODO 点击advise-card会跳转到相应界面 home page 所有卡片相关跳转都没做-->
            <ul><div class="advise-card"><span class="advise-des">角色</span></div>
            <div class="advise-card"><span class="advise-des">环境</span></div>
            <div class="advise-card"><span class="advise-des">道具</span></div>
            <div class="advise-card"><span class="advise-des">载具</span></div>
            <div class="advise-card"><span class="advise-des">特效</span></div></ul>
            <ul><div class="advise-card"><span class="advise-des">动画</span></div>
            <div class="advise-card"><span class="advise-des">3D</span></div>
            <div class="advise-card"><span class="advise-des">2D</span></div>
            <div class="advise-card"><span class="advise-des">原画</span></div>
            <div class="advise-card"><span class="advise-des">UI</span></div></ul>
            <ul><div class="advise-card"><span class="advise-des">人物</span></div>
            <div class="advise-card"><span class="advise-des">二次元</span></div>
            <div class="advise-card"><span class="advise-des">日韩</span></div>
            <div class="advise-card"><span class="advise-des">欧美</span></div>
            <div class="advise-card"><span class="advise-des">国风</span></div></ul>
        </div>
        <corner></corner>
        <br><br><br><br><br>        
        <Footer style="position:relative;"></Footer>
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

