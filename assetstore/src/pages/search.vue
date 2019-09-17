<template>
    <div>
        <TopNavigation></TopNavigation>
        <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem to="/home/2D">2D</BreadcrumbItem>
            <BreadcrumbItem>当前内容</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
export default {
    name:"Search",
    components:{TopNavigation}
}
</script>

<style scoped>

</style>

