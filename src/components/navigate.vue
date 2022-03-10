<!--
  导航栏
  by：汪明杰
-->

<template>
  <el-header
      style="display: inline-block;margin-bottom: -5px;
    margin-top: -5px;
    position: fixed;left: 0;z-index: 100;">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"

        @select="handleSelect"
        style="
              display: block;
              height: 100%;
              width: 111.8%;
              left: -10%;
              top:-5%;
              align-self: center;
              background-color: rgba(246,248,248,0.8);
              backdrop-filter: blur(10px);
              box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    ">
      <el-menu-item style="width:20%;">
        <el-image
            src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/biglogo.png"
            style="width:40%;
            left: 20%;
            top:10%;
            "

        >
        </el-image>
      </el-menu-item>

      <el-menu-item style="width: 30%;">
        <!--搜索框-->
        <div style="width:100%; margin-left: 50px;">
          <el-input
              placeholder="从这里开始，寻找你的归宿"
              v-model="searchText"
              class="input-with-select"
              size='medium'
              maxlength=20
              clearable
          >
            <!--
              <el-select v-model="selectSearch" slot="prepend" placeholder="请选择"
            style="width:80px">
              <el-option label="民宿" value="1"></el-option>
              <el-option label="地点" value="2"></el-option>
            </el-select>
            -->
            <el-button slot="append" icon="el-icon-search" @click="handleSearchResult()"></el-button>
          </el-input>
        </div>

      </el-menu-item>

      <el-menu-item style="margin-left:5%;">
        <el-divider direction="vertical"></el-divider>
      </el-menu-item>

      <el-menu-item
          index="1"
          style="padding-left:0% "

      >
        <i class="el-icon-s-home"></i>
        首页
      </el-menu-item>
      <el-menu-item index="2" style="padding-left:0% " v-if="loginState!=2">
        <i class="el-icon-star-on"></i>
        收藏夹
      </el-menu-item>
      <el-menu-item index="5-3" style="padding-left:0% " v-else>
        <i class="el-icon-s-order"></i>
        我的订单
      </el-menu-item>
      <!-- //AUT:CKX -->
      <el-menu-item index="3" style="padding-left:0% ">
        <i class="el-icon-document"></i>

        历史足迹
      </el-menu-item>

      <el-menu-item index="4" style="padding-left:0% ">
        <i class="el-icon-question"></i>
        帮助

      </el-menu-item>

      <el-submenu index="6" style="padding-left:0% ;">
        <template #title>
          <i class="el-icon-s-comment"></i>
          论坛
        </template>
        <el-menu-item index="6-1" @click="routerToPostSquare">
          广场
        </el-menu-item>
        <el-menu-item index="6-2" @click="routerToEditPost">
          发帖
        </el-menu-item>
      </el-submenu>

     
      <!--顾客个人信息-->
      <el-submenu index="5" v-if="loginState==1" style="float: right;">
        <template #title>
          <!--显示头像-->
          <el-avatar :size="30"
          href='https://www.baidu.com/s?wd=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2'
            :src="userAvatar" @error="errorHandler">
            <!--这里是失败时候展示的图片-->
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          {{ userName }}
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-info" @click="routerToUserPage"></i>
          个人信息
        </el-menu-item>
        <el-menu-item index="5-2">
          <i class="el-icon-s-order"></i>
          我的订单
        </el-menu-item>
        <el-menu-item index="5-3">
          <i class="el-icon-s-ticket"></i>
          我的礼券
        </el-menu-item>
        <el-menu-item index="5-4">
          <i class="el-icon-remove"></i>
          退出登录
        </el-menu-item>
      </el-submenu>

      

      <el-menu-item v-if="loginState==0" style="float: right;">
        <el-link :underline="false" @click="login">登录</el-link>
        <el-dialog
            :visible.sync="dialogTableVisible"
            center
            :append-to-body='true'
            :lock-scroll="false"
            width="500px"
            :show-close="false"
            class="login-dialog-box"
        >
          <div slot="title" class="header-title">

            <movingCloud
                style="position: absolute;left: -75%;z-index: 1000;width: 500%;
            top:-30%;"
                imgUrl="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/cloud1.png"
            />
            <movingCloud
                style="position: absolute;
                left: -350%;top:-20%;
                z-index: 999;width: 600%;"
                imgUrl="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/cloud1.png"
            />
            <el-image
                src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/mountain.png"
                style="position: absolute;z-index: 999;top:72%;left:-100%;
            width:50%;
            "></el-image>
            <el-image
                src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/plant.png"
                style="position: absolute;z-index: 999;top:58%;left:150%;
            width:50%;
            "></el-image>
            <el-image
                src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/sunshine.png"
                style="position: absolute;z-index: 999;top:-20%;left:170%;
            width:20%;
            "></el-image>
            <el-image
                src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/1-loginHeader.png"
                style="width: 100%;height: 10% !important;
            "
            ></el-image>
          </div>
          <login-name
              @logins="changeLoginState"
              @closeLogin="closeLogin"
              ref="loginComponent"
          />
          <div slot="footer">
            <el-button type="primary" @click="changeLoginState" class="loginButton">登录</el-button>
            <el-button @click="register" class="registerButton">注册</el-button>
          </div>
        </el-dialog>
      </el-menu-item>

    </el-menu>

  </el-header>

</template>
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<script>
import ref from 'vue';
import LoginName from '@/components/login.vue'
import {mapMutations} from 'vuex';
import {getFavorite, customerLogin, userLogout} from '@/api/customer'
import {hostLogin} from '@/api/host'
import movingCloud from '@/components/movingCloud.vue';
import md5 from 'js-md5';
import {getCustomerInfo} from "../api/customer";

export default {
  name: 'navigate',
  components: {
    LoginName,
    movingCloud
  },
  created: function () {
    /*
    初始化，判断是否有登录记录
    */
    let userId = localStorage.getItem('userId');

    if (userId === null || userId === '') {
      return;
    } else {
      this.userName = localStorage.getItem('userName');
      this.userAvatar = localStorage.getItem('userAvatar');
      this.userIdentity = localStorage.getItem('userIdentity');
      this.loginState = 1;
    }

    //
  },
  mounted() {
    window['startLogin'] = () => {
      this.login()
    };
    window['publicChangeName'] = (newName) => {
      this.changeName(newName);
    }
    window['changeAvatar'] = (newAvatar)=>{
      this.changeAvatar(newAvatar);
    }
  },
  methods: {
    changeName: function (newName) {
      this.$refs.loginComponent.userName = newName;
      this.userName=newName;
    },
    changeAvatar(newAvatar){
      this.userAvatar = newAvatar;
      // 同时修改localStorage
      this.changeLogin({
        userName: localStorage.getItem('userName'),
        userAvatar: this.userAvatar,
        userIdentity: localStorage.getItem('userIdentity'),
        userId:localStorage.getItem('userId'),
        userPermissions: localStorage.getItem('userPermissions'),
      });
    },
    routerToUserPage: function () {
      this.$router.replace('/CustomerInfoPage');
    },
    routerToPostSquare: function () {
      this.$router.replace('/postSquare');
    },
    routerToEditPost: function () {
      this.$router.replace('/EditPost');
    },
    routerToHostPage: function () {
      this.$router.replace('/hostInfoPage');
    },
    errorHandler() {
      return true
    },
    ...mapMutations(['delLogin']),
    handleSelect(key, keyPath) {
      //这里表示切换了导航内容，应该更换路由
      if (key === '1') {
        this.$router.push({path: '/'});
        return;
      }
      if (key === '2') {
        this.$router.push({path: '/favoritesPage'});
        return;
      }
      if (key === '3') {
        this.$router.push({path: '/historyDrawer'});
        return;
      }
      if (key === '4') {
        this.$router.push({path: '/help'});
        return;
      }
      if (key === '6-1') {
        this.$router.push({path: '/postSquare'});
        return;
      }
      if (key === '6-2') {
        this.$router.push({path: '/EditPost'});
        return;
      }


      if (this.loginState == 1) {
        if (keyPath[1] === '5-4') {

          userLogout().then(response => {
            this.delLogin();
            this.loginState = 0;
            this.$message({
              message: '注销成功',
              type: 'success'
            });
            // 回到首页
            this.$router.push({path: '/'});
          }, error => {
            this.delLogin();
            this.loginState = 0;
            this.$message({
              message: '注销成功',
              type: 'warning'
            });
          })


        } else if (keyPath[1] === '5-1') {
          this.routerToUserPage();
        } else if (keyPath[1] === '5-2') {
          this.$router.push({path: '/customerOrder'});
        } else if (keyPath[1] === '5-3') {
          this.$router.push({path: '/coupon'});
        }
      } else if (this.loginState == 2) {
        if (keyPath[0] === '5-3') {
          this.$router.push({path: '/hostOrder'});
        } else if (keyPath[1] === '5-1') {
          console.log('查看房东个人信息')
          this.routerToHostPage();
        } else if (keyPath[1] === '5-2') {
          console.log('进入创建房源界面')
          localStorage.setItem('stayAlter', JSON.stringify(false));
          this.$router.push({path: '/become-a-host/type'});
        } else if (keyPath[1] === '5-4') {
          console.log('正在退出登录')
          //清除token信息
          this.delLogin();
          this.loginState = 0;

          //前往主页
          this.$router.push({path: '/'});

          this.$message({
            message: '注销成功',
            type: 'success'
          });

        }

      } else {
        if (key === '5') {

        }
      }

    },

    login() {
      this.dialogTableVisible = true;
      //更新验证码
      this.$refs.loginComponent.updateVerifyCode();
    },

    closeLogin() {
      /*
      关闭登录窗口
      */
      this.dialogTableVisible = false;
    },

    isLegalPhone() {
      /*
      判断输入的手机号是否合法
      */
      var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!myreg.test(this.$refs.loginComponent.phonenumber)) {
        console.log('手机号格式不正确')
        return false;
      } else {
        console.log('手机号格式正确')
        return true;
      }
    },

    ...mapMutations(['changeLogin']),
    ...mapMutations(['rememberLogin']),
    ...mapMutations(['delRemember']),
    changeLoginState() {
      /*
      点击登录，检验信息
      */

      let param = {
        phoneCode: '+86',
        name: this.$refs.loginComponent.phonenumber,
        pwd: this.$refs.loginComponent.password
      }

      if (!this.isLegalPhone()) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }
      if (param.pwd.length < 6) {
        this.$message({
          message: '密码长度不正确',
          type: 'warning'
        });
        return false;
      }

      //验证码检验
      console.log(this.$refs.loginComponent.verifycode,
          this.$refs.loginComponent.trueVerifycode)
      if (this.$refs.loginComponent.verifycode.toLowerCase() !==
          this.$refs.loginComponent.trueVerifycode.toLowerCase()) {
        this.$message({
          message: '验证码不正确',
          type: 'warning'
        });
        return false;
      }

      //判断当前登录对象
      customerLogin(param).then(response => {

        //判断是否登录成功
        if (response.data.code === 200) {
          getCustomerInfo().then(response => {
            console.log("登录成功的返回值为",response.data)
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

                  this.dialogTableVisible = false;
                  this.loginState = 1;
                  console.log('顾客成功登录')

                  this.$message({
                    message: '登录成功！',
                    type: 'success'
                  });

                  //跳转路由
                  this.$router.push({path: '/'});

                  //检查是否勾选了"记住我"
                  if (this.$refs.loginComponent.rememberMe) {
                    this.rememberLogin({
                      rememberPhone: this.$refs.loginComponent.phonenumber,
                      rememberPassword: this.$refs.loginComponent.password
                    })
                  } else {
                    this.delRemember();
                  }
                } else {
                  this.$message({
                    message: '用户信息获取失败！',
                    type: 'warning'
                  });
                  // function returned
                }
              }
          ).catch(error => {
            this.$message({
              message: '用户信息获取失败！',
              type: 'warning'
            });
            console.log('error', error)
            // function returned
          })
        } else {
          this.$message({
            message: '账号不存在或密码错误！',
            type: 'warning'
          });
          // function returned
        }

      }).catch((error) => {
        this.$message({
          message: '登录失败，请稍后重试',
          type: 'warning'
        });
        console.log('error', error)
        // function returned
      })
    },

    register() {
      //注册账号,切换路由
      this.dialogTableVisible = false;
      console.log('跳转至注册账号界面')
      //根据当前选项，跳转至不同界面
      this.$router.replace('/register')
      // this.$router.replace('/hostRegister')

    },
    getCurrentTime() {
      //获取当前时间字符串 如2021/7/4 10:58:38
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mn = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mn + ':' + ss;
    },
    setlocalHistory(val) {
      /*
      点击搜索按钮后的逻辑处理

      */

      val = val.trim(); //去空格啥的
      val = this.getCurrentTime() + " " + val; //开头加上时间戳
      let localHistory = localStorage.getItem('localHistory');//获取历史记录
      if (localHistory === null) {
        localStorage.setItem('localHistory', val)    // 若未设置过则直接设置本地存储
        console.log(localHistory);
      } else {
        let tempArray = localHistory.split('|')
        if (tempArray.length > 0) {
          localHistory = val + '|' + tempArray.join('|'); // 新增记录
        }
        if (localHistory.split('|').length > 100) {    //历史记录超过100项
          tempArray = localHistory.split('|');
          tempArray.pop(); //删除最旧的一项
          localHistory = tempArray.join('|');
        }
        localStorage.setItem('localHistory', localHistory);  //存入本地
      }
      console.log(localHistory);
    },
    //处理搜索栏跳转到相应的房源检索页面  written by wly
    handleSearchResult() {
      //通过传递两个参数，检索文本以及搜索类别.

      //点击搜索按钮后的逻辑
      if (this.searchText === '') {
        this.$message({
          type: "info",
          message: "请输入搜索内容"
        })
        return;
      }

      let searchText = this.searchText;
      let searchValue = this.selectSearch;
      this.setlocalHistory(this.searchText);
      this.searchText = '';

      this.$router.push({path: '/staysView', query: {searchText: searchText, searchValue: searchValue}}
      ).catch(err => {
        console.log(err)

      });

    }
  },
  data() {
    return {
      selectSearch: '2',
      searchText: '',
      activeIndex: '1',
      loginState: 0, //登录状态，先用这个
      dialogTableVisible: false,
      hasNewMessage: true,//是否有新消息
      getMessage: '',
      userName: '',//用户名
      userAvatar: '',//用户头像信息
      userIdentity: '',//用户身份信息
    }
  }
}
</script>


<style scoped>
.dialogClass {
  border-radius: 20px !important;
}

.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 70%;
  margin: 0 0 2px 2px;
  vertical-align: middle;
  position: relative;
}

.login-dialog-box {
  background-image: '../assets/bg.jpg';
}

.login-dialog-box >>> .el-dialog {
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

}

.login-dialog-box >>> .el-dialog .el-dialog__header {
  padding: 0;
}

.login-dialog-box >>> .el-dialog .el-dialog__body {
  padding: 5px 10px 20px 20px;
}

.login-dialog-box >>> .el-dialog .el-dialog__footer {
  padding: 0px 10px 10px;
}

.loginButton {
  width: 100px;
  margin-right: 50px;
}

.registerButton {
  width: 100px;
}

.el-menu-item.is-active {
  font-weight: bold !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0) !important;
}

.el-menu:hover {
  background-color: none !important;
}

</style>

<style>
.el-submenu.el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0) !important;
}

.el-submenu.el-submenu__title.is-active {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
