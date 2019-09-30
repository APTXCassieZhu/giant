<template>
    <Card style="width:250px">
        <span>
            <Icon type="ios-star" v-for="n in 4" :key="n"></Icon>
            <Icon type="ios-star" v-if="item.rate >= 9.5"></Icon>
            <Icon type="ios-star-half" v-else></Icon>
        </span>
    </Card>
</template>
<script>
export default {
    name: "SourceCard",
    data() {
        return{
            item: {
                rate: 10,
            }
        }
    },
}
</script>
<style scoped>

</style>