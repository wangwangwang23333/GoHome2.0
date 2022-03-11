<template>
    <div
    class="basic-info-card"
    @mouseenter="changeBasicCard($event)"
    @mouseleave="rechangeBasicCard($event)">
      <!--头像部分-->
      <el-image
          class="user-avatar"
          :src="user_img"
          fit="cover">
      </el-image>
      <!--用户昵称-->
      <p class="user-name">{{ userNickName }}</p>
      <!--修改头像-->
      <el-popover transition="fade-in-linear" placement="right" width="400" trigger="click">
        <h4 style="vertical-align: text-top;">个人资料>个人头像</h4>
        <el-card style="border-radius: 10px;border-width: 2px;border-color: #7b7b7b">
          <el-row>
            <el-col :span="12">
              <div
                  class="grid-content bg-purple">
                <el-image
                    class="user-avatar"
                    :src="user_img"
                    fit="cover">
                  <div slot="error" class="image-slot">
                    <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/头像 (3).png"></el-image>
                  </div>
                </el-image>
              </div>
            </el-col>
            <el-col
                :span="12">
              <div
                  class="grid-content bg-purple-light">
                <p style="font-family: 'PingFang SC';font-size: 1em">
                  <p>最好提供显示您正脸的个人头像，可以让房东和房客对您有个大致印象。也可以根据您的喜好随意更改头像，但我们建议上传您的真人头像.</p>
                  <el-upload
                      action=''
                      :on-change="getFile"
                      :limit="1"
                      list-type="picture"
                      :auto-upload=false
                      style="margin-top: 10%"
                  >
                    <el-button
                        class="normal-button"
                        size="small"
                        type="primary">
                      选择图片上传
                    </el-button>
                  </el-upload>
                  <el-button
                      class="normal-button"
                      type="primary"
                      style="margin-top: 10%"
                      v-show="change_img_show"
                      @click="changeImg">
                      提交修改
                  </el-button>
                </p>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-button
            slot="reference"
            type="text"
            style="color: rgba(51,51,51,0.46) ;font-size: small;font-weight: lighter"
            >
          <u>更改头像</u>
          </el-button>
      </el-popover>
      <br>
      <!--使用弹性布局展示以下的个人基本信息-->
      <!--评价数-->
      <div class="info-box"
          style="  margin-top: 10%;">
        <el-image
          src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E8%AF%84%E4%BB%B7.png"
          class="image-icon">
        </el-image>
        <h class="person-info-text">{{reviewNum}}条评价</h>
      </div>
      <!--等级-->
        <div class="info-box">
          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E4%BC%9A%E5%91%98%E7%AD%89%E7%BA%A7.png"
              class="image-icon">
          </el-image>
          <h class="person-info-text">{{UserGroupLevel}}级</h>
        </div>
      <el-divider class="el-divider--horizontal">
      </el-divider>
      <!--身份认证-->
      <div class="info-box"
           style="  margin-top: 2%;">
        <img
            :src = TagimgList[AuthenticationTag]
            class="small-icon">
        <h class="person-info-text">身份认证</h>
      </div>
      <!--电子邮箱-->
      <div class="info-box"
           style="  margin-top: 2%;">
        <img
            :src = TagimgList[EmailTag]
            class="small-icon">
        <h class="person-info-text">电子邮箱</h>
      </div>
      <!--手机号码-->
      <div class="info-box"
           style="  margin-top: 2%;">
        <img
            :src = TagimgList[AuthenticationTag]
            class="small-icon">
        <h class="person-info-text">手机号码</h>
      </div>
      <el-divider class="el-divider--horizontal">
      </el-divider>
      <!--用户积分-->
      <div class="info-box">
        <el-image
            src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%A7%AF%E5%88%86.png"
            class="image-icon">
        </el-image>
        <h class="person-info-text">用户积分: {{Score}}分</h>
      </div>
    </div>
</template>

<script>
import {uploadAvatar} from "@/api/customerInfo";
import {mapMutations} from "vuex";

export default {
  name: "CustomerBasicInfo",
  props:{
    user_img:String,
    userNickName: String,
    reviewNum: Number,
    UserGroupLevel: String,
    TagimgList: Array,
    AuthenticationTag: Number,
    EmailTag: Number,
    PhoneTag: Number,
    Score: Number,
  },
  components:{

  },
  data(){
    return{
      new_img: "",//用户更改的新头像
      change_img_show: false,
    }
  },
  methods:{
    changeBasicCard(e){
      e.currentTarget.className = "basic-info-card-active"
    },
    rechangeBasicCard(e){
      e.currentTarget.className = "basic-info-card"
    },
    changeImg: function () {
      this.user_img = this.new_img;
      let param = {
        base64Data: this.new_img.toString()
      };
      uploadAvatar(param).then(response => {

        // 获取用户个人头像
        let userId=localStorage.getItem("userId")

        //修改个人头像
        changeAvatar("http://tongjigohome.oss-cn-shanghai.aliyuncs.com/avatar/"+userId+".png")


        //刷新
        this.$router.go(0);
      })
    },
    getFile(file) {
      const isJPG = file.raw.type === 'image/jpeg';
      const isPNG = file.raw.type === 'image/png';
      const isLt5M = file.raw.size / 1024 / 2024 < 5;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片大小不能超过5MB！');
      }
      if ((isJPG || isPNG) && isLt5M) {
        this.getBase64(file.raw).then(res => {
        });
      }
    },
    getBase64(file) {
      let sel = this;//promise作用域问题，在promise内部无法获取到this
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let imgResult = "";
        reader.onload = function () {
          imgResult = reader.result;
          sel.new_img = imgResult;
          sel.change_img_show = true;
          this.new_img = imgResult;//新的头像路径存储
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        }
      });
    },
    ...mapMutations(['changeLogin']),
  }
}
</script>

<style scoped>
.basic-info-card{
  width: 85%;
  height: 90%;
  margin: auto;
  background-color: rgba(253,251,251,0.81);
  border-radius: 2%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px !important;
  -webkit-transition: all 400ms ease-in;
}

.basic-info-card-active{
  width: 85%;
  height: 90%;
  margin: auto;
  background-color: rgba(253,251,251,0.81);
  border-radius: 2%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  -webkit-transition: all 400ms ease-in;
}

.user-avatar{
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 10%;
  -webkit-transition: all 400ms ease-in;
}

.user-avatar:hover {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 10%;
  -webkit-transform: rotate(360deg);
}

.user-name{
  font-size: 1.5em;
  font-weight: normal;
  margin-bottom: -5%;
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

.info-box{
  display: flex;
  align-items: center; /*盒子子项对齐方式为纵向居中对齐*/
  justify-content: flex-start;
  margin-top: 5%;
}

.image-icon{
  width: 35px;
  height: 35px;
  margin-left: 10%;
  -webkit-transition: all 400ms ease-in;
}

.small-icon{
  width: 35px;
  height: 35px;
  margin-left: 5%;
}

.image-icon:hover{
  -webkit-transform: rotate(360deg);
}

.person-info-text{
  font-size: 1.3em;
  font-weight: normal;
  margin-left: 5%;
}

.el-divider--horizontal {
  margin-left: 5%;
  width: 90%;
}
</style>