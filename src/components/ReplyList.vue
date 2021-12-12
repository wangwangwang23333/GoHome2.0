
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
        <div class="block" v-if="this.replyList.replyInfo>1">
            <el-pagination style=""
                layout="prev, pager, next"
                :total="totalReply"
                @current-change="changeReply">
            </el-pagination>
        </div>
    </div>
</template>

<script>

import Antd from 'ant-design-vue';

import Vue from 'vue';
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'



Vue.use(Antd)

export default {
    name:'ReplyList',
    components:{
    },
    methods:{
        changeReply:function(currentPage){
            let that=this;
            if(this.isPostReplyList)
            {
                getPostReplyList(this.id,currentPage).then((response) => {
                
                    that.replies=response.data.replyInfo.content
                    that.totalReply=response.data.replyInfo.totalElements
                    that.totalPages=response.data.replyInfo.totalPages;
                }).catch((error) => {
                    this.$message({
                    message: error,
                    type: "warning",
                    });
                });
            }
            else
            {
                getSonReplyList(this.id,currentPage).then((response) => {
                
                    that.replies=response.data.replyInfo.content
                    that.totalReply=response.data.replyInfo.totalElements
                    that.totalPages=response.data.replyInfo.totalPages;
                    
                }).catch((error) => {
                    this.$message({
                    message: error,
                    type: "warning",
                    });
                });
            }

        }
    },
    props:{
        replyList:null,
        isPostReplyList: false,
        id:0
    },

    created(){
            
            this.replies=this.replyList.replyInfo.content
            this.totalReply=this.replyList.replyInfo.totalElements
            this.totalPages=this.replyList.replyInfo.totalPages;

    },
    mounted(){
    },

    data() {
        return {
            replies:null,
            totalReply:0,
            totalPages:0
        }
    }
}
</script>

