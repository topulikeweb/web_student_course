<template>
    <div class="choose-courses">
        <h1>选课</h1>
        <div class="course-list">
            <el-card v-for="course in mergeCourse" :key="course.id">
                <div class="course-info">
                    <h3>{{ course.courseName }}</h3>
                    <div>剩余：{{ course.num }}</div>
                </div>
                <el-radio v-model="selectedCourse"
                          :label="course.id"></el-radio>
            </el-card>
        </div>
        <el-button type="primary" @click="submitCourses">提交选课</el-button>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import axios from '../request/axios.js';

interface Course {
  id: number;
  courseName: string;
  num: number;
}

const courses = ref<Course[]>([]);
const mergeCourse = ref<Course[]>([]);
const selectedCourse = ref<number>(0);

const getCourses = () => {
  axios
      .get('/Course/selectCourse')
      .then((res: any) => {
        courses.value = res.data.data[0].list;
        const list1 = res.data.data[0].list1;
        mergeCourse.value = courses.value.map((course, index) => {
          return {
            ...course,
            ...list1[index]
          };
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
};
/**
 * @author topu
 * @date 2023/5/17
 * @Description 选择课程，并提交课程
 * @return 返回值
 */
const submitCourses = () => {
  console.log(selectedCourse.value);
  const userId = JSON.parse(localStorage.getItem('UserName')!)
  const selectedCourseData = mergeCourse.value.find(course => course.id === selectedCourse.value);
  if (selectedCourseData) {
    const courseVo = {
      userId: userId,
      courseId: selectedCourseData.id,
      courseName: selectedCourseData.courseName
    };
    console.log(courseVo)
    axios
        .post('/Course/GetCourse', courseVo)
        .then((res: any) => {
          if (res.data.retCode === 0) {
            // 刷新界面
            getCourses()
          } else {
            alert("别卷了，选了一次就不要再选了")
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
  }
  selectedCourse.value = 0;
};

onMounted(() => {
  getCourses();
});
</script>

<style scoped>
.choose-courses {
    padding: 20px;
}

.course-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.el-card {
    background-color: #fcc4c4;
    width: 300px;
    padding: 20px;
}

.course-info {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.course-info h3 {
    margin: 0;
}

.el-button {
    margin-top: 20px;
}
</style>
gradeVo
id,course
