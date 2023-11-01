import axios from '../request/axios.js'

/**
 * @author topu
 * @date 2023/5/16
 * @Description 登录接口
 * @return 返回值
 * @param username
 * @param password
 */
export const LoginAPI = (username, password) => {
  
  const LoginVo = {
    userId: username,
    password
  };
  
  return axios({
    method: 'POST',
    url: '/Student/Login',
    data: LoginVo
  });
};



const updateMessage = (userId, sname, sex, age, department, password) => {
  const StudentVo = {
    userId,
    sname,
    sex,
    age,
    department,
    password,
  }
  return axios({
    method: 'POST',
    url: '/Student/UpdateMessage'
  })
}
export const findGrade = (userId, courseId, scores, id, courseName) => {
  const GradeVo = {
    userId,
    courseId,
    scores,
    id,
    courseName
  }
  return axios({
    method: 'POST',
    url: '/Grades/a',
    data: GradeVo
  })
}




