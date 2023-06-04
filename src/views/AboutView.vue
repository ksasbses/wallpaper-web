<template>
  <div class="about">
    <el-container>
      <!-- 导航栏 -->
      <el-header class="header" style="height: 70px;">
        <NavigAtion></NavigAtion>
      </el-header>
      <el-main class="main">
      </el-main>
    </el-container>
    <div class="go">
      <el-card class="box-card">
        <div class="item">
          <img src="../assets/maxlogo.png" alt="">
        </div>
        <div class="text">
          <p>雪瞳壁纸是由本学期学习SSM框架期末考核要求 所开发的一个壁纸小站 ,
            免费提供壁纸的预览和下载 , 壁纸来源都是平时收藏的 , 仅个人使用。
          </p>
          <P>本站采用SpringBoot+Vue.js前后端分离开发 , 前端使用Vue+Elment-Ui组件 ,
            能够便捷的开发 , 大幅度弥补了前端知识的缺乏 ,后端使用SpringBoot 能够快速的搭建Spring框架,SpringBoot继承了Spring优秀的基因,大大减少代码量
            SpringBoot相比与spring 简化了依赖、配置、 部署、 监控等等。
          </P>
          <p>期间遇到非常多的问题: 如Axios请求跨域、Vue组件与组件之间的数据传输等等,
            Vue也是刚接触 , 基本是一边学一边写 , 所以开发速度极其缓慢 , 一月有余 , 小站开发不易 访问速度不是很好 , 壁纸放在阿里云OSS对象存储, 没钱开加速 服务器也是最拉的 所以图片加载有亿点点慢
            还存在亿丢丢Bug, 请多多担待~
          </p>
          <p>页面样式基本仿照于极简壁纸 , 本站搭建为学习所用,如有侵权 请联系3150738278@qq.com</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import NavigAtion from '@/components/NavigAtion.vue';

export default {
  components: {
    NavigAtion,

  },
  data() {
    return {
    }
  },

}
</script>
<style scoped>
@import url('../assets/css/AboutView.css');

</style>