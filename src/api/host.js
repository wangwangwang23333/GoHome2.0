/*
和房东有关的api接口
*/

import request from '@/utils/request'

export function hostLogin(data) {
    /*
    房东登录
    */
  
    let param = new URLSearchParams(data)
  
    return request({
      url: '/login/host',
      method: 'post',
      data:param
    })
  }

  
export function hostRegister(data){
  /*
  房东注册账号
  */
 let param=new URLSearchParams(data)

 return request({
   url:'/register/host',
   method:'post',
   data:param
 })
}



export function hostPhoneUnique(data){
  /*
  检验房东手机号是否被注册过
  未被注册过，则返回true
  */
  let param=new URLSearchParams(data)

  return request({
    url:'/host/phone',
    method:'post',
    data:param
  })
}

export function changeHostPassword(data){
  /*
  修改房东账号密码
  返回修改状态
  */
  let param=new URLSearchParams(data)

  return request({
    url:'/host/changepassword',
    method:'post',
    data:param
  })
}

export function getHostPageInfo(data){
    return request({
        url: '/v1/personinfo/host/info',
        method: 'get',
        params:data
    })
}


export function updateHostNickName(data) {
    /*
    房东修改昵称
     */
    console.log("房东昵称",data)

    return request({
        url: '/v1/personinfo/host/nickName',
        method: 'put',
        data:data
    })
}


export function updateHostAvatar(data) {
    /*
    房东更改昵称
    */

    return request({
        url: '/v1/personinfo/host/avatar',
        method: 'put',
        data:data
    })
}

export function DeleteStay(data) {
    console.log("进入删除房源的调用",data)
    data = data.toLong
    return request({
        url: '/v1/stay',
        method: 'delete',
        data:data
    })
}

export function getAllStayData(data){
    /*获取房东的基本信息*/
    console.log("成功进入获取房源所有信息")
    return request({
        url: '/stay/infos',
        method: 'get',
        params:data
    })
}

export function getStayOrderChart(data){
    /*获取房源的订单可视化报表*/
    return request({
        url: '/Stay/StayOrderInfo',
        method: 'get',
        params:data
    })
}