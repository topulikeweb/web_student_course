<template>
    <el-container class="layout-container-demo" style="height: 100vh">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu :default-openeds="['1']"
                >
                    <el-sub-menu index="1" @click="changeTitle">
                        <template #title>
                            <el-icon>
                                <message/>
                            </el-icon>
                            选课
                        </template>
                        <!--                        <el-menu-item-group>-->
                        <!--                            <template #title>Group 1</template>-->
                        <!--                            <el-menu-item index="1-1">Option 1</el-menu-item>-->
                        <!--                            <el-menu-item index="1-2">Option 2</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-menu-item-group title="Group 2">-->
                        <!--                            <el-menu-item index="1-3">Option 3</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-sub-menu index="1-4">-->
                        <!--                            <template #title>Option4</template>-->
                        <!--                            <el-menu-item index="1-4-1">Option 4-1</el-menu-item>-->
                        <!--                        </el-sub-menu>-->
                    </el-sub-menu>
                    <el-sub-menu index="2" @click="toScoreInquiry">
                        <template #title>
                            <el-icon>
                                <icon-menu/>
                            </el-icon>
                            成绩查询
                        </template>
                        <!--                        <el-menu-item-group>-->
                        <!--                            <template #title>Group 1</template>-->
                        <!--                            <el-menu-item index="2-1">Option 1</el-menu-item>-->
                        <!--                            <el-menu-item index="2-2">Option 2</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-menu-item-group title="Group 2">-->
                        <!--                            <el-menu-item index="2-3">Option 3</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-sub-menu index="2-4">-->
                        <!--                            <template #title>Option 4</template>-->
                        <!--                            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>-->
                        <!--                        </el-sub-menu>-->
                    </el-sub-menu>
                    <el-sub-menu index="3" @click="toCourseSelectionResult">
                        <template #title>
                            <el-icon>
                                <setting/>
                            </el-icon>
                            选课结果
                        </template>
                        <!--                        <el-menu-item-group>-->
                        <!--                            <template #title>Group 1</template>-->
                        <!--                            <el-menu-item index="3-1">Option 1</el-menu-item>-->
                        <!--                            <el-menu-item index="3-2">Option 2</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-menu-item-group title="Group 2">-->
                        <!--                            <el-menu-item index="3-3">Option 3</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-sub-menu index="3-4">-->
                        <!--                            <template #title>Option 4</template>-->
                        <!--                            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>-->
                        <!--                        </el-sub-menu>-->
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <div class="el-header-title">学生成绩管理系统</div>
                    <button class="logOutBtn" @click="LogOut">退出登录</button>
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px"
                        >
                            <setting
                            />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>{{ UserName }}</span>
                </div>
            </el-header>

            <el-main>
                <!--                <el-scrollbar>-->
                <!--                    <el-table :data="tableData">-->
                <!--                        <el-table-column prop="date" label="Date" width="140"/>-->
                <!--                        <el-table-column prop="name" label="Name" width="120"/>-->
                <!--                        <el-table-column prop="address" label="Address"/>-->
                <!--                    </el-table>-->
                <!--                </el-scrollbar>-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from 'vue'
import {Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'
import router from "@/router";
import {mapMutations} from "vuex";
import store from "@/store";

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const UserName: Ref<string> = ref("")
/**
 * @author zcy
 * @date 2023/12/1
 * @Description 展示相应路由
 * @return 返回值
 */
const changeTitle = () => {
  router.push("/HomePage/ChooseCourse")
}
const titleText: Ref<string> = ref('选课')
const toScoreInquiry = () => {
  router.push("/HomePage/ScoreInquiry")

}
const toCourseSelectionResult = () => {
  router.push("/HomePage/CourseSelectionResult")
}
const updateUserName = () => {
  UserName.value = JSON.parse(localStorage.getItem('UserName')!)
}
/**
 * @author hjl
 * @date 2023/12/2
 * @Description 退出登录
 * @return 返回值
 */
const LogOut = () => {
  localStorage.removeItem('Token')
  router.push('/')
}
onMounted(() => {
  changeTitle()
  updateUserName()
})
const tableData = ref(Array.from({length: 20}).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.el-header-title {
    margin-right: 300px;
    font-size: 2px;
    font-weight: 600;
}

.el-aside {
    margin-top: 60px;
}

.logOutBtn {
    font-size: 18px;
    color: #f6f7f8;
    font-weight: 500;
    border: 1px solid #42b983;
    background-color: #2a67fd;
    width: 130px;
    height: 35px;
    border-radius: 10px;
    margin-right: 50px;
}
</style>

