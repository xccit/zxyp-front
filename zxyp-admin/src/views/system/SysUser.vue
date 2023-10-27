<template>
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
    <el-button type="success" size="default">添 加</el-button>
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
    <el-table-column label="操作" align="center" width="280">
      <el-button type="primary" size="small">
        修改
      </el-button>
      <el-button type="danger" size="small">
        删除
      </el-button>
      <el-button type="warning" size="small">
        分配角色
      </el-button>
    </el-table-column>
  </el-table>

  <el-pagination
      v-model:current-page="pageInfo.current"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      @size-change="fetchData"
      @current-change="fetchData"
      layout="total, sizes, prev, pager, next"
      :total="total"
  />

</template>

<script setup>
import {ref, onMounted} from 'vue'
import {list} from '@/api/system/user'

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

//添加数据模型
let sysUser = ref({})

//重置搜索数据
let resetData = async ()=>{
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
