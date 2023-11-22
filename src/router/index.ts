import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import LoginForm from "@/views/LoginForm.vue";
import HomePage from "@/views/HomePage.vue";
import RegisterForm from "@/views/RegisterForm.vue";
import ChooseCourses from "@/views/ChooseCourses.vue";
import ScoreInquiry from "@/views/ScoreInquiry.vue";
import CourseSelectionResult from "@/views/CourseSelectionResult.vue";
import store from "@/store";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: 'ChooseCourse',
        name: 'ChooseCourse',
        component: ChooseCourses
      }, {
        path: 'ScoreInquiry',
        name: 'ScoreInquiry',
        component: ScoreInquiry
      },
      {
        path: 'CourseSelectionResult',
        name: 'CourseSelectionResult',
        component: CourseSelectionResult
      },
    ]
  },
  {
    path: '/RegisterForm',
    name: 'RegisterForm',
    component: RegisterForm,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
/**
 * @author zcy
 * @date 2023/12/1
 * @Description 定义路由拦截器
 * @param {type} [param] 参数说明
 * @return 返回值
 */
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('Token')
  console.log(to.path)
  if (to.path === '/' || to.path === '/RegisterForm') {
    // 如果当前路由是登录页，且用户已经登录，则重定向到首页
    if (isAuthenticated) {
      next('/HomePage')
    } else {
      next() // 允许导航到登录页
    }
  } else {
    // 非登录页的其他路由
    if (isAuthenticated) {
      next() // 允许导航到下一个路由
    } else {
      next('/') // 重定向到登录页
    }
  }
})

export default router
