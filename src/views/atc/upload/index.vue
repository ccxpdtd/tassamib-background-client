<template>

  <el-card class="uploader-container">
    <h2 style="text-align:center;margin:0 0 3rem;">上传 Markdown 文件</h2>


    <el-form label-width="auto" :model="form" ref="uploadFormRef" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>

      <el-form-item label="简介" prop="description">
        <el-input v-model="form.description" type="textarea" placeholder="简要描述文章内容" />
      </el-form-item>

      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="请输入作者名" />
      </el-form-item>

      <el-form-item label="文件">
        <el-upload :auto-upload="false" accept=".md" :on-change="handleFileChange">
          <el-button type="primary">选择 Markdown 文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="操作">
        <el-button type="success" @click="submit">发布</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useUserStore from '../../../store/modules/user'
let userStore = useUserStore()
import useArticleStore from '../../../store/modules/articles'
import { ElNotification } from 'element-plus'
const ArticleStore = useArticleStore()

const uname = userStore.username


const fileName = ref('')
const Content = ref('')


//校验规则
const validators = (_rules: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('不能为空'))
  } else {
    callback()
  }
}
let validatorTitle = validators
let validatorDescription = validators
let validatorAuthor = validators

let form = reactive({
  title: '',
  description: '',
  author: ''
})

const rules = {
  title: [
    { required: true, message: '标题不能为空' },
    { validator: validatorTitle, trigger: 'change' },
  ],
  description: [
    { required: true, message: '简介不能为空' },
    { validator: validatorDescription, trigger: 'change' },
  ],
  author: [
    { required: true, message: '作者不能为空' },
    { validator: validatorAuthor, trigger: 'change' },
  ]
}

let uploadFormRef = ref()



function handleFileChange(file: any) {
  if (file.name.endsWith('.md')) {
    fileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e: any) => {
      Content.value = e.target.result
      if (!form.title) {
        form.title = file.name.replace('.md', '')
      }
    }
    reader.readAsText(file.raw)
  } else {
    ElNotification({ type: 'error', message: '请上传 .md文件' })
  }
}

const upload = () => {
  const payload = {
    uname,
    title: form.title,
    description: form.description,
    author: form.author,
    content: Content.value
  }

  ArticleStore.uploadArticle(payload)
}

const submit = async () => {

  try {
    await uploadFormRef.value.validate()
    upload()
    return ElNotification({ type: 'success', message: '上传文章成功' })
  } catch (error) {
    return ElNotification({ type: 'error', message: '上传文章失败' })
  }
}
</script>
<style>
.uploader-container {
  width: 75%;
  margin: auto;
  padding: 30px;
}
</style>