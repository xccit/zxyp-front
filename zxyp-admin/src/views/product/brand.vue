<template>
  <div class="tools-div">
    <el-button type="success" size="default" @click="addShow">添 加</el-button>
  </div>

  <!--添加弹窗-->
  <el-dialog
    v-model="dialogVisible"
    :title="brand.id == null ? '添加品牌' : '修改品牌'"
    width="30%"
  >
    <el-form label-width="120px">
      <el-form-item label="品牌名称">
        <el-input v-model="brand.name" />
      </el-form-item>
      <el-form-item label="品牌图标">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/admin/system/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="headers"
        >
          <img v-if="brand.logo" :src="brand.logo" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-table :data="list" style="width: 100%" border stripe>
    <el-table-column prop="id" width="120" label="品牌编号" align="center" />
    <el-table-column prop="name" width="120" label="品牌名称" align="center" />
    <el-table-column
      prop="logo"
      label="品牌图标"
      align="center"
      width="180"
      #default="scope"
    >
      <img :src="scope.row.logo" width="50" />
    </el-table-column>
    <el-table-column prop="createTime" align="center" label="创建时间" />
    <el-table-column prop="updateTime" align="center" label="更新时间" />
    <el-table-column label="操作" align="center" width="200" #default="scope">
      <el-button type="primary" size="default" @click="editShow(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="default" @click="removeData(scope.row.id)">
        删除
      </el-button>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:current-page="pageParams.current"
    v-model:page-size="pageParams.pageSize"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  updateBrand,
  removeBrand,
  listBrand,
  saveBrand,
} from '@/api/product/brand'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useApp } from '@/pinia/modules/app'

//删除
let ids = ref([])
const removeData = async id => {
  ids.value = []
  ids.value.push(id)
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { code } = await removeBrand(ids.value)
      if (code === 200) {
        ElMessage.success('删除成功')
        await fetchData()
      } else {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      ElMessage.info('取消删除')
      ids.value = []
    })
}

//修改&添加
const headers = {
  // 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
  token: useApp().authorization.token,
}
// 定义提交表单数据模型
const defaultForm = {
  id: '',
  name: '',
  logo: '',
}
const brand = ref(defaultForm)
const dialogVisible = ref(false)

// 显示添加品牌表单
const addShow = () => {
  brand.value = {}
  dialogVisible.value = true
}

//进入修改
const editShow = row => {
  brand.value = row
  dialogVisible.value = true
}

// 修改
const updateData = async () => {
  const { code, message } = await updateBrand(brand.value)
  if (code === 200) {
    dialogVisible.value = false
    ElMessage.success(message)
    await fetchData()
  } else {
    ElMessage.error(message)
  }
}

//上传
const handleAvatarSuccess = response => {
  brand.value.logo = response.data
}

// 保存数据
const saveOrUpdate = () => {
  if (!brand.value.id) {
    saveData()
  } else {
    updateData()
  }
}

// 新增
const saveData = async () => {
  await saveBrand(brand.value)
  dialogVisible.value = false
  ElMessage.success('操作成功')
  await fetchData()
}

// 定义表格数据模型
const list = ref([])

// 分页条数据模型
const total = ref(0)

//分页条数据模型
const pageParamsForm = {
  current: 1, // 页码
  pageSize: 10, // 每页记录数
}
const pageParams = ref(pageParamsForm)

// 钩子函数
onMounted(() => {
  fetchData()
})

//页面变化
const handleSizeChange = size => {
  pageParams.value.pageSize = size
  fetchData()
}
const handleCurrentChange = number => {
  pageParams.value.current = number
  fetchData()
}

// 分页查询
const fetchData = async () => {
  const { code, message, data } = await listBrand(
    pageParams.value.current,
    pageParams.value.pageSize
  )
  list.value = data.list
  total.value = data.total
}
</script>

<style scoped>
.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>
