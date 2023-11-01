<template>
    <div class="container">
        <div class="registration-container">
            <el-alert
                    v-if="isShowSuccess"
                    title="注册成功"
                    type="success"
                    description="您已经成功注册"
                    show-icon
            />
            <h2 class="registration-title">注册新用户</h2>
            <form @submit.prevent="submitForm" class="registration-form">
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
                <button type="submit" class="registration-button">注册</button>
                <button @click="toLogin" class="registration-button"
                        style="background-color:goldenrod;margin-top: 30px">去登录
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, Ref} from 'vue';
import router from "@/router";
// ts识别原因
import axios from '../request/axios.js'
import store from "@/store";

interface Errors {
  username?: string;
  password?: string;
}

const username: Ref<string> = ref('');
const password: Ref<string> = ref('');
const errors: Ref<Errors> = ref({});
const isShowSuccess: Ref<boolean> = ref(false)

const submitForm = () => {
  errors.value = {};

  if (!username.value) {
    errors.value.username = '请输入用户名.';
  }

  if (!password.value) {
    errors.value.password = '请输入密码.';
  }
  if (Object.keys(errors.value).length === 0) {
    isShowSuccess.value = true
    // 注册接口逻辑
    const LoginVo = {
      userId: username.value,
      password: password.value
    }
    axios({
      method: 'POST',
      data: LoginVo,
      url: '/Student/Login'
    }).then((res: any) => {
      setTimeout(() => {
        router.push('/')
      }, 1500)
    })
  }
};

const toLogin = () => {
  router.push('/')
}
</script>

<style scoped>

.container {
    max-width: 100%;
}

.container {
    height: 100vh;
    width: 100vw;
    background-color: #42b983;
    background-image: url("/public/img/register.png");
    background-repeat: no-repeat;
    background-size: cover;
}

.registration-container {
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

.registration-title {
    text-align: center;
    margin-bottom: 20px;
}

.registration-form {
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

.registration-button {
    padding: 10px 20px;
    background-color: #f92672;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.registration-button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    margin-top: 5px;
}

.el-alert {
    margin: 20px 0 0;
}

.el-alert:first-child {
    margin: 0;
}
</style>
