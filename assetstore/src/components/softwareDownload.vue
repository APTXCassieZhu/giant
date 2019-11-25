<template>
    <!---->
    <div class="source-box">
        <div v-if="sw.image != null" ><img class="font-image" :src="sw.image"></div>
        <div v-else class="font-image">{{sw.name}}</div>
        <div class="font-title">
            <p style="font-size:16px;font-weight:600">{{sw.name}}</p>
            <p style="position:relative;top:8px;font-size:14px;font-weight:600;color:#7f7f7f;">当前版本 {{sw.version}}</p>
            <p style="position:relative; top: 25px;font-size:14px;color:#7f7f7f;">最后更新 {{getYYMMDD(sw.updatedAt)}}</p>
        </div>
        <Button class="btn" type="success" @click="download()"><font-awesome-icon :icon="['fas','download']"/>下载软件</Button>
    </div>
</template>
<script>
export default {
    name: "SoftwareDownload",
    props: {
        sw: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            software: "XXX客户端", //this.softwareName
            currentVersion: "3.0.1",
            latestUpdate: "2019.02.29"
        }
    },
    mounted(){
    },
    methods:{
        getYYMMDD(t){
            let time = new Date(t)
            let [yy,mm,dd] = [
                time.getFullYear(),
                time.getMonth()+1,
                time.getDate()
            ]
            if(mm<10){
                mm = '0' + mm
            }
            return  yy+'-'+mm+'.'+dd
  
        },
        download(){
            var fileid = this.sw.file.id;
            location.href = `//192.168.94.238:3000/file/download/${fileid}/?token=${this.$store.state.token}`
        }
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