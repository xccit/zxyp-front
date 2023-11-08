<template>
  <!---数据表格-->
  <el-table :data="logList" style="width: 100%" stripe border>
    <el-table-column prop="title" label="模块标题" align="center" />
    <el-table-column prop="method" label="方法名称" align="center" />
    <el-table-column prop="requestMethod" label="请求方式" align="center" />
    <el-table-column prop="operName" label="操作人员" align="center" />
    <el-table-column prop="operUrl" label="请求URL" align="center" />
    <el-table-column prop="operIp" label="请求IP" align="center" />
    <el-table-column
      prop="createTime"
      label="请求时间"
      align="center"
      #default="scope"
    >
      <el-icon><Clock /></el-icon>
      {{ scope.row.createTime }}
    </el-table-column>
    <el-table-column
      prop="status"
      label="请求状态"
      align="center"
      #default="scope"
    >
      <el-tag :type="scope.row.status === 0 ? 'success' : 'warning'">
        {{ scope.row.status == 0 ? '成功' : '失败' }}
      </el-tag>
    </el-table-column>
    <el-table-column
      prop="errorMsg"
      label="异常信息"
      align="center"
      #default="scope"
    >
      <el-tag
        :type="
          scope.row.errorMsg == null || scope.row.errorMsg == ''
            ? 'success'
            : 'danger'
        "
      >
        {{
          scope.row.errorMsg == null || scope.row.errorMsg == ''
            ? '无异常'
            : scope.row.errorMsg
        }}
      </el-tag>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:current-page="pageInfo.current"
    v-model:page-size="pageInfo.pageSize"
    :page-sizes="[5, 10, 20, 50]"
    @size-change="fetchData"
    @current-change="fetchData"
    layout="total, sizes, prev, pager, next"
    :total="total"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { list } from '@/api/log/operLog'

// 表格数据模型
const logList = ref([])

// 分页条数据模型
const total = ref(0)
const pageInfo = ref({
  current: 1,
  pageSize: 10,
})

//刷新数据
const fetchData = async () => {
  const { code, message, data } = await list(
    pageInfo.value.current,
    pageInfo.value.pageSize
  )
  logList.value = data.list
  total.value = data.total
}
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
