<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix"></div>
                <vueper-slides>
                    <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image" />
                </vueper-slides>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix"></div>
            <div id="main">
                <mavon-editor v-model="value" :subfield="false" :defaultOpen="'preview'" :editable='false' :toolbarsFlag='false' :navigation='true'/>
            </div>
        </el-card>
        
    </div>
</template>

<script>

//其实是DetailPostpage，放这里方便测试



import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    components: { mavonEditor,VueperSlides, VueperSlide },
    data() {
        return{
            slides: [
                
            ],

            //目前以 @#$ html %^& 分割html代码
            blocks:{value,type},
            value:"# 写不完啦\n呜呜呜\n![](https://media.geeksforgeeks.org/wp-content/uploads/autometa1.png)\n\n### 标题\n```\n# 一级标题\n## 二级标题\n@#$<vueper-slides>\n<vueper-slide v-for=\"(slide, i) in slides\" :key=\"i\" :title=\"slide.title\" :image=\"slide.image\" />\n</vueper-slides>@#$### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n```\n### 字体\n```\n*斜体*\n_斜体_\n \n**粗体**\n__粗体__\n \n~~删除线~~\n_斜体**加粗**斜体_\n```\n**效果：**\n*斜体*\n*斜体*\n**粗体**\n**粗体**\n~~删除线~~\n*斜体**加粗**斜体*\n### 列表\n#### 无序列表\n无序列表使用 `-`、`+` 和 `*` 作为列表标记：\n```\n- Red\n- Green\n- Blue\n* Red\n* Green\n* Blue\n+ Red\n+ Green\n+ Blue\n```\n**效果:**\n+ Red\n+ Green\n+ Blue\n#### 有序列表\n```\n1. first\n2. second\n3. third\n```\n**效果：**\n1. first\n2. second\n3. third\n### 引用\n```\n> 引用一句名言\n多级引用\n> 一级引用\n> > 二级引用\n> > > 三级引用\n```\n**效果：**\n> 引用一句名言\n> 一级引用\n>\n> > 二级引用\n> >\n> > > 三级引用\n### 代码\n```\n行内`代码`块\n三个`号后紧跟语言名称可以开启多行代码块\n```\n**效果：**\n行内`代码`块\n上面那个就是多行代码块"
}
    },
    created() {
    },
    mounted()
    {
        this.initialize();

        this.splitReference();
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
            
            
            let block_list=this.value.split("@#$");

            if(block_list.size<=0)
            {
                return;
            }
            let block_size=block_list.size;

            let init_type=0;

            if(block_list[0].startsWith("@#$"))
            {
                init_type=1;
            }

        }
    },
    props: {
    },
}
</script>
