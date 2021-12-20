import request from '@/utils/request'

export function GetCouponInfo() {
    return request({
        url: 'v1/sale/customer/coupon',
        method: 'get'
    })
}

export function GetCustomerCouponInfo(couponLimit, currentPage, pageSize){
    return request({
        url:'/v1/order/coupons',
        method: 'get',
        params: {"couponLimit":couponLimit,"currentPage":currentPage,"pageSize":pageSize}
    })
}


