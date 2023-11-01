<!--
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2022-09-24 18:18:43
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="el-row" style="display: flex">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h3>
            <el-tag style="font-size: 16px">甄选优品项目介绍</el-tag>
          </h3>
        </div>
      </template>
      <div class="text item">
        <el-text type="info" size="large">
          甄选优品是一个B2C模式的电商平台,管理端基于vue3-element-admin进行开发,后端基于SpringBoot构建工程
        </el-text>
        <hr>
        <el-text type="info" size="large">
          用户端基于Vue3+ElementPlus进行开发,并且使用了许多第三方开源组件,例如Pinia,Echarts
        </el-text>
        <hr>
        <el-text type="info" size="large">
          后端使用了许多开源的微服务框架及组件,诸如SpringBoot,SpringCloud,SpringCloud Alibaba,MINIO文件存储,RabbitMQ消息队列,Redis缓存中间件等
        </el-text>
        <hr>
        <el-text type="info" size="large">
          安全方面,git仓库及IDEA都接入了MurPhySec(墨菲安全),实时监测后端依赖及代码漏洞,在这里对墨菲安全致以崇高的敬意
        </el-text>
        <hr>
        <el-text type="info" size="large">
          除此之外,项目中使用了XSSFilter,处理每一个请求中对XSS跨站脚本攻击的防御,并且所有SQL语句都使用预处理,防止SQL注入,项目配置中
        </el-text>
        <hr>
        <el-text type="info" size="large">
          对数据源的明文也做了加密处理,这是每一个项目上线之前必须测试的一环,防止反编译获取数据源账户
        </el-text>
        <hr>
        <el-text type="info">项目模拟企业级开发并在逐渐完善当中,因作者正在上学,更新较慢,会尽快开发完毕并加入诸如代码生成、AI编码等新功能</el-text>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-left: 30px">
      <template #header>
        <div class="card-header">
          <h3>
            <el-tag style="font-size: 16px">甄选优品后端技术栈</el-tag>
          </h3>
        </div>
      </template>
      <div class="text item" v-for="(item,index) in backend_technology" :key="index">
        <el-tag type="danger">{{ item }}</el-tag>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-left: 30px">
      <template #header>
        <div class="card-header">
          <h3>
            <el-tag style="font-size: 16px">甄选优品前端技术栈</el-tag>
          </h3>
        </div>
      </template>
      <div class="text item" v-for="(item,index) in front_technology" :key="index">
        <el-tag type="danger">{{ item }}</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {onMounted, onActivated} from 'vue'

let backend_technology = ["SpringBoot", "SpringCloud", "SpringCloud Alibaba", "MyBatis", "Redis", "MySQL", "elastic search", "RabbitMQ", "Nacos","MINIO","EasyExcel","HttpClient","jasypt"]
let front_technology = ["Node", "Vite" , "Vue3", "ElementPlus", "Vue-Router", "Pinia", "Webpack", "Axios", "i18n","ECharts"]


</script>
<style scoped>
.item {
  margin-top: 10px;
}
</style>
