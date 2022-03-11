/*
 * @Author: your name
 * @Date: 2021-07-05 19:12:01
 * @LastEditTime: 2021-07-09 19:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\customer.js
 */

/*
和顾客有关的api接口
*/

import request from '@/utils/request'
import axios from "axios";
import {getDomainUrl} from "../utils/request";

export function customerLogin(data) {
    /*
    顾客登录
    */
    axios.defaults.withCredentials = true;
    let param = new URLSearchParams(data)
    console.log('paramss', param);
    console.log('data', data);
    var config = {
        method: 'get',
        url: getDomainUrl() + '/sso/doLogin',
        params: data,
    };
    
    return axios(config)
    // return request({
    //     url: '/sso/doLogin',
    //     method: 'GET',
    //     params: param
    // })
}

export function userLogout() {
    var config = {
        method: 'get',
        url: getDomainUrl() + '/sso/logout',
        headers: {}
    };

    return axios(config)
}

export function getCustomerInfo() {
    return request({
        url: "/v1/login/userBriefInfo",
        method: "GET"
    })
}

export function getUserPhone() {
    var config = {
        method: "GET",
        url: "/v1/login/getLoginPhone"
    }

    return request(config)
}

export function customerRegister(data) {
    /*
    顾客注册账号
    */
    return request({
        url: '/v1/signup/customer',
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export function customerPhoneUnique(data) {
    /*
    检验顾客手机号是否被注册过
    未被注册过，则返回true
    */
    let param = new URLSearchParams(data)

    return request({
        url: '/v1/signup/checkPhone',
        method: 'GET',
        params: param
    })
}

// export function getFavorite() {
//   return request({
//     url: '/CustomerFavorite',
//     method: 'get',
//   })
// }

export function testToken() {
    /*
    返回当前登录的用户的创建时间
    */
    return request({
        url: '/customer/createtime',
        method: 'get'
    })
}

export function changeCustomerPassword(data) {
    /*
    修改顾客账号密码
    返回修改状态
    */
    // let param = new URLSearchParams(data)
    console.log("发送的参数为",data)
    return request({
        url: '/v1/signup/changePassword',
        method: 'put',
        params: data
    })
}
