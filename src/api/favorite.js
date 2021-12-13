/*
 * @Author: your name
 * @Date: 2021-07-05 20:16:52
 * @LastEditTime: 2021-07-12 09:17:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\favorite.js
 */

import request from '@/utils/request'
import axios from 'axios'

export function GetFavorite() {
  return request({
    url: '/v1/personinfo/favorite/directory',
    method: 'get',
  })
}
  

export function InsertFavorite(data) {
  return request({  
    url: '/v1/personinfo/favorite/addition',
    method: 'post',
    data:data
  })
}

export function DeleteFavorite(data) {

  return request({  
    url: '/v1/personinfo/favorite/deletion',
    method: 'delete',
    data:{favoriteId:data}
  })
}

export function GetFavoriteImage(data){
  return request({  
    url: '/CustomerFavorite/image',
    method: 'get',
    data:data
  })
}


export function GetFavoriteStay(data){
  return request({
    url: '/v1/personinfo/favorite/stayinfo',
    method: 'get',
    params:{favoriteId:data}
  })
}


export function DeleteFavoriteStay(favoriteId,stayId) {
  return request({  
    url: '/v1/personinfo/favorite/stay/deletion',
    method: 'delete',
    data:{favoriteId:favoriteId,stayId:stayId}
  })
}
export function InsertFavoriteStay(favoriteId,stayId) {
  return request({  
    url: '/v1/personinfo/favorite/stay/addition',
    method: 'post',
    data:{favoriteId:favoriteId,stayId:stayId}
  })
}


  
export function DeleteFavoriteStayByView(stayId){
  return request({  
    url: '/v1/personinfo/favorite/stay/heart/deletion',
    method: 'get',
    params:{stayId:stayId}
  })
}

export function GetSpecificStayLikeState(stayId){
  return request({  
    url: '/v1/personinfo/favorite/stay/heart',
    method: 'get',
    params:{stayId:stayId}
  })
}


  

