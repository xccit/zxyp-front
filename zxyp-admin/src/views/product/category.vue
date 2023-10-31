<template>
  <div class="tools-div">
    <el-button type="success" size="small" @click="exportCategory">导出</el-button>
    <el-button type="primary" size="small" @click="importCategory">导入</el-button>
  </div>
  <!--修改数据弹窗-->
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
    <el-form label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="categoryDto.name"/>
      </el-form-item>
      <el-form-item label="图标:">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/admin/system/upload"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="categoryDto.imageUrl" :src="categoryDto.imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="categoryDto.orderNum"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="categoryDto.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!--文件上传弹窗-->
  <el-dialog v-model="dialogImportVisible" title="导入" width="30%">
    <el-form label-width="120px">
      <el-form-item label="分类Excel文件:">
        <el-upload
            class="upload-demo"
            action="http://localhost:8081/admin/product/category/import"
            :on-success="onUploadSuccess"
            :headers="headers"
        >
          <el-button type="primary">导入</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>

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
    <el-table-column prop="orderNum" align="center" label="排序"/>
    <el-table-column prop="createTime" align="center" label="创建时间"/>
    <el-table-column prop="updateTime" align="center" label="更新时间"/>
    <el-table-column prop="status" label="操作" align="center" #default="scope">
      <el-button type="warning" @click="showUpdate(scope.row)">编辑</el-button>
      <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
    </el-table-column>
  </el-table>

</template>

<script setup>
import {ref, onMounted} from 'vue';
import {exportData, importData, listCategoryByParentID, updateCategory, removeCategory} from "@/api/product/category";
import {ElMessage} from "element-plus";
import {useApp} from "@/pinia/modules/app";

//删除
const remove = async (id) => {
  const {code, message} = await removeCategory(id)
  if (code === 200) {
    ElMessage.success(message)
    const {code, data, message} = await listCategoryByParentID(0)
    list.value = data;
  } else {
    ElMessage.error(message)
    const {code, data, message} = await listCategoryByParentID(0)
    list.value = data;
  }
}

//修改
let categoryDto = ref({})
let dialogVisible = ref(false)
let dialogTitle = ref('修改分类信息')
const handleAvatarSuccess = (response, uploadFile) => {
  categoryDto.value.imageUrl = response.data
}
const showUpdate = (row) => {
  categoryDto.value = {...row}
  dialogVisible.value = true
}
const update = async (resolve) => {
  const {code} = updateCategory(categoryDto.value)
  ElMessage.success('修改成功')
  const {data} = await listCategoryByParentID(0)
  location.reload();
}
// 定义list属性模型
const list = ref([
  {"id": 1, "name": "数码", "orderNum": "1", "status": 1, "createTime": "2023-05-22", "hasChildren": true},
  {"id": 2, "name": "手机", "orderNum": "1", "status": 1, "createTime": "2023-05-22"},
])

// 页面初始化完毕以后请求后端接口查询数据
onMounted(async () => {
  const {code, data, message} = await listCategoryByParentID(0)
  list.value = data;
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

//导入
const dialogImportVisible = ref(false)
const headers = {
  token: useApp().authorization.token     // 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
}
const importCategory = () => {
  dialogImportVisible.value = true
}

// 上传文件成功以后要执行方法
const onUploadSuccess = async (response, file) => {
  dialogImportVisible.value = false
  const {code, message} = await importData()
  if (code === 200) {
    ElMessage.success(message)
    const {data} = await listCategoryByParentID(0)
    list.value = data;
  } else {
    ElMessage.error(message)
  }
}

// 加载数据的方法
const fetchData = async (row, treeNode, resolve) => {

  // 向后端发送请求获取数据
  const {code, data, message} = await listCategoryByParentID(row.id)

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
