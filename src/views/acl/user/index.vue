<template>

  <el-card class="box">

    <el-input type="text" autocomplete="off" style="margin-left:10px;width:170px;" placeholder="搜索用户名"
      v-model="searchUserName" @input="searchUser" />

    <el-table style="margin:15px" :data="users">
      <el-table-column label="序号" width="60px" align="center" type="index">

      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template #="{ row }">
          {{ row.username }}
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template #="{ row }">
          {{ row.password }}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120px" align="center">
        <template #="{ row }">
          {{ row.role }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">

        <template #="{ row }">
          <el-popconfirm title="确定删除该用户?" @confirm="deleteUser(row.id)">
            <template #reference>
              <el-button type="danger" size="small">注销</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" size="small" @click="changeRole(row.id, row.role)">更改权限</el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
      :background="true" layout="prev, pager, next, jumper,->,total, sizes" :total="total" @size-change="changePageSize"
      @current-change="searchUser" />

  </el-card>

</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

import useUserStore from '../../../store/modules/user'
const UserStore = useUserStore()

let searchUserName = ref<string>('')

let users = ref<any>()
let total = ref<number>()

let pageNo = ref(1)
let pageSize = ref(5)

onMounted(() => {
  getUsers()
})

//获取用户信息
const getUsers = async (page = 1) => {
  pageNo.value = page
  try {
    const payload = { pageNo: pageNo.value, limit: pageSize.value }
    await UserStore.getUsers(payload)
    users.value = UserStore.users
    total.value = UserStore.userTotal
  } catch (error) {
    ElNotification({ type: 'error', message: '获取失败' })
  }

}

const deleteUser = async (id: number) => {
  try {
    await UserStore.delUser(id)
    ElNotification({
      type: 'success',
      message: '删除用户成功'
    })
    searchUser()
  } catch (error) {
    ElNotification({ type: 'error', message: '删除用户失败' })
  }

}

const searchUser = async () => {
  if (!searchUserName.value) return getUsers(users.value.length > 1 ? pageNo.value : pageNo.value - 1)

  try {
    const payload: any = { pageNo: pageNo.value, limit: pageSize.value, username: searchUserName.value }
    await UserStore.searchUser(payload)
    users.value = UserStore.users
    total.value = UserStore.userTotal
  } catch (error) {
    ElNotification({ type: 'error', message: '查找用户失败' })
  }

}

const changePageSize = () => {
  searchUser()
}
//更改用户权限
const changeRole = async (id: number, role: string) => {
  role = role === 'admin' ? 'user' : 'admin'
  try {
    await UserStore.changeRole({ id, role })
    getUsers()
    ElNotification({ type: 'success', message: '更改权限成功' })
  } catch (error) {
    ElNotification({ type: 'error', message: '更改权限失败' })
  }
}


</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>