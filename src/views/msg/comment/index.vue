<!-- 回复板 -->

<template>

  <el-card class="box">

    <!-- <el-input type="text" autocomplete="off" style="margin-left:10px;width:170px;" placeholder="搜索用户名" @input="" /> -->

    <el-table style="margin:15px" :data="comments">

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

      <el-table-column label="回复留言id" align="center">
        <template #="{ row }">
          <span>{{ row.mid }}</span>
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

import useMessageStore from '../../../store/modules/messages'
const MessageStore = useMessageStore()



let comments = ref([])

onMounted(() => {
  getComments()
})

const getComments = async () => {

  try {
    await MessageStore.getComments()
    comments.value = MessageStore.comments
    console.log('comments', comments.value);

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



</script>

<style>
.box {
  width: 90%;
  margin: 20px auto;

}
</style>