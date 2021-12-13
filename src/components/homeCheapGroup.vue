<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-11 15:15:47
 * @LastEditTime: 2021-07-13 12:59:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeCheapGroup.vue
-->

<template>
  <div>
    <div v-show="this.stayList.length" class="container">

      <el-col style="margin-left:10%" class="col-card">
                <cardGroup6 v-for="(item,index) in this.stayList" 
                  v-bind:info="item" 
                  :offset="2"
                  :key="index"
                  ></cardGroup6>

      </el-col>


    </div>
  </div>
</template>




