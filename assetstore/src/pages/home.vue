<template>
<div>
    <div style="position: relative; height: 480px;">
        <HomeTopNavigation></HomeTopNavigation>   
        <HomeSearch></HomeSearch>  
    </div>
    <div class="card-wrapper">
        <br>
        <h1 style="position: relative; margin-left: 43%;">-推荐资源-</h1>
        <h3 style="position: relative; margin-left: 43%;">recommendation</h3>
        <br><br>
        <source-card v-for="n in 24" :key="n" style="display: inline-block; margin-right: 50px; margin-bottom: 40px;"></source-card>
        <Page style="margin-left: 35%;" :total="100" show-elevator />
        <br>
    </div>
    <Footer style="position: relative;"></Footer>
</div>
</template>

<script>
import HomeTopNavigation from '../components/HomeTopNav.vue'
import HomeSearch from '../components/homeSearch.vue'
import SourceCard from '../components/sourceCard.vue'
import Footer from '../components/footer.vue'
/*var searchContent = document.getElementById("search")
addEventListener(searchContent, "focus", function() {

})*/

export default {
    name:"Home",
    components: {HomeTopNavigation,HomeSearch,SourceCard,Footer},
}

</script>

<style scoped>
.card-wrapper{
    position: relative;
    left: 5%;
}
</style>
