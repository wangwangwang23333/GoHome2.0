<template>
    <div>
        <el-row>
            <el-card class="box-card" style="text-align:left">
                <el-col :span="2.5">
                    <h2>主题：</h2>
                </el-col>
                <el-col :span="18">
                    <el-input v-model="post.postTheme" placeholder="请输入主题" class="input-tag">
                    </el-input>
                </el-col>
                <el-col :span="3.5">
                    <el-button class="upload-post"  @click="uploadPost">上传帖子</el-button>
                </el-col>
            </el-card>
        </el-row>
        <el-row>
            <el-card class="box-card" style="text-align:left">
                <el-row>
                    <el-col :span="2.5">
                        <h2>添加标签：</h2>
                    </el-col>
                    <!-- <el-col :span="4">
                        <el-input v-model="input" placeholder="请输入内容" class="input-tag">
                            <el-button slot="append" @click="appendTag" icon="el-icon-circle-plus"></el-button>
                        </el-input>
                    </el-col> -->
                    <el-col :span="21.5">
                        <div class="label-list">
                            <el-tag
                                type="primary"
                                v-for="(tag,index) in tags"
                                :key="index"
                                effect="dark"
                                closable
                                :color="labelColor[index]"
                                :hit="true"
                                :disable-transitions="false"
                                @close="deleteTag(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="input"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="saveTag"
                                @blur="saveTag"
                                >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>
        <el-row>
            <div id="main">
                <mavon-editor v-model="post.postContent"/>
            </div>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card" style="text-align:left">
                    <h2>图片上传：</h2>

                    <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <i class="el-icon-download"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    
                </el-card>
                
            </el-col>

            <el-col :span="12">
                <el-card class="box-card" style="text-align:left">
                    <h2>房源添加：</h2>
            
                </el-card>
                
            </el-col>

        </el-row>
        
    </div>
</template>

<style>
  /* .el-select .el-input {
    width: 130px;
  } */
  .input-tag .el-input-group__prepend {
    background-color: #fff;
  }
</style>


<style scoped>
    .el-divider--vertical {
        height: 4em !important;
        width: 1.5px !important;
    }
    /* 标签列表 */
    .label-list{
        padding:1px 6px;
        margin:1px 6px ;
    }
    .el-tag{
        float:left;
        white-space: pre-line;
        word-break: break-all;
        margin-top: 5px;
        margin-left:5px;
        margin-bottom:5px;
        /* max-height: 4vh; */
        font-family: "FZHeiBJW";
        color:white;
}
</style>


<script>


//其实是EditPostPage，放这里方便测试

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    components: { mavonEditor },
    data() {
        return { 
            labelColor:["#77C9D4","#57BC90","#015249"],
            input:"",
            inputVisible:false,

            tags:[],
            stays:[],
            images:[],
            post:{
                postContent:"",
                postTheme:"",
                customerId: 0
            },

            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,


        }
    },
    created() {
        if(this.initTags)
            this.tags=this.initTags;
        if(this.initStays)
            this.stays=this.initStays;
        if(this.initImages)
            this.images=this.initImages;
        if(this.initPost)
        {  
            if(this.initPost.postContent)
                this.post.postContent=this.initPost.postContent;
            if(this.initPost.postTheme)
                this.post.postTheme=this.initPost.postTheme;
            if(this.initPost.customerId)
                this.post.customerId=this.initPost.customerId;
        }
    },
    mounted()
    {
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        deleteTag(tag)
        {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        saveTag() {
            let input = this.input;
            if (input) {
            this.tags.push(input);
            }
            this.inputVisible = false;
            this.input = '';
        },
        uploadPost()
        {
            //这里上传帖子
        },
        handleRemove(file) {
            console.log(file)
            this.getBase64(file.raw).then((res)=>
            {
                console.log(res)
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        getBase64(file) {
            return new Promise((resolve, reject) =>{
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = () =>{
                    imgResult = reader.result;
                };
                reader.onerror = (error)=> {
                    reject(error);
                };
                reader.onloadend = ()=> {
                    resolve(imgResult);
                };
            });
        },

    },
    props: {
        initTags:[],
        initStays:[],
        initImages:[],
        initPost:{
            postContent:"",
            postTheme:"",
            customerId: 0
        }
    },
}
</script>
