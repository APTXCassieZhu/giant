<template>
    <div>
        <TopNavigation></TopNavigation>
        <corner></corner>
        <Footer style="position:relative;margin-top: 200px;"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'
export default {
    name:"VersionHistory",
    components:{TopNavigation,Footer,Corner}
}
</script>

<style scoped>

</style>

