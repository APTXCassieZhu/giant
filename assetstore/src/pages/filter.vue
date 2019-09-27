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
        <Search></Search>
    </div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
import Search from '../components/Search.vue'
export default {
    name:"Filter",
    components:{
        TopNavigation,
        Search
    }
}
</script>

<style scoped>
.bread-container {
    left:20px;
    top:20%;
}
</style>

