/*
和顾客信息有关的api接口
*/
import request from '@/utils/request'

export function getCustomerInfo() {
    /*
    检验顾客账号是否存在
    */

    //一定要用这个格式

    return request({
        url: '/v1/personinfo/customer/details',
        method: 'get',
    })
}

export function  uploadAvatar(data){
    return request({
        url:'/v1/personinfo/customer/avatar',
        method:'put',
        data:data
    })

}

export function uploadBasicInfo(data)
{
    return request({
        url: '/v1/personinfo/customer/info',
        method: 'put',
        data:data
    })
}

export function getCustomerGroup(data){
    return request({
        url:'v1/personinfo/customer/group',
        method: 'get'
    })
}
export function getHostGroup(data){
    return request({
        url:'v1/personinfo/host/group',
        method: 'get'
    })
}


