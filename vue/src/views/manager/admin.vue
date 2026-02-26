<script setup>
import { reactive } from 'vue'
import request from '@/utils/request'
import { Edit, Delete } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'

const baseURL = import.meta.env.VITE_API_URL

const data = reactive({
  formVisible: false,
  form: {},
  tableData: [],
  pageNum: 1,
  pageSize: 5,
  total: 0,
  name: null,
  ids: []
})
const handleAdd = () => {
  data.form = {}
  data.formVisible = true
}

const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formVisible = true
}
// 分页查
const load = () => {
  request.get('/admin/selectPage', { 
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      name: data.name
    }
  }).then(res => {
    if (res.code === '200') {
      data.tableData = res.data?.list || []
      data.total = res.data?.total || 0
    } else {
      console.log(res)
    }
  })
}

// 增
const add = () => {
  request.post('/admin/add', data.form).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      data.formVisible = false
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

// 改
const update = () => {
  request.put('/admin/update', data.form).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      data.formVisible = false
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

// 删
const del = (id) => {
  ElMessageBox.confirm('删除后数据无法恢复，您确认删除吗?', '删除确认', { type: 'warning' }).then(res => {
    request.delete('admin/delete/' + id).then(res => {
      if (res.code === '200') {
        ElMessage.success('删除成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch(err => {
    console.log(err)
  })
}

// 批量删除
const delBatch = () => {
  if (!data.ids.length) {
    ElMessage.error('请选择数据')
    return
  }
  ElMessageBox.confirm('删除后数据无法恢复，您确认删除吗?', '删除确认', { type: 'warning' }).then(res => {
    request.delete('/admin/delete/batch', { data: data.ids}).then(res => {
      if (res.code === '200') {
        ElMessage.success('删除成功')
        load()
      } else {
        ElMessage.error(res.msg || '删除失败')
      }
    })
  }).catch(err => {
    console.log(err)
  })
}

const handleSelectionChange = (rows) => {
  data.ids = rows.map(item => item.id)
  console.log(data.ids)
}

// 上传文件
const handleFileUpload = (res) => {
  data.form.avatar = res.data
}


const save = () => {
  data.form.id ? update() : add()
}

const reset = () => {
  data.name = null
  load()
}

load()
</script>

<template>
 <div>

    <div class="card" style="margin-bottom: 5px">
      <el-input v-model="data.name" placeholder="请输入名称查询" style="width:240px; margin-right:10px" prefix-icon="Search"></el-input>
      <el-button type="info" plain @click="load">查询</el-button>
      <el-button type="warning" plain @click="reset" style="margin: 0 10px">重置</el-button>
    </div>

    <!--新增-->
    <div class="card" style="margin-bottom: 5px">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>

    <!--表格-->
    <div class="card" style="margin-bottom: 5px">
      <el-table stripe :data="data.tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template v-slot="scope"><!--这个scope就是打包当前行-->
            <el-image style="width: 40px; height: 40px; border-radius: 50%; display: block;" v-if="scope.row.avatar"
            :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]" preview-teleported></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button type="primary" circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" circle :icon="Delete" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页组件-->
    <div class="card" v-if="data.total">
      <el-pagination 
        background
        :page-size="data.pageSize" 
        v-model:current-page="data.pageNum"
        layout="prev, pager, next"
        :total="data.total"
        @current-change="load"
        > 
      </el-pagination>
    </div>

    <!--弹框-->
    <el-dialog title="管理员信息" v-model="data.formVisible" width="40%" destroy-on-close>
      <el-form ref="form" :model="data.form" label-width="70px" style="padding: 20px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="avatar" label="头像">
          <!--action直接执行上传接口,返回的就是图片地址-->
          <el-upload
            :action="baseURL + '/files/upload'"
            :on-success="handleFileUpload"
            class="avatar-uploader"
          >
            <img v-if="data.form.avatar" :src="data.form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="data.form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="data.form.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="data.form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.formVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
 </div>
</template>

<style scoped lang="scss">
.avatar-uploader {
  height: 120px;
}
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
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
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>