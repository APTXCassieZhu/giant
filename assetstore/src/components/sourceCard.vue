<template>
    <div class="source-card">
        <div class="upper-mask" @click="goPage(`/resourceDetail/${resource.id}`)">
            <div class="mask-icon">
                <div class="mask-icon-item">
                    <font-awesome-icon :icon="['fas','eye']"/>
                </div>
                <div class="mask-icon-item" @click="throttle()">
                    <font-awesome-icon :icon="['far','heart']" v-show="this.isStar == undefined || !this.isStar" style="color: #ec5b6e;"/>
                    <font-awesome-icon :icon="['fas','heart']" v-show="this.isStar" style="color: #ec5b6e; z-index:11"/>
                </div>
            </div>
        </div>
        <div class="upper" :style="backgroundStyle" @click="goPage(`/resourceDetail/${resource.id}`)">
            <div class="refer-style" v-if="resource.refer">参 考</div>
        </div>
        <div class="source-content">
            <p>{{resource.name}}</p>
            <p style="font-size: 12px; margin-top: 6px;">By {{getUsername}}</p>
        </div>
        <div class="source-card-footer" v-show="showTag">
            <div v-for="(item, n) in resource.tags" :key="n" class="tag-style"> {{item.name}} </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SourceCard",
    props: {
        resource: {
            type: Object,
            default: () => {},
        },
        breadlist:{
            type:Array,
            default: []
        },
        isLike:{
            type: Boolean,
            default: false,
        },
        showTag:{
            type: Boolean,
            default: true
        }
    },
    computed:{
        getUsername(){
            if(this.resource.user.nickName == null || this.resource.user.nickName == undefined){
                return this.resource.user.name
            }else{
                return this.resource.user.nickName
            }
        },
        getElText(){
            var text = ''
            var $d = document.createElement('div')
            document.body.appendChild($d)
            $d.innerHTML = this.resource.description
            
            text = $d.textContent
            document.body.removeChild($d)
            return text.length>=45? text.slice(0,45)+'...' : text
        },
        concatImgUrl(){
            return `//192.168.94.238:3000/file/download/${this.resource.images[0].id}?token=${this.$store.state.token}`
        },
    },
    updated(){
        console.log(this.resource);
        
    },
    data() {
        return {
            rate: 3.5,
            viewCount: 2019,
            chatCount: 12,
            sourceTitle: '资源名称',
            sourceDescription: '描述文字帮助用户对资源快速预览以及理解文字',

            _lastTime: null,
            jumpOrNot: true,
            isStar: this.isLike,
            backgroundStyle:{}
        }
    },
    mounted(){
        let $img = document.createElement('img')
        $img.onload = ()=>{
            this.backgroundStyle = {
                backgroundImage:`url(${this.concatImgUrl})`
            }
        }
        $img.src = this.concatImgUrl

    },
    methods:{
        throttle() {
            this.jumpOrNot = false
            let _nowTime = + new Date()
            console.log('time1 '+_nowTime)
            console.log('time2 '+this._lastTime)
            if (_nowTime - this._lastTime > 1000 || !this._lastTime) {
                this.$options.methods.addFavorite.bind(this)();
                this._lastTime = _nowTime
            }else{
                this.$message.warning('请勿频繁操作')
            }
        },
        addFavorite(){
            console.log('favorite')
            this.jumpOrNot = false
            /* 提示用户已关注 */
            if(!this.isStar || this.isStar == undefined){
                console.log(this.isStar)
                this.$message.success('已关注')
                this.isStar = true
                console.log(this.isStar)
                axios.post(`/api/resource/${this.resource.id}/star`, {'star':true},{emulateJSON:true}).then((res)=>{
                    if(res.data.code === 0){
                    }else{
                        alert(res)
                        this.isStar = false
                    }
                })
            }else{
                console.log('quguan '+this.isStar)
                this.$message.success('已取消关注')
                this.isStar = false
                console.log(this.isStar)
                axios.post(`/api/resource/${this.resource.id}/star`, {'star':false},{emulateJSON:true}).then((res)=>{
                    if(res.data.code === 0){
                    }else{
                        alert(res)
                        this.isStar = true
                    }
                })
            }
        },
        goPage(url){
            this.$store.commit('SAVE_BREADLIST', {
                // breadlist:[
                //     {fullPath:'/home',name: this.styname}  
                // ],
                breadlist:[
                    ...this.breadlist
                ],
                resourceId:this.sourceID
                
            })

            if(this.jumpOrNot){
                this.$router.push(url)
            }
            this.jumpOrNot = true
        },
    }
}
</script>
<style>
.ivu-rate > .ivu-rate-star-chart{
    margin-right: 0px;
}
</style>
<style scoped>
.source-card{
    position: absolute;
    width: 100%; 
    height: 100%;
    font-family: MicrosoftYaHei;
    /* border: 1px solid  #ffffff; */
    /* box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1); */
}
.upper {
    height: 66.67%; 
    width: 100%;
    background-image: url("../assets/白绿.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0px 3px 6px #00000029;
    /* border: 1px solid #707070; */
    border-radius: 5px;
    cursor: pointer;
}
.refer-style{
    font-size: 12px;
    font-weight: 600;
    color: #FAFAFA;
    background-color: #FA541C;
    border-radius: 5px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 35px;
}
.source-card:hover > .upper-mask{
    opacity: 1;
}
.upper-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 66.67%; 
    width: 100%;
    border-radius: 5px;
    background:rgba(0,0,0,0.5);
    cursor: pointer;
    opacity: 0;
    transition: opacity .1s linear;
}
.mask-icon{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: 1;
    width: 100%;
    height: 100%;
}
.mask-icon-item{
    opacity: 1;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 5px;
    height: 48px;
    width: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 25px;
    margin-right: 8px;
    margin-left: 8px;
}
.image{
    width: 237px;
    height: 140px;
}
.heart{
    position: absolute; 
    float: right; 
    top: 9px;
    right: 9px;
    cursor: pointer;
}

.source-content{
    text-align: left;
    margin-top: 12px;
    margin-left: 12px;
    margin-bottom: 16px;
    font-family: MicrosoftYaHei;
    color: #707070;
    font-size: 16px;
}
.source-card-footer{
    text-align: left;
    display: flex;
    flex-direction: row;
    margin-left: 12px;
}
.tag-style{
    background: #EAEAEA 0% 0% no-repeat padding-box;
    border-radius: 12px;
    font-size: 12px;
    color: #707070;
    margin-right: 6px;
    min-width: 61px;
    height: 18px;
    line-height: 18px;
    text-align: center;
}
/* @media screen and (max-width: 1450px) {
    .upper::after{
        content:'';
        display:block;
        width:100%;
        padding-bottom:55.56%;
    }

} */
</style>