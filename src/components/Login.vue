<template>
    <!-- 登录组件 -->
    <div class="container">
        <div class="form">
            <h2>欢迎登录</h2>
            <form class="biaodan">
                <div class="inputBox">
                    <input type="text" placeholder="用户名" name="username" id="uname" v-model="user.user_name">
                </div>
                <div class="inputBox">
                    <input type="password" placeholder="密码" name="password" id="upwd" v-model="user.user_password">
                </div>
                <div class="inputBox">
                    <input @click="submitForm(user)" @keyup.enter="keyDown(e)" type="button" value="登录">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        name: "Login",
    },
    data() {
        return {
            user: {
                user_name: '',
                user_password: ''
            }
        }
    },
    mounted() {
        // 绑定监听事件
        window.addEventListener("keydown", this.keyDown);
    },
    destroyed() {
        // 销毁事件
        window.removeEventListener("keydown", this.keyDown, false);
    },

    methods: {
        // 点击回车键登录
        keyDown(e) {
            // 回车则执行登录方法 enter键的ASCII是13
            if (e.keyCode == 13 || e.keyCode == 100) {
                this.submitForm(this.user); // 定义的登录方法
            }
        },

        // 定义登录请求
        submitForm(user) {
            this.$http.post('http://111.230.49.39:8082/login', { user_name: user.user_name, user_password: user.user_password })
            .then((res) => {
                // console.log(res.data);
                // 判断用户是否登录成功
                if (res.data.data != null) {
                    this.$message({
                        showClose: true,
                        message: '登陆成功!',
                        type: 'success'
                    });
                    // 把用户数据存到sessionStorage
                    sessionStorage.setItem("userinfo", JSON.stringify(res.data.data))
                    // 跳转到首页面
                    this.$router.replace({ path: '/home' })
                } else {
                    this.$message({
                        showClose: true,
                        message: '用户名或者密码错误!',
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
        }
    }
};
</script> 

<style scoped>
@import url("../assets/css/LodinRegister.css");
</style>
