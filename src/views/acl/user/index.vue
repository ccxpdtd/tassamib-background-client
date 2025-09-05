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
        <template #="{ row, $index }">
          <span v-if="!row.changePswFlag">{{ row.password }}</span>
          <el-input v-else v-model="row.password" @keyup.enter="savePsw($index, row.id, row.password)"
            @blur="savePsw($index, row.id, row.password)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="80px" align="center">
        <template #="{ row }">
          {{ row.role }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="280px">

        <template #="{ row }">
          <el-popconfirm title="确定删除该用户?" @confirm="deleteUser(row.id)">
            <template #reference>
              <el-button type="danger" size="small">注销</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确定修改用户权限?" @confirm="changeRole(row.id, row.role)">
            <template #reference>
              <el-button type="primary" size="small">更改权限</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确定修改用户密码?" @confirm="changeFlag(row)">
            <template #reference>
              <el-button type="primary" size="small">修改密码</el-button>
            </template>
          </el-popconfirm>
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

import { ElInput, ElNotification } from 'element-plus'

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

const setUsers = () => {
  users.value = UserStore.users
  total.value = UserStore.userTotal

}

//获取用户信息
const getUsers = async (page = 1) => {
  pageNo.value = page
  try {
    const payload = { pageNo: pageNo.value, limit: pageSize.value }
    await UserStore.getUsers(payload)
    setUsers()
  } catch (error) {
    ElNotification({ type: 'error', message: '获取失败' })
  }

}

const deleteUser = async (id: number) => {
  try {
    await UserStore.delUser(id)
    ElNotification({ type: 'success', message: '删除用户成功' })
    searchUserName.value ?
      searchUser() :
      getUsers(users.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } catch (error) {
    ElNotification({ type: 'error', message: '删除用户失败' })
  }

}

const searchUser = async () => {
  if (!searchUserName.value) return getUsers(pageNo.value)

  try {
    const payload: any = { pageNo: pageNo.value, limit: pageSize.value, username: searchUserName.value }
    await UserStore.searchUser(payload)
    setUsers()
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
    searchUser()
    ElNotification({ type: 'success', message: '更改权限成功' })
  } catch (error) {
    ElNotification({ type: 'error', message: '更改权限失败' })
  }
}
//更改密码栏状态：编辑<--->展示
const changeFlag = (row: any) => {
  row.changePswFlag = true

}

//失去焦点：1.更改状态 2.发送请求保存密码
const savePsw = async (index: number, id: number, password: string) => {
  //更改状态
  users.value[index].changePswFlag = false
  //发送请求保存密码
  const payload = { id, password }
  try {
    await UserStore.changePsw(payload)
    searchUser()
    ElNotification({ type: 'success', message: '更改密码成功' })
  } catch (error) {
    ElNotification({ type: 'error', message: '更改密码失败' })
  }
}



</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>