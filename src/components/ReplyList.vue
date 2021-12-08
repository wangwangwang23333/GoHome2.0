
<template>
    <div>
        <div v-for="reply in replies" 
            :key="reply.reply.replyId" 
            class="replyItem">
                <Reply
                :reply="reply.reply"
                :customer="reply.customer"
                :sonReply="reply.sonReply"
                />
            </div>
    </div>
</template>

<script>

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.use(Antd)

export default {
    name:'ReplyList',
    components:{
    },
    methods:{
    },
    props:{
        replyList:null
    },

    created(){
            this.replies=this.replyList.replyInfo.content
    },

    data() {
        return {
            replies:null
        }
    }
}
</script>
