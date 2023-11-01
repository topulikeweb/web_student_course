<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
    >
        <el-table-column prop="id" label="序号" width="180"/>
        <el-table-column prop="userId" label="用户名" width="180"/>
        <el-table-column prop="courseId" label="课程号" width="180"/>
        <el-table-column prop="scores" label="分数" width="180"/>
        <el-table-column prop="courseName" label="课程名" width="200"/>
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small"
                           @click="handleEdit(scope.$index, scope.row)"
                >修改
                </el-button
                >
                <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index,scope.row)"
                >删除
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <button class="filterBtn" @click="addScores">新增成绩</button>
    <button class="filterBtn" @click="findFailScore">查询不及格成绩</button>
    <div class="container" v-if="isShowPage">
        <h1 class="title">修改成绩</h1>
        <form @submit.prevent="submitForm" class="form">
            <!--            <div class="form-group">-->
            <!--                <label for="courseId" class="label">课程号</label>-->
            <!--                <input type="text" id="courseId" v-model="form.courseId"-->
            <!--                       class="input" required>-->
            <!--            </div>-->
            <!--            <div class="form-group">-->
            <!--                <label for="courseName" class="label">课程名</label>-->
            <!--                <input type="text" id="courseName" v-model="form.courseName"-->
            <!--                       class="input" required>-->
            <!--            </div>-->
            <div class="form-group">
                <label for="score" class="label">分数</label>
                <input type="number" id="score" v-model="form.score"
                       class="input" required>
            </div>
            <button type="submit" class="button">提交</button>
            <button @click="close" class="button">关闭</button>
        </form>
    </div>
  <!--    新增-->
    <div class="container" v-if="isShowAdd">
        <h1 class="title">新增数据</h1>
        <el-form :model="formData" ref="form" label-width="100px" class="form">
            <el-form-item label="分数" prop="scores">
                <el-input-number v-model="formData.scores"
                                 controls-position="right"
                                 :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="课程号" prop="courseId">
                <el-input v-model="formData.courseId"></el-input>
            </el-form-item>
            <el-form-item label="课程名" prop="courseName">
                <el-input v-model="formData.courseName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitFormAdd">提交
                </el-button>
                <el-button type="primary" @click="closeAdd">关闭
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import axios from '../request/axios.js'
import {onMounted, reactive, ref, Ref} from "vue";

interface User {
  id: number;
  userId: string;
  courseId: number;
  scores: number;
  courseName: string;
}

const isShowAdd: Ref<boolean> = ref(false)
// 修改表单数据
const form = reactive({
  score: 0,
});
const id: Ref<string> = ref('')
// 是否展示表单
const isShowPage: Ref<boolean> = ref(false)
// table数据
const tableData: User[] = reactive([]);
const courseId: Ref<number> = ref(0)
const courseName: Ref<string> = ref('')

const formData = ref({
  id: '',
  scores: 0,
  userId: JSON.parse(localStorage.getItem('UserName')!),
  courseId: '',
  courseName: ''
});
/**
 * @author topu
 * @date 2023/5/17
 * @Description 新增
 * @return 返回值
 */
const submitFormAdd = () => {
  const gradesVo = {
    id: null,
    scores: formData.value.scores,
    userId: JSON.parse(localStorage.getItem('UserName')!),
    courseId: parseInt(formData.value.courseId),
    courseName: formData.value.courseName
  }
  console.log(gradesVo)
  axios({
    method: 'POST',
    url: 'Grades/e',
    data: gradesVo
  }).then((res: any) => {
    if (res.data.retCode === 0) {
      alert('新增成功')
      getCourses()
      isShowAdd.value = false
    }
  })
};
/**
 * @author topu
 * @date 2023/5/16
 * @Description 修改成绩
 * @return 返回值
 */
const submitForm = () => {
  const gradesVo = {
    id: id.value,
    scores: form.score,
    userId: null,
    courseId: null,
    courseName: null
  }
  console.log(gradesVo)
  axios({
    method: 'POST',
    url: '/Grades/f',
    data: gradesVo
  }).then((res: any) => {
    alert('修改成功')
    getCourses()
    close()
  })
};

const tableRowClassName = ({row, rowIndex}: {
  row: User;
  rowIndex: number;
}) => {
  if (rowIndex === 1) {
    return 'warning-row';
  } else if (rowIndex === 3) {
    return 'success-row';
  }
  return '';
}


/**
 * 查询课程成绩
 */
const getCourses = () => {
  const userId: string = JSON.parse(localStorage.getItem('UserName')!);
  axios({
    method: 'POST',
    data: {userId},
    url: '/Grades/a',
  }).then((res: any) => {
    console.log(res);
    // 获取表格数据
    tableData.splice(0, tableData.length, ...res.data.data);
    console.log(tableData);
  }).catch((error: any) => {
    console.error(error);
  });
}
/**
 * @author topu
 * @date 2023/5/16
 * @Description 删除成绩
 * @return 返回值
 */
const handleDelete = (index: any, row: any) => {
  const ids: number[] = []
  ids.push(row.id)
  axios({
    method: 'DELETE',
    url: '/Grades/g',
    data: JSON.stringify(ids)
  }).then((res: any) => {
    if (res.data.retCode === 500013) {
      alert('删除失败')
      console.log(res)
    } else {
      alert('删除成功')
      getCourses()
    }
  })
}

/**
 * @author topu
 * @date 2023/5/16
 * @Description 修改
 * @return 返回值
 */

const handleEdit = (index: any, row: any) => {
  courseId.value = row.courseId
  courseName.value = row.courseName
  id.value = row.id
  isShowPage.value = true
}
const close = () => {
  isShowPage.value = false
}
/**
 * @author topu
 * @date 2023/5/17
 * @Description 查询不及格成绩
 * @return 返回值
 */
const findFailScore = () => {
  const gradeVo = {
    id: null,
    scores: null,
    userId: JSON.parse(localStorage.getItem('UserName')!),
    courseId: null,
    courseName: null
  }
  console.log(gradeVo)
  axios({
    method: 'POST',
    url: 'Grades/d',
    data: gradeVo
  }).then((res: any) => {
    if (res.data.retCode === 0) {
      tableData.splice(0, tableData.length, ...res.data.data);
      console.log(res.data.data)
    } else {
      alert('筛选失败')
    }
  })
}
const closeAdd = () => {
  isShowAdd.value = false
}
const addScores = () => {
  isShowAdd.value = true
}
onMounted(() => {
  getCourses();
})
</script>

<style>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.button {
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
}

.button:hover {
    background-color: #0056b3;
}

.filterBtn {
    width: 120px;
    height: 35px;
    background-color: #fd9393;
    border-radius: 10px;
    border: 1px solid white;
    margin-top: 20px;
    margin-left: 100px;
    color: #3b3b3b;
    font-weight: 500;
}

.filterBtn:hover {
    background-color: #bebdbd;
    transition: 0.3s all;
}

.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
}

.title {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
