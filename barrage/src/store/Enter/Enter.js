import { reqUserLogin } from '@/api'
const state={
    userLogin:{}
}
const mutations={
    USERLOGIN(state,data){
        state.userLogin = data
        sessionStorage.setItem("TOKEN",data.token)
    }
}
const actions={
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code===200){
            commit("USERLOGIN",result.data)
        }else{
            console.log(error);
        }
    }
}

export default{
    namespace:true,state,mutations,actions
}