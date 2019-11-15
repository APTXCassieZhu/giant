<template>
    <div class="corner">
        <transition :name="transitionName">
            <div class="corner-icon" @click="backToTop()">
                <strong><Icon size="25" type="ios-arrow-up"/></strong>
            </div>
        </transition>
        <br>
        <div class="corner-icon" @click="showFeedbackModal()">
            <span style="position:relative; left: 2px; font-size:20px;">
                <font-awesome-icon :icon="['fas','edit']"/>
            </span>
        </div>
        <feedback :showFeedback='toShow' @hideDialog="toShow=false"></feedback>
    </div>
</template>
<script>
import feedback from "../components/feedback.vue"
export default {
    name:"Corner",
    components:{feedback},
    props: {
        transitionName: {
            type: String,
            default: 'fade'
        },
        visibilityHeight: { // 纵向滑动多远距离出现滚动条
            type: Number
        },
        backPosition: { // 返回顶部时，滚动到哪里（距离顶部的距离）
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            //定义定时器
            interval: null,
            toShow: false,
        }
    },
    mounted() {
        // 监听页面滚动
        //window.addEventListener('scroll', this.handleScroll)
    },
    // 销毁定时器
    beforeDestory() {
        //window.removeEventListener('scroll', this.handleScroll)
        if(this.interval) {
            clearInterval(this.interval)
        }
    },
    methods:{
        backToTop() {
            let distanceY = window.pageYOffset
            let i = 0
            this.interval = setInterval(() => {
                let next = Math.floor(this.easeInOutQuad( 10*i, distanceY, -distanceY, 500))
                if(next <= this.backPosition) {
                    window.scrollTo(0, this.backPosition)
                    clearInterval(this.interval)
                }else {
                    window.scrollTo(0,next)
                }
                i++
            }, 17)
        },
        /*  缓动公式 (Tween 算法)
            t: 动画已经执行的时间 (实际上时执行多少次/帧数)
            b: 起始位置
            c: 终止位置
            d: 从起始位置到终止位置的经过时间 (实际上时执行多少次/帧数)
        */
        easeInOutQuad(t, b, c, d) {
            // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
            if ((t /= d / 2) < 1) { 
                return c / 2 * t * t + b
            } else {
            // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
            return -c / 2 * (--t * (t - 2) - 1) + b
            }
        },
        showFeedbackModal(){
            console.log('showing')
            this.toShow = true            
        }
    },
}
</script>
<style scoped>
.corner{
    position: fixed;
    bottom: 100px;
    right: 50px;
    z-index: 1000;
}
.corner-icon{
    /*border: 1px solid black;*/
    height: 50px;
    width: 50px;
    background-color: #fff;
    border-radius: 50%;
    line-height: 50px;
    text-align: center;
    /*vertical-align: middle;*/
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    cursor: pointer;
}

.corner-icon:hover{
    /*border: 1px solid #fff;
    background-color: gray;*/
    color: #1ebf73;

}
</style>