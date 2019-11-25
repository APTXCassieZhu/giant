<template>
    <div>
      <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
      
      <section class="resource-detail">
        <bct></bct>
        <div class="resource-detail-b-bar">
          <div>
            <span>{{resource.commentCount}}条评论</span> 
          </div>
          <Dropdown trigger="click" style="margin-right:10px;cursor:pointer;font-size:16px;color:#7f7f7f;" >
            <span > {{sortBy==='time'?'按时间排序':'按热度排序'}} <Icon type="ios-arrow-down"></Icon> </span>
            <DropdownMenu slot="list" @click.native="dpClick">
              <DropdownItem style="font-size:16px;color:#7f7f7f;" name="time">按时间排序</DropdownItem>
              <DropdownItem style="font-size:16px;color:#7f7f7f;" name="hot">按热度排序</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

				<div class="resource-detail-wrap">
					
					<div style="position:relative;min-height:186px;">

						<transition name="fade">
							<div class="resource-detail-comments" 
									v-show="!requestCommentPadding"
									:style="commentWrapStyle"
									ref="resource-detail-comments"
							>
							</div>
						</transition>
	
						<div :style="{display:requestCommentPadding?'block':'none'}"  class="resource-detail-load-wrap">
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

					<div class="resource-detail-rate-wrap" >

						<template v-if="resource.isRate">
							<a-rate v-model="resource.rateAvg" size="large" disabled   />
							<span class="resource-detail-rate-text">{{resource.rateAvg+'.0'}}</span>
						</template>
					
						<template v-if="!resource.isRate">
							<a-rate size="large"  :tooltips="['差', '较差', '还行', '推荐', '力荐']" @change="handleRate" />
							<span class="resource-detail-rate-text">{{rate2+'.0'}}</span>
						</template> 
					</div>
					<div class="resource-detail-reply" ref="resource-detail-reply">
						
					</div>
					<div class="resource-detail-page-wrap">
						<div>
							<Page :total="100" @on-change="handlePageChange"></Page>
						</div>
					</div>

				</div>

				<!-- <transition name="fade">
					<p v-if="show">hello</p>
				</transition> -->
      </section>
      
      <Footer style="position:relative;margin-top: 200px;"></Footer>
    </div>
</template>

<style>
.resource-detail-page-wrap{
	text-align: center;
	margin:0 auto;
	margin-top:50px;
}

</style>
<style scoped lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.comments-skeleton{
	position: absolute;
	left:0;
	top:0;
}

.resource-detail-page-wrap{
  
}

.resource-detail{

	width: 100%;
  max-width: 1368px;
  box-sizing: border-box;
	padding: 0 30px;
	
  margin: 0 auto;
  margin-top: 50px;
  position: relative;
	overflow: hidden;
	.resource-detail-comments{
		position: relative;
	}
	&-load-wrap{
    @h:160px;
    height:@h;
    background:white;
    position: absolute;
    left:0;
    top:0;
    width:100%;
		// visibility: hidden;
		display: none;
    
  @keyframes rotz{
    0%{
      transform:rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }

    >div{ 
      animation:rotz .77s linear infinite;
      position: absolute;
      left:48%;
      top:50%;
      transform:translate3d(-50%,-50%,0);
    }
  }


	&-wrap{
		box-sizing: border-box;
		width:100%;
		margin:0 auto;
	}
	&-rate-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:30px 0;
    transform:scale(1.5);
  }
  &-rate-text{
    color:#f7b500;
    font-size:30px;
    margin-left:3px;
	}
	
  &-b-bar{
    background-color:#ececec;
    height:48px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin-top:30px;
    margin-bottom:10px;

    >div:nth-child(1){
      >span{
        padding-left:15px;
      }
      >span:nth-child(1){
        font-size:24px;
        color:#262626;
        font-weight: bold;
      }
      
      >span:nth-child(2){
        font-size:14px;
        color:#7f7f7f;
      }
    }
  }

}
</style>
<script>
import TopNavigation from '@/components/TopNav.vue'
import Footer from '@/components/footer.vue'
import bct from '@/widget/bct.vue'
import E from '@/widget/emojiReply/'

const {Reply,Comments} = E

export default {
    components:{TopNavigation,Footer,bct},
    data() {
      return {
        sortBy:'time',
        userid:'',
				show: false,

				showAlertComment:false,
				requestCommentPadding:true,

				commentWrapStyle:{},

        comment_order:'time',
				comment_pagesize: 10,
				comment_page: 1,
				rate2:0,
        describe:{
          dept:'' // 部门s
        },
        resource:{
          "id": 0,
          "name": "资源名23333", // 资源名
          "images": [ // 轮询图
          ],
          "label": [ // 自定义标签
            "最喜欢大哥哥了",'小姐姐','小哥哥','小姐姐','小哥哥','小姐姐','小哥哥','小姐姐','小哥哥'
          ],
          "createdAt": "2019-11-08T03:41:55.000Z", // 创建时间  
          "description": // 资源描述
            ``
          ,
          "updatedAt": "2019-11-08T03:41:55.000Z", // 更新时间  
          "commentCount": 1343,
          "rateAvg": 3, // 评价评分
          "rateCount": 132,
          "state": true,
          "isStar": true, //是否关注过
          "isRate":true,
          "vers": [ // 版本 resource.ver[0].file.fileName
          {
              "id": 0,
              "verNum": "1.3.5",
              "descriptipon": "string",
              "file":{
                "fileName": "环境贴图aaa", // 资源包file名称
                "size": 133244, // file大小 b
                "id": 0 // file id
              }
            },
          ],
          "tags": [ // 引擎版本
            
          ]
          
        }
      }
    },
    computed:{

    },
    mounted(){
			console.log('matched:', this.$route.matched)
			
      const {params} = this.$route

      axios.get(`/api/resource/${params.resourceId}`).then(response=>{
				var res = response.data
				if (response.data.code != 0) {
					return this.$message.warning(res.msg)
				}
										

				this.resource = Object.assign(this.resource,res.data)
				
				this.resource.isRate = this.resource.myRate ? true:false
      })

      axios.get('/api/user/describe').then(response_des=>{

				var res = response_des.data
				if (response_des.data.code != 0) {
					return this.$message.warning(res.msg)
				}
										

        var res = response_des.data
        var userid = res.data.id
        this.userid = userid

        this.describe.dept = res.data.dept

				this.createComment().then(()=>{
					//console.log(this.$route.query.cID)
					//location.hash = `cid-${this.$route.query.cID}`
					var $findedComment = document.querySelector(`#cid-${this.$route.query.cID}`)
					if($findedComment){
						document.documentElement.scrollTop = $findedComment.offsetTop

					}
				})

			})
			

			let replyx = Reply(this.$refs["resource-detail-reply"], { userdata: {} });

			replyx.onSubmit(prop => {
				if (!this.resource.isRate) {
					return this.$Message.warning("请先进行评分哦~")
				}

				if (!prop.content.length) {
					return this.$Message.warning("请输入你的评论内容~")
				}

				axios
				.post('/api/comment', {
					resourceId: params.resourceId,
					replyUserId: null,
					content: prop.content,
					pid: null
				})
				.then(response => {
						var res = response.data
						if (response.data.code != 0) {
							return this.$message.warning(res.msg)
						}
					
					this.$Message.success("评论提交成功~")
					replyx.clearContent()
				})
				
			})

		},

    methods:{
			handleRate(v){
				const {params} = this.$route
				axios.post(`/api/rate/${params.resourceId}`,{value:v}).then(response=>{
						var res = response.data
						if (response.data.code != 0) {
							return this.$message.warning(res.msg)
						}

					this.resource.isRate = true
					//console.log('isRate!!1')
				})

				console.log('matched:', this.$route.matched)
			},
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
			handlePageChange(v){
				this.comment_page = v
				
				$('html,body').animate({scrollTop: '0px'}, 100)

				clearTimeout(this.itv)
				this.itv = setTimeout(()=>{
					this.createComment().then(()=>{
					
					})

				},100)
		
				

			},
      createComment(){
				const { params } = this.$route
      
				this.requestCommentPadding = true

				this.commentWrapStyle = {height:'186px'}

				//this.$nextTick(()=>{
					// setTimeout(()=>{
					// 	$('html,body').animate({scrollTop: '0px'}, 300)

					// },300)
			//	})

				return new Promise(resolove=>{
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

						var res = response.data
						let items = []
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
								}
	
								//debugger
								item.items = o.items.map(o => {
							
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
									}
								})
	
								return item
							})
						} catch (e) {
							console.log(e)
						}

						// console.log('items:',items)
	
						try {
							let comments = Comments(this.$refs["resource-detail-comments"], {
								items: items.filter(o => (o ? o : false)),
								userdata: {
									uid: this.userid,
									resource_userid: this.resource.userId
								}
							})
	
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

												comments.dislikeByProp(prop)
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
	
							this.requestCommentPadding = false
							this.commentWrapStyle = {}

							$('html,body').animate({scrollTop: '0px'}, 300)
	
							comments.onReply(prop => {

								// 	"pid": 0,
								// 	"content": "string",
								// 	"replyUserId": 0
	
								// 触发了回复评论, 但从没有评分过
	
								if (!this.resource.isRate) {
									return this.$Message.warning("请先进行评分哦~")
								}
								if (!prop.content.length) {
									return this.$Message.warning("请输入你的回复内容~");
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

										this.$Message.success("评论提交成功~");
										prop.reply.clearContent();
									});
								//console.log('comments reply:', prop)
							});

							comments.onDel(prop => {
								console.log("comments del:", prop);
								//comments.removeCommentByProp(prop)
								this.$Modal.confirm({
									title: "确认删除该条评论?",
									okText: "确认",
									okType: "danger",       
									cancelText: "取消",
									onOk: () => {
	
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
													title: "评论已删除",
													okText: "确认"
												})
											}, 300)
										})
								}
								});
							})

							resolove()
						} catch (e) {
							console.log(e);
						}
					})
					.catch(err => {});
					
				})
      },
      dpClick(e,v){
        //console.log(e.target,v)

        this.sortBy =  e.target.textContent === '按时间排序'?'time':'hot'
				//console.log('sortBy:',this.sortBy)
        this.createComment()
      }
    }
}
</script>

