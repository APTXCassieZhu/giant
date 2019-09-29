<template>
    <div>
        <TopNavigation></TopNavigation>
        <div class="advise-wrapper">
            <div class="advise-container">
                <span>&emsp;推荐搜索&emsp;</span>
                <!--TO DO 推荐搜索按照用户输入的搜索而得出的相关搜索-->
                <Tag color="purple">推荐搜索1</Tag>
                <span>&emsp;</span>
                <Tag color="purple">推荐搜索2</Tag>
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
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
export default {
    name:"Filter",
    components:{
        TopNavigation,
    }
}
</script>

<style scoped>
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
    z-index: -1;
}
.advise-container {
    position: relative;
    left:2.5%;
    top:15px;
    height: 20px;
    z-index: -1;
}
.bread-container {
    position: relative;
    left:3%;
    top:20px;
    z-index: -1;
}
</style>

