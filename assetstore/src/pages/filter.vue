<template>
    <div>
        <TopNavigation></TopNavigation>
        <div class="bread-container">
            <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem to="/home/2D">2D</BreadcrumbItem>
                <BreadcrumbItem>当前内容</BreadcrumbItem>
            </Breadcrumb>
        </div>
    </div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
export default {
    name:"Filter",
    components:{
        TopNavigation,
    }
}
</script>

<style scoped>
.bread-container {
    position: relative;
    left:2%;
    top:40%;
    z-index: -1;
}
</style>

