<template>
    <div class="container">
        <div class="login-container">
            <el-alert
                    v-if="isShowSuccess"
                    title="登录成功"
                    type="success"
                    description="您已经成功登录"
                    show-icon
            />
            <h2 class="login-title">学生管理系统</h2>
            <form @submit.prevent="submitForm" class="login-form">
                <div class="form-group">
                    <label for="username">用户名:</label>
                    <input type="text" id="username" v-model.trim="username"
                           required>
                    <div v-if="errors.username" class="error">{{
                        errors.username
                        }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">密码:</label>
                    <input type="password" id="password" v-model.trim="password"
                           required>
                    <div v-if="errors.password" class="error">{{
                        errors.password
                        }}
                    </div>
                </div>
                <button type="submit" class="login-button">登录</button>
                <button @click="toRegister" class="register-button">注册
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, Ref} from 'vue';
import router from "@/router";
import store from "@/store";
import {mapMutations} from "vuex";
import axios from '../request/axios.js'

interface Errors {
  username?: string;
  password?: string;
}

interface UserInfo {
  username: string
  password: string
}

const username: Ref<string> = ref('');
const password: Ref<string> = ref('');
const errors: Ref<Errors> = ref({});
const isShowSuccess: Ref<boolean> = ref(false)
const userInfo: Ref<UserInfo> = ref({
  username: '',
  password: ''
})
const submitForm = () => {
  errors.value = {};

  if (!username.value) {
    errors.value.username = '请输入用户名.';
  }

  if (!password.value) {
    errors.value.password = '请输入密码.';
  }

  if (Object.keys(errors.value).length === 0) {
    // 登录
    const LoginVo = {
      userId: username.value,
      password: password.value
    }
    console.log(LoginVo)
    axios({
      method: 'POST',
      data: LoginVo,
      url: '/Student/Login'
    }).then((res: any) => {
      store.commit('updateToken', res.data.data.token)
    })

    // 执行登录逻辑，可以发送请求到服务器进行验证
    isShowSuccess.value = true
    setTimeout(() => {
      store.commit('updateUserName', username.value)
      router.push('/HomePage')
    }, 800)
  }
};
const toRegister = () => {
  router.push('/RegisterForm')
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    background-color: #42b983;
    background-image: url("/public/img/Login.png");
    background-size: cover;
    background-repeat: no-repeat;
}

.login-container {
    max-width: 400px;
    height: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 20px;
    background-color: #f5f5f5;
    opacity: .8;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
}

.login-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 380px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.register-button {
    padding: 10px 20px;
    background-color: #629755;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 30px;
}

.login-button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    margin-top: 5px;
}

.container {
    max-width: 100%;
}
</style>
