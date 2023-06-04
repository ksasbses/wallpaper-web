import axios from "axios";


const instance =axios.create({
    baseURL: 'http://localhost:8082',
    timeout: 5000
})

export function get(url,params){
    return instance.get(url,{
        params
    });
}

export function port(url,data){
    return instance.post(url,data)
}
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
    let userList= JSON.parse(sessionStorage.getItem('userList'))
      // 判断本地的cookie中是否有token
    if (userList) {
        if(userList.token){
            config.headers['authorization'] =userList.token
        }
    }
    return config
    },
    error => {
      return Promise.reject(error)
})
