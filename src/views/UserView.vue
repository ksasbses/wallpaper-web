<template>
    <!-- 用户界面 -->
    <div class="box">
        <el-container>
            <!-- 导航栏 -->
            <el-header class="header" style="height: 70px;">
                <NavigAtion></NavigAtion>
            </el-header>
            <el-main class="main">
            </el-main>
        </el-container>
        <!-- 用户信息界面 -->
        <div v-if="data != null">
            <el-card class="box-card2">
                <div>
                    <div style="float: left;">
                        <el-avatar :size="70" fit="fill">
                            <img :src="imgURL" />
                        </el-avatar>
                    </div>
                    <div style="float: left; width: 200px; margin-left: 10px;">
                        <h3>{{ data.user_name }}</h3>
                    </div>
                    <div style="float: right; margin-top: 10px;"><el-button @click="logOut()" plain>退出登录</el-button></div>
                </div>

            </el-card>
            <el-tabs v-model="activeName" style="margin: 20px auto;">
                <el-tab-pane label="收藏" name="collect">
                    <WallpaperList :list="list" :srcList="srcList"></WallpaperList>
                </el-tab-pane>
                <el-tab-pane label="上传壁纸" name="UploadingWallpapers">待开发。。。</el-tab-pane>
            </el-tabs>
        </div>
        <!-- 登录注册界面 -->
        <el-card class="box-card" v-else>
            <el-tabs v-model="courrentIndex" stretch>
                <el-tab-pane label="登录" name="login">
                    <Login></Login>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <Register></Register>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
// 引入组件
import NavigAtion from '@/components/NavigAtion.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import WallpaperList from '@/components/WallpaperList.vue';
export default {
    components: {
        Login,
        NavigAtion,
        Register,
        WallpaperList,
    },
    data() {
        return {
            list: [],
            srcList: [],
            data: null,
            imgURL: "",
            courrentIndex: "login",
            activeName: 'collect'
        }

    },
    created() {
        // 当sessionStorage存在数据时 获取用户登录信息
        if (sessionStorage.getItem("userinfo")) {
            // 把用户的信息赋值给data
            this.data = JSON.parse(window.sessionStorage.getItem('userinfo'))
        }
        if (this.data != null) {
            this.queryCollect()
            this.imgURL = this.data.image
        }

    },
    methods: {
        errorHandler() {
            return true
        },
        logOut() {
            sessionStorage.removeItem("userinfo");
            this.data = null
            this.$message({
                showClose: true,
                message: '已退出登录!',
                type: 'warning'
            });
        },
        queryCollect() {
            this.$http.get("http://111.230.49.39:8082/user/collectall?id=" + this.data.id, {
                headers: {
                    'token': this.data.jwt
                },
                params: ''
            }).then(res => {
                console.log(res);
                this.list = res.data.data
                // 把url遍历到srcList用于图片放大预览
                var str = "";
                this.list.forEach(function (e) {
                    str += e.url + ",";
                });
                str = str.substring(0, str.length - 1);
                this.srcList = str.split(",");
            }).catch((err) => {
                // 请求失败
                console.log(err);
                this.$message.error('出错了,请联系管理员!');
            });
        }

    }
}
</script>
<style scoped>
.box {
    padding: 0;
    margin: 0;
    position: fixed;
    /* position:relative; */
    width: 100%;
    height: 100%;
}

::v-deep .el-tabs__header {
    margin: 0 20px;
    padding: 0;

}

.box-card {
    /* text-align: center; */
    width: 50%;
    margin: 50px auto;
    height: auto;
    /* background-color:#d6d6d6af; */
}

.header {
    padding: 0;
}

.main {
    background-color: #f5f5f5af;
}
</style>