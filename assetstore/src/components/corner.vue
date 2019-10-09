<template>
    <div class="corner">
        <div class="corner-icon">
            <strong><Icon size="25" type="ios-arrow-up" @click="backToTop()"/></strong>
        </div>
        <br>
        <div class="corner-icon">
            <strong><Icon size="25" type="ios-create-outline" /></strong>
        </div>
    </div>
</template>
<script>
export default {
    name:"Corner",
    methods:{
        backToTop() {
            
        }
    },
}
</script>
<style scoped>
.corner{
    position: fixed;
    bottom: 100px;
    right: 100px;
    z-index: 1000;
}
.corner-icon{
    border: 1px solid black;
    height: 50px;
    width: 50px;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    /*vertical-align: middle;*/
    padding: 10px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.corner-icon:hover{
    border: 1px solid #fff;
    background-color: gray;
    color: white;

}
</style>