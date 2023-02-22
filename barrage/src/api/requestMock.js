import axios from 'axios'


const requests = axios.create({
    timeout:10000
})

requests.interceptors.request.use((config)=>{
    return config
})
requests.interceptors.response.use((res) => {
    
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})

export default requests