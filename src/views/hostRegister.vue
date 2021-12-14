<!--
    房东注册界面
    by:汪明杰
-->
<template>
  <div
      style="height:646px;"><!--646-->
    <!--装饰汽车
    <el-image
        src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/car.png"
        style="
        position: absolute;
        width: 7%;
        left: 50%;
        bottom: 20%;
        transform:rotate(55deg);
        "
        v-if="curStep==0"
    ></el-image>
    -->

    <!--装饰植物-->
    <el-image
        src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/plant11.png"
        style="
            position: absolute;
            width: 7%;
            left: 1%;
            bottom: 0;
            "
        v-if="curStep==0"
    ></el-image>
    <el-image
        src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/plant14.png"
        style="
            position: absolute;
            width: 5%;
            left: 1%;
            bottom: 0;
            "
        v-if="curStep==1"
    ></el-image>
    <el-image
        src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/plant1.png"
        style="
            position: absolute;
            width: 7%;
            left: 1%;
            bottom: 0;
            "
        v-if="curStep==2"
    ></el-image>
    <el-container
        style="height: 100%;"
    >
      <el-aside
          style="
            width: 36%;
            height: 100%;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            opacity: 0.9;
            "
      >
        <div style="margin-bottom: 10%;width: 75%;margin-left: 12%;margin-top: 10%;">
          <el-divider>
            <strong style="font-size: xx-large;">注册</strong>
          </el-divider>
        </div>
        <el-steps :active=curStep finish-status="success" simple style="margin-top: 20px">
          <el-step title="基本信息"></el-step>
          <el-step title="实名认证"></el-step>
          <el-step title="完成注册"></el-step>
        </el-steps>

        <!--第一阶段信息-->
        <el-form
            ref="form"
            style="margin-right: 15%;margin-top: 15%;margin-left: 15%;"
            v-if="curStep==0"
        >

          <el-form-item>
            <el-input
                v-model="phone"
                placeholder="填写常用手机号"
                disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
                v-model="verifyCode"
                style="width: 50%;"
                placeholder="请输入短信验证码"
                maxlength="6"
            ></el-input>
            <el-button
                type='primary'
                style="margin-left: 5%;"
                @click="getCode"
                :disabled="!canSendMessage"
            >
              {{ messageButtonName }}
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button
                type="primary"
                @click="nextStep"
                style="width: 40%;margin-top: 5%;"
                icon="el-icon-right"
                plain
            >下一步
            </el-button>
          </el-form-item>
        </el-form>

        <!--第二阶段信息-->
        <el-form
            style="margin-right: 15%;margin-top: 5%;margin-left: 15%;"
            v-if="curStep==1"
        >
          <!--
              <el-form-item>
              <el-input
              v-model="trueName"
              placeholder="真实姓名"
              maxlength="10"
              ></el-input>
          </el-form-item>
          <el-form-item>
              <el-input
              v-model="ID"
              placeholder="身份证号"
              maxlength="18"
              ></el-input>
          </el-form-item>
          -->
          <el-form-item>
            <p>请上传身份证号正面，用于实名认证</p>

            <el-upload
                action="none"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="1"
                :on-change="checkPhoto"
                :auto-upload="false"
                ref="upload"
                class="upload-pic"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog
                :visible.sync="dialogVisible"
            >
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                @click="nextStep"
                style="width: 40%;"
                icon="el-icon-right"
                plain
            >下一步
            </el-button>
          </el-form-item>

        </el-form>

        <!--第三阶段信息-->
        <el-form
            label-width="80px"
            v-if="curStep==2"
            style="
            width: 70%;
            margin-left: 15%;
            margin-top:10%;
            "
        >
          <el-form-item label="手机号">
            <el-input v-model="phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="trueName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="ID" :disabled="true"></el-input>
          </el-form-item>
          <!--相关事项-->
          <el-form-item>
            <el-checkbox
                v-model="licenseAccept"
            >
              我已同意
              <el-link
                  type="primary"
                  :underline="false"
              >
                <router-link target="_blank" :to="{path:'/license'}">
                  《归宿平台用户使用协议》
                </router-link>
              </el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                @click="nextStep"
                style="width: 40%;margin-top: 5%;"
                icon="el-icon-upload2"
                plain
            >确认提交
            </el-button>
          </el-form-item>
        </el-form>

      </el-aside>
      <el-main>

        <!--走马灯展示-->
        <el-carousel
            :interval="4000"
            height="390px"
            indicator-position=none
            arrow=never
            style="
                    margin-top: 20%;margin-left: -1%;
                    "
        >
          <el-carousel-item v-for="(item,index) in showImage" :key="index"
                            style="height: auto;margin-top: 5%;">
            <p style="text-align: center;margin-left: 10%;">{{ item.name }}</p>
            <el-image :src="item.image"
                      fit="contain"
                      style="
                        width: 30%;
                        "
            >
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {hostRegister, hostPhoneUnique} from '@/api/host'
import {sendMessage, IDVerify} from '@/api/public'
import {getUserPhone,getCustomerInfo} from '@/api/customer'
import {mapMutations} from 'vuex';
import axios from 'axios'

export default {
  props: {},
  data() {
    return {
      curStep: 0, //当前进度
      phone: '',
      name: '',
      password: '',
      verifyCode: '',
      correctCode: '',
      canSendMessage: true, //发送验证码按钮状态
      waitingTime: 60, //剩余需要等待的时间
      messageButtonName: '获取验证码',
      messageIsSend: false,//验证码尚未被发送
      licenseAccept: false,//是否同意协议

      ID: '', //身份证号
      trueName: '',//真实姓名
      fileImg: [],

      dialogImageUrl: '',
      dialogVisible: false,

      //走马灯数据
      showImage: [
        {
          name: '从这里开始',
          image: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/house0.png",
        },
        {
          name: '升级你的民宿',
          image: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/house1.png"
        },
        {
          name: '吸引更多客人',
          image: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/house2.png"
        },
        {
          name: '你的未来可期',
          image: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/house3.png"
        },
      ]
    }
  },

  created() {
    getUserPhone().then(response => {
      if (response.status === 200) {
        console.log(response.data)
        this.phone = response.data
      } else {
        this.$message({
          message: '获取登陆手机号码失败，请刷新',
          type: 'warning'
        });
      }
    }, error => {
      this.$message({
        message: '获取登陆手机号码失败，请刷新',
        type: 'warning'
      });
    })
  },

  methods: {
    //身份证上传处理相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileImg.pop();
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    checkPhoto(file, fileList) {
      console.log('正在检查上传的图片')

      if (file.size / 1024 / 1024 > 2) {
        this.$message({
          message: '上传图片大小不能超过2MB！',
          type: 'warning'
        });
        this.$refs.upload.clearFiles();
        return false;
      }
      this.fileImg.push(file);

    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过2MB！',
          type: 'warning'
        });
      }
      return isLt2M;
    },

    ...mapMutations(['changeLogin']),
    nextStep() {
      console.log('file:', this.fileImg);
      if (this.curStep === 0) {

        //
        // //判断是否输入了手机号
        // if (!this.isLegalPhone()) {
        //   this.$message({
        //     message: '请输入正确的手机号',
        //     type: 'warning'
        //   });
        //   return false;
        // }

        //检验是否完成发送验证码的步骤
        if (!this.messageIsSend) {
          this.$message({
            message: '请先发送验证码',
            type: 'warning'
          });
          return false;
        }

        //判断验证码是否正确
        // if (this.correctCode != this.verifyCode) {
        if (false) {
          this.$message({
            message: '验证码输入错误',
            type: 'warning'
          });
          return false;
        }

        this.curStep++;

      } else if (this.curStep === 1) {
        // // TODO: 先跳过一下
        // this.curStep += 1;
        //上传图片相关
        if (this.fileImg.length != 1) {
          this.$message({
            message: '请上传身份证的正面照片',
            type: 'warning'
          });
          return false;
        }
        //调用身份证检验api
        // console.log(this.fileImg[0].raw)

        //转base64
        var reader = new FileReader();
        reader.readAsDataURL(this.fileImg[0].raw);
        //
        console.log('after base64:', reader.result);
        let that = this;
        reader.onload = function (e) {
          console.log('data:')
          console.log(this.result);
          let param = {
            positivePhoto: this.result
          }

          IDVerify(param).then(response => {
            console.log(response.data.verifyResult)
            if (response.data.verifyResult === 0) {
              // if (true ) {
              //身份证校验成功
              that.$message({
                message: '身份证号检验成功！',
                type: 'success'
              });
              //读取身份证号
              that.ID = response.data.trueID
              that.trueName = response.data.trueName
              console.log(that.ID, that.trueName)

              //进入下一步
              that.curStep += 1;
            } else if (response.data.verifyResult === 1) {
              that.$message({
                message: '无效的身份证，请重新上传',
                type: 'warning'
              });
              return;
            } else if (response.data.verifyResult === 2) {

              that.$message({
                message: '该身份证号已被注册过，如有疑问请联系客服',
                type: 'warning'
              });
              return;
            }
          }).catch(error => {
            that.$message.error('发生异常，请稍后再试');
            return;
          })
        }
        // this.curStep += 1;
      } else if (this.curStep === 2) {
        //检验是否同意协议
        if (!this.licenseAccept) {
          this.$message({
            message: '请同意《归宿平台用户使用协议》',
            type: 'warning'
          });
          return;
        }

        //获取注册信息
        let param = {
          phoneCode: '+86',
          phone: this.phone,
          ID: this.ID,
          realName: this.trueName,
          gender: this.ID[16] % 2 === 1 ? 'f' : 'm'
        }
        console.log('最终提交的注册信息为', param);

        //判断完成，注册
        hostRegister(param).then(response => {
          this.curStep = 4;

          this.$message({
            message: '成功注册账号！',
            type: 'success'
          });

          

          getCustomerInfo().then(response => {
            if (response.status === 200) {
              this.userName = response.data.userName;
              this.userAvatar = response.data.userAvatar;
              console.log("用户id为",response.data.userId)
              // 后端返回身份
              // 将用户token保存到vuex中
              this.changeLogin({
                Authorization: this.userToken,
                userId:response.data.userId,
                userName: response.data.userName,
                userAvatar: response.data.userAvatar,
                userIdentity: 'Customer',
                userPermissions: response.data.userPermissions
              });
              //跳转到首页
              this.$router.push({
                path: "/"
              });
              
            }
          })
          
        }).catch(error => {
          console.log(error)
          this.$message.error('发生异常，请稍后再试');
          return;
        })
      }

    },
    isLegalPhone() {
      /*
      判断输入的手机号是否合法
      */
      var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!myreg.test(this.phone)) {
        console.log('手机号格式不正确')
        return false;
      } else {
        console.log('手机号格式正确')
        return true;
      }
    },
    getCode() {
      /*
      发送验证码
      */

      //判断是否输入了手机号
      if (!this.isLegalPhone()) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }

      this.waitingTime = 60;
      var waitingForMessage = setInterval(() => {
        this.canSendMessage = false;
        this.waitingTime -= 1;
        this.messageButtonName = '请等待' + this.waitingTime + 's';
        if (this.waitingTime <= 0) {
          clearInterval(waitingForMessage);
          this.canSendMessage = true;
          this.messageButtonName = '获取验证码';
          this.waitingTime = 60;
        }
      }, 600)

      //更新参数
      let param = {
        phone: this.phone
      }

      // 发送验证码
      // this.messageIsSend = true;

      sendMessage(param).then(response => {
        if (response.data.sendstate) {
          console.log('成功发送验证码')

          //读取回复中的验证码内容
          this.correctCode = response.data.code;

          //已经完成发送验证码步骤
          this.messageIsSend = true;
        } else {
          this.$message({
            message: '发送失败，请稍后尝试重新发送',
            type: 'error'
          });
        }

      })

    }
  }
}
</script>

<style scoped>
.el-main {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  background-image: url('https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/cityLife.png');
  background-size: 115%;
  background-repeat: no-repeat;
}

.upload-pic /deep/ .el-upload--picture-card {
  width: 300px !important;
}
</style>