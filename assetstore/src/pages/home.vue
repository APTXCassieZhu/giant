<template>
<div>
    <HomeTopNavigation></HomeTopNavigation>
    <HomeSearch></HomeSearch>
</div>
</template>

<script>
import HomeTopNavigation from '../components/HomeTopNav.vue'
import HomeSearch from '../components/homeSearch.vue'
/*var searchContent = document.getElementById("search")
addEventListener(searchContent, "focus", function() {

})*/

export default {
    name:"Home",
    components: {HomeTopNavigation,HomeSearch},
}
</script>

<style scoped>

</style>
