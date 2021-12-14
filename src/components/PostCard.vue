<template>
    <div class="CardType"
    @mouseenter="changeCardStyle($event)" 
    @mouseleave="removeCardStyle($event)">
        <!--走马灯-->
        <el-carousel trigger="click" :height="imgHeight+'px'" indicator-position="none">
            <el-carousel-item v-for="(stayPhoto,index) in postPhotos" :key="index">
                <el-image fit="cover"
                    style="width: 100%;height:100%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
                    :src="stayPhoto"
                    >
                </el-image>
            </el-carousel-item>
        </el-carousel>

        <!--标签-->
        <div class="label-list">                        
            <el-tag
            type="primary"
            v-for="(i,index) in labels.slice(0,3)"
            :key="index"
            effect="dark"
            :color="labelColor[index]"
            :hit="true">
            {{i}}
            </el-tag>
        </div>
        
        <el-row>
            
            <el-col :span="19">
                <h4 style="margin-top: 4%;font-family: 'Avenir';text-align:left;margin-left: 5%;margin-bottom: 2%;margin-right: 1vw;">
                    {{postTheme}}
                </h4>
                
            </el-col>
            <el-col :span="5">
                <el-image class="UserAvatar" :src="userAvatar"
                    style="float:right;margin-left: 10px;margin-right: 10px">
                </el-image>
            </el-col>
            
        </el-row>
        <h5 style="font-size:5px;font-weight: revert;width:90%;text-align: left;margin-left: 4%;margin-top: 2%;color: #909399;
                overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                    {{postContent}}
                </h5>
                
        <h5 style="margin-top: 0;margin-bottom:5px;color: #7b7b7b;font-weight: normal;margin-left: 6%;text-align: left">
            <el-row>
                <!--评论数 点赞数-->
            <el-col :span="5">
                <i class="el-icon-chat-line-square"></i>
                {{replyCount}}
            </el-col>
            
            <el-col :span="5">
                <i class="el-icon-thumb"></i>
                {{likeCount}}
            </el-col>
            <el-col :span="14">
                <i class="el-icon-time"></i>
                {{postTime.replace('T',' ').substring(0,16)}}
            </el-col>
            </el-row>
        </h5>
    </div>
</template>

<script>
    export default {
        name: 'PostCard',
        props:{
            labels:{
                type:Array,
            },
            postId:{
                type:Number,
            },
            postTheme:{
                type:String,
            },
            postContent:{
                type:String
            },
            replyCount:{
                type:Number,
            },
            likeCount:{
                type:Number,
            },
            userAvatar:{
                type:String
            },
            postPhotos:{
                type:Array,
            },
            postTime:{
                type:String
            },
            imgHeight:{
                type:Number
            }
        },
        data() {
            return {
                colors: ['#a3c6ea', '#70a8c4', '#559bcb'],
                labelColor:["#77C9D4","#57BC90","#015249"],
            }
        },
        methods: {
            changeCardStyle(e) {
                e.currentTarget.className = 'activeMe';
            },
            removeCardStyle(e) {
                e.currentTarget.className = 'CardType';
            },
        },
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 16) {
                    return value.slice(0, 16) + '...';
                }
                return value
            }
        },
    }
</script>

<style>
    .containerFlex {
        display: flex;
        flex-direction: row;
        /*容器内成员的排列方式为从左到右*/
        flex-wrap: wrap;
        /*换行方式，放不下就换行*/
        justify-content: flex-start;
        /*项目在主轴上的对齐方式*/
        align-content: flex-start;
    }

    .CardContainer {
        width: 270px;
        height: 310px;
        margin-bottom: 20px;
        margin-left: 25px;

    }

    .CardType {
        width: 17vw;
        /* height: 95%; */
        margin: 0 auto;
        margin-top: 5px;
        border-radius: 10px !important;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px !important;
        background-color: rgba(229, 225, 225, 0.34);
        cursor: pointer;
        -webkit-transition: all 200ms ease-in;

    }

    .activeMe {
        width: 17vw;
        margin: 0 auto;
        margin-top: 0px;
        border-radius: 10px !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
        background-color: rgba(255, 255, 255, 0.84);
        cursor: pointer;
        -webkit-transition: all 200ms ease-in;
    }

    .UserAvatar {
        width: 35px;
        height: 35px;
        border-radius: 27px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        
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
        max-height: 4vh;
        font-family: "FZHeiBJW";
        color:white;
}

</style>