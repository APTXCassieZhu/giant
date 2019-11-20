<template>
  <div style="background:#eff2f5;padding-bottom:200px;position:relative;">
    <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
    
    <section class="uploadfile">
     
      <a-form id="components-form-demo-validate-other" :form="form" >
        <div class="form-wrap">
          <div class="uploadfile-l">
            <header class="resource-name">“{{resource_name}}”  资源更新</header>
            <section class="">
              <header class="uploadfile-header">STEP.1 <br/>资源更新</header>
              <a-form-item v-bind="formItemLayout" label="" style="">
                <div class="dropbox" style="margin:10px 0;">
                  <a-upload-dragger

                    v-decorator="[
                      'dragger',
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile
                      }
                    ]"
                    :beforeUpload="beforeUpload"
                    name="files"
                    action="/api/file/upload"
										:headers="{authorization:this.$store.state.token}"
                    :multiple="false"
                  >
                    <p class="ant-upload-drag-icon">
                      <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">
                      可以将你的资源文件拖拽到此处进行上传
                    </p>
                    <p class="ant-upload-hint">
                      <p>*支持资源打包上传，请按照规定的目录结构打包</p>
                      <p>支持 ZIP ，请将单个文件控制在 200 MB之内</p>
                    </p>
                  </a-upload-dragger>
                </div>
              </a-form-item>
            </section>

            <section>
              <header class="uploadfile-header">STEP.2 <br/>更新信息编辑</header>


              <section class="curVer">
                <div>当前版本号</div>
                <div>Ver {{resource_ver}}</div>
              </section>

              <a-form-item v-bind="formItemLayout" label="更新版本号"  :label-col="labelCol" :wrapper-col="wrapperCol "> 
                <a-input
                  v-decorator="['resource-version', { rules: [{ required: true, message: '请填写版本号' }] }]"
                />
              </a-form-item>

              
              <section class="editor-wrap" style="padding-bottom:50px;">
                <div class="editor-label"> <span>更新内容描述：</span> </div>
                <div>
                  <div ref="editor-owo" class="editor-owo"></div>
                  <div ref="editor-owo-content" class="editor-owo-content"></div>
                </div>
                
              </section>
            </section>
 
            <a-form-item style="border:none;">
              <input style="background:#1ebf73;margin-top:60px; border:none;outline:none;cursor:pointer;width:100%;height:67px;font-size:17px;font-weight:bold;color:#fff;" 
              @click="handleSubmit"  type="button" value="保存"/>
            </a-form-item>
          </div>

          <section class="uploadfile-r">
            <div class="uploadfile-r-wrap" >
              <header class="uploadfile-header">
                其他设置
              </header>
            
              <!-- <a-form-item v-bind="formItemLayout" label="是否公开" :label-col="{span:8}" :wrapperCol="{span:5,offset:11}">
                <a-switch v-decorator="['public', { valuePropName: 'defaultChecked' }]" />
              </a-form-item> -->
							<div class="file-public-switch">
								<span>是否公开</span>
								<a-switch :defaultChecked="this.isPublic" @change="onChangeSwitch" />
							</div>
							
              <p style="color:#7d7d7d;">* 开启该选项意味着其他用户可以自由浏览、下载和使用你的资源</p>
            </div>
            
          </section>


         
        </div>
      </a-form>
    </section>
   </div>
</template>

<style>
.ant-form-item-label{
  display: flex;
}
.ant-form-item-label label{
  font-size:16px;
  color:#7f7f7f;
  font-weight: bold;
}
.ant-row{
  margin:30px 0;
}
.ant-upload.ant-upload-drag{
  padding:15px 0;
}
</style>
<style scoped lang="less">
.file-public-switch{
	margin: 30px 0;
	display: flex;
	font-size: 16px;
	color: #7f7f7f;
	font-weight: bold;
	justify-content: space-between;
}
.curVer{
  display: flex;
  font-size: 16px;
  color: #7f7f7f;
  margin: 30px 0;

  >div:nth-child(1){
    width: 233px;
    font-weight: bold;
    padding-left:9px;
    // &::before {
    //   display: inline-block;
    //   margin-right: 4px;
    //   color: #f5222d;
    //   font-size: 14px;
    //   font-family: SimSun, sans-serif;
    //   line-height: 1;
    //   content: '*';
    // }
  }
}


.editor-wrap{
  display:flex;
  >div{
    width:570px;
    height:200px;
  }
  .editor-owo{
    // border:1px solid blue;
    border: 1px solid #ccc;
  }
  .editor-owo-content{
    height:180px;
    border: 1px solid #ccc;
    // border:1px solid red;
  }
  .editor-label{
    width:233px;
    font-size: 16px;
    color: #7f7f7f;
    font-weight: bold;
    // border:1px solid black;
    
    &::before {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
    
  }
}
.form-wrap{
  display:flex;
  background:#fff;
  width:100%;
  max-width:1380px;
  margin:0 auto;
  box-sizing: border-box;
  padding:50px 60px 120px 85px;
  margin-top:75px;

}
.form-wrap .ant-form-item-label label {
  color: #7f7f7f;
  font-size: 16px;
}
.uploadfile{
  // display: flex;
  // box-sizing: border-box;
  position: relative;
  &-header{
    color:#7f7f7f;
    font-size:23px;
    font-weight: bold;
  }
  color:#7f7f7f;
  padding:20px;

  &-l{
    width:800px;
    box-sizing: border-box;
    position: relative;
  }
  .resource-name{
    position: absolute;
    top: -116px;
    left: -85px;
    color: #7f7f7f;
    font-size: 24px;
    font-weight: bold;
  }
  &-l>section{
    border-bottom:1px solid #e5e5e5;
    box-sizing: border-box;
    padding:10px 0;
    margin-bottom:10px;
    
  }
  &-l>div{
    border:1px solid #ddd;
    margin:15px 0;
  }
  &-r{
    box-sizing: border-box;
    // flex:1;
  }
  &-r-wrap{

    border-left: 1px solid #e5e5e5;
    height: 301px;
    width: 363px;
    margin-left: 84px;
    box-sizing: border-box;
    padding-left: 86px;

  }
}
#components-form-demo-validate-other .dropbox {
  //height: 180px;
  line-height: 1.5;
}
</style>
<script>
import TopNavigation from '@/components/TopNav'
import marked from 'marked'
import Vue from 'vue'

export default {
  components:{TopNavigation},
  props:[],
  data(){
    return{
      showArtStyle:false,
      art_v : '',
      art_options:[{value:'q',label:'q版风格'},{value:'j',label:'日漫'}],
      engine_options:{
        unity:[],
        unreal:[]
      },
      editor:null,
      resource_name:'',
			resource_ver:'',
			isPublic :true,
      
      labelCol:{span:4},
      wrapperCol:{ span: 17 ,offset:3},
      unity_checkall:false,
      unreal_checkall:false,
      
      options:[ ],

      formItemLayout: {
        // labelCol: { span: 6 },
        // wrapperCol: { span: 14 },
      },
      previewVisible: false,
      previewImage: '',
      tags: [],
      inputVisible: false,
      inputValue: '',
      showCheckBoxGroup:''
    }
  },
 
  beforeCreate() {
    var that = this
    this.form = this.$form.createForm(this, {
       name: 'validate_other' ,
       onFieldsChange(props, fields){
         var keys = Object.keys(fields)

         //console.log(keys,fields)

         if(keys.length === 1 && keys[0] === 'radio-group'){
           let o = fields[keys[0]]
           that.showCheckBoxGroup = o.value
         }
        


        //  if(keys.length ===1 && keys[0] === 'checkbox-group-unreal' || keys[0] === 'checkbox-group-unity'){
          
        //  }    
       }
    })
  },
  mounted(){



    document.querySelector('#components-form-demo-validate-other').addEventListener('keydown',e=>{

      if(e.keyCode===13 && e.target.classList.contains('ant-input-sm')){
        e.preventDefault()
      }

    })

    
    let E = window.wangEditor
    let editor = new E(this.$refs['editor-owo'],this.$refs['editor-owo-content'])
    editor.customConfig.zIndex = 2
    this.editor = editor
    
     // 自定义菜单配置
    editor.customConfig.menus = [
      'head',
      'bold',
      'italic',
      'underline',
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
    ]

    editor.create()

    axios.get(`/api/resource/${this.$route.params.resourceId}`).then(response=>{
      var res = response.data
      var data = res.data
      
      this.resource_name = data.name
			this.resource_ver = data.ver[0].verNum
			this.isPublic = data.state
			
			this.editor.txt.html(data.description)
    })

    // console.log('matched:', this.$route.matched)
    axios.get(`/api/tag/tree`,{ params:{type:'engine_ver'} }).then(response=>{
      var res = response.data 
      var options = res.data
      options.forEach(o=>{
        this.engine_options[o.label] = []
        o.children.forEach((o2)=>{
          this.engine_options[o.label].push({
            label:o2.label,
            value:o2.value,
            checked:false
          })
        })
      })

    })
  },
  created(){
    
  },
  methods:{
		onChangeSwitch(e){
			this.isPublic = e
		},

    beforeUpload(file){

			//
			if(file.type != 'application/x-zip-compressed'){
				this.$message.warning('请上传一个zip')
				return Promise.reject()
			}

			let isLt200 = file.size/1024/1024  < 200
			if(isLt200 > 200){
			  this.$message.warning('文件太大')
				return Promise.reject()
			}

      return true
    },
    handleUnityCheckBox(){
      this.unity_checkall ^= true
      if(this.unity_checkall){
        //console.log(this.form.getFieldsValue('resource-name'))
      }else{
        

      }

    },
    handleUnrealCheckBox(){
      
    },
    handleKeyDown(e){
      // debugger
    },
    handleResChange(val){
      this.art_v = val 
      if(this.art_v == 'art_classify'){
        this.showArtStyle = true
        axios.get(`/api/tag/tree`,{ params:{type:'art_style'} }).then(response=>{
           var res = response.data 
           var options = res.data
           this.art_options = options
        })
      }else{
        this.showArtStyle = false
      }

      axios.get(`/api/tag/tree`,  { params:{type:this.art_v} } ).then(response=>{
        var res = response.data  
        var options = res.data 
        this.options = options 
      })

    },
    handleSubmit(e) {

      e.preventDefault()
      this.form.validateFields((err, values) => {
       //console.log(values)

         //console.log(this.editor.txt.html(),this.editor.txt.html().length)
        
        // console.log('txt html:', this.editor.txt.html())
        // debugger

        if(err){ return  }

        if(!values.dragger) return this.$message.warning('请上传一个资源')
       
        //if(!this.editor.txt.text().length ) return this.$message.warning('请填写文件描述')

    
        // debugger

        var file = values['dragger']?values['dragger'][0].response.data.fileId:null


        axios.put(`/api/resource/:${this.$route.params.resourceId}`,{
          params:{
            "state": this.isPublic?'public':'private', // 是否公开
            "type": values['resource-type']=="art_classify"?'art':'dev', // 资源分类
            "name": values['resource-name'], //资源名称
           
            "file": file,  // 资源上传fileid
            "descriptipon": this.editor.txt.html() //资源描述
          }
        }).then(response=>{
          
          this.$message.success('发布成功')
        })


      })
    },
    normFile(e) {
      //console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList
    },
   
    handleCancel() {
      this.previewVisible = false;
      //console.log('handleCancel.')
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
      //console.log('handlePreview.')
      //debugger
    },
    handleChange(info) {

      var {fileList} = info
      this.fileList = fileList

      const status = info.file.status

      if(status =='done'){
        console.log('handleChange.',this.fileList)
      }
      //debugger
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      //console.log(tags);
      this.tags = tags;
    },


    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },


    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }

      //console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },
    handleSave(){
      //console.log('tags:',this.tags,'fileList:',this.fileList, 'fileid:',this.fileid)

      
    },

    handleChangex(info) {
      const status = info.file.status

      //console.log(status)
      if(status=='done'){
        //console.log(info.fileList[0],info.fileList[0].response)
        let res = info.fileList[0].response
        this.fileid = res.data.fileid

        this.resource_fileid.push(this.fileid)
      }


      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }

    },
    onChange(value) {
      console.log(value)
    },
    handleChangex2(value) {
      console.log(`selected ${value}`)
    },
    onChangex(checked) {
      console.log(`a-switch to ${checked}`)
    }
  }
  
}
</script>