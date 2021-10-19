<template>
    <div>
        <el-container id="index">
            <el-header>
                <p>这里应该是搜索框和标签筛选</p>
            </el-header>
            <!-- 主体瀑布流区域，无限滚动 -->
            <el-main  id="waterfall-main">
                <div class="v-waterfall-content" v-infinite-scroll="getMoreData" infinite-scroll-disabled="disabled"
                    infinite-scroll-distance="10" style="overflow:auto" >
                    <div v-for="img in waterfallList" :key="img.id" class="v-waterfall-item" :style="{top:img.top.toString()+'px',left:img.left.toString()+'px',width:imageWidth.toString()+'px',height:img.height.toString()}" >
                        <!-- 图片卡片 -->
                        <el-card shadow="hover" :body-style="{'padding':'0px','border-radius':'10px'}" @click.native="openDialog(img.id)" >
                        <!-- 图片懒加载 -->
                            <el-image :src='img.src' class='image' :key='img.src' lazy>
                                <!-- 加载前占位 -->
                                <div slot="placeholder" class="image-slot">
                                    <div :style="{height:img.height+'px',width:imageWidth + 'px',backgroundColor:img.colour}"></div>
                                </div>
                                <!-- 加载失败占位 -->
                                <div slot="error" class="image-slot">
                                    <div :style="{height:img.height+'px',width:imageWidth + 'px',backgroundColor:img.colour}"></div>
                                </div>
                            </el-image>

                            <el-card class="box-card">
                                <p>{{img.text}}</p>
                            </el-card>
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>



</template>

<script>

export default {
    name: 'v-waterfall',
    data() {
        return {
            //存放计算好的数据
            waterfallList: [],
            //每一列的宽度
            imageWidth: 200,
            //多少列
            waterfallImgCol: 5,
            //右边距
            waterfallImgRight: 20,
            //下边距
            waterfallImgBottom: 10,

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
        };
    },
    created()
    {
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
            //表单数据
            let param = {
                pageNo: this.currentPage++,
                pageSize: 10,
                orderBy: 'updateTime desc'
            };

            //此处应有查广场默认图片的api
            // let search = this.$store.state.searchText;
            // console.log('查询参数：' + search);
            // if (search.trim().length > 0) {
            //     param.title = search.trim();
            // }

            //console.log('查询参数：' + JSON.stringify(param));

            if(param.pageNo>10){
                this.noMore=true;
                return;
            }
            // this.$axios.get('/api/pic/query', {
            //     params: param
            // }).then(response => {
            //     // console.log('获取数据', response.data);
            //     if (response.data.success) {
            //     if (response.data.data.rows.length == 0) {
            //         this.noMore = true;
            //     } else {
            //         this.imgPreloading(response.data.data.rows);
            //         this.noMore = false;
            //     }
            //     } else {
            //     this.$message.error(response.data.msg);
            //     this.noMore = true;
            //     }
            // }, response => {
            //     this.$message.error('错误');
            //     this.noMore = true;
            // });


            let pic=[]

            for(let i=0;i<10;i++)
            {
                pic.push({
                    width: 200,
                    height: 400,
                    id: i,
                    imgUrl:require("@/assets/postimg/"+String(i)+".jpg"),
                    text: "这是第"+i.toString()+"张图片"
                }
                );
            }
            this.noMore=true;
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

                aImg.onload = (e) => {
                    aImg.src = moreList[i].imgUrl;
                };

                imgData=this.rankImg(imgData);
                imgData.src = moreList[i].imgUrl;
                imgData.text=moreList[i].text;

                this.waterfallList.push(imgData);

                console.log("pic top left",imgData.id,imgData.top,imgData.left);
            }
        },
        //瀑布流布局核心，计算高度和左偏移
        rankImg(imgData) {

            //找出当前最短列的索引
            let minIndex = this.waterfallColHeight.findIndex((value)=>value===Math.min.apply(null, this.waterfallColHeight));

            //console.log("minindex",minIndex);
            //获取最短列底部高度，既下一张图片的顶部高度
            imgData.top = this.waterfallColHeight[minIndex];
            //计算左侧偏移，最短列索引*（右边距+列宽度）
            imgData.left = minIndex * (this.waterfallImgRight + this.imageWidth) + this.colLeft;
            //改变当前列高度

            this.waterfallColHeight[minIndex] += imgData.height + this.waterfallImgBottom;

            return imgData;
        },
        //打开图片详情
        openDialog(imgID)
        {
            console.log("click id left top",this.waterfallList[imgID].id,this.waterfallList[imgID].left,this.waterfallList[imgID].top)
        }
    },
    computed: {
        disabled() {
            return this.noMore;
        }
    }
};



</script>
