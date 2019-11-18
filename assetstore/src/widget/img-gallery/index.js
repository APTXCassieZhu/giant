import './img-gallery.css'

var Actor = (url)=>{
	var that = {
		show(s){
			if(s==='reset'){
				this.$el.style.transition = 'none'
				getComputedStyle(this.$el,null)['padding']
				this.$el.style.visibility = 'visible'
				this.$el.style.opacity = '1'
				this.$el.style.transform = 'translate3d(0,0,0) scale(1)'

				
			}else{
				this.$el.style.transition = '.5s'
				getComputedStyle(this.$el,null)['padding']
				this.$el.style.visibility = 'visible'
				this.$el.style.opacity = '1'
				this.$el.style.transform = 'translate3d(0,0,0) scale(1)'
			}
			
		},
		hide(s){
			if(s==='reset'){
				this.$el.transition = 'none'
				getComputedStyle(this.$el,null)['padding']
				this.$el.style.visibility = 'hidden'
				this.$el.style.opacity = '0'
				this.$el.style.transform = 'translate3d(0,0,0) scale(.8)'
			}else{
				this.$el.style.visibility = 'hidden'
				this.$el.style.opacity = '0'
				this.$el.style.transform = 'translate3d(0,0,0) scale(.8)'
			}
		
		},
		init(){

			this.$el = document.createElement('div')
			this.$el.className ='img-gallery-item'
			this.$el.style.backgroundImage = `url(${url})`

			this.$el.style.visibility = 'hidden'

			this.$el.style.opacity = '0'
			this.$el.style.transform = 'translate3d(0,0,0) scale(.8)'

			this.$el.style.transition = '.5s'
			

			
			return this
		}
	}
	return that.init()
}
export default function ImgGallery($parent = document.body,{zIndex=999,images=[],width=768,height=451}={}){
	var that = {
		init(){
			var $el = document.createElement('div')
			$parent.appendChild($el)
			$el.className = 'img-gallery'
			$el.style.zIndex = zIndex

			$el.style.display = 'none'
			this.$el = $el

			let $arrow = `
				<svg  t="1573916942060" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="5093" width="200" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="5094" fill="#ffffff"></path></svg>
			`
			let $close = `
				<svg t="1573917803234" class="icon" viewBox="0 0 1045 1024" version="1.1" p-id="5246" width="200" height="200"><path d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z" p-id="5247" fill="#ffffff"></path></svg>
			`

			// debugger

			$el.innerHTML = `
				<div class="img-gallery-wrap">
					<div class="img-gallery-items" style="width:${width}px;height:${height}px;">
						
					</div>
					<div class="arrow-l-wrap">${$arrow}</div>
					<div class="arrow-r-wrap">${$arrow}</div>
					<div class="img-gallery-close">${$close}</div>
				</div>
			`

			this.$arrowl = $el.querySelector('.arrow-l-wrap')
			this.$arrowr = $el.querySelector('.arrow-r-wrap')
			this.$items = $el.querySelector('.img-gallery-items')
			this.$close = $el.querySelector('.img-gallery-close')
			
			this.curIdx = 0

			this.images = images.map(url=>{
				var actor = Actor(url)
				//debugger
				this.$items.appendChild(actor.$el)

				return actor
			})

			this.setCurIdx(0)
			this.manualFn()

			this.run()
			return this
		},
		setCurIdx(i){
			this.curIdx = i
		},
		manualFn(){

			try{

				this.$arrowr.onclick = ()=>{
					this.curIdx ++
					this.curIdx%=this.images.length
					//console.log(this.curIdx)
					console.log(this.curIdx)
					this.run()
				}
	
				this.$arrowl.onclick = ()=>{
					this.curIdx --
					this.curIdx<0 && (this.curIdx+=this.images.length)
					//console.log(this.curIdx)
					console.log(this.curIdx)
					this.run()
				}

			
				
				
			}catch(e){
				console.log(e)
			}

			this.$close.onclick = ()=>{
				this.hide()
			}
		},
		show(){
			this.$el.style.display = 'block'
			this.$el.style.visibility = 'hidden'
			this.$el.style.opacity = '0'
			this.$el.style.transition = '.5s'
			getComputedStyle(this.$el,null)['padding']
			this.$el.style.visibility = 'visible'
			this.$el.style.opacity = '1'

			this.resetRun()
		},
		hide(){
			this.$el.style.transition = '.5s'
			this.$el.style.visibility = 'hidden'
			this.$el.style.opacity = '0'
			clearTimeout(this.itv)
			this.itv = setTimeout(()=>{
				this.$el.style.display = 'none'

			},500)

		},
		resetRun(){
			this.images.forEach(o=>{
				o.hide('reset')
			})
			this.images[this.curIdx].show('reset')
		},
		run(){
			this.images.forEach(o=>{
				o.hide()
			})
			this.images[this.curIdx].show()
		}
	}
	return that.init()
}