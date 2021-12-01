<template>
    <div>
        <!--此处仍然是词云图-->
        <wordcloud :data="defaultWords" nameKey="标签" valueKey="热度" :color="cloudColors" :showTooltip="true"
            :wordClick="wordClickHandler" style="width: 90vw;">
        </wordcloud>
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
                <div class="v-waterfall-content" 
                v-infinite-scroll="getMoreData" 
                infinite-scroll-disabled="disabled"
                    infinite-scroll-distance="10" style="overflow:auto" >
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
            imgList: [],
            //整体左偏移量，左右相同
            colLeft: 0,
            currentPage: 1,

            //是否还有数据
            noMore: false,
            //搜索内容
            searchKey: '',

            //图片详情弹窗可见
            dialogVisible: false,

            
            //随机占位色卡的颜色
            suijicolour: ['#b4ffe3','#66CDAA','#acc2e6','#d7b0d8','#95abe6','#ffc47b','#b6d288','#f49586','#bcaf7a'],
            
            //词云图
            cloudColors: ['#1f77b4', '#629fc9', '#94bedb',
            '#c9e0ef', "#77C9D4", "#57BC90", "#015249",
            '#409EFF', '#909399', '#F56C6C', '#E6A23C',
            '#67C23A'],
            defaultWords: [{
                "标签": "萌宠",
                "热度": 26
                },
                {
                "标签": "生活",
                "热度": 19
                },
                {
                "标签": "美食",
                "热度": 18
                },
                {
                "标签": "电影",
                "热度": 16
                },
                {
                "标签": "交通",
                "热度": 15
                },
                {
                "标签": "民宿",
                "热度": 9
                },
                {
                "标签": "特价",
                "热度": 9
                },
                {
                "标签": "曝光",
                "热度": 9
                },
                {
                "标签": "可行",
                "热度": 6
                }
            ]
            
        };
    },
    created()
    {
        // 词云图
        for(let i=1;i<=100;++i){
            this.defaultWords.push({
                "标签": "萌宠",
                "热度": i
                })
            }

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

        this.getMoreData();
    },
    mounted() {
        
    },
    methods: {
        //搜索，从其他组件传值放到$store中的
        search() {
            //点击查询重置页数和瀑布流每列高度
            this.currentPage = 1;
            for (let i = 0; i < this.waterfallColHeight.length; i++) {
                this.waterfallColHeight[i] = 0;
            }
            this.waterfallList = [];
            this.getMoreData();
        },
        // 获取数据
        getMoreData() {
            console.log("正在继续加载数据")
            //表单数据
            let param = {
                pageNo: this.currentPage++,
                pageSize: 10,
                orderBy: 'updateTime desc'
            };
            console.log("当前页码",param.pageNo)
            if(param.pageNo>10){
                this.noMore=false;
                return;
            }

            let pic=[]

            for(let i=0;i<18;i++)
            {
                // 高度随机为100-360
                let height = 100 + Math.floor(Math.random()*7)*40

                pic.push({
                    width: 300,
                    height: height,
                    imgHeight:height,
                    id: i,
                    imgUrl:require("@/assets/postimg/"+String(i)+".jpg"),
                    text: "这是第"+i.toString()+"张图片",
                    labels: ['生活','娱乐','萌宠','美食'],
                    postId: 1,
                    postTheme:'这家民宿真的绝绝子',
                    postContent:'姐妹们，我今天给大家介绍一个很好的民宿。\
                    这家民宿特别好的一个地方就是你可以在床旁边的窗户就能看到\
                    很多在野外节目才能看到的东西',
                    replyCount: 3,
                    likeCount:2014,
                    userAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7%E7%99%BD%E5%90%8D%E5%8D%95.png',
                    postPhotos: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
                    postTime: '2021-11-19T14:16:09.000+00:00',
                });
            }
            this.noMore=false;
            this.imgPreloading(pic);
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

                aImg.src = moreList[i].imgUrl;

                aImg.onload = (e) => {
                    //console.log("img width height",aImg.width,aImg.height);
                    imgData.width=this.imageWidth;
                    imgData.height=moreList[i].imgHeight;
                    imgData=this.rankImg(imgData);
                    imgData.src = moreList[i].imgUrl;
                    imgData.text=moreList[i].text;

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

                    //console.log("pic top left",imgData.id,imgData.top,imgData.left);
                };
                
       
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
            console.log("click id left top",this.waterfallList[imgID].id,this.waterfallList[imgID].left,this.waterfallList[imgID].top)
        },
        wordClickHandler(name, 热度, vm) {
            console.log('wordClickHandler', name, 热度, vm);
        },
        backToTop(){
            window.scrollTo({
                top:0,
                behavior:'smooth'
            });
        }
    },
    computed: {
        disabled() {
            return this.noMore;
        }
    }
};

// <!-- 图片卡片 -->
// <el-card shadow="hover" :body-style="{'padding':'0px','border-radius':'10px'}" lazy>
//     <!-- 图片懒加载 -->
//         <el-image :src='img.src' class='image' :key='img.src' >
//             <!-- 加载前占位 -->
//             <div slot="placeholder" class="image-slot">
//                 <div :style="{width:imageWidth.toString() + 'px',backgroundColor:img.colour}"></div>
//             </div>
//             <!-- 加载失败占位 -->
//             <div slot="error" class="image-slot">
//                 <div :style="{height:img.height.toString()+'px',width:imageWidth.toString() + 'px',backgroundColor:img.colour}"></div>
//             </div>
//         </el-image>

//         <el-card class="box-card" :body-style="{'padding':'0px','border-radius':'10px'}" :style="{height:cardHeight.toString()+'px'}">
//             <p>{{img.text}}</p>

            
//         </el-card>
//     </el-card>


</script>
