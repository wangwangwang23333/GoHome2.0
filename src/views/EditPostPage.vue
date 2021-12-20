<template>
    <div style="position:relative;display:block;  margin-left:15%; margin-right:15%">
        <el-row>
            <el-card class="box-card" style="text-align:left;margin-bottom:10px">
                <el-row>
  
                <el-col :span="20">
                    <el-input v-model="post.postTheme"
                    maxlength="20" 
                    placeholder="请输入主题" class="input-tag">
                    </el-input>
                </el-col>
                
                </el-row>
                <el-row>
                </el-row>
            </el-card>
        </el-row>
        <el-row>
            <el-card class="box-card" style="text-align:left;margin-bottom:10px">
                <el-row>
    

                    <el-col :span="21.5">
                        <div class="label-list">
                            <el-tag
                                type="primary"
                                v-for="(tag,index) in tags"
                                :key="index"
                                effect="dark"
                                closable
                                size="small"
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
                                maxlength="4" 
                                >
                            </el-input>
                            <el-button v-if="tags.length<3 && !inputVisible" class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>

        <el-row>
                <el-card class="box-card" style="text-align:left;margin-bottom:10px">
                    <h2>封面图上传</h2>
                    <el-divider></el-divider>
                    <el-upload
                    action="#"
                    ref="uploadwall"
                    list-type="picture-card"
                    :auto-upload="false"
                    :file-list="files"
                    :on-change="changeImages">
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
                
            </el-row>

        <el-row>
            <el-card class="box-card" style="text-align:left;margin-bottom:-0.5px">
                <h2>帖子内容</h2>
            </el-card>
            <div style="margin-bottom:10px">
                <mavon-editor v-model="post.postContent" 
                maxlength="1500"
                :toolbars="this.toolbars"/>
            </div>

        </el-row>
        
        <el-row>
            <el-card class="box-card" style="text-align:left">
                <h2>从收藏夹添加房源：</h2>
                <el-divider></el-divider>
                <!-- 收藏夹列表 -->
                <div v-if="this.favorite_list.length==0">
                    <img class="empty-img" src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/f7c588076d9dc58d2ce4170920301c90.png">
                    <p>还没有创建收藏夹哦，快去收藏房源后再来添加吧!</p>
                </div>
                <div v-else class="card-list">
                    <el-row :gutter='12'>
                        <el-col :span="6" v-for='item in favorite_list'
                            :key='item.id'>
                            <!-- :offset=" index %3==0 ? 1 : 2 ">   -->
                            <!-- style="margin-bottom:40px;" > -->
                            <el-card  shadow="hover"  @click.native="openOneFav(item)">
                                <img v-if="item.imgUrl=='' || item.imgUrl==null " src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/9074398134361ed01c5bd7c2d917934a.png" class="emp-image">
        <!--                        https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/f8cc5e654d8f69d1353e2a4833dd3a38.jpg-->
                                <img v-else :src="item.imgUrl" class="image">
                                <div style="padding: 14px;">

                                    <div class="top-clearfix">
                                        <span class="time">共有{{ item.totalStay }}个房源</span>
                                    </div>
                                    <span class="favor-title">{{item.name}}</span>
                                    <div class="bottom clearfix">
                                    
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row>
                        <h2>已加入分享的房源:</h2>
                        <el-divider></el-divider>
                        
                        <div v-if="multipleSelection.length==0" style="margin-left: 25vw;">
                                <img class="empty-img" src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/%E6%97%A0%E6%B0%91%E5%AE%BF.png">
                                <p style="margin-left: -3vw;">还没有选中要添加房源哦，快去添加吧!</p>
                        </div>
                        <el-table v-else
                            :data="multipleSelection"
                            ref="finalCollection"
                            tooltip-effect="dark"
                            style="width: 80%;margin-left: 10vw;">
                            <el-table-column
                                
                                align="center">
                                <template slot-scope="scope">
                                    <stay-card  :money="scope.row.item.stayMinPrice" 
                                                    :rate="scope.row.item.stayRate"
                                                    :comment_num="scope.row.item.commentNum"
                                                    :stay_id='scope.row.item.stayID'
                                                    :label1="scope.row.item.stayHasFacility"
                                                    :label2="scope.row.item.stayHasWashroom"
                                                    :label3="scope.row.item.stayHasPath"
                                                    :hostImg="scope.row.item.hostAvatar"
                                                    :stayImg="scope.row.item.stayPhotoList"
                                                    :stay_characteristic="scope.row.item.stayCharacteristic"
                                                    :stay_name="scope.row.item.stayName.slice(0,18)+'...'"
                                                    :erase="false"
                                                    style="pointer-events: none;"
                                                    ></stay-card>
                                </template>
                            </el-table-column>
                        </el-table>


                    </el-row>


                </div>

                <!-- 收藏夹打开的选择房源界面 -->
                <div>
                    <el-dialog :visible.sync="dialogTableVisible" width="850px">

                        <div class="top-info">
                            <!-- 心愿单标题与按钮 -->
                            <el-row :span="24">
                                <el-col :span="12" style="text-align:left" > 
                                    <h2 class="title">{{this.favorName}}</h2>
                                </el-col>
                                <el-col :span="12" style="text-align:right">
                                    <el-button type="primary" class="return-button" icon="el-icon-caret-left" @click="returnEdit">返回</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider></el-divider>
                        <br>
                        
                        <div v-if="stayList.length==0">
                                <img class="empty-img" src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/283dd5de830e60c82cf9ecc9362e8779.png">
                                <p>收藏夹内还没有房源哦，快去探索吧!</p>
                        </div>
                        <el-table v-else
                            :data="tableData"
                            ref="detailCollection"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            :row-key="getRowKey">
                            <el-table-column
                                type="selection"
                                width="55"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                label="卡片"
                                width="750"
                                align="center">
                                <template slot-scope="scope">
                                    <stay-card  :money="scope.row.item.stayMinPrice" 
                                                    :rate="scope.row.item.stayRate"
                                                    :comment_num="scope.row.item.commentNum"
                                                    :stay_id='scope.row.item.stayID'
                                                    :label1="scope.row.item.stayHasFacility"
                                                    :label2="scope.row.item.stayHasWashroom"
                                                    :label3="scope.row.item.stayHasPath"
                                                    :hostImg="scope.row.item.hostAvatar"
                                                    :stayImg="scope.row.item.stayPhotoList"
                                                    :stay_characteristic="scope.row.item.stayCharacteristic"
                                                    :stay_name="scope.row.item.stayName.slice(0,18)+'...'"
                                                    :erase="false"
                                                    style="pointer-events: none;"
                                                    ></stay-card>
                                </template>
                            </el-table-column>
                        </el-table>

                        
                    </el-dialog>

                </div>

        
            </el-card>
            <el-card class="box-card" style="margin-top: 3vh;">
                <el-button class="upload-post" primary plain @click="uploadPost">完成编辑并上传</el-button>
            </el-card>
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
    
    
    .image {
        height: 80%;
        width: 100%;
        width: 400px;
        height: 200px;  
        display:block;
        opacity: 0.8;
    }

    .emp-image{
        margin-left:80px;
        width: 200px;
        height: 200px;  
        display:block;
        opacity: 0.8;
    }


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



import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { addPost } from '@/api/post.js'
import { GetFavorite} from '@/api/favorite';
import staycard from '../components/stayCard.vue'
import { GetFavoriteStay } from '@/api/favorite';


export default {
    components: { mavonEditor ,'stay-card':staycard},
    data() {
        return { 
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: false, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: false, // 全屏编辑
                readmodel: false, // 沉浸式阅读
                htmlcode: false, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
                postUrl:'',
            },


            labelColor:["#77C9D4","#57BC90","#015249"],
            input:"",
            inputVisible:false,

            tags:[],
            stays:[],
            images:[],
            files:[],
            post:{
                postContent:"",
                postTheme:"",
                customerId: 0
            },

            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,



            favorite_list: [],
            url_list:[],
            user_name:localStorage.getItem('userName'),


            dialogTableVisible:false,
            favorName: "",
            favorID:0,
            stayList:[],


            tableData: [],
            multipleSelection: []
        }
    },
    created() {

        this.getFavoriteCollection();

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
        handleSelectionChange(val)
        {      
            //这里求multipleSelection和tableData的对称差，直接删掉让他们重新选
            let selectable=this.multipleSelection.filter(v => this.tableData.filter(u=> u.item.stayID===  v.item.stayID).length>0);
            let unselectable=this.multipleSelection.filter(v=> selectable.filter(u=> u.item.stayID===  v.item.stayID).length==0);
            let selected=val;
            this.multipleSelection = unselectable.concat(selected);

        },
        getRowKey(row)
        {
            return row.item.stayID
        },
        doNothing()
        {

        },
        returnEdit()
        {
            this.dialogTableVisible=false;
        },
        on_card_clicked(item){

            console.log("clicking",item)

            this.$router.push({path:"/StayInfo",query:{stayId:item.stayID}});
        },
        getFavoriteCollection(){
            let userId=localStorage.getItem('userId');
            if (userId == null || userId == ''){
                this.$message({
                message: "您尚未登录，请先登录",
                type: "warning",
                });
                this.$router.push({
                    path: "/"
                })
                return;
            }
            GetFavorite().then(response=>{
                this.favorite_list=response.data;
                console.log(this.favorite_list)
            }).catch(error=>{
                console.log("fail");
                console.log(error);
                this.$message.error("网络异常，请稍后重试");
            })
        },
        openOneFav(item){
            this.favorName=item.name;
            this.favorID=item.favoriteId;

            GetFavoriteStay(this.favorID).then(response=>{
                this.stayList=response.data.stayList;

                this.tableData=this.stayList.map((element)=>{return {item: element};});

                console.log("staylist",this.tableData);
                console.log("selection",this.multipleSelection);

                //这里求multipleSelection和tableData的对称差，直接删掉让他们重新选
                let intersection=this.tableData.filter(v => this.multipleSelection.filter(u=> u.item.stayID===  v.item.stayID).length>0)
                this.multipleSelection=this.multipleSelection.filter(v=> intersection.filter(u=> u.item.stayID===  v.item.stayID).length==0);

                this.dialogTableVisible=true;


            }).catch(error=>{
                console.log("fail");
                this.$message.error("错误:",error);
            });
        },
        uploadFinished() {

            this.$alert('发帖成功，快去帖子页面看看吧', '提示', {
                confirmButtonText: '确定',
                showCancelButton:false,
                callback: action => {
                    this.$router.push({
                        path:"/DetailPost",
                        query:{postId:this.postUrl}
                    });
                    // this.$router.go(-1);
                }
            });
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
            if (input && input.replace(' ','')!='') {
                this.tags.push(input);
            }
            this.inputVisible = false;
            this.input = '';
        },
        uploadPost()
        {

            // 上传前的信息校验
            if(this.tags.length==0){
                this.$message({
                    message:"请至少选择一个标签",
                    type: "warning",
                });
                return;
            }
            if(this.images.length==0){
                this.$message({
                    message:"请至少上传一张封面图",
                    type: "warning",
                });
                return;
            }
            if(this.post.postTheme==""){
                this.$message({
                    message:"请输入帖子标题",
                    type: "warning",
                });
                return;
            }
            if(this.post.postContent==""){
                this.$message({
                    message:"请输入帖子内容",
                    type: "warning",
                });
                return;
            }

            this.stays=this.multipleSelection.map((element)=>{
                return element.item.stayID;
            })
            addPost({
                tags:this.tags,
                stays:this.stays,
                base64images:this.images,
                post:this.post
            }).then((response)=>{
                this.postUrl=response.data

                this.uploadFinished();

            }).catch((error) => {
            this.$message({
                message: error,
                type: "warning",
            });
        });

        },
        handlePictureCardPreview(file) {       
            this.dialogImageUrl = file.url;         
            this.dialogVisible = true;
        },
        changeImages(file,fileList)
        {
            this.files=fileList;
            this.getBase64(file.raw).then((res)=>
            {
                this.images.push(res);
            })
        },
        handleRemove(file) {
            this.files=this.files.filter((element)=>{return element!=file});
            this.getBase64(file.raw).then((res)=>
            {
                this.images=this.images.filter((element)=>{return element!=res});
            })
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
