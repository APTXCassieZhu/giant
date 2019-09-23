<template>
<div>
    <TopNavigation></TopNavigation>
    <HomeSearch></HomeSearch>
</div>
</template>

<script>
import TopNavigation from '../components/TopNav.vue'
import HomeSearch from '../components/homeSearch.vue'
/*var searchContent = document.getElementById("search")
addEventListener(searchContent, "focus", function() {

})*/

export default {
    name:"Home",
    components: {TopNavigation,HomeSearch},
}
</script>

<style scoped>

</style>
