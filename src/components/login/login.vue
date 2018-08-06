<template>
  <div class="hello">
    <mt-header  title="登录"></mt-header>
    <div v-if="!nickName">
        <mt-field label="用户名" placeholder="请输入用户名"  v-model="user"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
        <div style="padding:10px 12px">
           <mt-button type="primary" size="large"  @click="login">登录</mt-button>
        </div>
    </div>
    <div v-else>
       <p>当前帐号：{{nickName?nickName:'undifine'}}</P>
       <div style="padding:10px 12px">
           <mt-button type="primary" size="large"  @click="logOut">登出</mt-button>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
   data(){
     return {
        user:'',
        pwd:'',
        nickName:''
     }
   },
   created(){
      //this.$messagebox('提示', '操作成功')
      this.checkLogin()
   },
   methods:{
      login(){     // 点击登录
        console.log("userName:"+this.user)
        if(!this.user || !this.pwd){
            this.$messagebox('提示', '请输入用户和密码')
            return
        }
        axios.post(process.env.API_HOST +"/users/login",{
            userName:this.user,
            userPwd:this.pwd
        }).then((response)=>{
            let res = response.data;
            if(res.status == "0"){
                this.$messagebox('提示', res.msg?res.msg:'登录成功')
                this.nickName=res.result.userName
                // this.nickName = res.result.userName;
            }else{
                this.$messagebox('提示', '登录失败')
            }
        })
     },
     logOut(){    // 点击logout登出
      axios.post(process.env.API_HOST +"/users/logout").then((response)=>{
        let res = response.data;
        if(res.status== "0"){
          this.nickName = '';
          this.$messagebox('提示', res.msg?res.msg:'登出成功')
        }
      })
     },
     checkLogin(){   // 检查是否登录
      axios.get(process.env.API_HOST +"/users/checkLogin").then((response)=>{
        let res = response.data;
        if(res.status == '0'){
          this.nickName = res.result;
        }else{
          
        }
      })
    }

   }
}
</script>


<style scoped lang="scss" type="text/css">
  
</style>
