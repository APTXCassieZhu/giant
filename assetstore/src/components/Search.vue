<template>
    <Card id="card">
        <span slot="title" align="left" style="color: blue">热门搜索</span>
        <span slot="title" align="center" >&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        <span slot="title" align="center" >&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        <span slot="title" align="right" style="color: blue; cursor: pointer;" @click="change()"><Icon size="20" type="ios-repeat"></Icon>换一批</span>
        <span slot="title" align="center" >&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        <span slot="title" align="center" >&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        <span slot="title" align="center" class="close">
            <Icon size="20" type="ios-close-circle-outline" @click="close()"></Icon>
        </span>
        <span v-for="(item,index) in tagList" :key="index">
            <Tag color="blue">{{item}}</Tag>
            <span>&emsp;</span>
        </span>
        <br>
        <br>
        <ul>
            <Icon size="20" type="ios-time-outline"></Icon><Tag color="orange">历史搜索1</Tag>
            <Icon size="20" type="ios-time-outline"></Icon><Tag color="orange">历史搜索2</Tag>
        </ul>
        <ul><Icon size="20" type="ios-time-outline"></Icon><Tag color="orange">历史搜索3</Tag></ul>
        <Divider />

    </Card>

</template>

<script>
export default {
    name:"Search",
    data() {
        return {
            data: ['three.js', 'jiaFu', 'juju', 'ruirui', 'candy', '仙侠', 
            'lala', 'detective', '凑数', '饿了', '好饿', '饿的不行了', '再编几个', 
            '想编几个编几个','conan', 'sos'], // total: 16
            tagList: [],     //存放每次点击换一批放出来的5个对象
            arr: [],         //存放从原来的data array抽选的index，确保不重复
            num: ''          //随机index
        }
    },
    // 页面加载时就自动生成推荐内容
    mounted() {
        for(var i = 0; i < 5; i++) {
            this.tagList.push(this.data[i])
        }
    },
    methods: {
        // 每次点击换一批，更换推荐内容
        change() {
            // 清空之前的数据
            this.num = ''
            this.arr = []
            this.tagList = []
            while(this.arr.length < 5) {
                let num = parseInt(Math.random()*16)
                if(this.arr.indexOf(num) == -1) {
                    console.log("1111111")
                    this.arr.push(num)
                    this.num = num
                    this.tagList.push(this.data[this.num])
                }
            }
        },
        close() {
            document.getElementById("card").style.display="none";
        }
    }
}
</script>

<style scoped>
.Card {
    display: none;
}
.close {
    cursor: pointer;
}

.close:hover {
    color: red;
}
</style>
