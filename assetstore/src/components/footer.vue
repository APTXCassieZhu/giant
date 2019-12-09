<template>
    <div class="footer">
        <div class="footer-wrapper">
            <div class="footer-upper">
                <div class="footer-col">
                    <ul class="footer-title">浏览目录</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/人类角色模型`)">人类角色模型</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/建筑模型`)">建筑模型</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/特效`)">特 效</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/材质贴图`)">材质贴图</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/角色原画`)">角色原画</ul>
                </div>
                <div class="footer-col">
                    <ul class="footer-title">&nbsp;</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/非人类角色模型`)">非人类角色模型</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/自然环境模型`)">自然环境模型</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/动画`)">动 画</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/界面GUI`)">界面GUI</ul>
                    <ul style="margin-bottom: 16px; cursor: pointer" @click="goPage(`/artshow/场景原画`)">场景原画</ul>
                </div>
                <div class="footer-col"></div>
                <div class="footer-col">
                    <ul class="footer-title">其他服务</ul>
                    <ul style="margin-bottom: 16px;">音乐音效</ul>
                    <ul style="margin-bottom: 16px;">问 答</ul>
                    <ul style="margin-bottom: 16px;">知识管理</ul>
                </div>
                <div class="footer-col"></div>
                <div class="footer-col">
                    <ul class="footer-title">关于本项目</ul>
                    <ul style="margin-bottom: 16px;">常见问题</ul>
                    <ul style="margin-bottom: 16px;">版权事项</ul>
                    <ul style="margin-bottom: 16px;">联系我们</ul>
                </div>
                <div class="footer-col"></div>
                <div class="footer-col"></div>
                <div class="footer-col"></div>
                <div class="footer-col"></div>
            </div>
            <div>
                <a-divider style="color: #E8E8E83E;"/>
                <span style="margin-left: 10px; color:#FAFAFA">GDRC Project by Front EDGE 2019 all rights reserved.</span>
                <br><br>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    methods:{
        goPage(url){
            if(this.$route.path===url){
                location.reload()
            }else{
                this.$router.push(url)
            }
        },
    }
}
</script>

<style scoped>
.footer{
    height: 380px;
    width: 100%;
    background-color: #000000D9;
    color: #86A0B2;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    display: flex;
    justify-content: center;
}
.footer-wrapper{
    max-width: 1380px;
    width: 100%;
    padding: 20px 20px 20px 20px;
    display: flex;
    flex-direction: column;
}

.footer-upper{
    display: flex;
    flex-direction: row;
    align-content: space-between;
}
.footer-col{
    width: 10%;
}
.footer-title{
    color: #FAFAFA; 
    font-size: 18px; 
    margin-bottom: 33px;
}
</style>