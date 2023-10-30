<template>
  <div class="tools-div">
    <el-button type="success" size="small" @click="exportCategory">导出</el-button>
    <el-button type="primary" size="small">导入</el-button>
  </div>

  <!---懒加载的树形表格-->
  <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="fetchData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="name" label="分类名称"/>
    <el-table-column prop="imageUrl" label="图标" align="center" #default="scope">
      <img :src="scope.row.imageUrl" width="50"/>
    </el-table-column>
    <el-table-column prop="status" label="状态" align="center" #default="scope">
      <el-tag :type="scope.row.status == 1 ? 'primary' : 'danger'">
        {{ scope.row.status == 1 ? '正常' : '停用' }}
      </el-tag>
    </el-table-column>
    <el-table-column prop="createTime" align="center" label="创建时间"/>
    <el-table-column prop="updateTime" align="center" label="更新时间"/>
  </el-table>

</template>

<script setup>
import {ref, onMounted} from 'vue';
import {exportData, listCategoryByParentID} from "@/api/product/category";

// 定义list属性模型
const list = ref([
  {"id": 1, "name": "数码", "orderNum": "1", "status": 1, "createTime": "2023-05-22", "hasChildren": true},
  {"id": 2, "name": "手机", "orderNum": "1", "status": 1, "createTime": "2023-05-22"},
])

// 页面初始化完毕以后请求后端接口查询数据
onMounted(async () => {
  const {code , data , message} = await listCategoryByParentID(0)
  list.value = data ;
})

//导出
const exportCategory = () => {
  // 调用 ExportCategoryData() 方法获取导出数据
  exportData().then(res => {
    // 创建 Blob 对象，用于包含二进制数据
    const blob = new Blob([res]);
    // 创建 a 标签元素，并将 Blob 对象转换成 URL
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    // 设置下载文件的名称
    link.download = '分类数据.xlsx';
    // 模拟点击下载链接
    link.click();
  })
}

// 加载数据的方法
const fetchData = async (row, treeNode, resolve) => {

  // 向后端发送请求获取数据
  const {code , data , message} = await listCategoryByParentID(row.id)

  // 返回数据
  resolve(data)

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

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>