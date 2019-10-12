<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>  
        <div class="bread-container"> 
            <br>     
            <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem to="/home/software">软件</BreadcrumbItem>
                <BreadcrumbItem>当前内容</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <br>
        <LeftSideMenu style="position:relative; z-index:0"></LeftSideMenu>
        <br><br><br><br>
        <footer style="position:fixed; bottom: 0px;"></footer>
    </div>
</template>
    
<script>
import TopNavigation from '../components/TopNav.vue'
import LeftSideMenu from '../components/leftSideMenu.vue'
import Footer from '../components/footer.vue'
export default {
    name:"software",
    components:{TopNavigation, LeftSideMenu, Footer}
}
</script>

<style scoped>
.bread-container {
    position: relative;
    left: 3%;
}
</style>

