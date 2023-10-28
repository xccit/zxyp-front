<template>
  <!-- 弹窗 -->
  <el-dialog v-model="dialogVisible" :title="sysUser.id ? '修改用户' : '添加用户' " width="40%">
    <el-form label-width="120px">
      <el-form-item label="用户名:">
        <el-input v-model="sysUser.userName"/>
      </el-form-item>
      <el-form-item v-if="!sysUser.id" label="密码">
        <el-input type="password" show-password v-model="sysUser.password"/>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="sysUser.name"/>
      </el-form-item>
      <el-form-item label="手机:">
        <el-input v-model="sysUser.phone"/>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="sysUser.status" class="m-2" :placeholder="sysUser.value === 0 ? '停用' : '正常'"
                   size="large">
          <el-option
              v-for="item in statusSelect"
              :key="item.value"
              :label="item.tag"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像:">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/admin/system/upload"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="sysUser.avatar" :src="sysUser.avatar" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述:">
        <el-input v-model="sysUser.description"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sysUser.id ? updateUser() : saveUser()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!---搜索表单-->
  <div class="search-div">
    <el-form label-width="70px" size="default">
      <el-row>
        <el-col :span="6">
          <el-form-item label="关键字:">
            <el-input
                style="width: 200px"
                placeholder="用户名"
                v-model="queryDto.keyword"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:" label-width="100px">
            <el-date-picker
                v-model="timesPicker"
                style="width: 400px"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="default" style="margin-left: 20px" @click="fetchData">
            搜索
          </el-button>
          <el-button type="warning" size="default" @click="resetData">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>

  <!--添加按钮-->
  <div class="tools-div">
    <el-button type="success" size="default" @click="showAdd">添 加</el-button>
  </div>

  <!---数据表格-->
  <el-table :data="userList" style="width: 100%">
    <el-table-column prop="userName" label="用户名"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="phone" label="手机"/>
    <el-table-column prop="avatar" label="头像" #default="scope">
      <img :src="scope.row.avatar" width="50"/>
    </el-table-column>
    <el-table-column prop="description" label="描述"/>
    <el-table-column prop="status" label="状态" #default="scope">
      <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">
        {{ scope.row.status == 1 ? '正常' : '停用' }}
      </el-tag>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间"/>
    <el-table-column label="操作" align="center" width="280" #default="scope">
      <el-button type="primary" size="small" @click="showUpdate(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="small" @click="removeConfirm(scope.row.id)">
        删除
      </el-button>
      <el-button type="info" size="small">
        分配角色
      </el-button>
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
import {ref, onMounted} from 'vue'
import {list, save, update, remove} from '@/api/system/user'
import {ElMessageBox, ElMessage} from "element-plus"
import {useApp} from "@/pinia/modules/app"

//文件上传模型+回调
const headers = {
  token: useApp().authorization.token     // 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
}
// 图像上传成功以后的事件处理函数
const handleAvatarSuccess = (response, uploadFile) => {
  sysUser.value.avatar = response.data
}

//弹窗控制
let dialogVisible = ref(false)
// 表格数据模型
const userList = ref([]);

// 分页条数据模型
const total = ref(0)
const pageInfo = ref({
  current: 1,
  pageSize: 10
})
//搜索数据模型
let timesPicker = ref([])
let searchForm = ref({
  keyword: "",
  createTimeBegin: "",
  createTimeEnd: ""
})

let queryDto = ref(searchForm)

//添加/修改数据模型
let userForm = {
  "id": '',
  "userName": "",
  "password": "",
  "name": "",
  "phone": "",
  "avatar": "",
  "description": ""
}
let sysUser = ref(userForm)
let statusSelect = [
  {tag: '正常', value: 1},
  {tag: '停用', value: 0}
]

//添加事件
const showAdd = () => {
  sysUser.value = {}
  console.log(sysUser.value)
  dialogVisible.value = true
}

const saveUser = async () => {
  const {code, message, data} = await save(sysUser.value)
  if (code === 200) {
    ElMessage.success('添加成功')
    dialogVisible.value = false
    await fetchData()
  } else {
    ElMessage.success('添加失败')
    dialogVisible.value = false
    await fetchData()
  }
}

//修改事件
const showUpdate = (row) => {
  sysUser.value = {...row}
  console.log(sysUser.value)
  dialogVisible.value = true
}

const updateUser = async () => {
  const {code, message, data} = await update(sysUser.value)
  if (code === 200) {
    ElMessage.success('修改成功')
    dialogVisible.value = false
    await fetchData()
  } else {
    ElMessage.success('修改失败')
    dialogVisible.value = false
    await fetchData()
  }
}

//删除模型
let userIds = ref([])
//删除事件
const removeConfirm = async (id) => {
  userIds.value = []
  userIds.value.push(id)
  await ElMessageBox.confirm("此操作将永久删除记录,是否继续?", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async ()=>{
    const {code, message, data} = await remove(userIds.value)
    if (code === 200) {
      ElMessage.success("删除成功")
      await fetchData()
    } else {
      ElMessage.error("删除失败")
      await fetchData()
    }
  }).catch(async ()=>{
    ElMessage.info("取消删除")
  })
}
//重置搜索数据
let resetData = async () => {
  searchForm.value.keyword = ''
  timesPicker.value = []
  await fetchData()
}

//刷新数据
const fetchData = async () => {
  queryDto.value.createTimeBegin = timesPicker.value[0]
  queryDto.value.createTimeEnd = timesPicker.value[1]
  const {code, message, data} = await list(pageInfo.value.current, pageInfo.value.pageSize, queryDto.value)
  userList.value = data.list
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
