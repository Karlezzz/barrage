import requestMock from './requestMock'


// export const reqUserLogin = (data) => requestMock({
//   url: 'https://www.fastmock.site/mock/6fb036f9a523faa1abf35ad394f8483e/api/userLogin',
//   method: 'post',
//   data
// })



import axios from 'axios';

const requests = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
})
requests.interceptors.response.use(config => {
  return config;
})
requests.interceptors.request.use(config => {
  return config;
})
export default requests;

export const reqUserLogin = (data) => requests({
  url: '/user/userLogin',
  method: 'post',
  data
})
