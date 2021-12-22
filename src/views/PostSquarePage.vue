<template>
    <div>
        <!--此处仍然是词云图-->
        <div>
            <wordcloud :data="defaultWords" nameKey="标签" valueKey="热度" :color="cloudColors" :showTooltip="true"
                :wordClick="wordClickHandler" style="width: 90vw;" v-if="!tagLoading">
            </wordcloud>
            <div style="width: 90vw;height: 50vh;" v-loading="tagLoading" v-if="tagLoading"></div>
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="totalTags"
                    @current-change="changeTags">
                </el-pagination>
                <el-button @click="setPostListByDefault()" round :disabled="selectedTag==null">取消筛选</el-button>
            </div>
        </div>
        <el-divider>
            <div style="color:#bebaba;">从点击你感兴趣的一个话题开始吧！</div>
        </el-divider>
        <el-container id="index">
            <!-- <el-header>
                <p>这里应该是搜索框和标签筛选</p>
            </el-header>

             -->

            <!-- <PostCard /> -->
            <!-- 主体瀑布流区域，无限滚动 -->
            <div class="v-waterfall-area" id="waterfall-main" style="position:relative;top:50px;">
                <div class="v-waterfall-content" >
                    <div v-for="img in waterfallList" 
                    :key="img.stayId" 
                    class="v-waterfall-item" 
                    :style="{border:'2px',position:'absolute',left:img.left.toString()+'px',top:img.top.toString()+'px',width:imageWidth.toString()+'px'}" 
                    @click="openDialog(img.postId)">
            
                        <!-- 帖子卡片-->
                        <PostCard
                        :labels="img.labels"
                        :postId="img.postId"
                        :postTheme="img.postTheme"
                        :postContent="img.postContent"
                        :replyCount="img.replyCount"
                        :likeCount="img.likeCount"
                        :userAvatar="img.userAvatar"
                        :postPhotos="img.postPhotos"
                        :postTime="img.postTime"
                        :imgHeight="img.imgHeight"
                        />

                        
                    </div>
                </div>
            </div>
            <el-button
            style="position: fixed;border-radius: 100%;height: 10vh;
            right: 5vw;bottom: 12vh;"
            plain
            @click="getMoreData()"
            v-loading="postLoading"
            >More</el-button>
            <el-button
            style="position: fixed;border-radius: 100%;height: 9vh;
            right: 5vw;bottom: 1vh;"
            @click="backToTop()"
            >Top</el-button>
        </el-container>
        
    </div>



</template>

<script>
import PostCard from "../components/PostCard";
import wordcloud from 'vue-wordcloud'
import {getDefaultTagList} from '@/api/post.js'
import {getDefaultPostList} from '@/api/post.js'
import {getTagSelectedPostList} from '@/api/post.js'

export default {
    name: 'v-waterfall',
    components:{
        PostCard,
        wordcloud
    },
    data() {
        return {
            //存放计算好的数据
            waterfallList: [],
            //每一列的宽度
            imageWidth: 200,
            //卡片高度
            cardHeight:180,
            //多少列
            waterfallImgCol: 4,
            //右边距
            waterfallImgRight: 50,
            //下边距
            waterfallImgBottom: 0,

            //存放瀑布流各个列的高度
            waterfallColHeight: [],
            //整体左偏移量，左右相同
            colLeft: 0,
            //随机占位色卡的颜色
            suijicolour: ['#b4ffe3','#66CDAA','#acc2e6','#d7b0d8','#95abe6','#ffc47b','#b6d288','#f49586','#bcaf7a'],
            
            //词云图
            cloudColors: ['#1f77b4', '#629fc9', '#94bedb',
            '#c9e0ef', "#77C9D4", "#57BC90", "#015249",
            '#409EFF', '#909399', '#F56C6C', '#E6A23C',
            '#67C23A'],
            defaultWords: [
            ],
            currentTagPage:0,
            tagPageSize:100,
            totalTags: 0,

            currentPostPage:-1,
            postPageSize:12,
            totalPosts:0,
            totalPostPages:0,

            selectedTag:null,

            postLoading:true,
            tagLoading:true,
        };
    },
    created()
    {
        // 词云图

        this.selectedTag = this.$route.query.selectedTag;
        
        this.changeTags(0);

        //计算可视区域能够容纳的最大列数,向下取整
        let fullWidth = document.body.clientWidth;
        if (fullWidth > 1500) 
        {
            this.imageWidth = 240;
        } else if (fullWidth < 800)
        {
            this.imageWidth = 170;
        }
        let maxColNum = Math.floor(fullWidth / (this.imageWidth + this.waterfallImgRight));
        console.log('可视宽度：' + fullWidth + ',列数：' + maxColNum);
        if (maxColNum == 0) {
            maxColNum = 1;
        }
        let contentWhith = (this.imageWidth + this.waterfallImgRight) * maxColNum;
        if ((fullWidth - contentWhith) < (this.imageWidth * 0.8)) {
            maxColNum--;
            contentWhith = (this.imageWidth + this.waterfallImgRight) * maxColNum;
        }
        console.log('计算列数：' + maxColNum);
        this.waterfallImgCol = maxColNum;
        //获取左边距
        this.colLeft = (fullWidth - contentWhith) / 2;
        console.log('总宽度：' + fullWidth + ',内容宽度：' + contentWhith + '左偏移：' + this.colLeft);

        //初始化偏移高度数组
        this.waterfallColHeight=[];
        for (let i = 0; i < this.waterfallImgCol; i++) {
            this.waterfallColHeight.push(0);
        }

    },
    mounted() {
        this.currentPostPage=-1;
        this.getMoreData();
        this.backToTop();
    },
    methods: {
        setPostListByDefault()
        {
            this.selectedTag=null;
            this.currentPostPage=-1;
            this.getMoreData();
        },
        setPostListByTag(tag)
        {
            this.selectedTag=tag;
            this.currentPostPage=-1;
            this.getMoreData();

        },
        search() {
            //点击查询重置页数和瀑布流每列高度
            this.currentPage = 1;
            for (let i = 0; i < this.waterfallColHeight.length; i++) {
                this.waterfallColHeight[i] = 0;
            }
            this.waterfallList = [];
            this.getMoreData();
        },
        AppendData(posts)
        {
            let more=[]

            console.log(posts);
            posts.forEach(post=>{
                // 高度随机为100-360
                let height = 100 + Math.floor(Math.random()*7)*40
                more.push({
                    width: 300,
                    height: height,
                    imgHeight:height,
                    id: post.post.postId,
                    labels: post.tags,
                    postId: post.post.postId,
                    postTheme: post.post.postTheme,
                    postContent: post.post.postContent,
                    replyCount: post.post.replyCount,
                    likeCount:post.post.likeCount,
                    userAvatar: post.author.customerAvatarLink,
                    postPhotos: post.images,
                    postTime: post.post.postTime,
                });
            });
            this.imgPreloading(more);

        },
        getMoreData() {
           
            if(!this.selectedTag)
            {
                if(this.currentPostPage+1<=this.totalPostPages)
                {
                    this.postLoading=true;
                    this.getPostListByDefault(this.currentPostPage+1);
                }
                else{
                    this.$message({
                        message: "暂无更多帖子",
                        type: 'warning'
                    });
                    this.postLoading=false;
                }
            }
            else
            {
                if(this.currentPostPage+1<=this.totalPostPages)
                {
                    this.postLoading=true;
                    this.getPostListByTag(this.selectedTag,this.currentPostPage+1);
                }
                else{
                    this.$message({
                        message: "暂无更多帖子",
                        type: 'warning'
                    });
                    this.postLoading=false;
                }
            }
        },

        //图片预加载
        imgPreloading(moreList) {
            //此处应有按照标签筛选帖子
            let listLen = this.waterfallList.length;
            for (let i = 0; i < moreList.length; i++) {

                let aImg = new Image();

                //图片渲染列表，先把高宽和占位颜色赋值直接push到waterfallList，图片的实际url等图片加载上了在赋值
                let imgData = {};
                imgData.height = this.imageWidth / moreList[i].width * moreList[i].height;
                
                imgData.id = moreList[i].id;
                //获取随机占位背景色
                imgData.colour=this.suijicolour[i%9];


                imgData.width=this.imageWidth;
                imgData.height=moreList[i].imgHeight;
                imgData=this.rankImg(imgData);
                imgData.labels = moreList[i].labels
                imgData.postId = moreList[i].postId
                imgData.postTheme = moreList[i].postTheme
                imgData.postContent = moreList[i].postContent
                imgData.replyCount = moreList[i].replyCount
                imgData.likeCount = moreList[i].likeCount
                imgData.userAvatar = moreList[i].userAvatar
                imgData.postPhotos = moreList[i].postPhotos
                imgData.postTime = moreList[i].postTime
                imgData.imgHeight = moreList[i].imgHeight
                
                this.waterfallList.push(imgData);

            }
        },
        //瀑布流布局核心，计算高度和左偏移
        rankImg(imgData) {
            //找出当前最短列的索引
            let minIndex = this.waterfallColHeight.findIndex((value)=>value===Math.min.apply(null, this.waterfallColHeight));

            // console.log("minindex",minIndex);
            //获取最短列底部高度，既下一张图片的顶部高度
            imgData.top = this.waterfallColHeight[minIndex];
            //计算左侧偏移，最短列索引*（右边距+列宽度）
            imgData.left = minIndex * (this.waterfallImgRight + this.imageWidth) + this.colLeft;
            //改变当前列高度
            this.waterfallColHeight[minIndex] += 
            imgData.height +this.cardHeight+this.waterfallImgBottom;
            return imgData;
        },
        //打开图片详情
        openDialog(imgID)
        {
            console.log("跳转到帖子",imgID)

            this.$router.push({path:"/DetailPost",query:{postId:imgID}});

        },
        wordClickHandler(name) {
            
            this.setPostListByTag(name);
        },
        backToTop(){
            window.scrollTo({
                top:0,
                behavior:'smooth'
            });
        },
        changeTags(currentPage)
        {
            this.tagLoading=true;
            if(currentPage>0){
                currentPage-=1;
            }
            let that=this;
            getDefaultTagList(currentPage,that.tagPageSize).then((response) => {
                
                let tags=response.data.tagList.content;

                that.totalTags=response.data.tagList.totalElements;

                
                //console.log(tags)
                let words=[]
                tags.forEach(tag=>{
                    words.push(
                            {
                                "标签": tag.tag,
                                "热度": tag.hotness
                            }
                    );
                })
                
                that.defaultWords=words;
                this.tagLoading=false;
            })
            .catch((error) => {
                this.$message({
                message: error,
                type: "warning",
                });
            });
        },
        getPostListByTag(tag,currentPage)
        {
            let that=this;
            if(currentPage===0)
            {
                that.waterfallColHeight=[];
                for (let i = 0; i < this.waterfallImgCol; i++) {
                    this.waterfallColHeight.push(0);
                }
                that.waterfallList=[];
            }

            getTagSelectedPostList(tag,currentPage,that.postPageSize).then((response) => {
                
                let posts=response.data.postInfo.content;

                that.totalPosts=response.data.postInfo.totalElements;

                that.totalPostPages=response.data.postInfo.totalPages;

                that.currentPostPage=currentPage;
                
                that.AppendData(posts);
                this.postLoading=false;

            })
            .catch((error) => {
                this.$message({
                message: error,
                type: "warning",
                });
            });
        },
        getPostListByDefault(currentPage)
        {
            let that=this;
            if(currentPage===0)
            {
                that.waterfallColHeight=[];
                for (let i = 0; i < this.waterfallImgCol; i++) {
                    this.waterfallColHeight.push(0);
                }
                that.waterfallList=[];
            }
            console.log("sending default post list")
            getDefaultPostList(currentPage,that.postPageSize).then((response) => {
                
                console.log("send default post list success")
                let posts=response.data.postInfo.content;

                that.totalPosts=response.data.postInfo.totalElements;

                that.totalPostPages=response.data.postInfo.totalPages;

                that.currentPostPage=currentPage;
                
                that.AppendData(posts);
                this.postLoading=false;

            })
            .catch((error) => {
                this.$message({
                message: error,
                type: "warning",
                });
            });
        }
    },
    computed: {

    }
};

</script>
