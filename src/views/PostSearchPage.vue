<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix"></div>
            <div id="main">
                <mavon-editor v-model="value"/>
            </div>
        </el-card>
        <el-card class="box-card">
            <p>这里是上传图片</p>
            <p>这里是上传房源</p>
        </el-card>
    </div>
</template>

<script>


//其实是EditPostPage，放这里方便测试

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    components: { mavonEditor },
    data() {
        return { value: '' }
    },
    created() {
    },
    mounted()
    {
        this.initialize();
    },
    methods:{
        initialize:function(){
        },
    },
    props: {
    },
}
</script>
