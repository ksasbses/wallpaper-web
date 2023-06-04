<template>
    <!-- 分类页面 -->
    <div class="box">
        <el-container>
            <!-- 导航栏 -->
            <el-header class="header" style="height: 70px;">
                <NavigAtion></NavigAtion>
            </el-header>
            <!-- 类别按钮 -->
            <el-main class="main">
                <div class="nav">
                    <el-button v-for="item in category" type="primary" plain class="button" :autofocus="true" @click="getfenlei(item.id)">{{ item.name}}</el-button>
                </div>
            </el-main>
        </el-container>
        <!-- 壁纸视图组件 -->
        <WallpaperList :list="list" :srcList="srcList"></WallpaperList>
    </div>
</template>
<script>
import NavigAtion from '@/components/NavigAtion.vue';
import WallpaperList from '@/components/WallpaperList.vue';
export default {
    components: {
        NavigAtion,
        WallpaperList
    },
    data() {
        return {
            num: 1,
            category:[],
            list: [],
            srcList: []
        }
    },

    methods: {
        queryType(){
            this.$http.get("http://111.230.49.39:8082/category/all").then(res => {
                console.log(res);
                this.category = res.data.data
            });
        },
        // 发送请求获取对应类别的数据
        getfenlei(id) {
            this.$http.get("http://111.230.49.39:8082/wallpapers/category?categoryid=" + id).then(res => {
                this.list = res.data.data
                // 重复代码太多了 现在不管先
                // 把url遍历到srcList用于图片放大预览
                var str = "";
                this.list.forEach(function (e) {
                    str += e.url + ",";
                });
                str = str.substring(0, str.length - 1);
                this.srcList = str.split(",");
            });
        }
    },
    created() {
        // 初始化时默认发送一次请求
        // console.log(this.category[1].id);
        this.getfenlei(4);
        this.queryType()
    },
}
</script>
<style  scoped>
@import url('../assets/css/CateGory.css');
</style>