/*
和房源有关的api

*/

import request from '@/utils/request'

export function getStayTypeList(){
    return request({
        url:'/stay/type',
        method:'get'
    })
};

export function getStayTagList(){
    return request({
        url:'/stay/tag',
        method:'get'
    })
};

export function postStayInfo(data){
    console.log(data);
    let form=new URLSearchParams(data);
    return request({
        url:'/v1/stay',
        method:'post',
        data:form,
        
    })
}

export function putStayInfo(data){
    let param=new URLSearchParams(data);
    return request({
        url:'/stay/infos',
        method:'put',
        data:param,
    })
}

export function getStayDetails(data){
    return request({
        url: '/v1/stay',
        method: 'get',
        params: data,
    })
}

export function getComments(stayId){
    return request({
        url: 'v1/stay/comment',
        method: 'get',
        params: {stayId: stayId},
    })
}

export function getPrice(data){
    return request({
        url: '/stay/getPrice',
        method: 'get',
        params: data,
    })
}

