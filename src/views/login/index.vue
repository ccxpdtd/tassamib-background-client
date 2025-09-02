<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginFormRef">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>

          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.uname" placeholder="请输入账号">
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.psw" placeholder="请输入密码">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="login_btn" type="primary" size="default" @click="handleLogin" :loading="loading">登录
            </el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

import useUserStore from '../../store/modules/user'

import { ElNotification } from 'element-plus'
//@ts-ignore
import getTime from '@/utils/getTime'
//获取小仓库对象
let userStore = useUserStore()
//获取路由对象
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()


//自定义规则
const validatorUsername = (_rules: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('用户名不能为空'))
  } else if (value.length < 1 || value.length > 15) {
    callback(new Error('用户名长度在1到15个字符之间'))
  } else {
    callback()
  }
}
const validatorPassword = (_rules: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度在6到15个字符之间'))
  } else {
    callback()
  }
}

let loginForm = reactive({
  uname: '',
  psw: ''
})
let loading = ref(false)
let rules = {
  uname: [{ trigger: 'change', validator: validatorUsername }],
  psw: [{ trigger: 'change', validator: validatorPassword }]
}
let loginFormRef = ref()

let handleLogin = async () => {
  //等待规则校验
  await loginFormRef.value.validate()
  //更改登录icon状态
  loading.value = true

  let redirect: any = $route.query.redirect
  try {
    await userStore.login(loginForm)
    $router.push({ path: redirect || '/home' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: getTime()
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: '登录失败'
    })
  } finally {
    loading.value = false
  }
}

</script>

<style scoped lang="scss">
.login_container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat center center;
  background-size: cover;
  margin: 0;
  padding: 0;
}

.login_form {
  position: relative;
  width: 70%;
  top: 30%;
  background: url('@/assets/images/login_form.png') no-repeat;
  padding: 40px;
  background-size: cover;

  h1 {
    font-size: 40px;
    color: white;
  }

  h2 {
    font-size: 20px;
    color: white;
    margin: 20px;
  }
}

.login_btn {
  width: 100%;
}
</style>