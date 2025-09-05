<template>

  <el-card class="box">

    <el-input type="text" autocomplete="off" style="margin-left:10px;width:170px;" placeholder="搜索用户名或留言"
      v-model="searchKey" @input="searchUserOrMsg" />

    <el-table style="margin:15px" :data="messages">

      <el-table-column label="序号" width="60px" align="center" type="index"></el-table-column>

      <el-table-column label="用户名" align="center" width="150px">
        <template #="{ row }">
          {{ row.username }}
        </template>
      </el-table-column>

      <el-table-column label="内容" align="center">
        <template #="{ row }">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评论量" align="center">
        <template #="{ row }">
          <span>{{ row.comment_count }}</span>
          <el-button size="small" type="primary" style="margin-left:15px;">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column label="时间" width="150px" align="center">
        <template #="{ row }">
          {{ row.created_at }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="100px">

        <template #="{ row }">

          <el-popconfirm title="删除该留言会导致与之相关联的回复都会被删除，你确定吗?" @confirm="deleteMessage(row.id)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>

        </template>

      </el-table-column>
    </el-table>



  </el-card>

</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { ElNotification } from 'element-plus';

import useMessageStore from '../../../store/modules/messages'
const MessageStore = useMessageStore()


let messages = ref([])
let searchKey = ref<string>('')

onMounted(() => {
  getMessage()
})

const getMessage = async () => {

  try {
    await MessageStore.getMessages()
    messages.value = MessageStore.messages
  } catch (error) {
    ElNotification({ type: 'error', message: '获取失败' })
  }
}

const deleteMessage = async (id: number) => {

  try {
    await MessageStore.delMessages(id)
    ElNotification({ type: 'success', message: '删除成功' })
    getMessage()
  } catch (error: any) {
    ElNotification({ type: 'error', message: '删除失败' })
  }

}

const searchUserOrMsg = async () => {
  // console.log('sss');

  if (!searchKey.value) return getMessage()
  //发送请求到后端
  try {
    await MessageStore.searchUserOrMsg(searchKey.value)
    messages.value = MessageStore.messages
    // getMessage()
  } catch (error: any) {
    ElNotification({ type: 'error', message: '查询失败' })
  }
}



</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>