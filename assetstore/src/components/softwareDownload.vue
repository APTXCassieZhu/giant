<template>
    <!---->
    <div class="source-box">
        <div class="font-image">LOGO</div>
        <div class="font-title">
            <p style="font-size:16px;font-weight:600">{{software}}</p>
            <p style="position:relative;top:8px;font-size:14px;font-weight:600;color:#7f7f7f;">当前版本 {{currentVersion}}</p>
            <p style="position:relative; top: 25px;font-size:14px;color:#7f7f7f;">最后更新 {{latestUpdate}}</p>
        </div>
        <Button class="btn" type="success"><Icon type="md-download" />下载软件</Button>
    </div>
</template>
<script>
export default {
    name: "SoftwareDownload",
    //props: ['softwareName'],
    data() {
        return {
            software: "XXX客户端", //this.softwareName
            currentVersion: "3.0.1",
            latestUpdate: "2019.02.29"
        }
    },
    methods:{
    }
}
</script>
<style scoped>
.source-box{
    float: left;
    height: 150px; 
    width: 252px;
    margin-right: 60px;
    margin-bottom: 60px;
}

.font-image{
    color: grey;
    background-color: #d8d8d8;
    height: 88px;
    width: 88px;
    border-radius: 3px;
    line-height: 88px;
    text-align: center;
}
.font-title{
    display: inline-block;
    position: relative;
    top: -85px;
    left: 100px;
    margin-bottom: 30px;
    line-height: 21px;
}
.btn{
    position:relative;
    top: -70px;
    left: -2px;
    width: 252px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    font-size:16px;
    font-weight: 600;
}
</style>