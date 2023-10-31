<template>
  <div class="search-div">
    <el-form label-width="70px" size="default">
      <el-row>
        <el-col :span="6">
          <el-form-item label="品牌:">
            <el-select
                class="m-2"
                placeholder="选择品牌"
                size="default"
                style="width: 100%"
                v-model="queryDto.brandId"
            >
              <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分类:">
            <el-cascader
                :props="categoryProps"
                style="width: 100%"
                v-model="searchCategoryIdList"
            />
          </el-form-item>
        </el-col>
        <el-row style="display:flex;margin-left: 20px;">
          <el-button type="primary" size="default" @click="fetchData()">
            搜索
          </el-button>
          <el-button size="default" @click="resetData">重置</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>

  <div class="tools-div">
    <el-button type="success" size="default">添 加</el-button>
  </div>

  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="categoryName" label="分类"/>
      <el-table-column prop="categoryImage" label="分类图标" #default="scope">
        <img :src="scope.row.categoryImage" width="50"/>
      </el-table-column>
      <el-table-column prop="brandName" label="品牌"/>
      <el-table-column prop="logo" label="品牌图标" #default="scope">
        <img :src="scope.row.logo" width="50"/>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="updateTime" label="更新时间"/>
      <el-table-column label="操作" align="center" width="200">
        <el-button type="primary" size="default">
          修改
        </el-button>
        <el-button type="danger" size="default">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:current-page="pageParams.page"
        v-model:page-size="pageParams.limit"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {brandLists} from "@/api/product/brand";
import {listCategoryBrand} from "@/api/product/categoryBrand";
import {listCategoryByParentID} from "@/api/product/category";

// ================数据模型定义  start ===============================================
const props = {
  lazy: true,
  value: 'id',
  label: 'name',
  leaf: 'leaf',
  async lazyLoad(node, resolve) {   // 加载数据的方法
    if (typeof node.value == 'undefined') node.value = 0
    const {data} = await listCategoryByParentID(node.value)
    data.forEach(function (item) {       //hasChildren判断是否有子节点
      item.leaf = !item.hasChildren
    })
    resolve(data)  // 返回数据
  }
};

const categoryProps = ref(props)

//查询所有品牌
const selectAllBrandList = async () => {
  const {data} = await brandLists()
  brandList.value = data
}

// 定义搜索表单数据模型
const brandList = ref([])
// 定义表格数据模型
const list = ref([])
// 分页条数据模型
const total = ref(0)
// 搜索表单数据模型
const queryDto = ref({brandId: '', categoryId: ''})
const searchCategoryIdList = ref([])
//分页条数据模型
const pageParamsForm = {
  current: 1,   // 页码
  pageSize: 10, // 每页记录数
}
const pageParams = ref(pageParamsForm)

// onMounted钩子函数
onMounted(() => {
  selectAllBrandList() // 查询所有的品牌数据
  fetchData()
})

//重置
const resetData = () => {
  queryDto.value = {brandId: '', categoryId: ''}
  searchCategoryIdList.value = []
  fetchData()
}

//分页变化
const handleSizeChange = size => {
  pageParams.value.pageSize = size
  fetchData()
}
const handleCurrentChange = number => {
  pageParams.value.current = number
  fetchData()
}

// 分页列表查询
const fetchData = async () => {
  if (searchCategoryIdList.value.length == 3) {
    queryDto.value.categoryId = searchCategoryIdList.value[2]
  }
  const {data} = await listCategoryBrand(pageParams.value.current, pageParams.value.pageSize, queryDto.value)
  list.value = data.list
  total.value = data.total
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
