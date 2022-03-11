<template>
<div id="app">
  <!--个人详细信息部分-->
    <!--用户昵称-->
    <div class="info-box">
      <h1 class="customer-name">
        大家好，我是 {{ UserNickName }}
      </h1>
    </div>
    <!--注册时间-->
    <div class="info-box">
      <h class="small-grey-font">
        注册时间：{{RegisterDate}}
      </h>
    </div>
    <!--修改资料弹出框-->
    <div class="info-box">
      <a @click="dialog=true"
          style="margin-left: 2%;margin-top: 2%;cursor: pointer">
        <svg class="icon-arrow before">
          <use xlink:href="#arrow"></use>
        </svg>
        <span class="label">修改个人资料</span>
        <svg class="icon-arrow after">
          <use xlink:href="#arrow"></use>
        </svg>
      </a>

      <a @click="gotoUpgrade"
         v-if="!isHost"
          style="margin-left: 2%;margin-top: 2%;cursor: pointer">
        <svg class="icon-arrow before">
          <use xlink:href="#arrow"></use>
        </svg>
        <span class="label">升级成为房东</span>
        <svg class="icon-arrow after">
          <use xlink:href="#arrow"></use>
        </svg>
      </a>

      <a href="javascript:;"
          v-if="isHost"
          style="margin-left: 2%;margin-top: 2%"
         @click="gotoHost">
        <svg class="icon-arrow before">
          <use xlink:href="#arrow"></use>
        </svg>
        <span class="label">去房东界面</span>
        <svg class="icon-arrow after">
          <use xlink:href="#arrow"></use>
        </svg>
      </a>
      <svg style="display: none;">
        <defs>
          <symbol id="arrow" viewBox="0 0 35 15">
            <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z "/>
          </symbol>
        </defs>
      </svg>
    </div>

    <!--定义编辑个人资料的表单-->
    <el-drawer
        title="个人资料"
        :visible.sync="dialog"
        :direction="direction"
        ref="drawer"
        :before-close="handleClose">
    <!--表单和按钮组之间采用上下弹性布局，上下放置-->
      <div class="up-down-flexbox">
        <!--抽屉内部定义表单-->
          <el-form
              ref="form"
              :rules="rules"
              :model="form"
              label-width="100px"
          >
            <div class="info-box">
              <el-image
                  class="small-icon"
                  src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/任务中心-首次修改昵称.png">
              </el-image>
              <h class="form-font">
                昵称
              </h>
              <el-form-item
                  label="新的昵称"
                  prop="name"
                  style="margin-bottom: 0">
                <el-input
                    v-model="form.name"></el-input>
              </el-form-item>
            </div>
            <el-divider class="el-divider--horizontal">
            </el-divider>
            <!--修改性别-->
            <div class="info-box">
              <el-image
                  class="small-icon"
                  src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/性别.png">
              </el-image>
              <h class="form-font">
                性别
              </h>
              <el-form-item
                  label="性别"
                  prop="sex"
                  style="margin-bottom: 0">
                <el-select v-model="form.sex" placeholder="性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-divider class="el-divider--horizontal">
            </el-divider>
            <!--修改生日-->
            <div class="info-box">
              <el-image
                  class="small-icon"
                  src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704134846108.png">
              </el-image>
              <h class="form-font">
                生日
              </h>
              <el-form-item
                  label="生日"
                  required
                  style="margin-bottom: 0">
                <el-date-picker
                    v-model="form.BirthDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        <!--取消修改按钮-->
          <div class="info-box"
                style="margin-left: 5%;margin-bottom: 5%">
            <el-button
                @click="cancelForm"
                class="normal-button"
                type="primary">
              取消修改
            </el-button>

            <el-button
                type="primary"
                class="normal-button"
                @click="$refs.drawer.closeDrawer()"
                :loading="loading">
              {{ loading ? '更新中...' : '保存' }}
            </el-button>
          </div>
      </div>
    </el-drawer>

    <!--个人信息模块-->
    <div class="info-card">
      <div class="up-down-flexbox"
            style="justify-content: space-around;width: 40%">
        <div class="info-box">
          <el-image
              class="small-icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7%20(1).png">
          </el-image>
          <h class="card-font">
            <b>用户名</b>:{{ UserNickName }}
          </h>
        </div>
        <div class="info-box">
          <el-image
              class="small-icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%9F%E6%97%A5.png">
          </el-image>
          <h class="card-font">
            <b>生日</b>：{{ userBirthDate }}
          </h>
        </div>
        <!--          总评价数-->
        <div class="info-box">
          <el-image
              class="small-icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E5%BE%85%E8%AF%84%E4%BB%B7.png">
          </el-image>
          <h class="card-font">
            <b>共收获{{ commentNum }}条评价</b>
          </h>
        </div>
      </div>

      <div class="up-down-flexbox"
           style="justify-content: space-around;width:40%">
        <!--性别-->
        <div class="info-box">
          <el-image
              class="small-icon"
              :src="sexImgList[userSex]">
          </el-image>
          <h class="card-font">
            <b>性别</b>：{{ userSex }}
          </h>
        </div>
        <div class="info-box"
             style="width: 100%">
          <el-image
              class="small-icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E5%AE%9E%E6%99%AF%E9%85%B7-%E7%AC%91%E8%84%B8.png">
          </el-image>
          <h class="card-font">
            <b>当前心情</b>:{{ moodSentenceList[mood] }}
          </h>
          <el-image
              class="small-icon"
              :src="moodImgList[mood]">
          </el-image>
        </div>
        <div class="info-box"
             style="width: 100%">
          <el-dropdown class="el-dropdown-link"
                       @command="handleCommand"
                       size="large"
                       placement="top"
                       trigger="click"
                       :tabindex="moodIndex"
          >
            <el-button
                class="normal-button"
                style="font-size: 1.2em"
                type="primary">
              修改我的心情
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">
                {{ moodSentenceList[0] }}
              </el-dropdown-item>
              <el-dropdown-item command="1">
                {{ moodSentenceList[1] }}
              </el-dropdown-item>
              <el-dropdown-item command="2">
                {{ moodSentenceList[2] }}
              </el-dropdown-item>
              <el-dropdown-item command="3">
                {{ moodSentenceList[3] }}
              </el-dropdown-item>
              <el-dropdown-item command="4">
                {{ moodSentenceList[4] }}
              </el-dropdown-item>
              <el-dropdown-item command="5">
                {{ moodSentenceList[5] }}
              </el-dropdown-item>
              <el-dropdown-item command="6">
                {{ moodSentenceList[6] }}
              </el-dropdown-item>
              <el-dropdown-item command="7">
                {{ moodSentenceList[7] }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
    </div>
    <div class="info-box"
          style="margin-top: 10%">
      <el-image
          class="small-icon"
          src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E5%BE%85%E8%AF%84%E4%BB%B7%20(1).png">
      </el-image>
      <h class="title-font"
          style="margin-left: 2%">
        房东评价 ：{{ this.commentNum }}条
      </h>
    </div>
    <!--房东评价卡片-->
    <div class="up-down-flexbox"
          style="height:500px;justify-content: flex-start"
         v-if="commentNum!==0">
      <div v-for="i in commentNum<=3?commentNum:((this.commentNum-this.pageSize*(this.currentPage-1))>3?3:(this.commentNum-this.pageSize*(this.currentPage-1)))"
               class="comment-card">
      <div class="up-down-flexbox"
            style="justify-content: flex-start">
        <div class="info-box"
              style="margin-top: 2%;">
          <el-image
              :src=commentList[(currentPage-1)*pageSize+i-1].hostAvatar
                class="comment-avatar"
                style="margin-left: 2%">
          </el-image>
          <div class="up-down-flexbox"
                style="width: 30%;
                      justify-content: flex-start;
                      align-items: flex-start;
                      margin-left:2% ">
            <h class="name-font">
              {{ commentList[(currentPage - 1) * pageSize + i - 1].hostNickName }}
            </h>
            <div class="info-box"
                  style="width: 100%;">
              <h class="small-grey-font">
                注册时间:
              </h>
              <h class="small-grey-font">
                {{ commentList[(currentPage - 1) * pageSize + i - 1].hostRegisterDate.substring(0, 10) }}
              </h>
            </div>
          </div>
          <el-rate
                   v-model= "commentList[(currentPage-1)*pageSize+i-1].customerStars"
                   disabled
                   show-score
                   text-color="#ff9900"
                   score-template="{value}"
                    >
          </el-rate>
        </div>
        <h class="content-font">
          {{ commentList[(currentPage - 1) * pageSize + i - 1].comment }}
        </h>
      </div>
    </div>

    </div>
    <!--评价分页-->

    <!--无评价时的占位符-->
    <el-image v-if="commentNum===0"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Light_转账.png"
              class="pagination-image"
              fit="cover">
    </el-image>
    <h class="small-grey-font"
        v-if="commentNum===0" >
      该用户暂无评价哦...
    </h>
  <div class="newPagination">
    <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :pager-count="pageCount"
        :total="commentNum"
        @current-change="current_change"
        background
        style="margin-top: 2%;margin-right: 15%;">
    </el-pagination>
  </div>
    <el-divider></el-divider>
      <!--我的帖子部分-->
    <div class="info-box">
      <el-image
          class="small-icon"
          src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/%E6%88%91%E7%9A%84%E5%B8%96%E5%AD%90.png">
      </el-image>
      <h class="title-font"
         style="margin-left: 1%">
        我的帖子 ：{{ postNumber }}个
      </h>
    </div>
    <div class="up-down-flexbox"
       style="justify-content: flex-start;align-items: flex-start">

        <!--帖子卡片-->
        <div class="comment-card"
             v-for="(item,index) in posts"
             v-if="postNumber!==0" :key="index"
             style="width: 85%;height: 200px;min-width: 250px">
          <div class="info-box"
                style="width: 100%;height: 100%">
            <!--帖子图片走马灯-->
            <el-carousel trigger="hover"
                         height="200px"
                         indicator-position="none"
                         style="width: 40%;border-radius: 10px  0 0 10px">
              <el-carousel-item v-for="(postPhoto,index2) in item.images" :key="index2">
                <el-image fit="cover"
                          class="post-image"
                          style="width:100%;height: 100%"
                          :src="postPhoto">
                </el-image>
              </el-carousel-item>
            </el-carousel>
            <div class="up-down-flexbox"
                  style="width: 60%;justify-content: flex-start">
              <el-tooltip class="item" effect="dark" content="查看帖子" placement="top-start">
                <div class="bigFontSize"
                     style="cursor:pointer"
                     @click="gotoPost(item.post.postId)">
                  {{ item.post.postTheme }}
                </div>
              </el-tooltip>
              <h class="content-font"
                  style=" overflow: hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-line-clamp: 2;
                          line-clamp: 2;
                          -webkit-box-orient: vertical;">
                {{ item.post.postContent }}
              </h>
              <div class="info-box">
                <el-tag type="primary"
                        v-for="(item2,index2) in item.tags" :key="index2" effect="dark"
                        :color="labelColor[index2]" v-if="item.tags.length>0"
                        style="margin-top: 3%;margin-left: 3%">
                  {{ item2 }}
                </el-tag>
                <el-tag type="primary"
                        effect="dark"
                        :color="labelColor[0]" v-if="item.tags.length===0">
                  暂无标签
                </el-tag>
              </div>
              <!--点赞信息-->
              <div class="info-box"
                    style="margin-left: 5%;margin-top: 7%">
                <i class="el-icon-chat-line-square"></i>
                {{ item.post.replyCount }}
                <i class="el-icon-thumb"
                    style="margin-left: 5%"></i>
                {{ item.post.likeCount }}
              </div>
              <div class="info-box">
                <i class="el-icon-time"
                   style="margin-left: 5%;margin-right: 2%"></i>
                {{ item.post.postTime.replace('T', ' ').substring(0, 16) }}
              </div>
            </div>
          </div>
        </div>
    </div>
    <!--无帖子时的占位符-->
    <el-image v-if="postNumber===0"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Light_转账.png"
              class="pagination-image"
              fit="cover">
    </el-image>
    <h class="small-grey-font"
       v-if="postNumber===0" >
      该用户暂无发帖记录...
    </h>
    <div class="newPagination">
      <el-pagination
          v-if="postNumber>=4"
          layout="prev, pager, next"
          :page-size="3"
          :total="postNumber"
          @current-change="postPageChange"
          background
          style="margin-top: 2%;margin-right: 15%;">
      </el-pagination>
    </div>

</div>
</template>

<script>
import {getPersonalPostList} from "@/api/post";

export default {
  name: "CustomerDetailedInfo",
  props:{
    UserNickName: String,
    RegisterDate: String,
    userBirthDate: String,
    commentNum: Number,
    userSex: String,
    mood: Number,
    commentList: Array
  },
  data(){
    return{
      dialog: false,
      direction: 'rtl',
      moodIndex: 0,
      pageSize: 3,//默认每次显示三条
      currentPage: 1,//现在展示的页数
      currentPostPage: 1,
      postPageCount: 5,
      pageCount: 5,
      postNumber: 3,
      posts: [{
        post:{
          postId:12345,
          postTheme:"帖子主题",
          postContent:"帖子的详细内容在这里展示...",
          replyCount:10,
          likeCount:1,
          postTime:"2022.2.13"
        },
        images:[
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%9A%82%E6%97%A0%E8%B7%9F%E5%B8%96.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%9A%82%E6%97%A0%E8%B7%9F%E5%B8%96%20(1).png"
        ],
        tags:["标签1","标签2","标签3","标签4"]
      },{
        post:{
          postId:12345,
          postTheme:"帖子主题",
          postContent:"帖子的详细内容在这里展示...",
          replyCount:10,
          likeCount:1,
          postTime:"2022.2.13"
        },
        images:[
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%9A%82%E6%97%A0%E8%B7%9F%E5%B8%96.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%9A%82%E6%97%A0%E8%B7%9F%E5%B8%96%20(1).png"
        ],
        tags:["标签1","标签2","标签3","标签4"]
      },{
        post:{
          postId:12345,
          postTheme:"帖子主题",
          postContent:"帖子的详细内容在这里展示...",
          replyCount:10,
          likeCount:1,
          postTime:"2022.2.13"
        },
        images:[
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%9A%82%E6%97%A0%E8%B7%9F%E5%B8%96.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%9A%82%E6%97%A0%E8%B7%9F%E5%B8%96%20(1).png"
        ],
        tags:["标签1","标签2","标签3","标签4"]
      }],
      labelColor: ["#77C9D4", "#57BC90", "#015249","#145d53"],
      rules: {//表单验证
        name: [
          {required: true, message: '请输入新的昵称', trigger: 'blur'},
          {min: 1, max: 15, message: "长度在1到15个字符", trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '选择性别', trigger: 'change'}
        ],
        BirthDate: [
          {type: 'BirthDate', required: true, message: '请选择生日', trigger: 'chaneg'}
        ]
      },
      isHost: false,//是否为房东
      form: {//表单
        name: '',
        sex: '',//性别
        BirthDate: '',
      },
      loading: false,
      sexImgList: {
        "未知": "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E9%9A%8F%E6%9C%BA%E7%94%A8%E6%88%B7.png",
        "男": "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/男.png",
        "女": "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/女.png"
      },//性别图像数组
      moodImgList: [
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/QQ图片20210713180613.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/11.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/22.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/33.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/44.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/55.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/66.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/77.png",
      ],//心情图像数组
      moodSentenceList: ["平淡", "开心", "激动", "惊讶", "哭泣", "犯愁", "自闭", "恋爱中"],
    }
  },
  methods:{
    handleClose(done) {
      if (this.loading) {
        return;
      }

      if (this.form.name.length > 10) {
        this.$message.error('啊哦！您输入的昵称长度超过了10个字符');
        return;
      }
      if (this.form.name.length < 1) {
        this.$message.error('啊哦！您输入的昵称是空的');
        return;
      }
      this.$confirm('您确定要做这样的修改吗？', {
        dangerouslyUseHTMLString: true,
        confirmButtonClass: 'normal-button',
        confirmButtonText: '确定',

      })
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              setTimeout(() => {
                this.loading = false;
                this.resaveInfo();
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    handleCommand(command) {
      let newCommand = command;
      this.$emit("UpdateMood", newCommand);
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    gotoHost() {
      this.$router.push({
        path: "/hostInfoPage"
      })
    },
    gotoPost(postId){
      this.$router.push({
        path: "/DetailPost",
        query: { postId: postId } }
      );
    },
    postPageChange(currentPage) {
      this.currentPostPage = currentPage
      getPersonalPostList(this.userId, currentPage - 1, 3).then(response => {
        this.postNumber = response.data.postNum
        this.posts = response.data.postInfo.content
      })
          .catch((error) => {
            this.$message({
              message: "网络异常，请稍后重试",
              type: 'warning'
            });

            return;
          })
    },
    gotoUpgrade() {
      this.$router.push({
        path: "/hostRegister"
      })
    },
    onsubmit() {
      console.log('submit!')
    },
    resaveInfo: function () {
      console.log("更新的日期", this.form.BirthDate);
      let Name = this.form.name;
      if (this.form.BirthDate === '' && this.form.sex === '') {
        this.$emit('UpdateName', Name);
      } else if (this.form.sex === '' && this.form.BirthDate != '') {
        let NewBirth = this.form.BirthDate;
        this.$emit('UpdateNameBirthDay', Name, NewBirth);
      } else if (this.form.sex != '' && this.form.BirthDate === '') {
        let NewSex = this.form.sex;
        this.$emit('UpdateNameSex', Name, NewSex);
      } else {
        let NewBirth = this.form.BirthDate;
        let NewSex = this.form.sex;
        let NewName = this.form.name;
        this.$emit('UpdateAll', NewName, NewSex, NewBirth);
      }


    }
  },
  created() {
    let userPermissions=localStorage.getItem("userPermissions").split(",")
    for(let i=0;i<userPermissions.length;++i){
      if(userPermissions[i]=="upgrade"){
        this.canUpgrade = true;
        this.isHost = false;
        break;
      }
      this.isHost = true;
    }

    // 获取指定用户的发帖记录
    this.userId = localStorage.getItem('userId')
    getPersonalPostList(this.userId, 0, 3).then(response => {
      this.postNumber = response.data.postNum
      this.posts = response.data.postInfo.content

    })
        .catch((error) => {
          this.$message({
            message: "网络异常，请稍后重试",
            type: 'warning'
          });
          return;
        })
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");


.customer-name{
  font-size: 1.8em;
  font-weight: normal;
  margin-left: 2%;
  margin-top: 10%;
}

.small-grey-font{
  font-size: 1em;
  font-weight: lighter;
  margin-left: 2%;
  color:grey;
}

.content-font{
  font-size: 1em;
  text-align: left;
  margin-left: 5%;
  margin-top: 2%;
}

/*表单字体*/
.form-font{
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 2%;
}
.name-font{
  font-size: 1.3em;
  font-weight: normal;
  margin-left: 2%;
}


/*房东头像*/
.comment-avatar{
  max-width: 60px;
  max-height: 60px;
  border-radius: 30px;
}

/*个人信息卡片字体*/
.card-font{
  font-size: 1.2em;
  font-weight: normal;
  margin-left: 2%;
}

.bigFontSize {
  font-size: 1.2em;
  font-weight: bold;
  animation: fadeInDown;
  animation-duration: 1s;
  color: rgba(0, 0, 0, 0.67);
  margin-left: 5%;
  margin-top: 2%;
  text-align: left;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}

.title-font{
  font-size:1.3em;
  font-weight: normal;
}

.info-box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center; /*盒子子项对齐方式为纵向居中对齐*/
  justify-content: flex-start;
}

.up-down-flexbox{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content:space-between;
  height: 100%;
  width: 100%;

}
.comment-card{
  width: calc(60% + 200px);
  height:150px;
  margin-left: 2%;
  margin-top: 2%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  -webkit-transition: all 200ms ease-in;
  border-radius: 10px;
}

.comment-card:hover{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  -webkit-transition: all 200ms ease-in;
}

.small-icon{
  max-width: 25px;
  max-height: 25px;
  margin-left: 5%;
  -webkit-transition: all 400ms ease-in;
}

.small-icon:hover{
  -webkit-transform: rotate(360deg);
}

.el-divider--horizontal {
  margin-left: 5%;
  width: 90%;
  height: 1px;
}

.normal-button{
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  -webkit-transition: all 400ms ease-in;
  cursor: pointer;
  font-size: 1.3em;
  font-weight: normal;
  border-width: 0;
  color: black;
}

.normal-button:hover{
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  cursor: pointer;
}

/*卡片内部也是弹性布局*/
.info-card{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
  width: calc(40% + 270px);
  margin-left: 2%;
  margin-top: 2%;
  height: 170px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px !important;
  -webkit-transition: all 400ms ease-in;
  border-radius: 10px;
}

.info-card:hover{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  -webkit-transition: all 400ms ease-in;
}

.pagination-image{
  width: 96%;
  border-radius: 10px;
  max-height: 500px;
  margin-top: 2%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  -webkit-transition: all 200ms ease-in;
}

.post-image{
  border-radius: 10px;
}


.newPagination >>> .el-pager li {
  background-color: #c4d4dc !important;
  color: white !important;
  border-radius: 8px !important;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px !important;
}

.newPagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #739de5 !important;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}



.el-dropdown-link {
  cursor: pointer;
  color: #4089d3;
}

.el-icon-arrow-down {
  font-size: 12px;
}

a {
  color: #3F3F3F;
  font-size: 1em;
  padding: 14px 25px 12px 60px;
  position: relative;
  text-decoration: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10px;
  -webkit-transition: all 400ms ease-in;
}
a:hover{
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  -webkit-transition: all 400ms ease-in;
}

a .icon-arrow {
  backface-visibility: hidden;
  transform: translateZ(0);
  perspective: 1000;
}

a .label {
  display: inline-block;
  transition: transform .5s cubic-bezier(0.86, 0, 0.07, 1);
}

a .icon-arrow {
  fill: #3F3F3F;
  height: 15px;
  top: 17px;
  transition: transform .5s cubic-bezier(0.86, 0, 0.07, 1), opacity .4s cubic-bezier(0.86, 0, 0.07, 1);
  width: 30px;
}

a .icon-arrow.before {
  left: 15px;
  margin-right: 15px;
  position: absolute;
  transform-origin: left center;
}

a .icon-arrow.after {
  margin-left: 15px;
  opacity: 0;
  position: absolute;
  right: 25px;
  transform: translateX(75%) scaleX(0.1);
  transform-origin: right center;
}

a:hover .label {
  transform: translateX(-52px);
}

a:hover .icon-arrow.before {
  opacity: 0;
  transform: translateX(-75%) scaleX(0.1);
}

a:hover .icon-arrow.after {
  opacity: 1;
  transform: translateX(0) scaleX(1);
}

a:active {
  border-color: #FD6154;
  color: #FD6154;
}

a:active .icon-arrow {
  fill: #FD6154;
}


</style>
