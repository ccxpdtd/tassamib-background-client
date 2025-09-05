<!-- 回复板 -->

<template>

  <el-card class="box">

    <!-- <el-input type="text" autocomplete="off" style="margin-left:10px;width:170px;" placeholder="搜索用户名" @input="" /> -->

    <el-table style="margin:15px" :data="replies">

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

      <el-table-column label="原留言" align="center">
        <template #="{ row }">
          <el-button type="primary" size="small" @click="goToMessages(row.message_id)">查看</el-button>
        </template>
      </el-table-column>


      <el-table-column label="时间" width="150px" align="center">
        <template #="{ row }">
          {{ row.created_at }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="100px">

        <template #="{ row }">

          <el-popconfirm title="确定删除吗?" @confirm="deleteComments(row.id)">
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
import type { Message } from '../../../type/message'

import useMessageStore from '../../../store/modules/messages'
const MessageStore = useMessageStore()

import { useRoute } from 'vue-router'
const $route = useRoute()
import { useRouter } from 'vue-router'
const $router = useRouter()

let targetMid
let replies = ref<any>([])
let messages = ref<any>([])


onMounted(() => {
  if ($route.query.mid) {
    //转整型
    const mid = $route.query.mid
    targetMid = Array.isArray(mid)
      ? (mid[0] ? parseInt(mid[0]) : null)
      : typeof mid === 'string'
        ? parseInt(mid)
        : null
    //取replies
    if (targetMid !== null)
      getReplies(targetMid)
  } else
    getComments()

})
//获取目标评论
const getReplies = async (mid: number) => {
  try {
    await MessageStore.getMessages()
    messages.value = MessageStore.messages
    replies.value = messages.value.find((msg: Message) => msg.id === mid).replies
  } catch (error) {
    ElNotification({ type: 'error', message: '获取失败' })
  }
}
//获取所有评论
const getComments = async () => {
  try {
    await MessageStore.getComments()
    replies.value = MessageStore.comments
  } catch (error) {
    ElNotification({ type: 'error', message: '获取失败' })
  }
}

const deleteComments = async (id: number) => {
  try {
    await MessageStore.delComments(id)
    ElNotification({ type: 'success', message: '删除成功' })
    getComments()
  } catch (error: any) {
    ElNotification({ type: 'error', message: '删除失败' })
    console.log(error.message)
  }
}

const goToMessages = (mid: number) => {
  try {
    $router.push({ path: '/msg/message', query: { mid } })
  } catch (error) {
    ElNotification({ type: 'error', message: '查看失败' })
  }

}


</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>