<template>
    <!-- 注册组件 -->
    <div class="container">
        <div class="form">
            <h2>欢迎注册</h2>
            <form id="loginForm">
                <div class="inputBox">
                    <input type="text" placeholder="用户名" v-model="user_name">
                </div>
                <div class="inputBox">
                    <input type="password" placeholder="密码" v-model="user_password">
                </div>
                <div class="inputBox">
                    <input type="password" placeholder="确认密码" v-model="affirm">
                </div>
                <div class="inputBox">
                    <input type="button" value="注册" @click="addUser()">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        name: "Register",
    },

    data() {
        return {
            user_name: '',
            user_password: '',
            affirm: '',
        };
    },
    methods: {
        addUser() {
            if (this.user_password === this.affirm) {
                this.$http.post('http://111.230.49.39:8082/user/register', {
                    "user_name": this.user_name,
                    "user_password": this.user_password,
                }).then(res => {
                    console.log(res.data);
                    if (res.data.code === 1) {
                        this.$message({
                            showClose: true,
                            message: '注册成功!',
                            type: 'success',

                        });
                        this.$router.go()
                    } else {
                        this.$message({
                            showClose: true,
                            message: '该账户已存在！',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        showClose: true,
                        message: '系统出错！请联系管理员~',
                        type: 'error'
                    });
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '两次密码不一致！',
                    type: 'error'
                });
            }
        },
    }
}
</script> 

<style scoped>
@import url("../assets/css/LodinRegister.css");
</style>