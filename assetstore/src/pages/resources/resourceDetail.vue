<template>
  <div>
    <TopNavigation style="position:relative; height: 140px;"></TopNavigation>

    <section class="resource-detail">
      <div style="margin:30px 0;font-size:14px;">
        <bread-crumb></bread-crumb>
      </div>
      <div class="resource-detail-t">
        <div class="resource-detail-t-topwrap">
          <div class="resource-detail-lightbox">
            <div class="swiper-container gallery-top" ref="gallery-top" style="cursor:pointer;">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(src,i) in resource.images"
                  :key="i"
                  :style="{backgroundColor:'#f2f2f2'}"
                  v-lazy:background-image="src"
                ></div>
              </div>
              <!-- <div class="swiper-button-next swiper-button-white"></div>
              <div class="swiper-button-prev swiper-button-white"></div>-->
            </div>
            <div class="swiper-container gallery-thumbs" ref="gallery-thumbs">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(src,i) in resource.images"
                  :key="i"
                    v-lazy:background-image="src"
                ></div>
              </div>
            </div>
          </div>
          <div class="resource-detail-deslist">
            <div
              v-if="requestResourcePadding"
              class="resource-detail-skeleton-1"
              style="border-bottom: 1px solid #eaeaea;padding-bottom:40px;"
            >
              <a-skeleton avatar :paragraph="{rows: 4}" />
            </div>
            
            <template v-if="!requestResourcePadding"> 
              <div class="resource-detail-deslist-part1" >
                <div @click="handleVisit" style="cursor:pointer;">
                  <font-awesome-icon
                    v-if="!resource.user.profilePic"
                    :icon="['fas','user-circle']"
                    style="color:#37d89d;width:23px;height:23px;"
                  />
                  <img
                    v-if="resource.user.profilePic"
                    style="width:23px;border-radius:23px;"
                    :src="resource.user.profilePic"
                    alt
                  />
                </div>
                <span  @click="handleVisit" style="cursor:pointer;">{{describe.dept}}</span>
              </div>

              <div class="resource-detail-deslist-part2" >{{resource.name}}</div>
              <div class="resource-detail-deslist-part3" >
                <Select
                  :placeholder="resource.vers[0].verNum"
                  @on-change="handleSelectChange"
                  style="width: 120px"
                >
                  <Option
                    v-for="(item,j) in resource.vers"
                    :key="j"
                    :value="item.verNum"
                  >{{item.verNum}}</Option>
                  <Option value="all">全部</Option>
                </Select>

                <span 
                  class="resource-detail-deslist-updatetime"
                >- Last Update: {{getYYMMDD(resource.createdAt)}}</span>
              </div>
              <div class="resource-detail-deslist-part4" >
                <div class="resource-detail-deslist-score-wrap">
                  <!-- <Rate v-model="rate1" disabled/><span class="resource-detail-deslist-score">{{rate1+'.0'}}</span> -->
                  <a-rate disabled v-model="resource.rateAvg" />
                  <span class="resource-detail-deslist-score">{{resource.rateAvg+'.0'}}</span>
                </div>
                <div style="text-decoration:none;">{{resource.rateCount}}条评分</div>
                <div>
                  <a
                    id="resource-comment-a"
                    href="javascript:void 0;"
                    @click="handleCommentLink"
                  >{{resource.commentCount}}条评论</a>
                </div>
              </div>

             
            </template>

           

            <div
              v-if="requestResourcePadding"
              class="resource-detail-skeleton-2"
              style="margin-left: 56px;margin-top: 28px;"
            >
              <a-skeleton :paragraph="{rows: 6}" />
            </div>

            <template v-if="!requestResourcePadding">
            
              <div class="resource-detail-deslist-part5">
                <div>
                  <!-- <a-icon type="folder" theme="twoTone" twoToneColor="#1ebf73"/>  -->
                  <font-awesome-icon
                    :icon="['fas','folder']"
                    style="color:#1ebf73;width:15px;height:15px;"
                  />
                  <span>资源包</span>
                </div>
                <div>{{resource.vers.length ? resource.vers[0].file.fileName:''}}</div>
              </div>
              <div class="resource-detail-deslist-part6">
                <div>
                  <font-awesome-icon
                    :icon="['fas','cog']"
                    style="color:#1ebf73;width:15px;height:15px;"
                  />
                  <!-- <a-icon type="setting" theme="twoTone" twoToneColor="#1ebf73"/>   -->
                  <span>可运行的引擎版本</span>
                </div>
                <div>{{resource.tags.length? resource.tags[0].name:''}}</div>
              </div>
              <div class="resource-detail-deslist-part7">
                <div>
                  <!-- <a-icon type="tag" theme="twoTone" twoToneColor="#1ebf73"/>  -->
                  <font-awesome-icon
                    :icon="['fas','tags']"
                    style="color:#1ebf73;width:15px;height:15px;"
                  />
                  <span>资源标签</span>
                </div>
                <div>
                  <Tag v-for="(item,k) in resource.labels" :key="k" size="medium">{{item}}</Tag>
                </div>
              </div>

            </template>
         

            <div class="resource-detail-deslist-part8">
              <div class="resource-detail-deslist-like" @click="handleLike">
                <!-- <a-icon type="heart" />&nbsp;关注 -->
                <font-awesome-icon
                  v-if="!resource.isStar"
                  :icon="['far','heart']"
                  style="color:#1ebf73;width:15px;height:15px;"
                />
                <font-awesome-icon
                  v-if="resource.isStar"
                  :icon="['fas','heart']"
                  style="color:#1ebf73;width:15px;height:15px;"
                />
                <span>&nbsp;关注</span>
              </div>
              <div class="resource-detail-deslist-down" @click="handleDown">
                下载资源（{{
                fileSize(resource.vers[0].file.size)+'MB'
                }}）
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="requestResourcePadding"
          class="resource-detail-skeleton-3"
          style="margin-top:30px;"
        >
          <a-skeleton :paragraph="{rows: 6}" />
        </div>

        <template v-if="!requestResourcePadding">
          <div class="resource-detail-des">
            <div>资源描述</div>
            <div>
              <input type="checkbox" id="resource-detail-des-more" />
              
              
              <div class="resource-detail-des-content" ref="resource-detail-des-content" v-html="resource.description"></div>
              <template v-if="canCaretdown">
                <p>
                  <span
                    class="resource-detail-des-caret-down"
                    style="cursor:pointer;text-align:center;z-index:2;"
                  >
                    <label for="resource-detail-des-more">展开</label>
                    <span style="color:#1ebf73">
                      <font-awesome-icon :icon="['fas','caret-down']" />
                    </span>
                  </span>
                  <span
                    class="resource-detail-des-caret-up"
                    style="cursor:pointer;text-align:center;z-index:2;"
                  >
                    <label for="resource-detail-des-more">收起</label>
                    <span style="color:#1ebf73">
                      <font-awesome-icon :icon="['fas','caret-up']" />
                    </span>
                  </span>
                </p>

              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="resource-detail-b" style="margin:10px 0;">
        <div class="resource-detail-b-bar">
          <div>
            <span>{{resource.commentCount}}条评论</span>
            <span>仅显示{{comment_pagesize}}条评论</span>
          </div>
          <Dropdown
            trigger="click"
            style="margin-right:10px;cursor:pointer;font-size:16px;color:#7f7f7f;"
          >
            <span>
              {{sortBy==='time'?'按时间排序':'按热度排序'}}
              <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list" @click.native="dpClick">
              <DropdownItem style="font-size:16px;color:#7f7f7f;" name="time">按时间排序</DropdownItem>
              <DropdownItem style="font-size:16px;color:#7f7f7f;" name="hot">按热度排序</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <!-- <Alert v-if="showAlertComment" show-icon closable>您需要先评分才能评论哦</Alert> -->

        <div class="resource-detail-rate-wrap">
          <template v-if="resource.isRate">
            <a-rate v-model="resource.rateAvg" size="large" disabled />
            <span class="resource-detail-rate-text">{{resource.rateAvg+'.0'}}</span>
          </template>

          <template v-if="!resource.isRate">
            <a-rate size="large" :tooltips="['差', '较差', '还行', '推荐', '力荐']" @change="handleRate" />
            <span class="resource-detail-rate-text">{{rate2+'.0'}}</span>
          </template>

          <!-- <a-rate size="large" v-model="rate2" :tooltips="['差', '较差', '还行', '推荐', '力荐']" @change="handleRate" />
          <a name="resource-rate"><span class="resource-detail-rate-text">{{rate2+'.0'}}</span></a>-->
        </div>
        <div class="resource-detail-reply" ref="resource-detail-reply"></div>

        <!-- <div v-if="requestCommentPadding" class="resource-detail-skeleton-3">
          <a-skeleton avatar :paragraph="{rows: 4}" />
          <a-skeleton avatar :paragraph="{rows: 4}" />
          <a-skeleton avatar :paragraph="{rows: 4}" />
          <a-skeleton avatar :paragraph="{rows: 4}" />
          <a-skeleton avatar :paragraph="{rows: 4}" />
        </div> -->


        <div class="resource-detail-comments-wrap" style="position:relative;">


          <div class="resource-detail-comments" 
          :style="{display:requestCommentPadding?'none':'block',position:'relative'}" 
          ref="resource-detail-comments"
          >
          </div>

          <!-- <div :style="{visibility:'visible'}"  class="resource-detail-load-wrap">  -->
          <div :style="{visibility:requestCommentPadding?'visible':'hidden'}"  class="resource-detail-load-wrap">
            <div style="fill: #0000004a;width: 50px;height: 50px;">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                style="enable-background:new 0 0 50 50;"
                xml:space="preserve"
              >
                <path
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                  transform="rotate(301.281 25 25)"
                >
                </path>
              </svg>
            </div>

          </div>

        </div>

        <div class="resource-detail-comments-btn-wrap">
          <Button style="color:#1ebf73;" @click="handleCommentLink" size="large">查看所有评论</Button>
        </div>
      </div>
    </section>
    <Footer style="position:relative;"></Footer>
  </div>
</template>
<style lang="less">
.resource-detail-b-bar {
  // .ant-select-selection{
  //   background:transparent;
  // }
  // .ant-select-disabled .ant-select-selection:hover,
  // .ant-select-disabled .ant-select-selection:focus,
  // .ant-select-disabled .ant-select-selection:active {
  //   border-color: transparent;
  //   box-shadow: none;
  // }
  // .ant-dropdown-link{
  //   margin-right:15px;
  //   cursor: pointer;
  //   color:#7f7f7f;
  //   font-size:16px;
  // }
}
</style>
<style scoped lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.resource-detail {
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
    color: #7f7f7f;
    font-size: 16px;
  }
  .swiper-container {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .gallery-thumbs .swiper-slide {
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
  }

  // box-sizing:border-box; padding: 0 81px; margin-top: 59px;
  .resource-detail-skeleton-3 {
    box-sizing: border-box;
    padding: 0 73px;
    margin-top: 59px;
    .ant-skeleton-with-avatar {
      margin: 30px 0;
    }
  }
}
</style>
<style scoped lang="less">
.resource-detail {
  // width:95%;
  width: 100%;
  max-width: 1366px;
  box-sizing: border-box;
  padding: 0 30px;
  margin: 0 auto;

  // margin-top:50px;
  // margin-top:15px;
  position: relative;
  overflow: hidden;

  .ivu-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  &-load-wrap{
    @h:160px;
    height:@h;
    background:white;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    visibility: hidden;
    
  @keyframes rotz{
    0%{
      transform:rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }

    >div{ 
      // animation:rotz .77s linear infinite;
      position: absolute;
      left:50%;
      top:50%;
      transform:translate3d(-50%,-50%,0);
    }
  }

  #resource-rate-a {
    color: #7f7f7f;
  }

  #resource-comment-a {
    color: #7f7f7f;
  }

  &-t {
  }

  &-des-content {
    overflow: hidden;
    height: 200px;
  }

  &-des {
    // border:1px solid blue;
    margin-top: 30px;
    > div:nth-child(1) {
      font-size: 21px;
      font-weight: bold;
      color: #262626;
      margin: 10px 0;
    }
    > div:nth-child(2) {
      color: #7f7f7f;
      font-size: 16px;
      position: relative;

      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"]:checked + div {
        overflow: hidden;
        height: auto;
      }
      input[type="checkbox"]:checked ~ p .resource-detail-des-caret-down {
        display: none;
      }
      input[type="checkbox"]:checked ~ p .resource-detail-des-caret-up {
        display: block;
      }
      input[type="checkbox"]:checked ~ p:after {
        width: 0%;
      }

      .resource-detail-des-caret-up {
        display: none;
      }

      p span {
        position: relative;
      }

      p {
        text-align: center;
        position: relative;
        position: absolute;
        width: 100%;
        bottom: 0;

        &:after {
          content: "";
          width: 100%;
          height: 150%;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1;
          box-shadow: 0 -15px 50px #fff inset;
        }
      }
      label {
        margin: 0 auto;
        cursor: pointer;
        color: #1ebf73;
        font-size: 18px;
      }
    }
  }
  &-deslist {
    position: relative;
  }
  &-deslist-updatetime {
    display: block;
    margin-left: 10px;
  }
  &-deslist-score {
    color: #f7b500;
    font-size: 18px;
    display: block;
    padding-top: 4px;
  }
  &-deslist-score-wrap {
    display: flex;
    align-items: center;

    a {
      color: #7f7f7f;
    }
  }

  &-lightbox {
    width: 812px;
    height: 577px;
    // border:1px solid #ddd;
  }
  &-lightbox > img {
    width: 80%;
  }

  &-deslist-part1 {
    display: flex;
    align-items: center;
  }
  &-deslist-part1 > span:nth-child(2) {
    margin-left: 10px;
  }
  &-deslist-part2 {
    display: flex;
    font-size: 24px;
    font-weight: bold;
    color: black;
    margin-top: 10px;
  }
  &-deslist-part3 {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: 10px;
  }

  &-deslist-part4 {
    display: flex;
    font-size: 16px;
    align-items: center;
    padding-bottom: 26px;
    border-bottom: 1px solid #eaeaea;
    margin-top: 10px;
  }
  &-deslist-part4 > div:nth-child(2) {
    margin-left: 20px;
    margin-top: 3px;
    text-decoration: underline;
    // cursor: pointer;
  }
  &-deslist-part4 > div:nth-child(3) {
    margin-left: 10px;
    margin-top: 3px;
    text-decoration: underline;
    cursor: pointer;
  }

  &-deslist-part5 {
    font-size: 16px;
    margin: 10px 0;
    margin-top: 37px;

    > div:nth-child(1) {
      color: #262626;
      font-weight: bold;
    }
    > div:nth-child(2) {
      padding-left: 21px;
      margin: 7px 0;
    }
  }

  &-deslist-part6 {
    font-size: 16px;
    margin: 10px 0;
    > div:nth-child(1) {
      color: #262626;
      font-weight: bold;
    }
    > div:nth-child(2) {
      padding-left: 21px;
      margin: 7px 0;
    }
  }
  &-deslist-part7 {
    font-size: 16px;
    margin: 10px 0;
    > div:nth-child(1) {
      color: #262626;
      font-weight: bold;
      span {
        padding-left: 1px;
      }
    }
    > div:nth-child(2) {
      padding-left: 21px;
      margin: 7px 0;
    }
    .ant-tag {
      margin-bottom: 10px;
    }
  }
  &-deslist-part8 {
    display: flex;
    width: 100%;
    padding-left: 27px;
    justify-content: space-around;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  //   resource-detail-deslist-like
  // resource-detail-deslist-down

  &-deslist-like {
    @co: #1ebf73;
    width: 148px;
    height: 45px;
    background: #ddefe7;
    color: @co;
    border-radius: 3px;
    font-size: 18px;
    border: 1px solid @co;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &-deslist-down {
    width: 285px;
    height: 45px;
    background: #1ebf73;
    border-radius: 3px;
    font-size: 18px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &-deslist {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    padding-left: 40px;
    // border:1px solid teal;
    flex-direction: column;
    color: #7f7f7f;
  }
  &-t-topwrap {
    display: flex;
    > div {
      box-sizing: border-box;
    }
  }

  &-b {
    .ant-alert {
      margin: 6px 0;
    }
  }

  &-reply {
    width: 1224px;
    margin: 0 auto;
  }
  &-comments {
    width: 1224px;
    margin: 0 auto;
  }

  &-rate-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    transform: scale(1.5);
  }
  &-rate-text {
    color: #f7b500;
    font-size: 30px;
    margin-left: 3px;
  }
  &-comments-btn-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 70px 0;
  }

  .ant-select-selection {
    // background-color:transparent;
    // border:0px solid transparent;
    // font-size:16px;
    // color:#7f7f7f;

    border: 1px solid teal;
  }

  &-b-bar {
    background-color: #ececec;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 10px;

    > div:nth-child(1) {
      > span {
        padding-left: 15px;
      }
      > span:nth-child(1) {
        font-size: 24px;
        color: #262626;
        font-weight: bold;
      }

      > span:nth-child(2) {
        font-size: 14px;
        color: #7f7f7f;
      }
    }
  }
}
</style>
<script>
import TopNavigation from "@/components/TopNav.vue";
import moment from "moment";
import Footer from "@/components/footer.vue";
import axios from "axios";
import breadCrumb from "@/widget/breadcrumb.vue";

// window.open("tencent://message/?uin=346915968")

// import Rate from 'ant-design-vue/lib/rate';
// import 'ant-design-vue/lib/rate/style'; // 或者 ant-design-vue/lib/button/style/css 加载 css 文件

// console.log('TopNavigation:', TopNavigation)
import E from "@/widget/emojiReply/";
import LightBox from "@/widget/lightbox/";

const { Reply, Comments } = E;

export default {
  components: { TopNavigation, Footer, breadCrumb },
  props: [],
  data() {
    return {
      comments: [],
      submitting: false,
      value: "",
      moment,
      rate1: 3,
      rate2: 0,
      sortBy: "time",
      userid: "",
      model1: "333333333",

      previewVisible: false,
      previewImage: "",
      canCaretdown:true,

      showAlertComment: false,

      comment_order: "time",
      comment_pagesize: 20,
      describe: {
        dept: "", // 部门
        profilePic: "",
        lightboxImgs: [] // 轮询图
      },
      requestResourcePadding: true,
      requestCommentPadding: true,
      resource: {
        id: 0,
        name: "", // 资源名
        images: [
          // 轮询图
        ],
        labels: [
          // 自定义标签
          // "最喜欢大哥哥了",'小姐姐','小哥哥','小姐姐','小哥哥','小姐姐','小哥哥','小姐姐','小哥哥'
        ],
        createdAt: "2019-11-08T03:41:55.000Z", // 创建时间
        // 资源描述
        description: ``,
        updatedAt: "2019-11-08T03:41:55.000Z", // 更新时间
        commentCount: 1343,
        rateAvg: 3, // 评价评分
        rateCount: 132,
        state: true,
        isStar: true, //是否关注过
        isRate: true,
        user:{},
        vers: [
          // 版本 resource.ver[0].file.fileName
          {
            id: 0,
            verNum: "1.3.5",
            descriptipon: "string",
            file: {
              fileName: "环境贴图aaa", // 资源包file名称
              size: 0, // file大小 b
              id: 0 // file id
            }
          }
        ],
        tags: [
          // 引擎版本
        ]
      }
    };
  },
  computed: {},
  mounted() {
    // /resource/{id}  GET 资源详情

    // /resource/{id}/star  POST 关注资源

    // /user/describe   GET 拿到用户id（id）、头像(string)、昵称(nickname)、部门(dept)

    // /rate/:id  评分 POST 资源评分

    // /comment  GET  获取资源评论

    // /comment  POST 提交评论

    // /comment DEL 删除评论

    // ​/comment​/{id}​/star  POST 点赞评论

    console.log("matched:", this.$route.matched)


    const { params } = this.$route;
    const that = this;
    // debugger

    axios.get(`/api/resource/${params.resourceId}`).then(response => {
      var res = response.data;
      
      if(res.code!=0)  return this.$message.warning(res.msg)

      this.resource = Object.assign(this.resource, res.data)

      this.resource.isRate = this.resource.myRate ? true : false

      console.log("/////resource_userid:", this.resource.userId)

      console.log("node_env:", process.env.npm_lifecycle_event)

      //  console.log(this.resource.images)
      // if( process.env.NODE_ENV=='development'){

      //   this.resource.images = [
      //     'http://img4.imgtn.bdimg.com/it/u=3420410816,510741944&fm=26&gp=0.jpg',
      //     'http://img4.imgtn.bdimg.com/it/u=3420410816,510741944&fm=26&gp=0.jpg',
      //     'http://img4.imgtn.bdimg.com/it/u=3420410816,510741944&fm=26&gp=0.jpg',
      //     'http://img4.imgtn.bdimg.com/it/u=3420410816,510741944&fm=26&gp=0.jpg',
      //     'http://img4.imgtn.bdimg.com/it/u=3420410816,510741944&fm=26&gp=0.jpg'
      //   ]


      // }else{
          
          this.resource.images = this.resource.images.map(o => {
            return `//192.168.94.238:3000/file/download/${o.id}/?token=${this.$store.state.token}`
          })
      //}

      //console.log(this.resource.images)

      this.$nextTick(() => {
        this.requestResourcePadding = false;

        var lightbox = LightBox(document.body, {
          zIndex: 100,
          topImgs: this.resource.images,
          thumbImgs: this.resource.images
        })

        
        // lightbox.setCurIdx(0)
        // lightbox.hide()

        // setTimeout(()=>{
        //    console.log(document.querySelector('.resource-detail-des-content'))

        // },1234)
       
        var galleryThumbs = new Swiper(".gallery-thumbs", {
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true
        });

        this.swiper = new Swiper(".gallery-top", {
          spaceBetween: 10,
          lazy:true,
          on: {
            click() {
              if (typeof this.clickedIndex != undefined) {
                lightbox.setCurIdx(this.clickedIndex)
                lightbox.show()
              }
            }
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          thumbs: {
            swiper: galleryThumbs
          },
          autoplay: {
            delay: 5000, // 设置轮播的时间
            disableOnInteraction: false // 这一行是为了避免手动滑动轮播图后，自动轮播失效，默认为true
          }
        });
      });
    });

    axios.get("/api/user/describe").then(response_des => {
      var res = response_des.data

      if(res.code!=0)  return this.$message.warning(res.msg)

      var userid = res.data.id;
      this.userid = userid;

      console.log("/////userid:", userid);

      this.describe.dept = res.data.dept;
      this.describe.profilePic = res.data.profilePic;

      this.createComment();
    });

    let replyx = Reply(this.$refs["resource-detail-reply"], { userdata: {} });

    replyx.onSubmit(prop => {
      if (!this.resource.isRate) {
        return this.$Message.warning("请先进行评分哦~");
      }

      if (!prop.content.length) {
        return this.$Message.warning("请输入你的评论内容~");
      }


      axios
        .post("/api/comment", {
          resourceId: params.resourceId,
          replyUserId: null,
          content: prop.content,
          pid: null
        })
        .then(response => {
          var res = response.data

          if(res.code!=0)  return this.$message.warning(res.msg)

          // axios.post('/api/comment',{resourceId:params.resourceId, replyUserId:this.userid, content:prop.content,pid:prop.id}).then(response=>{
          this.$Message.success("评论提交成功~")
          replyx.clearContent()
        })
    })
  },
  methods: {
    handleLike() {
      // this.$message.success('已关注')
      if (!this.resource.isStar) {
        axios
          .post(`/api/resource/${this.$route.params.resourceId}/star`, {
            star: true
          })
          .then(response => {
            var res = response.data
             if(res.code!=0)  return this.$message.warning(res.msg)
            this.resource.isStar = true;
            this.$Message.success("已关注")
          });
      } else {
        axios
          .post(`/api/resource/${this.$route.params.resourceId}/star`, {
            star: false
          })
          .then(response => {
            var res = response.data
             if(res.code!=0)  return this.$message.warning(res.msg)

            this.resource.isStar = false
            this.$Message.success("已取消关注")
          });
      }
    },
    handleCommentLink() {
      this.$store.commit("SAVE_COMMENT_BREADLIST", {
        breadlist: [
          {
            fullPath: `/resourceDetail/${this.$route.params.resourceId}`,
            name: "资源详情"
          }
        ],
        resourceId: this.$route.params.resourceId
      });

      this.$router.push(
        `/resourceDetail/${this.$route.params.resourceId}/comment`
      );
    },
    getYYMMDD(t) {
      let time = new Date(t);
      let [yy, mm, dd] = [
        time.getFullYear(),
        time.getMonth() + 1,
        time.getDate()
      ];
      if (mm < 10) {
        mm = "0" + mm;
      }
      return yy + "-" + mm + "." + dd;
    },
    handleSelectChange() {
      this.$router.push(
        `/resourceDetail/${this.$route.params.resourceId}/versionHistory`
      )

    },
    handleRate(v) {
      const { params } = this.$route;
      // /resource/id/rate
      axios
        .post(`/api/resource/${params.resourceId}/rate`, { val: v })
        .then(response => {

          if (response.data.code != 0) {
            return this.$message.warning(response.data.msg)
          }

          this.resource.isRate = true
          this.resource.rateAvg = v;
          //console.log('isRate!!1')
        })
    },
    yymmdd(t) {
      return "2019-01.23"

    },
    fileSize(b) {
      var mb = b / 1024 / 1024;
      return mb.toFixed(2);
    },
    handleVisit() {
      if(this.userid==this.resource.userId){
        this.$router.push(`/personal`)
      }else{
        this.$router.push(`/${this.resource.userId}/visit/`)
      }

    },
    createComment() {

      const that = this
      const { params } = this.$route;
      
      this.requestCommentPadding = true

        axios
        .get(`/api/comment`, {
          params: {
            resourceId: params.resourceId,
            page: 1,
            pageSize: this.comment_pagesize,
            order: this.sortBy
          }
        })
        .then(response => {
          var res = response.data
          if (response.data.code != 0) {
            return this.$message.warning(res.msg)
          }



          let items = [];
          // 戴 -> 祝 -> 戴

          try {
            items = res.data.list.map(o => {
              if (!o.user) return;

              var item = {
                items: [],
                id: o.id, // 评论id
                id_rate: o.id,
                content: o.content,
                score: o.rate.value,
                like: o.hot,
                liked: o.stars.length > 1,
                time: this.getYYMMDD(o.createdAt),
                replyUserId: o.user.id, // 回复的id
                user: {
                  uid: o.user.id,
                  name: o.user.name,
                  nickname: o.user.nickName,
                  imgurl: o.user.profilePic
                }
              };

              //debugger
              item.items = o.items.map(o => {
                // content: "回去评论2~~~~！！！！！！"
                // createdAt: "2019-11-19T11:17:24.000Z"
                // hot: 0
                // id: 15
                // pid: 14
                // rateId: 1
                // replyUser: {id: 7, name: "戴文奇", nickName: null, profilePic: null}
                // replyUserId: 7
                // stars: []
                // user: {id: 7, name: "戴文奇", nickName: null, profilePic: null}
                // userId: 7

                return {
                  // id: o.id,//评论id
                  id: item.id, //评论id

                  id_rate: o.id,
                  content: o.content, //
                  like: o.hot, // 点赞数
                  liked: o.stars.length > 1, //是否点过赞
                  // replyUserId:o.replyUserId,
                  // replyUserId:item.user.uid,  // 回复谁的id

                  replyUserId: o.user.id, // 回复谁的id

                  usera: {
                    uid: o.user.id,
                    name: o.user.name,
                    nickname: o.user.nickName,
                    imgurl: o.user.profilePic
                  },
                  userb: {
                    uid: o.replyUser.id,
                    name: o.replyUser.name,
                    nickname: o.replyUser.nickName,
                    imgurl: o.replyUser.profilePic
                  },
                  time: this.getYYMMDD(o.createdAt)
                };
              });

              return item;
            });
          } catch (e) {
            console.log(e);
          }

          // console.log('items:',items)

          try {
            let comments = Comments(this.$refs["resource-detail-comments"], {
              items: items.filter(o => (o ? o : false)),
              userdata: {
                uid: this.userid,
                resource_userid: this.resource.userId
              }
            });

            comments.onLike(prop => {
              console.log("comments like:", prop);

              if (prop.liked) {
                axios
                  .post(`/api/comment/${prop.id_rate}/star`, { star: false })
                  .then(response => {
                    var res = response.data
                    if (response.data.code != 0) {
                      return this.$message.warning(res.msg)
                    }

                    comments.dislikeByProp(prop);
                  });
              } else {
                axios
                  .post(`/api/comment/${prop.id_rate}/star`, { star: true })
                  .then(response => {
                    var res = response.data
                    if (response.data.code != 0) {
                      return this.$message.warning(res.msg)
                    }

                    comments.likeByProp(prop);
                  });
              }
            });

            this.requestCommentPadding = false;

            comments.onReply(prop => {
              // 	"pid": 0,
              // 	"content": "string",
              // 	"replyUserId": 0

              // 触发了回复评论, 但从没有评分过

          
              if (!that.resource.isRate) {
                return that.$Message.warning("请先进行评分哦~")
              }
              if (!prop.content.length) {
                return that.$Message.warning("请输入你的回复内容~")
              }

              // debugger
              //让他回复
              axios
                .post("/api/comment", {
                  // resourceId: params.resourceId,
                  // content: prop.content,
                  // pid: prop.userdata.id, //第一层id
                  // replyUserId: prop.userdata.replyUserId //回复的人的  user.id
                  resourceId: params.resourceId,
                  content: prop.content,
                  pid: prop.userdata.id, //第一层id
                  replyUserId: prop.userdata.replyUserId //回复的人的  user.id
                })
                .then(response => {
                  var res = response.data
                  if (response.data.code != 0) {
                    return this.$message.warning(res.msg)
                  }

                  that.$Message.success("评论提交成功~");
                  prop.reply.clearContent();
                });
              //console.log('comments reply:', prop)
            })

            comments.onDel(prop => {
              console.log("comments del:", prop);
              //comments.removeCommentByProp(prop)
              this.$Modal.confirm({
                title: "确认删除该条评论?",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk: () => {

                  let headers = {
                    'Content-Type': 'application/json; charset=utf-8'
                  }

                  var data = {}
                  axios
                  .delete(`/api/comment/${prop.id_rate}`,{headers,data})
                  .then(response => {
                     var res = response.data
                    if (response.data.code != 0) {
                      return this.$message.warning(res.msg)
                    }

                    comments.removeCommentByProp(prop)
                    setTimeout(() => {
                      this.$Modal.success({
                        title:  "评论已删除",
                        okText: "确认"
                      })
                    }, 300)
                  })
                }
              });
            })
          } catch (e) {
            console.log(e);
          }
        })
        .catch(err => {});
    },
    dpClick(e, v) {
      //console.log(e.target,v)

      this.sortBy = e.target.textContent === "按时间排序" ? "time" : "hot"

      this.createComment()
    },
    handleDown() {
      var fileid = this.resource.vers[0].file.id
      location.href = `//192.168.94.238:3000/file/download/${fileid}/?token=${this.$store.state.token}`
    }

  }
};
</script>