<template>
    <div class="footer">
        <div style="margin-left: 10px; padding: 10px;">
            <div class="footer-title">GDRC</div>
            <span>巨人网络公司 - 前沿技术部门开发</span>
            <br><br>
            <!--TODO 所有子分类超链接还没做-->
            <Row>
                <Col span="6">
                    <div class="footer-subtitle">发现</div>
                    <br>
                    <ul>推荐分类</ul>
                    <ul>推荐资源</ul>
                    <ul>研发类资源</ul>
                    <ul>美术类资源</ul>
                </Col>
                <Col span="6">
                    <div class="footer-subtitle">使用帮助</div>
                    <br>
                    <ul>反馈</ul>
                    <ul>常见问题</ul>
                    <ul>新手指引</ul>
                </Col>
                <Col span="6">
                    <div class="footer-subtitle">关于我们</div>
                    <br>
                    <ul>前沿技术部门</ul>
                    <ul>GDRC巨人研发资源中心</ul>
                    <ul>上海巨人网络科技有限公司</ul>
                </Col>
                <Col span="6">
                    <div class="footer-subtitle">联系我们</div>
                    <br>
                    <ul>客服电话：021-61205656</ul>
                    <ul>公司地址：松江区中辰路988号</ul>
                    <ul>email：nidediannideguang@ztgame.com</ul>
                </Col>
            </Row>
        </div>
        <Divider style="color:rgba(0, 0, 0, 0.1)"/>
        <span style="margin-left: 10px;">Copyright © 上海巨人网络科技有限公司（Giant Interactive Group Inc.）</span>
        <br><br>
    </div>
</template>

<script>
export default {
    name: "Footer",
}
</script>

<style scoped>
.footer{
    height: 350px;
    width: 100%;
    /*background-color: rgb(5, 65, 93);
    color: white;*/
    background-color: #dee1e3;
    color: #7f7f7f;
    font-size: 15px;
    padding: 20px 20px 20px 20px;
    font-family: MicrosoftYaHei;
}
.footer-title{
    font-family: MicrosoftYaHei;
    font-size: 24px;
    font-weight: 1000;
}
.footer-subtitle{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
}
</style>