

import request from '@/utils/request'

export function getDefaultPostList(currentPage,pageSize) {

    return request({
        url: '/v1/posts/post/list/default',
        method: 'get',
        params: {currentPage:currentPage,pageSize:pageSize}
    })
}


export function getDefaultTagList(currentPage,pageSize) {

    return request({
        url: '/v1/posts/tag/list/default',
        method: 'get',
        params: {currentPage:currentPage,pageSize:pageSize}
    })
}


export function getPersonalPostList(customerId,currentPage,pageSize) {

    return request({
        url: '/v1/posts/post/list/personal',
        method: 'get',
        params: {customerId:customerId,currentPage:currentPage,pageSize:pageSize}
    })
}


export function getTagSelectedPostList(tag,currentPage,pageSize) {

    return request({
        url: '/v1/posts/post/list/tag',
        method: 'get',
        params: {tag:tag,currentPage:currentPage,pageSize:pageSize}
    })
}

export function getKeyWordSelectedPostList(key,currentPage,pageSize) {

    return request({
        url: '/v1/posts/post/list/keyWord',
        method: 'get',
        params: {key:key,currentPage:currentPage,pageSize:pageSize}
    })
}

export function getDetailedPost(postId) {

    return request({
        url: '/v1/posts/post/detail',
        method: 'get',
        params: {postId:postId}
    })
}

export function getPostReplyList(postId,currentPage,pageSize) {

    return request({
        url: '/v1/posts/reply/list',
        method: 'get',
        params: {postId:postId,currentPage:currentPage,pageSize:pageSize}
    })
}

export function getSonReplyList(replyId,currentPage,pageSize) {

    return request({
        url: '/v1/posts/reply/sonReply/list',
        method: 'get',
        params: {replyId:replyId,currentPage:currentPage,pageSize:pageSize}
    })
}

export function getPostLikeStatus(postId){
    return request({
        url: '/v1/posts/like/post/status',
        method: 'get',
        params: {postId:postId,customerId:0}
    })
}

export function getReplyLikeStatus(replyId){
    return request({
        url: '/v1/posts/like/reply/status',
        method: 'get',
        params: {replyId:replyId,customerId:0}
    })
}

export function addPost(data) {

    return request({
        url: '/v1/posts/post',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function addPostReport(reportedCustomerId, reportReason) {

    return request({
        url: '/v1/posts/post/report',
        method: 'post',
        data: {
            reportedCustomerId: reportedCustomerId,
            reportReason: reportReason
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getPostReport(reportedCustomerId) {

    return request({
        url: '/v1/posts/post/report',
        method: 'get',
        params: {
            reportedCustomerId: reportedCustomerId
        }
    })
}

export function deletePost(postId) {
    return request({
        url: '/v1/posts/post',
        method: 'delete',
        params: {postId:postId,customerId:0}
    })
}

export function addReply(data) {

    return request({
        url: '/v1/posts/reply',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function addPostLike(data) {

    return request({
        url: '/v1/posts/like/post',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function addReplyLike(data) {

    return request({
        url: '/v1/posts/like/reply',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function deletePostLike(postId) {
    return request({
        url: '/v1/posts/like/post',
        method: 'delete',
        params: {postId:postId,customerId:0}
    })
}

export function deleteReplyLike(replyId) {
    return request({
        url: '/v1/posts/like/reply',
        method: 'delete',
        params: {replyId:replyId,customerId:0}
    })
}

export function uploadPostImage(data) {
    return request({
        url: '/v1/posts/post/img',
        method: 'post',
        data: data
    })
}

