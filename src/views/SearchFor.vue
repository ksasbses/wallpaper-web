<template>
    <!-- 搜索页面 -->
    <div class="search">
        <el-container>
            <!-- 导航栏组件 -->
            <el-header class="header" style="height: 70px;">
                <NavigAtion></NavigAtion>
            </el-header>
            <!-- 搜索框 -->
            <el-main class="main">
                <el-input class="input" placeholder="请输入关键词" v-model="input" prefix-icon="el-icon-search" clearable>
                </el-input>
                <el-button type="primary" @click="search()">搜索</el-button>
            </el-main>
        </el-container>
        <!-- 壁纸视图组件 -->
        <WallpaperList v-if="flag" :list="list" :srcList="srcList"></WallpaperList>

    </div>
</template>
<script>
// 引入组件
import NavigAtion from '@/components/NavigAtion.vue';
import WallpaperList from '@/components/WallpaperList.vue';
export default {
    components: {
        NavigAtion,
        WallpaperList
    },
    data() {
        return {
            flag:false, 
            input: '',
            list: [], //壁纸数据
            srcList: [] //壁纸url数据
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
        search() {
            // console.log(this.input);
            this.getsearch(); //用户按下搜索按钮时调用
        },
        keyDown(e) {
            // 回车则执行搜索方法 enter键的ASCII是13
            if (e.keyCode == 13 || e.keyCode == 100) {
                this.getsearch(); // 定义的搜索方法
            }
        },
        //定义发送请求方法
        getsearch() {
            this.$http.get(`http://111.230.49.39:8082/wallpaper/search?keyword=${this.input}`).then(res => {
                this.list = res.data.data
                var str = "";
                this.list.forEach(function (e) {
                    str += e.url + ",";
                });
                str = str.substring(0, str.length - 1);
                this.srcList = str.split(",");
                if (this.list != null) {
                this.flag = true
            }
            });
        }
    }

}
</script>
<style scoped>
@import url('../assets/css/SearchFor.css');
.search {
    padding: 0;
    margin: 0;
    position: fixed;
    width: 100%;
    height: 100%;
}

.header {
    padding: 0;

}

.main {
    background-color: #f5f5f5af;
    text-align: center
}

.input {
    height: 55px;
    width: 60%;
    margin: 0 auto;
}

.input>>>.el-input__inner {
    height: 55px;
    border-radius: 8px 0px 0px 8px
}

.main>>>.el-button {
    height: 55px;
    width: 100px;
    border-radius: 0px 8px 8px 0px
}
</style>
