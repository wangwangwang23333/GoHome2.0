import request from '@/utils/request'

export function getHostStayAge(data){
    /*获取房源的顾客年龄可视化报表*/
    return request({
        url: '/v1/statistics/stay/age',
        method: 'get',
        params:data
    })
}

export function getHostStayGender(data){
    /*获取房源的顾客性别可视化报表*/
    return request({
        url: '/v1/statistics/stay/gender',
        method: 'get',
        params:data
    })
}

export function getStayOrderChart(data){
    /*获取房源的订单可视化报表*/
    return request({
        url: '/v1/statistics/stay/order/year',
        method: 'get',
        params:data
    })
}