
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存储token
    Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization') : '',
    userId:localStorage.getItem('userId')?localStorage.getItem('userId'):'',
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):'',
    userAvatar:localStorage.getItem('userAvatar')?localStorage.getItem('userAvatar'):'',
    userIdentity:localStorage.getItem('userIdentity')?localStorage.getItem('userIdentity'):'',
    userPermissions:localStorage.getItem('userPermissions')?localStorage.getItem('userPermissions'):[],
    rememberPhone:localStorage.getItem('rememberPhone')?localStorage.getItem('rememberPhone'):'',
    rememberPassword:localStorage.getItem('rememberPassword')?localStorage.getItem('rememberPassword'):'',
  },
  mutations: {
    //修改token，并把token存入localStorage
    changeLogin(state,user){
      state.Authorization=user.Authorization
      state.userId=user.userId
      state.userName=user.userName
      state.userAvatar=user.userAvatar
      state.userPermissions = user.userPermissions
      localStorage.setItem('Authorization',user.Authorization)
      localStorage.setItem('userId',user.userId)
      localStorage.setItem('userName',user.userName)
      localStorage.setItem('userAvatar',user.userAvatar)
      localStorage.setItem('userPermissions',user.userPermissions)
    },
    rememberLogin(state,user){
      /*
      "记住我"功能
      */
      state.rememberPhone=user.rememberPhone
      state.rememberPassword=user.rememberPassword
      localStorage.setItem('rememberPhone',user.rememberPhone)
      localStorage.setItem('rememberPassword',user.rememberPassword)
    },
    delRemember(state){
      /*
      取消"记住我"功能
      */
      state.rememberPhone=''
      state.rememberPassword=''
      localStorage.removeItem('rememberPhone')
      localStorage.removeItem('rememberPassword')
    },
    //删除token
    delLogin(state){
      console.log('delete token')
      state.Authorization=''
      state.userId=''
      state.userName=''
      state.userAvatar=''
      state.userPermissions=[]
      localStorage.removeItem('Authorization')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userAvatar')
      localStorage.removeItem('userIdentity')
      localStorage.removeItem('userPermissions')
    },
    SET_NAME:(state,name)=>{
      state.userName=name
    },
    SET_AVATAR:(state,avatar)=>{
      state.userAvatar=avatar
    }
  },
  actions: {
  },
  modules: {
  }
})
