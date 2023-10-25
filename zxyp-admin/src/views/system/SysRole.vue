<template>
  <div class="search-div">
    <!-- 添加角色表单对话框 -->
    <el-dialog v-model="dialogVisible" title="添加或修改角色" width="30%">
      <el-form label-width="120px">
        <el-form-item label="角色名称">
          <el-input />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input  />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="small">
      <el-row>
        <el-col>
          <el-form-item label="角色名称:">
            <el-input
                style="width: 200px"
                v-model="queryDto.roleName"
                placeholder="角色名称"
            ></el-input>
            <el-button style="margin-left: 10px" type="primary" size="small" @click="searchSysRole">搜 索</el-button>
            <el-button type="warning" size="small" @click="resetData">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <!-- 添加按钮 -->
  <div class="tools-div">
    <el-button type="success" size="small" @click="addShow">添 加</el-button>
  </div>

  <div>
    <!--- 角色表格数据 -->
    <el-table :data="roleList" style="width: 100%" border stripe>
      <el-table-column prop="roleName" label="角色名称" width="180"/>
      <el-table-column prop="roleCode" label="角色code" width="180"/>
      <el-table-column prop="createTime" label="创建时间" width="200"/>
      <el-table-column prop="updateTime" label="更新时间" width="200"/>
      <el-table-column label="操作" align="center" width="280">
        <el-button type="primary" size="small">
          修改
        </el-button>
        <el-button type="danger" size="small">
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
import {list} from '@/api/system/role';

//弹窗控制
const dialogVisible = ref(false)
//添加按钮事件
const addShow = ()=>{
  dialogVisible.value = true
}
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
  fetchData();
}

// 远程调用后端分页查询接口
const fetchData = async () => {
  const {data, code, message} = await list(pageParams.value.current, pageParams.value.pageSize, queryDto.value);
  roleList.value = data.list
  total.value = data.total
}

const resetData = () => {
  queryDto.value = null
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
