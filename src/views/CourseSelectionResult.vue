<template>
    <div class="course-results">
        <h2 class="title">{{ UserName }}的选课结果</h2>
        <div v-if="selectedCourses.length === 0" class="empty-message">
            您尚未选择任何课程。
        </div>
        <div v-else class="result-list">
            <div v-for="course in selectedCourses" :key="course.id"
                 class="result-item">
                <div class="course-name">{{ course.name }}</div>
                <div class="course-id">课程名: {{ course.courseName }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from 'vue';
import axios from '../request/axios.js'
import {Use} from "webpack-chain";

interface Course {
  id: number;
  name: string;
}

const selectedCourses = ref<Course[]>([]);
const UserName: Ref<string> = ref('')
// 请求课程接口
const getCourses = () => {
  const userId: string = JSON.parse(localStorage.getItem('UserName')!)
  axios({
    method: 'POST',
    data: {userId},
    url: '/Grades/c',
  }).then((res: any) => {
    console.log(res)
    selectedCourses.value = res.data.data
  })
}

onMounted(() => {
  getCourses()
  UserName.value = JSON.parse(localStorage.getItem('UserName')!)
})
</script>

<style scoped>
.course-results {
    border-radius: 20px;
    background-color: #fffdfd;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
    color: #1E3E89;
    font-size: 24px;
}

.empty-message {
    text-align: center;
    font-size: 18px;
    color: #e8e8e5;
    margin-top: 50px;
}

.result-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
}

.result-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    background-color: #1E3E89;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.result-item:hover {
    background-color: #181212;
}

.course-name {
    color: #E7E5D6;
    font-weight: bold;
    margin-bottom: 10px;
}


.course-id {
    color: #e1e0e0;
}
</style>
