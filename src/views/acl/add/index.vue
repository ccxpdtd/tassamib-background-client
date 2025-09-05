<template>
  <el-card class="box">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-table style="margin:15px;" :data="users">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>

      <el-table-column label="用户名" align="center">
        <template #="{ row, $index }">
          <span v-if="!row.flag.nameFlag" @click="changeFlag($index, 'nameFlag')">{{ row.username || '匿名用户' }}</span>
          <el-input @blur="changeFlag($index, 'nameFlag')" v-else style="width:80%;" placeholder="请输入用户名"
            v-model="row.username"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="密码" align="center">
        <template #="{ row, $index }">
          <span v-if="!row.flag.pswFlag" @click="changeFlag($index, 'pswFlag')">{{ row.password || 123456 }}</span>
          <el-input v-else style="width:80%;" @blur="changeFlag($index, 'pswFlag')" placeholder="请输入密码"
            v-model="row.password"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="角色" align="center" width="150px">
        <template #="{ row }">
          <el-select v-model="row.role" placeholder="Select" style="width: 100px" default="user">
            <el-option label="user" value="user" />
            <el-option label="admin" value="admin" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label='操作' align='center' width="150px">
        <template #="{ row, $index }">
          <el-button type="primary" @click="save(row, $index)">保存</el-button>
        </template>
      </el-table-column>

    </el-table>

  </el-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import useUserStore from '../../../store/modules/user'
const UserStore = useUserStore()

let users = ref<any>([])


const addUser = () => {

  users.value.push(
    {
      username: '',
      password: '',
      role: '',
      flag: {
        nameFlag: true,
        pswFlag: true,
      }
    }
  )


}


//更改用户信息状态，浏览<----->编辑
const changeFlag = (index: number, key: string) => {
  users.value[index].flag[key] = !users.value[index].flag[key]
}

//收集信息，创建用户
const save = async (user: any, index: number) => {


  user.username = user.username || '匿名用户'
  user.password = user.password || '123456'
  user.role = user.role || 'user'

  try {
    await UserStore.addUser(user)

    ElNotification({ type: 'success', message: '添加用户成功' })
    users.value.splice(index, 1)
  } catch (error) {
    ElNotification({ type: 'error', message: '添加用户失败' })
  }


}

</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>