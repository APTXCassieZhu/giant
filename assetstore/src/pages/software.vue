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
        <LeftSideMenu></LeftSideMenu>
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
    position: relative;
    left:25px;
}
</style>

