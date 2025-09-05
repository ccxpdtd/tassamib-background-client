<template>
  <div class="editor-container">
    <div ref="editorRef"></div>

    <el-form style="margin:20px;" label-width="auto" :rules="rules" ref="pubFormRef" :model="form">

      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="form.title" autocomplete="off" style="width:170px;" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input type="text" v-model="form.author" style="width:170px;" />
      </el-form-item>

      <el-form-item label="简介" prop="description">
        <el-input type="textarea" :rows="4" v-model="form.description" autocomplete="off" style="width:300px;" />
      </el-form-item>

      <el-form-item label="操作">
        <el-button type="primary" @click="submit">上传</el-button>
        <el-button @click="resetInfo">重置</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
//@ts-ignore
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
// 中文语言包
import '@toast-ui/editor/dist/i18n/zh-cn'
import { ElNotification } from 'element-plus'

import useArticleStore from '../../../store/modules/articles'
const ArticleStore = useArticleStore()
import useUserStore from '../../../store/modules/user'
let userStore = useUserStore()

import { useRoute } from 'vue-router'
const $route = useRoute()


const editorRef = ref(null)
let editorInstance: any = null

let parseIndex: number | null = null
let article = ref<any>({})

let content = ref<string>('')
var form = reactive({
  title: '',
  description: '',
  author: ''
})

onMounted(() => {
  getArticle()

  if ($route.query.index) {
    //转整型
    const indexParam = $route.query.index
    parseIndex = Array.isArray(indexParam)
      ? (indexParam[0] ? parseInt(indexParam[0]) : null)
      : typeof indexParam === 'string'
        ? parseInt(indexParam)
        : null
    //获取文章
    if (parseIndex !== null && parseIndex >= 0) {
      article.value = ArticleStore.articles[parseIndex]
      setArticle()
    }
  }
  else {
    if (editorInstance) {
      editorInstance.destroy()
      editorInstance = null
    }
    editorInstance = new Editor({
      el: editorRef.value,
      height: '600px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      useCommandShortcut: true,
      language: 'zh', // 中文界面
      theme: 'dark',
      initialValue: content.value
    })

  }

})
const getArticle = async () => {
  await ArticleStore.getArticles()
}

const setArticle = () => {

  nextTick(() => {
    //如果有内容，存储
    if (article.value) {
      localStorage.setItem('article', JSON.stringify(article.value))
    } else {
      article.value = localStorage.getItem('article')
      article.value = article.value ? JSON.parse(article.value) : null
    }

    form.title = article.value.title
    form.author = article.value.author
    form.description = article.value.description
    content.value = article.value.content

    if (editorInstance) {
      editorInstance.destroy()
      editorInstance = null
    }
    editorInstance = new Editor({
      el: editorRef.value,
      height: '600px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      useCommandShortcut: true,
      language: 'zh', // 中文界面
      theme: 'dark',
      initialValue: content.value
    })

  })

}


const validators = (_rules: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('不能为空'))
  } else {
    callback()
  }
}

//自定义规则
const validatorTitle = validators
const validatorDescription = validators
const validatorAuthor = validators

let rules = {
  title: [
    { required: true, message: '标题不能为空' },
    { validator: validatorTitle, trigger: 'blur' }
  ],
  description: [
    { required: true, message: '简介不能为空' },
    { validator: validatorDescription, trigger: 'blur' }
  ],
  author: [
    { required: true, message: '作者不能为空' },
    { validator: validatorAuthor, trigger: 'blur' }
  ]
}

let pubFormRef = ref()

const downloadMDFile = (content: string) => {
  // 触发下载为 md 文件
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${form.title}.md`
  a.click()
  URL.revokeObjectURL(url)
}


const upload = async () => {
  const id = ArticleStore.checkArticle(form.title)

  if (id !== undefined)
    if (confirm("已有相同文章，是否覆盖？")) {
      await ArticleStore.delArticle(id)
    } else return
  if (editorInstance) {
    const content = editorInstance.getMarkdown()
    if (!content) {
      return ElNotification({ type: 'error', message: '请输入内容' })
    } else {
      ArticleStore.uploadArticle({
        uname: userStore.username,
        title: form.title,
        description: form.description,
        author: form.author,
        content
      })
      downloadMDFile(content)
      ElNotification({ type: 'success', message: '发布文章成功' })
    }
  }
}

// 点击保存
const submit = async () => {
  //等待规则校验
  try {
    await pubFormRef.value.validate()
    upload()
  } catch (err) {
    ElNotification({ type: 'error', message: '发布文章失败' })
  }

}

const resetInfo = () => {
  form.title = ''
  form.description = ''
  form.author = ''
}

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
    editorInstance = null
  }
})
</script>

<style>
.editor-container {
  max-width: 98%;
  margin: 20px auto;
}

/* tooltip 显示在按钮上方 */
.toastui-editor-defaultUI .tui-editor-popup {
  top: auto !important;
  bottom: 360px !important;
  transform: translateY(0) !important;
  pointer-events: none;
}
</style>
