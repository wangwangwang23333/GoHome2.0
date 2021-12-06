/*
和房源有关的api

*/

import request from '@/utils/request'

export function getStayTypeList(){
    return request({
        url:'/v1/stay/type',
        method:'get'
    })
};

export function getStayTagList(){
    return request({
        url:'/v1/stay/tag',
        method:'get'
    })
};

export function getHostStayDetailedInfo(stayID){
    let param=new URLSearchParams({stayId:stayID});
    return request({
        url:'v1/stay/host/brief',
        method:'get',
        params:param
    })
}

export function isHostSameWithCustomer(stayID){
    let param=new URLSearchParams({stayId:stayID});
    return request({
        url:'v1/stay/host/equal',
        method:'get',
        params:param
    })
}

export function postStayInfo(data) {
    return request({
        url: '/v1/stay',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
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

export function getStayDetails(stayId){
    return request({
        url: '/v1/stay',
        method: 'get',
        params: {'stayId':stayId},
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
        url: 'v1/stay/getPrice',
        method: 'get',
        params: data,
    })
}

export function getHostStayInfo(){
    return request({
        url: 'v1/stay/host',
        method: 'get',
    })
}

