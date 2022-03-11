<template>
  <!--整体使用弹性布局-->
  <div class="customer-flex-box">
  <div class = "customer-basic-info">
    <CustomerBasicInfo
        v-bind:user_img="user_img"
              :user-nick-name="userNickName"
              :review-num="reviewNum"
              :user-group-level="UserGroupLevel"
              :tagimg-list="TagimgList"
              :authentication-tag="AuthenticationTag"
              :email-tag="EmailTag"
              :phone-tag="PhoneTag"
              :score="Score">
    </CustomerBasicInfo>
  </div>
  <el-divider direction="vertical" class="el-divider--vertical"></el-divider>
  <div class="customer-detailed-info">
    <CustomerDetailedInfo
      v-bind:user-nick-name="userNickName"
            :register-date="RegisterDate"
            :user-birth-date="userBirthDate"
            :comment-num="reviewNum"
            :user-sex="userSex"
            :mood="mood"
            :comment-list="commentList"
            @UpdateMood="updateMood"
            @UpdateName="updateNickName"
            @UpdateNameBirthDay="updateNameAndBirthDate"
            @UpdateNameSex="updateNameAndSex"
            @UpdateAll="updateAllInfo">
    </CustomerDetailedInfo>
  </div>
    <el-divider direction="vertical" class="el-divider--vertical"></el-divider>
    <div
        class="side-bar-box">
      <CustomerSideBar></CustomerSideBar>
    </div>
  </div>
</template>

<script>
import CustomerBasicInfo from "@/components/CustomerBasicInfo";
import CustomerDetailedInfo from "@/components/CustomerDetailedInfo";
import {getCustomerInfo, uploadBasicInfo} from "@/api/customerInfo";
import {mapMutations} from "vuex";
import CustomerSideBar from "@/components/CustomerSideBar";
export default {
  name: "CustomerInfoPage",
  components: {CustomerSideBar, CustomerDetailedInfo, CustomerBasicInfo},
  data:function(){
    return{
      user_img: "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",//一个用户图片url的假数据
      userNickName: "用户昵称",
      reviewNum: 3,//评价条数
      UserGroupLevel: '基础用户',//用户组等级，字符串
      TagimgList: ["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E9%94%99%E8%AF%AF.png", "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%AD%A3%E7%A1%AE%20(1).png"],
      AuthenticationTag: 1,//是否进行了身份认证表示，0表示未认证，1表示认证
      EmailTag: 0,//是否拥有电子邮箱标识
      PhoneTag: 1,//是否进行了手机号认证标识
      Score: 0,
      RegisterDate: "2022年2月10日",//注册的时间
      userBirthDate: '暂无生日',
      userSex: '未知',
      mood: 0,//当前心情
      commentList: [{
        commentTime:"2022-2-11",
        hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
        hostNickName:"房东昵称",
        hostRegisterDate:"2022-1-11",
        customerStars:5.0,
        comment:"房东对该顾客的评价内容..."
      },
        {
          commentTime:"2022-2-11",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
          hostNickName:"房东昵称",
          hostRegisterDate:"2022-1-11",
          customerStars:5.0,
          comment:"房东对该顾客的评价内容..."
        },{
        commentTime:"2022-2-11",
        hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
        hostNickName:"房东昵称",
        hostRegisterDate:"2022-1-11",
        customerStars:5.0,
        comment:"房东对该顾客的评价内容..."
  },
    {
      commentTime:"2022-2-11",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
        hostNickName:"房东昵称",
        hostRegisterDate:"2022-1-11",
        customerStars:5.0,
        comment:"房东对该顾客的评价内容..."
    },{        commentTime:"2022-2-11",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
          hostNickName:"房东昵称",
          hostRegisterDate:"2022-1-11",
          customerStars:5.0,
          comment:"房东对该顾客的评价内容..."
        },
        {
          commentTime:"2022-2-11",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
          hostNickName:"房东昵称",
          hostRegisterDate:"2022-1-11",
          customerStars:5.0,
          comment:"房东对该顾客的评价内容..."
        },        {
          commentTime:"2022-2-11",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E7%94%A8%E6%88%B7.png",
          hostNickName:"房东昵称",
          hostRegisterDate:"2022-1-11",
          customerStars:5.0,
          comment:"房东对该顾客的评价内容..."
        }
        ],
    }
  },
  methods:{
    ...mapMutations(['changeLogin']),
    updateMood: function (mood) {
      console.log("当前点击的心情：",mood)
      this.mood = mood;
      let NewName = this.userNickName;
      let param = {
        mood: mood,
        userNickName: NewName
      };

      uploadBasicInfo(param).then(response => {
        //如果修改成功，需要更改本地信息
        this.changeLogin({
          userName: NewName,
          userAvatar: localStorage.getItem('userAvatar'),
          userIdentity: localStorage.getItem('userIdentity'),
          userId:localStorage.getItem('userId'),
          userPermissions: localStorage.getItem('userPermissions'),
        });

        //刷新
        this.$router.go(0);

      }).catch((error) => {
        this.$message({
          message: error,
          type: 'warning'
        });
        return;
      })
    },
    ...mapMutations(['changeLogin']),
    updateNickName: function (NewName) {
      this.userNickName = NewName;
      let param = {
        userNickName: NewName
      };
      console.log("修改昵称传入的参数", NewName)
      uploadBasicInfo(param).then(response => {
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({
          Authorization: localStorage.getItem('Authorization'),
          userName: NewName,
          userAvatar: localStorage.getItem('userAvatar'),
          userId:localStorage.getItem('userId'),
          userIdentity: 'Customer',
          userPermissions: localStorage.getItem('userPermissions'),
        });

        //刷新
        this.$router.go(0);
      }).catch((error) => {
        console.log(error);
        this.$message({
          message: error,
          type: 'warning'
        });
        return;
      })
    },
    ...mapMutations(['changeLogin']),
    updateNameAndBirthDate: function (NewName, NewBirth) {
      this.userNickName = NewName;
      this.BirthDate = NewBirth;
      let param = {
        userNickName: NewName,
        userBirthDate: NewBirth
      };
      console.log("传入的生日", NewBirth, typeof (NewBirth),)
      uploadBasicInfo(param).then(response => {
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({
          Authorization: localStorage.getItem('Authorization'),
          userName: NewName,
          userAvatar: localStorage.getItem('userAvatar'),
          userId:localStorage.getItem('userId'),
          userIdentity: 'Customer',
          userPermissions: localStorage.getItem('userPermissions'),
        });

        //刷新
        this.$router.go(0);
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'warning'
        });
        return;
      })
    },
    ...mapMutations(['changeLogin']),
    updateNameAndSex: function (NewName, NewSex) {
      this.userNickName = NewName;
      this.userSex = NewSex;
      console.log("传入的性别参数", NewSex);
      let sex = NewSex === '男' ? 'm' : 'f';
      let param = {
        userNickName: NewName,
        userSex: sex
      };
      uploadBasicInfo(param).then(response => {
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({
          Authorization: localStorage.getItem('Authorization'),
          userName: NewName,
          userAvatar: localStorage.getItem('userAvatar'),
          userId:localStorage.getItem('userId'),
          userIdentity: 'Customer',
          userPermissions: localStorage.getItem('userPermissions'),
        });

        //刷新
        this.$router.go(0);

      }).catch((error) => {
        this.$message({
          message: error,
          type: 'warning'
        });
        return;
      })
    },
    updateAllInfo: function (NewName, NewSex, NewBirthDate) {
      this.userNickName = NewName;
      console.log("传入的生日参数", NewBirthDate);
      console.log("传入的性别参数", NewSex);
      let sex = NewSex === '男' ? 'm' : 'f';
      let param = {
        userNickName: NewName,
        userSex: sex,
        userBirthDate: NewBirthDate
      };
      uploadBasicInfo(param).then(response => {
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({
          Authorization: localStorage.getItem('Authorization'),
          userName: NewName,
          userAvatar: localStorage.getItem('userAvatar'),
          userId:localStorage.getItem('userId'),
          userIdentity: 'Customer',
          userPermissions: localStorage.getItem('userPermissions'),
        });

        //刷新
        this.$router.go(0);
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'warning'
        });
        return;
      })
    }
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: '个人主页加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)'
    });

    //有token,则读取token
    this.userName = localStorage.getItem('userName');
    console.log('user:', this.userName)
    this.userAvatar = localStorage.getItem('userAvatar');
    this.hasLogin = true;
    //loading.close()
    //调用api
    getCustomerInfo().then(response => {
      console.log("获取到的个人信息为",response.data);
      //获取api中的数据
      this.reviewNum = response.data.evalNum;
      if (response.data.userGroupLevel == null)
        this.UserGroupLevel = "暂无等级";
      else
        this.UserGroupLevel = '等级：' + response.data.userGroupLevel;
      this.userNickName = response.data.userNickName;
      // TODO: 从后端获取是否完成身份认证的信息，通过发送获取 permission 来完成。
      this.AuthenticationTag = 1;
      this.EmailTag = response.data.emailTag == false ? 0 : 1;
      this.PhoneTag = 1;
      this.Score = response.data.userScore === null? 0:response.data.userScore;
      this.RegisterDate = response.data.registerDate.substring(0, 10);
      this.user_img = response.data.userAvatar;
      console.log(this.user_img);
      this.userBirthDate = response.data.userBirthDate === null ? '未知' : response.data.userBirthDate;
      this.commentList = response.data.hostCommentList;
      this.mood = response.data.mood;
      if (this.userBirthDate != '未知') {
        this.userBirthDate = this.userBirthDate.substring(0, 10);
      }
      this.userSex = response.data.userSex;
      if (this.userSex === null)
        this.userSex = '未知';
      else if (this.userSex === 'f')
        this.userSex = '女';
      else
        this.userSex = '男';

      loading.close()
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'warning'
      });
      console.log('error', error)
      return;
    })
  }

}
</script>

<style scoped>
.customer-flex-box{
  display: flex;
  width: 100%;
  height: 1900px;
  flex-direction: row; /*弹性布局方向为水平从左至右*/
  flex-wrap: wrap; /*容器进行换行*/
  justify-content: center; /*指定容器内元素的排列方式为均匀居中分布*/
}

.customer-basic-info{
  width: 350px;
  height: calc(10% + 720px);
  padding-top: 5%;
  align-items: center;
}

.customer-detailed-info{
  width: 800px;
  height: 1900px;
}

.side-bar-box{
  width:300px ;
  height: 1900px;
}

.el-divider--vertical {
  height: 95%;
  margin-top: 80px;
  width: 1px;
  animation: fadeInDown;
  animation-duration: 1s;
  color: #42b983;
}
</style>