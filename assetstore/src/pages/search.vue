<template>
    <div>
        <TopNavigation></TopNavigation>
        <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem to="/home/2D">2D</BreadcrumbItem>
            <BreadcrumbItem>当前内容</BreadcrumbItem>
        </Breadcrumb>
        <Search></Search>
    </div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
import Search from '../components/Search.vue'
export default {
    name:"Search",
    components:{
        TopNavigation,
        Search
        }
}
</script>

<style scoped>

</style>

