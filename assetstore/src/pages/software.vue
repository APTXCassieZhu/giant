<template>
    <div>
        <TopNavigation></TopNavigation>  
        <div class="bread-container"> 
            <br>     
            <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem to="/home/software">软件</BreadcrumbItem>
                <BreadcrumbItem>当前内容</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <br>
        <LeftSideMenu style="position:absolute; top:180px; z-index:0"></LeftSideMenu>
    </div>
</template>
    
<script>
import TopNavigation from '../components/TopNav.vue'
import LeftSideMenu from '../components/leftSideMenu.vue'
export default {
    name:"software",
    components:{TopNavigation, LeftSideMenu}
}
</script>

<style scoped>
.bread-container {
    position: fixed;
    top: 130px;
    left:1.5%;
}
</style>

