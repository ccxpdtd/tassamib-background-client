<template>
  <div class="editor-container">
    <div ref="editorRef"></div>

    <el-form style="margin:20px;" label-width="auto" :rules="rules" ref="pubFormRef" :model="form">

      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="form.title" autocomplete="off" style="width:170px;" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input type="text" v-model="form.description" style="width:170px;" />
      </el-form-item>

      <el-form-item label="简介" prop="description">
        <el-input type="text" v-model="form.author" autocomplete="off" style="width:170px;" />
      </el-form-item>

      <el-form-item label="操作">
        <el-button type="primary" @click="submit">上传</el-button>
        <el-button>重置</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
//@ts-ignore
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
// 中文语言包
import '@toast-ui/editor/dist/i18n/zh-cn'

import useArticleStore from '../../../store/modules/articles'
const ArticleStore = useArticleStore()
import useUserStore from '../../../store/modules/user'
import { ElNotification } from 'element-plus'
let userStore = useUserStore()

const editorRef = ref(null)
let editorInstance: any = null

let form = reactive({
  title: '',
  description: '',
  author: ''
})

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


onMounted(() => {
  editorInstance = new Editor({
    el: editorRef.value,
    height: '600px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    useCommandShortcut: true,
    language: 'zh', // 中文界面
    theme: 'dark',
    initialValue: ``
  })

})

const upload = () => {
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

      // 触发下载为 md 文件
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = '编辑内容.md'
      a.click()
      URL.revokeObjectURL(url)

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
