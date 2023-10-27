<template>
  <div class="search-div">
    <!-- 添加角色表单对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form label-width="120px">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName"/>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="sysRole.description"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sysRole.id == null ? saveRole() : updateRole()">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="default">
      <el-row>
        <el-col>
          <el-form-item label="角色名称:" label-width="80px">
            <el-input
                style="width: 200px;"
                v-model="queryDto.roleName"
                placeholder="角色名称"
            ></el-input>
            <el-button style="margin-left: 10px" type="primary" size="default" @click="searchSysRole">搜 索</el-button>
            <el-button type="warning" size="default" @click="resetData">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <!-- 添加按钮 -->
  <div class="tools-div">
    <el-button type="success" size="default" @click="addShow">添 加</el-button>
  </div>

  <div>
    <!--- 角色表格数据 -->
    <el-table :data="roleList" style="width: 100%" border stripe>
      <el-table-column prop="roleName" label="角色名称" width="180"/>
      <el-table-column prop="roleCode" label="角色编码" width="180"/>
      <el-table-column prop="description" label="角色描述" width="180"/>
      <el-table-column prop="createTime" label="创建时间" width="200"/>
      <el-table-column prop="updateTime" label="更新时间" width="200"/>
      <el-table-column label="操作" align="center" width="280" #default="scope">
        <el-button type="primary" size="default" @click="updateShow(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="default" @click="removeConfirm(scope.row.id)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
        v-model:current-page="pageParams.current"
        v-model:page-size="pageParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="fetchData"
        @current-change="fetchData"
        layout="total, sizes, prev, pager, next"
        :total="total"
    />
  </div>
</template>

<!-- script部分修改内容 -->
<script setup>
import {ref, onMounted} from 'vue';
import {list, save, remove, update} from '@/api/system/role';
import {ElMessage, ElMessageBox} from "element-plus";

//弹窗控制
const dialogVisible = ref(false)
const dialogTitle = ref("添加角色")

//删除数据模型
const ids = ref([])

//删除按钮点击事件
const removeConfirm = async (id) => {
  ids.value = []
  ids.value.push(id)
  await ElMessageBox.confirm("此操作将永久删除记录,是否继续?", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async ()=>{
    const {code, message, data} = await remove(ids.value)
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

//修改按钮事件
const updateShow = (role) => {
  sysRole.value = {...role}
  dialogTitle.value = "修改角色"
  dialogVisible.value = true
}

const updateRole = async () => {
  const {code, message, data} = await update(sysRole.value)
  if (code === 200) {
    dialogVisible.value = false
    ElMessage.success("修改成功")
    await fetchData()
  } else {
    dialogVisible.value = false
    ElMessage.error("修改失败")
    await fetchData()
  }
}
//添加按钮事件
const addShow = () => {
  dialogTitle.value = "添加角色"
  sysRole.value = {}
  dialogVisible.value = true
}
const saveRole = async () => {
  const {code, message, data} = await save(sysRole.value)
  if (code === 200) {
    dialogVisible.value = false
    ElMessage.success("添加成功")
    await fetchData()
  } else {
    ElMessage.error("请检查参数")
    dialogVisible.value = false
    await fetchData()
  }
}
//添加/修改角色数据模型
const roleForm = {
  roleName: "",
  roleCode: "",
  description: ""
}

const sysRole = ref(roleForm)
// 分页条总记录数
let total = ref(0)

// 定义表格数据模型
let roleList = ref([])

//分页数据
const pageParamsForm = {
  current: 1, // 页码
  pageSize: 10 // 每页记录数
}
const pageParams = ref(pageParamsForm)     // 将pageParamsForm包装成支持响应式的对象

// 搜索表单数据
const queryDto = ref({"roleName": ""})

// 页面加载完毕以后请求后端接口获取数据
onMounted(() => {
  fetchData();
})

// 搜索按钮点击事件处理函数
const searchSysRole = () => {
  fetchData()
}

// 远程调用后端分页查询接口
const fetchData = async () => {
  const {data, code, message} = await list(pageParams.value.current, pageParams.value.pageSize, queryDto.value);
  roleList.value = data.list
  total.value = data.total
}


//重置按钮事件
const resetData = () => {
  queryDto.value = {roleName: ""}
  fetchData()
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
