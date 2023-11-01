<template>
  <div class="search-div">
    <el-form label-width="90px" size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单日期:">
            <el-date-picker
              v-model="createTimes"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="截止日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="1">
          <el-button type="primary" size="small" @click="fetchData()">
            搜索
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-row style="height: 100%">
    <div ref="chart" style="width: 80%; height: 100%;" class="el-col"></div>
    <div class="el-col">
      <el-card class="box-card" style="margin-left: 30px">
        <template #header>
          <div class="card-header">
            <h3>
              <el-tag style="font-size: 16px">订单统计实现思路</el-tag>
            </h3>
          </div>
        </template>
        <div class="text item" v-for="(item, index) in tech" :key="index">
          <el-tag type="info" style="margin-top: 10px">{{ item }}</el-tag>
        </div>
      </el-card>
    </div>
  </el-row>
</template>
<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { GetOrderStatisticsData } from '@/api/order/orderInfo.js'

const tech = [
  '每日凌晨2点统计前一天订单',
  '同步到订单统计表',
  '使用SpringTask',
  '定时任务组件',
]
const chart = ref()
const searchObj = ref({
  createTimeBegin: '',
  createTimeEnd: '',
})
const createTimes = ref([])

onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  if (createTimes.value.length == 2) {
    searchObj.value.createTimeBegin = createTimes.value[0]
    searchObj.value.createTimeEnd = createTimes.value[1]
  }
  const { data } = await GetOrderStatisticsData(searchObj.value)
  setChartOption(data.dateList, data.amountList)
}

const setChartOption = (dateList, amountList) => {
  const myChart = echarts.init(chart.value)
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '订单金额统计',
    },
    tooltip: {},
    legend: {
      data: ['订单总金额（元）'],
    },
    xAxis: {
      data: dateList,
    },
    yAxis: {},
    series: [
      {
        name: '订单总金额（元）',
        type: 'bar',
        data: amountList,
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>
<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>
