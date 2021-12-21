import request from '@/utils/request'


export function GetHostOrderInfo(currentPage, pageSize) {
    return request({
        url: '/v1/orders/host',
        method: 'get',
        params: {currentPage: currentPage, pageSize:pageSize}
    })
}
export function GetHostOrderInfoByStatus(currentPage, pageSize, orderStatus){
    return request({
        url: '/v1/orders/host',
        method: 'get',
        params: {currentPage:currentPage,pageSize:pageSize,orderStatus:orderStatus}
    })
}

export function GetFootMap() {
    return request({
        url: '/v1/order/footMap',
        method: 'get'
    })
}

export function GetCustomerOrderInfo(currentPage, pageSize) {
    return request({
        url: '/v1/orders/customer',
        method: 'get',
        params: {currentPage: currentPage, pageSize: pageSize}
    })
}
export function GetCustomerOrderInfoByStatus(currentPage, pageSize, orderStatus){
    return request({
        url: '/v1/orders/customer',
        method: 'get',
        params: {currentPage:currentPage,pageSize:pageSize,orderStatus:orderStatus}
    })
}

export function AddCustomerComment(orderId, commentScore, commentContent) {
    return request({
        url: '/v1/order/comment/customer',
        method: 'post',
        data: {orderId: orderId, commentScore: commentScore,
            commentContent: commentContent},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function AddHostComment(orderId, commentScore, commentContent) {

    return request({
        url: '/v1/order/comment/host',
        method: 'post',
        data: {orderId: orderId, commentScore: commentScore,
            commentContent: commentContent},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function ReportCustomerOrder(orderId, reportReason) {

    return request({
        url: '/v1/order/report',
        method: 'post',
        data: {orderId: orderId, reportReason: reportReason},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function AddOrder(data) {

    return request({
        url: '/v1/trade/order',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function UseCouponForOrder(couponId){
    return request({
        url: '/v1/order/coupon',
        method: 'put',
        params: {'couponId':couponId,'couponStatus':1}
    })
}

export function RefundForOrder(orderId,orderTime,totalCost){
    return request({
        url: '/v1/trade/refund',
        method: 'post',
        data: {"orderId":orderId,"orderTime":orderTime,"totalCost":totalCost},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function RePaymentForOrder(orderId,orderTime,totalCost){
    return request({
        url: '/v1/trade/repayment',
        method: 'post',
        data: {"orderId":orderId,"orderTime":orderTime,"totalCost":totalCost},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function CancelOrder(orderId){
    return request({
        url: "/v1/trade/order",
        method: 'delete',
        params: {"orderId":orderId}
    })
}