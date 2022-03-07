import Vue from 'vue'
import VueRouter from 'vue-router'
import staysView from '../views/staysView.vue'
import Home from '../views/Home.vue'
import HomePage from '../views/HomePage.vue'
import UserInfoPage from "../views/UserInfoPage";
import UserInfoMessage from "../components/UserInfoMessage";
import { MessageBox, Message } from 'element-ui'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path:'/',
    name:'HomePage',
    component:HomePage
  },
  {
    path: '/staysView',
    name: 'staysView',
    component: staysView
  },
    
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },

  //注册账号路由
  {
    path:'/register',
    name:'Register',
    component: () => import('../views/Register.vue')
  },
  //协议路由
  {
    path:'/license',
    name:'License',
    component:()=>import('../views/License.vue')
  },
  //房东注册账号路由
  {
    path:'/hostRegister',
    name:'hostRegister',
    component: () => import( '../views/hostRegister.vue')
  },
  {
    path:'/comments',
    name:'comments',
    component: () => import( '../components/StayInfo/comments.vue')
  },
  {
    path: '/userinfopage',
    name: 'UserInfoPage',
    component: () =>import('../views/UserInfoPage.vue')
  },
  {
    path: '/customerinfopage',
    name: 'CustomerInfoPage',
    component: () =>import('../views/CustomerInfoPage.vue')
  },
  {
    path: '/hostinfopage',
    name: 'HostInfoPage',
    component: () =>import('../views/HostInfoPage.vue')
    },
  {
    path: '/postSquare',
    name: 'PostSquare',
    component: () =>import('../views/PostSquarePage.vue')
  },
  {
    path: '/EditPost',
    name: 'EditPost',
    component: () =>import('../views/EditPostPage.vue')
    },
    {
    path: '/DetailPost',
    name: 'DetailPost',
    component: () =>import('../views/DetailPostPage.vue')
  },
  // {
  //   path: '/UserInfoMesssage',
  //   name: 'UserInfoMesssage',
  //   component: ()=>import(UserInfoMessage)
  // },
  // 展示房源详细信息路由
  {
    path:'/StayInfo',
    name: 'Stayinfo',
    component: () => import('../views/StayInfo.vue')
  },
  // 支付界面路由
  {
    path: '/PaymentPage',
    name: 'PaymentPage',
    component: ()=> import('../views/PaymentPage.vue')
  },
  
  //房源注册路由
  {
    path:"/become-a-host/type",
    component:()=>
      import("../views/become-a-host/type.vue")
  },
  {
    path:"/become-a-host/roomInfo",
    component:()=>
      import("../views/become-a-host/roomInfo.vue")
  },
  {
    path:"/become-a-host/facilityInfo",
    component:()=>
      import("../views/become-a-host/facilityInfo.vue")
  },
  {
    path:"/become-a-host/addrInfo",
    component:()=>
      import("../views/become-a-host/addrInfo.vue")
  },
  
  {
    path:"/become-a-host/disInfo",
    component:()=>
      import("../views/become-a-host/disInfo.vue")
  },
  {
    path:"/become-a-host/stayInfo",
    component:()=>
      import("../views/become-a-host/stayInfo.vue")
  },
  {
    path:"/become-a-host/commit",
    component:()=>
      import("../views/become-a-host/commit.vue")
  },
  {
    path:"/become-a-host/roomImg",
    component:()=>
      import("../views/become-a-host/roomImg.vue")
  },

  {
    path:"/become-a-host/stayCategory",
    component:()=>
      import("../views/stayCategory.vue")
  },

  
    
  //房东注册账号路由
  {
    path: '/help',
    name: 'Help',
    component: () =>import('../views/Help.vue')
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: () =>import('../views/Coupon.vue')
  },
  {
    path: '/hostOrder',
    name: 'HostOrder',
    component: () =>import('../views/HostOrder.vue')
  },

  {
    path: '/customerOrder',
    name: 'CustomerOrder',
    component: () =>import('../views/CustomerOrder.vue')
  },

  //历史足迹路由
  {
    path: '/historyDrawer',
    name:'historyDrawer',
    component:()=>import('../views/historyDrawer.vue')
  },

  //收藏夹路由
   {
    path:'/favoritesPage',
    name:'favoritesPage',
    component: () => import( '../views/favoritesPage.vue')
  },
  //单收藏夹内房源集合路由
  {
    path:'/oneFavPage',
    name:'oneFavPage',
    component: () => import( '../views/oneFavPage.vue')
  },
  //找回密码
  {
    path:'/forgetPassword',
    name:'forgetPassword',
    component: () => import( '../views/forgetPassword.vue')
  },


  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  // { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' 
  || to.path==='/' 
  || to.path==='/hostRegister'
  || to.path==='/license'
  || to.path==='/historyDrawer'
  || to.path==='/staysView'
  || to.path==='/help'
  || to.path==='/StayInfo'
  || to.path==='/postSquare'
  || to.path==='/DetailPost'
  ) {
    next();
  } else {

    let userId = localStorage.getItem('userId');

    if (userId === null || userId === '') {
      if (to.path === '/forgetPassword'  
      || to.path==='/register'
      ) {
        
        next();
      }
      else{
        Message({
          message: '您需要先进行登录操作',
          type: 'warning'
        });
        //打开登录界面
        startLogin();
        //前往首页
        next({path: '/'});
      }

    } else {
      //登录状态下无法进入的页面
      if (to.path === '/forgetPassword'  
      || to.path==='/register'
      ) {
        Message({
          message: '请先退出登录',
          type: 'warning'
        });
        //前往首页
        console.log('hi');
        next({path: '/'});
      }
      else{
        next();
      }
      
    }
  }
});

export default router
