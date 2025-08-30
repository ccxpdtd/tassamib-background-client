<template>
  <el-card class="box">

    <el-table style="margin:15px;" :data="users">
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
              <el-button type="danger" size="small">删除用户</el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" size="small" @click="changeRole(row.id, row.role)">更改权限</el-button>

        </template>


      </el-table-column>
    </el-table>

  </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

import useUserStore from '../../../store/modules/user'
const UserStore = useUserStore()

let users = ref<any>()


onMounted(() => {
  getUsers()
})
const getUsers = async () => {
  await UserStore.getUsers()
  users.value = UserStore.users
}

const deleteUser = async (id: number) => {

  try {
    await UserStore.delUser(id)
    getUsers()
    ElNotification({
      type: 'success',
      message: '删除用户成功'
    })

  } catch (error) {
    ElNotification({
      type: 'error',
      message: '删除用户失败'
    })
  }

}

const changeRole = async (id: number, role: string) => {
  role = role === 'admin' ? 'user' : 'admin'

  try {
    await UserStore.changeRole({ id, role })
    getUsers()
    ElNotification({
      type: 'success',
      message: '更改权限成功'
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: '更改权限失败'
    })
  }
}



</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>