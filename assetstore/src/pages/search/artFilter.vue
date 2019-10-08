<template>
    <div>
        <TopNavigation></TopNavigation>
        <div class="body-style">
            <div class="advise-wrapper">
                <div class="advise-container">
                    <span>&emsp;推荐搜索&emsp;</span>
                    <!--TO DO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                    <Tag color="purple">推荐搜索1</Tag>
                    <span>&emsp;</span>
                    <Tag color="purple">推荐搜索2</Tag>
                    <span>&emsp;</span> 
                    <Tag color="purple">推荐搜索3</Tag>
                    <span>&emsp;</span> 
                    <Tag color="purple">推荐搜索4</Tag>
                    <span>&emsp;</span> 
                </div>
            </div>
            <div class="bread-container">
                <Breadcrumb>
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/home/resource">美术类资源</BreadcrumbItem>
                    <BreadcrumbItem>当前内容</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="title-wrapper">
                <strong>美术类资源</strong>
            </div>
            <div class="card-wrapper">
                <source-card style="position:relative"></source-card>
            </div>
        </div>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import SourceCard from '../../components/sourceCard.vue'
export default {
    name:"ArtFilter",
    components:{
        TopNavigation,
        SourceCard,
    }
}
</script>

<style scoped>
.body-style{
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 140px;
}
.title-wrapper{
    position: relative;
    left:3%;
    top: 30px;
    font-size: 30px;
}
.advise-wrapper{
    position: relative;
    width: 100%;
    height: 50px;
    background-color:rgb(210, 234, 255);
}
.advise-container {
    position: relative;
    left:2.5%;
    top:15px;
    height: 20px;
}
.card-wrapper {
    position: relative;
    left: 3%;
    top: 25px;
    border: 2px bold gray;
}

.bread-container {
    position: relative;
    left:3%;
    top:20px;
    padding: 10px;
}
</style>

