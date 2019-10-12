<template>
    <div>
        <TopNavigation></TopNavigation>
        <div class="self-card"></div>
        <Footer style="position:fixed; bottom: 0px;"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
export default {
    name:"Personal",
    components:{TopNavigation, Footer}
}
</script>

<style scoped>
.self-card{
    position: relative;
    font-family: MicrosoftYaHei;
}
</style>

