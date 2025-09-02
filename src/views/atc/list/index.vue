<template>
  <el-card class="box">

    <el-table style="margin:15px;" :data="users">
      <el-table-column label="序号" width="60px" align="center" type="index">

      </el-table-column>
      <el-table-column label="标题" align="center">
        <template #="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="简介" align="center">
        <template #="{ row }">
          {{ row.description }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="120px" align="center">
        <template #="{ row }">
          {{ row.author }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template #="{ row }">

          <el-button type="primary" size="small" @click="goToArticle(row.id)">查看</el-button>

          <el-popconfirm title="确定删除?" @confirm="deleteArticle(row.id)">
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
import { ref, onMounted } from 'vue'
// import { ElNotification } from 'element-plus'

import useArticleStore from '../../../store/modules/articles'
import { ElNotification } from 'element-plus'
const ArticleStore = useArticleStore()

import { useRouter } from 'vue-router'
const $router = useRouter()

let users = ref<any>()


onMounted(() => {
  getArticles()
})
//获取文章信息
const getArticles = async () => {
  try {
    await ArticleStore.getArticles()
    users.value = ArticleStore.articles
  } catch (error) {
    ElNotification({ type: 'error', message: '获取失败' })
  }
}
const deleteArticle = async (id: number) => {
  try {
    await ArticleStore.delArticle(id)
    getArticles()
    ElNotification({ type: 'success', message: '删除成功' })
  } catch (error) {
    ElNotification({ type: 'error', message: '删除失败' })
  }
}

const goToArticle = (id: number) => {
  try {
    $router.push({ path: "/atc/view", query: { id } })
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