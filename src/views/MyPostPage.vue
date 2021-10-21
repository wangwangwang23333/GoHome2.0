<template>
    <div>
        <div id="index" style="z-index:0">
            <el-card class="clearfix" style="position:fixed;z-index:1;width:100%" >
                    这里是编辑之类的应该，分享啊什么的
            </el-card>
            <div style="position:relative;display:block; top:90px; margin-left:15%; margin-right:15%;z-index:0">
                <el-card class="box-card" :body-style="{'padding':'0px','border-radius':'10px'}">
                    <div>
                        <vueper-slides>
                            <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image"/>
                        </vueper-slides>
                    </div>
                </el-card>

                <el-card class="box-card" style="0">
                    这里应该是作者信息什么的
                </el-card>
                <div id="main" style="z-index:0">
                    <mavon-editor style="z-index:0" v-model="value" :subfield="false" :defaultOpen="'preview'" :editable='false' :toolbarsFlag='false' :navigation='true'/>
                </div>
                <el-card class="box-card" style="0">
                    <Comment
                        v-model="comments.data"
                        :user="comments.currentUser"
                        :before-submit="addComment"
                        :before-delete="deleteComment"
                        :before-like="likeComment"
                        :upload-img="uploadOrCopyImg"
                        :props="comments.props"
                        />
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>

//其实是DetailPostpage，放这里方便测试



import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Comment from 'vue-juejin-comment'

export default {
    components: { mavonEditor,VueperSlides, VueperSlide ,Comment},
    data() {
        const users=[
                {
                    name: 'Up&Up',
                    avatar:require("@/assets/postimg/0.jpg"),
                    author: true,
                },
                {
                    name: '我叫白云',
                    avatar:require("@/assets/postimg/1.jpg"),
                },
                {
                    name: '我叫黑土',
                    avatar:require("@/assets/postimg/2.jpg"),
                },
                {
                    name: 'NARUTO',
                    avatar:require("@/assets/postimg/3.jpg"),
                }
            ];
        return{

            
            comments:{
                data: [],
                // props: {
                //     id: '', // 唯一 id，必需
                //     content: '', // 评论内容，必需
                //     imgSrc: '', // 评论中的图片地址，非必需
                //     children: [], // 子评论（回复），非必需
                //     likes: 0, // 点赞数，非必需
                //     reply: null, // 子评论（回复）人信息，非必需
                //     createAt: null, // 评论时间，必需
                //     user: { // 评论人信息，必需
                //         author: false // 是否为作者，类型为 Boolean，非必需
                //     } 
                // },
                props: {
                    content: 'content',
                    imgSrc: 'imgSrc',
                    children: 'childrenComments',
                    likes: 'likes',
                    reply: 'reply',
                    createAt: 'createAt',
                    user: 'visitor',
                },
                currentUser: users[0],
                users
            },
            
            slides: [
                
            ],

            //目前以 @#$ html %^& 分割html代码
            blocks:{value:"",type:0},
            value:"# 写不完啦\n呜呜呜\n![](https://media.geeksforgeeks.org/wp-content/uploads/autometa1.png)\n\n### 标题\n\
            \n```\n# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n```\n### 字体\n```\n*斜体*\n_斜体_\n \n**粗体**\n__粗体__\n \n~~删除线~~\n_斜体**加粗**斜体_\n```\n**效果：**\n*斜体*\n*斜体*\n**粗体**\n**粗体**\n~~删除线~~\n*斜体**加粗**斜体*\n### 列表\n#### 无序列表\n无序列表使用 `-`、`+` 和 `*` 作为列表标记：\n```\n- Red\n- Green\n- Blue\n* Red\n* Green\n* Blue\n+ Red\n+ Green\n+ Blue\n```\n**效果:**\n+ Red\n+ Green\n+ Blue\n#### 有序列表\n```\n1. first\n2. second\n3. third\n```\n**效果：**\n1. first\n2. second\n3. third\n### 引用\n```\n> 引用一句名言\n多级引用\n> 一级引用\n> > 二级引用\n> > > 三级引用\n```\n**效果：**\n> 引用一句名言\n> 一级引用\n>\n> > 二级引用\n> >\n> > > 三级引用\n### 代码\n```\n行内`代码`块\n三个`号后紧跟语言名称可以开启多行代码块\n```\n**效果：**\n行内`代码`块\n上面那个就是多行代码块"
            }
    },
    created() {
        
    },
    mounted()
    {
        this.initialize();

        this.splitReference();

        this.addData();
    },
    methods:{
        initialize:function(){
            this.slides.push(
                {
                    title: 'Slide #1',
                    content: 'Slide content.',
                    image: require('../assets/postimg/0.jpg')
                }
                );
                this.slides.push(
                {
                    title: 'Slide #2',
                    content: 'Slide content.',
                    image: require('../assets/postimg/2.jpg')
                });
                this.slides.push(
                {
                    title: 'Slide #3',
                    content: 'Slide content.',
                    image: require('../assets/postimg/3.jpg')
                });


            
        },
        splitReference:function(){
            
            console.log(mavonEditor.getMarkdownIt().use('markdown-it-container'));

        },

        async addComment(comment) {
            // const res = await new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve(comment)
            //     }, 0)
            // })
            console.log('addComment: ', res)
        },
        async deleteComment(comment) {
            // const res = await new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve(comment)
            //     }, 0)
            // })
        },
        async likeComment(comment) {
            // const res = await new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve(comment)
            //     }, 0)
            // })
        },
        async uploadOrCopyImg({ file, callback }) {
            // try {
            //     const res = await new Promise((resolve, reject) => {
            //         const reader = new FileReader()
            //         reader.readAsDataURL(file)
            //         reader.onload = () => {
            //             resolve(reader.result)
            //         }
            //         reader.onerror = () => {
            //             reject(reader.error)
            //         }
            //     })

            //     callback(res)
            // } catch (e) {
            //     console.log(e)
            // }
        },
        addData() {
            this.comments.data = [
                {
                    content: '梦芸\n近况如何\n算来已有十月未见你\n甚是思念',
                    visitor: {
                        name: '我叫白云',
                        avatar:require("@/assets/postimg/1.jpg"),
                    },
                    createAt: '2020.11.24',
                    likes: 1,
                    childrenComments: [
                        {
                            content:'此刻我能闻见漫天火药味道\n我随军藏身长江边一暗无天日的地窖底\n埋首台灯下写这些字却不知把心绪给寄向何地',
                            visitor: {
                                name: 'NARUTO',
                                avatar:require("@/assets/postimg/3.jpg"),
                            },
                            createAt: '2020.11.25',
                        },
                        {
                            content: '\n如磐石般坚毅',
                            visitor: {
                                name: '我叫黑土',
                                avatar:require("@/assets/postimg/2.jpg"),
                            },
                            createAt: '2020.11.25',
                            reply: {
                                name: 'NARUTO',
                                avatar:require("@/assets/postimg/3.jpg"),
                            },
                        },
                    ],
                },
                {
                    content:'我想时光亦是用来磨的\n细细地磨慢慢地磨\n总能磨出些许墨香来',
                    visitor: {
                        name: '我叫黑土',
                        avatar:require("@/assets/postimg/2.jpg"),
                    },
                    createAt: '2020.12.5',
                    childrenComments: [
                        {
                            content:'即使我鼻子已不灵\n眼睛生出疾\n侥幸你的照片还能辨出依稀',
                            visitor: {
                                name: 'NARUTO',
                                avatar:require("@/assets/postimg/3.jpg"),
                            },
                            createAt: '2020.12.6',
                        },
                    ],
                },
            ]
        }
    },
    props: {
    },
}
</script>
