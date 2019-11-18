import './lightbox.less'
export default function LightBox($parent=document.body,{zIndex=100,topImgs=[],thumbImgs=[]}={}){
	var that = {
		init(){

			var $el = document.createElement('div')
			$el.className = 'gdrc-lightbox'
			$parent.appendChild($el)
			$el.style.zIndex = zIndex
			$el.style.opacity = 0
			$el.style.visibility = 'hidden'

			this.$el = $el

			let $close = `
				<svg t="1573917803234" class="icon" viewBox="0 0 1045 1024" version="1.1" p-id="5246" width="200" height="200"><path d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z" p-id="5247" fill="#ffffff"></path></svg>
			`

			$el.innerHTML = `
				<div class="gdrc-lightbox-close">${$close}</div>
				<div class="swiper-container gdrc-lightbox-top">
					<div class="swiper-wrapper">
						
					</div>
					
				</div>
				<div class="swiper-button-next swiper-button-white"></div>
				<div class="swiper-button-prev swiper-button-white"></div>
				<div class="swiper-container gdrc-lightbox-thumbs">
					<div class="swiper-wrapper">
						
					</div> 
				</div>
			`

			var $wrap_top = $el.querySelector('.gdrc-lightbox-top .swiper-wrapper')
			var $wrap_thumbs = $el.querySelector('.gdrc-lightbox-thumbs .swiper-wrapper')

			
			topImgs.forEach(src=>{
				var $d = document.createElement('div')
				$d.classList.add('swiper-slide')
				$d.style.backgroundImage = `url(${src})`
				$wrap_top.appendChild($d)
			})

			topImgs.forEach(src=>{
				var $d = document.createElement('div')
				$d.classList.add('swiper-slide')
				$d.style.backgroundImage = `url(${src})`
				$wrap_thumbs.appendChild($d)
			})

			// console.log(topImgs,thumbImgs)

			var galleryThumbs = new Swiper($el.querySelector('.gdrc-lightbox-thumbs'), {
				spaceBetween: 10,
				slidesPerView: 9,
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			})

			this.swiper = new Swiper($el.querySelector('.gdrc-lightbox-top'), {
				spaceBetween: 10,
				on:{
					click(){
						
					}
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				thumbs: {
					swiper: galleryThumbs
				},

				autoplay:{
					delay: 5000,  // 设置轮播的时间
					disableOnInteraction: false,  // 这一行是为了避免手动滑动轮播图后，自动轮播失效，默认为true
				},
			})

			this.$el.querySelector('.gdrc-lightbox-close').onclick= ()=>{
				this.hide()
			}
	
		},
		show(){
			this.$el.style.transition = '.5s'
			this.$el.style.opacity = 1
			this.$el.style.visibility = 'visible'
			
		},
		hide(){
			this.$el.style.transition = '.5s'
			this.$el.style.opacity = 0
			this.$el.style.visibility = 'hidden'
		},
		setCurIdx(index){
			this.swiper.slideTo(index,1,false)
		}
	}
	that.init()
	return that
}