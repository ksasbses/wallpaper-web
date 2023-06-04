<template>
  <!-- 导航栏组件 -->
  <nav id="top">
    <div class="logo"><el-image :src="logo" fit="scale-down"></el-image></div>
    <div class="nav-text">
      <ul class="nav-titles">
        <li class="nav-title">
          <router-link to="./home">
            <div class="nav-link">
              <span></span>
              <i class="el-icon-house"></i>首页
            </div>
          </router-link>
        </li>
        <li class="nav-title">
          <router-link to="./category">
            <div class="nav-link">
              <span><i class="el-icon-s-operation"></i>分类</span>
            </div>
          </router-link>
        </li>
        <li class="nav-title">
          <router-link to="./search">
            <div class="nav-link">
              <span><i class="el-icon-search"></i>搜索</span>
            </div>
          </router-link>
        </li>
        <li class="nav-title">
          <router-link to="./user">
            <div class="nav-link">
              <span><i class="el-icon-user"></i>我的</span>
            </div>
          </router-link>
        </li>
        <li class="nav-title">
          <router-link to="/about">
            <div class="nav-link">
              <span><i class="el-icon-info"></i>关于</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template> 
<script>
export default {
  name: "NavigAton",
  data(){
    return {
      logo:"data:image/png;base64,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"
    }
  }
};
</script> 
<style scoped>
@import url('../assets/css/NavigAtion.css');

</style>