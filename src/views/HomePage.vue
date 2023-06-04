<template>
  <!-- 首页 -->
  <div class="dbox">
    <el-container>
            <!-- 导航栏组件 -->
            <el-header class="header" style="height: 70px; ">
              <navig-ation></navig-ation>
            </el-header>
            <el-main class="main"></el-main>
    </el-container>
    <!-- 壁纸视图组件 -->
    <wallpaper-list v-if="flag" :list="list" :srcList="srcList"></wallpaper-list>
  </div>
</template>
<script>
// 引入组件
import WallpaperList from "../components/WallpaperList.vue";
import NavigAtion from "@/components/NavigAtion.vue";

export default {
  components: {
    WallpaperList,
    NavigAtion
},
  data() {
    return {
      flag:false,
      list: [],
      srcList: []
    };
  },
  created() {
    // 初始化的时候请求数据
    this.$http.get('http://111.230.49.39:8082/wallpapers/all').then(res => {
      // 把数据放到list
      this.list = res.data.data 
      // 把url遍历到srcList用于图片放大预览
      var str = "";
      this.list.forEach(function (e) {
        str += e.url + ",";
      });
      str = str.substring(0, str.length - 1);
      this.srcList = str.split(",");
      if (this.list !=null) {
        this.flag = true
      }
    });
  }, 
};
</script>
<style scoped>
.dbox {
  padding: 0;
  margin: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}
.header {
    padding: 0;

}
.main{
  background-color: #f5f5f5af;
}


</style>