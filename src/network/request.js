import axios from 'axios'

///封装网络请求模块，防止对第三方插件的过多依赖

export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    console.log('request拦截器拦截成功');
    console.log(config);

    return config
  }, err => {
    console.log('request拦截器拦截失败');
    console.log(err);
  })


  //响应拦截
  instance.interceptors.response.use(res => {
    console.log('response拦截器拦截成功');
    console.log(res);

    return res.data
  }, err => {
    console.log('response拦截器拦截失败');
    console.log(err);
  })
  return instance(config)
}