/*
一些公用的api库
*/
import request from '@/utils/request'

export function sendMessage(data) {
    /*
    向指定手机号发送验证码
    */

    return request({
        url: 'v1/signup/smsVerifyCode',
        method: 'get',
        params: data
    })
}

export function getVerifyCode() {
    /*
    生成4位随机验证码
    */
    return request({
        url: '/v1/login/verificationCode',
        method: 'get'
    })
}

export function IDVerify(data) {
    /*
    身份证照片校验
    */
    console.log(data)
    return request({
        url: 'v1/signup/verifyResidentId',
        method: 'post',
        data: data
    })
}