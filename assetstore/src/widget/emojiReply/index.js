

// 2019-11-04 
// https://github.com/dwqdaiwenqi

import '../emoji/'
import './emojiReply.css'

{
  var html =(htmls, ...args)=> {
    return htmls.reduce((param, a) => {
      param.htmls += htmls[param.idx] + (args[param.idx++] || '')
      return param
    }, {htmls: '', idx: 0}).htmls
  }
}

{
  var Reply = ($el,param={})=>{
    var that = {
      $el:typeof $el === 'string'?document.querySelector($el):$el,
      init(){
				var id = `emoji-reply-${Date.now()}`
        this.$el.innerHTML = html`
          <div class="emoji-reply-owo">
            <div style="position:relative;">
              <textarea id="${id}" class="emoji-reply-owo-content" data-emojiable="true"></textarea>
            </div>
            <div class="emoji-reply-owo-bar">
              <div class="emoji-reply-owo-btn" >   
                <!-- <svg  style="width:15px;height:15px;color:black;" aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile" class="svg-inline--fa fa-smile fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path></svg>
                <span>表情</span>    -->
              </div>
              <div class="emoji-reply-owo-pub"><span>发表</span> </div>
            </div>
          </div>
        `
        this.$content = this.$el.querySelector('.emoji-reply-owo-content')
        this.$pub = this.$el.querySelector('.emoji-reply-owo-pub')
				

				this.emojiEl = $(`#${id}`).emojioneArea({
					// placeholder       : $('#demox'), // placeholder
					// container         : $('#demox'), // by default, emojionearea container created directly under source,
					//                           // in this option you can specify custom {jQuery|selector} container
				})
			

        this.$pub.addEventListener('click',e=>{
          this.handle_submit&&this.handle_submit({
						//content:  this.$content.value,
						content:this.emojiEl[0].emojioneArea.getText(),
            userdata: param.userdata
          })
        })
  
			},
			getText(){
				return this.emojiEl[0].emojioneArea.getText()
			},
			setText(str){
				this.emojiEl[0].emojioneArea.setText(str)
			},
      clearContent(){
				//this.$content.value = ''
				this.emojiEl[0].emojioneArea.setText('')
      },
      onSubmit(fn){
        this.handle_submit = fn
      },
      show(){
        this.$el.style.display ='block'
      }, 
      hide(){
        this.$el.style.display ='none'
      }
    }
    that.init()
    return  that
  }
}

{
  
  let star_gray = `
    <svg class="comments-owo-item-star-gray" t="1572922320240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6027" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M483.648 193.770667a64 64 0 0 1 83.904 25.6l1.834667 3.413333 74.453333 150.741333 166.378667 24.149334a64 64 0 0 1 38.378666 106.154666l-2.922666 3.029334L725.333333 624.021333l28.416 165.546667a64 64 0 0 1-89.322666 69.205333l-3.498667-1.706666L512 778.858667l-148.906667 78.208a64 64 0 0 1-93.376-63.786667l0.533334-3.712L298.666667 624.021333 178.346667 506.88a64 64 0 0 1 31.722666-108.544l3.712-0.64 166.378667-24.149333 74.453333-150.72a64 64 0 0 1 29.034667-29.034667z" p-id="6028" fill="#ececec"></path>
    </svg>`
  let star_orange = `
    <svg class="comments-owo-item-star-orange" t="1572922320240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6027" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M483.648 193.770667a64 64 0 0 1 83.904 25.6l1.834667 3.413333 74.453333 150.741333 166.378667 24.149334a64 64 0 0 1 38.378666 106.154666l-2.922666 3.029334L725.333333 624.021333l28.416 165.546667a64 64 0 0 1-89.322666 69.205333l-3.498667-1.706666L512 778.858667l-148.906667 78.208a64 64 0 0 1-93.376-63.786667l0.533334-3.712L298.666667 624.021333 178.346667 506.88a64 64 0 0 1 31.722666-108.544l3.712-0.64 166.378667-24.149333 74.453333-150.72a64 64 0 0 1 29.034667-29.034667z" p-id="6028" fill="#f7b500" data-spm-anchor-id="a313x.7781069.0.i10"></path></svg>
  `
  let good = `
    <svg t="1572854619005" class="comments-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4811" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M581.674667 170.666667c6.72 0 18.538667 1.429333 27.584 4.352 44.544 14.442667 70.186667 61.76 59.797333 109.12l-1.066667 4.437333-39.701333 148.906667h157.269333c19.093333 0 37.973333 7.082667 50.773334 21.248 14.293333 15.829333 19.861333 36.778667 15.616 57.109333l-1.066667 4.352-82.922667 295.253333a51.882667 51.882667 0 0 1-46.08 37.76l-3.84 0.128H298.666667V452.501333c84.949333-18.389333 209.194667-244.373333 209.194666-244.373333C525.525333 184.170667 546.944 170.666667 581.674667 170.666667zM234.666667 448v405.333333H170.666667V448h64z m347.008-213.333333c-9.6 0-13.546667 1.109333-18.453334 6.613333l-1.706666 2.005333-8.064 14.08-8.64 14.613334a1342.848 1342.848 0 0 1-63.189334 96.426666c-24.512 33.92-48.597333 63.146667-72.234666 86.464-15.722667 15.509333-31.146667 28.437333-46.72 38.464V789.333333h346.154666L789.333333 502.485333c0-0.277333-0.128-0.448-0.490666-0.853333 0.298667 0.341333-0.853333-0.149333-3.285334-0.149333H544.981333l61.162667-229.44c4.394667-16.426667-3.626667-31.936-16.597333-36.138667a46.016 46.016 0 0 0-7.893334-1.237333z" p-id="4812"></path></svg>
  `
  let goodfill = `
    <svg t="1572855865686"  class="comments-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5165" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M581.674667 170.666667c6.72 0 18.538667 1.429333 27.584 4.352 44.544 14.442667 70.186667 61.76 59.797333 109.12l-1.066667 4.437333-39.701333 148.906667h157.269333c19.093333 0 37.973333 7.082667 50.773334 21.248 14.293333 15.829333 19.861333 36.778667 15.616 57.109333l-1.066667 4.352-82.922667 295.253333a51.882667 51.882667 0 0 1-46.08 37.76l-3.84 0.128H298.666667V452.501333c84.949333-18.389333 209.194667-244.373333 209.194666-244.373333C525.525333 184.170667 546.944 170.666667 581.674667 170.666667zM234.666667 448v405.333333H170.666667V448h64z" p-id="5166"></path></svg>
  `
  var Comments = ($el,param={userdata,items})=>{
    var that = {
      $el:typeof $el === 'string'?document.querySelector($el):$el,
      init(){
        this.items = param.items
        this.userdata = param.userdata
      
        this.$el.innerHTML = html`
          <div class="comments-owo"></div>
        `
        this.$comments = this.$el.querySelector('.comments-owo')

        this.items.forEach(item=>{
          var $item = document.createElement('div')
					$item.className = 'comments-owo-item'
					$item.id = `cid-${item.id}`
          this.$comments.appendChild($item)
          
          var {user,score,like,liked,time,content} = item
          $item.innerHTML = html `
            <div class="comments-owo-item-t">
              <div class="comments-owo-item-avatar" style="background-image:url(${user.imgurl})"></div>
              <div class="comments-owo-item-t-wrap">
                <div>
                  <div class="comments-owo-item-name">${user.name}</div>
                  <div class="comments-owo-item-star">
                    
                  </div>
                </div>
                <div class="comments-owo-item-time">${time}</div>
              </div>
            </div> 
            <div class="comments-owo-item-b">
              <div class="comments-owo-item-content">${content}</div>
              <div class="comments-owo-item-list">
                <div class="comments-owo-item-zan comments-icon-wrap">
                  <div>${liked?goodfill:good}</div>
                  <span>${like}</span>
                </div>
                <div class="comments-owo-item-reply comments-icon-wrap">
                  <svg t="1572854853296" class="comments-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4929" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M810.666667 213.333333a64 64 0 0 1 64 64v426.666667a64 64 0 0 1-64 64H478.336l-146.645333 96.106667A21.333333 21.333333 0 0 1 298.666667 846.250667V768h-85.333334a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333334z m0 64H213.333333v426.666667h149.333334v63.296L459.242667 704H810.666667V277.333333zM539.306667 490.666667v64H362.666667v-64h176.64zM661.333333 362.666667v64H362.666667v-64h298.666666z" p-id="4930"></path></svg>
                  <span>回复</span>
                </div>
                <div class="comments-owo-item-del comments-icon-wrap" style="visibility:${this.userdata.uid===item.user.uid?'visible':'hidden'}">
                  <svg t="1572855009994" class="comments-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5047" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M341.013333 394.666667l27.754667 393.450666h271.829333l27.733334-393.450666h64.106666L704.426667 792.618667a64 64 0 0 1-63.829334 59.498666H368.768a64 64 0 0 1-63.829333-59.52L276.885333 394.666667h64.128z m139.306667 19.818666v298.666667h-64v-298.666667h64z m117.013333 0v298.666667h-64v-298.666667h64zM181.333333 288h640v64h-640v-64z m453.482667-106.666667v64h-256v-64h256z" p-id="5048"></path></svg>
                  <span>删除</span>
                </div>
              </div>
            </div>
          `
          var $twolevel = document.createElement('div')
          $twolevel.className = 'comments-owo-twolevel'
          $item.appendChild($twolevel)

          $twolevel.innerHTML = html` 
            <div class="comments-owo-twolevel-reply" style="display:none;"></div>
          ` 

          var $item_star = $item.querySelector('.comments-owo-item-star')
          for(let i =0;i<5;i++){
            let star = i >= score*1? star_gray:star_orange
            $item_star.innerHTML += star 
          }
          $item_star.innerHTML+= html`<span>${score}</span>`

          var [$like,$reply,$del] = [
            $item.querySelector('.comments-owo-item-zan'),
            $item.querySelector('.comments-owo-item-reply'),
            $item.querySelector('.comments-owo-item-del')
          ]

          var reply = Reply($item.querySelector('.comments-owo-twolevel-reply'), {userdata:item})
          

          $like.addEventListener('click',
            this.handleLikeClick.bind(this, 
               this.extendItem(item,{
                liked,
                like(){
                  let n = $like.querySelector('span').innerHTML*1
                  $like.querySelector('span').innerHTML = ++n
     
                  $like.querySelector('div').innerHTML = goodfill
                  this.liked = true
                },
                dislike(){
                  let n = $like.querySelector('span').innerHTML*1
                  $like.querySelector('span').innerHTML = --n

                  $like.querySelector('div').innerHTML = good
                  this.liked = false
                }
               })
            ) 
          )
          



          $reply.addEventListener('click',
            this.handleReplyClick.bind(this,  this.extendItem(item,  {
              reply,reply_n:0
            } )) 
          )
          $del && $del.addEventListener(
            'click',
            this.handleDelClick.bind(this,  
              this.extendItem(item,{ 
                removeComment(){  $item.parentNode.removeChild($item )    }      
              })
            ) 
          )

          /////////////////  二级的评论回复
          item.items.forEach(inner_item=>{

            var $twolevel_child = document.createElement('div')
            $twolevel_child.className = 'comments-owo-twolevel-child'
            $twolevel.appendChild($twolevel_child)

            var {usera,userb,content,like,liked,time} = inner_item

            $twolevel_child.innerHTML = html`
             <div class="comments-owo-twolevel-child-t">
               <div class="comments-owo-twolevel-child-avatar" style="background-image:url(${usera.imgurl})"></div>
               <div class="comments-owo-twolevel-child-t-wrap">
                 <div style="display:flex;">
                  <div class="comments-owo-twolevel-child-usera">${usera.name}</div>
                  <span>回复</span>
                  <div class="comments-owo-twolevel-child-userb">${userb.name}</div>
                 </div>
                 <div class="comments-owo-twolevel-child-time">${time}</div>
               </div>
             </div>
             <div class="comments-owo-twolevel-child-b">
               <div class="comments-owo-twolevel-child-content">
                 ${content}
               </div>
               <div class="comments-owo-twolevel-child-list">
                 <div class="comments-owo-item-zan  comments-icon-wrap">
                   <div>${liked?goodfill:good}</div>
                   <span>${like}</span>
                 </div>
                 <div class="comments-owo-item-reply comments-icon-wrap">
                   <svg t="1572854853296" class="comments-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4929" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M810.666667 213.333333a64 64 0 0 1 64 64v426.666667a64 64 0 0 1-64 64H478.336l-146.645333 96.106667A21.333333 21.333333 0 0 1 298.666667 846.250667V768h-85.333334a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333334z m0 64H213.333333v426.666667h149.333334v63.296L459.242667 704H810.666667V277.333333zM539.306667 490.666667v64H362.666667v-64h176.64zM661.333333 362.666667v64H362.666667v-64h298.666666z" p-id="4930"></path></svg>
                   <span>回复</span>
                 </div>
                 <div class="comments-owo-item-del comments-icon-wrap" style="visibility:${this.userdata.uid===usera.uid?'visible':'hidden'}">
                   <svg t="1572855009994" class="comments-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5047" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M341.013333 394.666667l27.754667 393.450666h271.829333l27.733334-393.450666h64.106666L704.426667 792.618667a64 64 0 0 1-63.829334 59.498666H368.768a64 64 0 0 1-63.829333-59.52L276.885333 394.666667h64.128z m139.306667 19.818666v298.666667h-64v-298.666667h64z m117.013333 0v298.666667h-64v-298.666667h64zM181.333333 288h640v64h-640v-64z m453.482667-106.666667v64h-256v-64h256z" p-id="5048"></path></svg>
                   <span>删除</span>
                 </div>
               </div>
               <div class="comments-owo-twolevel-child-reply" style="display:none;" >

               </div>
             </div>
            `
            var [$like,$reply,$del] = [
              $twolevel_child.querySelector('.comments-owo-item-zan'),
              $twolevel_child.querySelector('.comments-owo-item-reply'),
              $twolevel_child.querySelector('.comments-owo-item-del')
            ]
            
            var reply = Reply( $twolevel_child.querySelector('.comments-owo-twolevel-child-reply'), {userdata:inner_item})
  
            $like.addEventListener(
              'click',
              this.handleLikeClick.bind(this,
                this.extendItem(inner_item,{
                  liked,
                  like(){
                    let n = $like.querySelector('span').innerHTML*1
                    $like.querySelector('span').innerHTML = ++n
      
                    $like.querySelector('div').innerHTML = goodfill
                    this.liked = true
                  },
                  dislike(){
                    let n = $like.querySelector('span').innerHTML*1
                    $like.querySelector('span').innerHTML = --n

                    $like.querySelector('div').innerHTML = good
                    this.liked = false
                  }
                })
              )
            )
            $reply.addEventListener(
              'click',
              this.handleReplyClick.bind(this,   this.extendItem(inner_item, {reply,reply_n:0})  )
            )
            $del && $del.addEventListener(
              'click',
              this.handleDelClick.bind(this,  
                 this.extendItem(inner_item,{ 
                   removeComment(){   $twolevel.removeChild($twolevel_child)    }      
                 })      
              )
            )

          })

         
          
        })
      },
      extendItem(o,o2={}){
        return Object.assign(o,o2)
      },
      removeCommentByProp(prop){
        prop.removeComment()
      },
      likeByProp(prop){
        prop.like()
      },
      dislikeByProp(prop){
        prop.dislike()
      },
      handleLikeClick(o){
        this.handleLike(o)
      },
      handleReplyClick(o){
   
        o.reply.onSubmit(prop=>{
          //console.log(prop)
          prop.reply = o.reply
          this.handleReply(prop)
        })
        // console.log(o.reply)
        if(++o.reply_n%2!==0){
          o.reply.show()
        }else{
          o.reply.hide()
        }

      },
      handleDelClick(o){
        //console.log(o)
        this.handleDel(o)
      },
      onDel(fn){
        this.handleDel = fn
      },
      onLike(fn){
        this.handleLike = fn
      },
      onReply(fn){
        this.handleReply = fn
      }
    }

    that.init()
    return that
  }

}


export default {
  Reply,
  Comments
}