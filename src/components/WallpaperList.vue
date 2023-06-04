<template>
  <!-- 壁纸视图组件 -->
  <div class="box" id="Wallpapers">
    <div id='header'></div>
    <div class="topup"><el-button icon="el-icon-caret-top" @click="toTop"></el-button></div>
    <div class="parent-container">
      <div class="wallpaper-container">
        <div class="row">
          <!-- 循环图片数据展示 -->
          <template v-for="v in dataShow">
            <div class="col-img" :key="v.id">
              <el-image :src="v.url" :preview-src-list="srcList" lazy class="img-box" />
              <!-- 下载图片 -->
              <div class="download" title="下载" @click="downloadPicture(v.url, v.name)">
                <button class="button1">保存</button>
              </div>
              <!-- 收藏 -->
              <div v-if="collect.includes(v.id)" class="wish" title="取消收藏" @click="addWish(v.id)">
                <i class="el-icon-star-on"></i>
              </div>
              <div v-else class="wish" title="收藏" @click="addWish(v.id)">
                <i class="el-icon-star-off"></i>
              </div>
            </div>
          </template>
        </div>
        <!-- 分页展示 -->
        <el-pagination background layout="prev, pager, next" :total="list.length" :pageSize="pageSize"
          :hide-on-single-page="hide" :page-count="pageNum" @prev-click="prePage()" @next-click="nextPage()"
          @current-change="page">
        </el-pagination>
      </div>
    </div>
  </div>
</template>  

<script>

export default {
  name: "WallpaperList",
  data() {
    return {
      data: null,//存储用户数据
      hide: true, //只有一页隐藏分页器
      collect: [], //用户收藏的壁纸的id
      totalPage: [], // 所有分页的数据
      pageSize: 24, // 每页显示数量
      pageNum: 1,  // 共几页=所有数据/每页现实数量     
      dataShow: [], // 当前显示的数据  
      currentPage: 0 // 默认当前显示第一页
    };
  },
  // 接收父组件的数据
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    srcList: {
      type: Array,
      default: () => [],
    }

  },
  // 监听父组件的数据变化并更新数据
  watch: {
    list(curVal, oldVal) {
      if (curVal) {
        this.list = curVal;
        // console.log('子页面', this.list);
        this.updata();
        this.currentPage = 0
      }
    },
  },
  created() {
    this.updata()
    // 当sessionStorage存在数据时 获取用户登录信息
    if (sessionStorage.getItem("userinfo")) {
      // 把用户的信息赋值给data
      this.data = JSON.parse(window.sessionStorage.getItem('userinfo'))
    }
    // console.log('user', this.data);
    // 组件初始化的时候 判断用户是否登录 
    if (this.data != null) {
      // 调用方法给collect赋值
      this.collection()
    }
  },



  methods: {
    // 添加收藏 取消收藏方法
    addWish(w_id) {
      // 判断用户是否登录
      if (this.data != null) {
        // 判断该壁纸是否存在收藏里面
        if (this.collect.includes(w_id)) {
          // console.log('del',this.collect);
          // 发送请求删除数据库的数据
          this.$http.delete("http://111.230.49.39:8082/user/cancel?id=" + w_id, {
            headers: {
              'token': this.data.jwt //携带token
            },
            params: ''
          }).then(res => {
            // console.log('取消',res);
            // 判断是否成功 
            if (res.data.code === 1) {
              // 存在则删除collect的壁纸id
              this.$delete(this.collect, this.collect.indexOf(w_id))
              // 显示弹窗
              this.$message({
                showClose: true,
                message: '已取消收藏',
                type: 'warning'
              });
            } else {
              // 显示弹窗
              this.$message({
                showClose: true,
                message: '1出错了,请联系管理员!',
                type: 'error'
              });
            }
          }).catch((err) => {
            // 请求失败
            console.log(err);
            this.$message({
              showClose: true,
              message: '2出错了,请联系管理员!',
              type: 'error'
            });
          });

        } else {
          // 该壁纸不存在收藏里面
          // console.log('add',this.collect);
          // 发送请求把数据添加到数据库
          this.$http.post(`http://111.230.49.39:8082/user/collect?id=${this.data.id}&w_id=${w_id}`, {}, {
            headers: {
              'token': this.data.jwt
            },
          }).then(res => {
            // console.log(this.data.jwt);
            // console.log('添加', res);
            // 判断是否成功
            if (res.data.code === 1) {
              // 把该壁纸的id添加到collect
              this.collect.push(w_id)
              // 显示弹窗
              this.$message({
                showClose: true,
                message: '已添加至收藏!',
                type: 'success'
              });
            } else {
              // 显示弹窗
              this.$message({
                showClose: true,
                message: '3出错了,请联系管理员!',
                type: 'error'
              });
            }
          }).catch((err) => {
            // 请求失败
            console.log(err);
            this.$message({
              showClose: true,
              message: '4出错了,请联系管理员!',
              type: 'error'
            });
          });
        }
      } else {
        // 用户未登录 跳转到登录页面
        this.$message({
          showClose: true,
          message: '当前未登录,请登录后操作!',
          type: 'error'
        });
        this.$router.replace({ path: '/user' })
      }



    },
    // 获取用户收藏的数据
    collection() {
      this.$http.get("http://111.230.49.39:8082/user/collectall?id=" + this.data.id, {
        headers: {
          'token': this.data.jwt
        },
        params: ''
      }).then(res => {
        // console.log(res.data.data);
        // 遍历数据把收藏的壁纸 id 放到collect中
        for (let item of res.data.data) {
          this.collect.push(item.id);
        }
        // console.log('cpllect', this.collect);
      }).catch((err) => {
        // 请求失败
        console.log(err);
        this.$message.error('出错了,请联系管理员!');
      });
    },

    updata() {
      this.pageNum = Math.ceil(this.list.length / this.pageSize) || 1;//计算有多少页数据，默认为1

      // 循环页面
      for (let i = 0; i < this.pageNum; i++) {
        // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为2， 则第一页是1-2条，即slice(0,2)，第二页是3-4条，即slice(3,4)以此类推
        this.totalPage[i] = this.list.slice(this.pageSize * i, this.pageSize * (i + 1))
      }

      // 获取到数据后默认显示第一页内容
      this.dataShow = this.totalPage[this.currentPage];
      // console.log(this.list)
    },
    // 下一页
    nextPage() {
      if (this.currentPage === this.pageNum - 1) return;
      this.dataShow = this.totalPage[++this.currentPage];
      this.toTop() //返回顶部
    },
    // 上一页
    prePage() {
      if (this.currentPage === 0) return;
      this.dataShow = this.totalPage[--this.currentPage];
      this.toTop() //返回顶部
    },
    // 点击页码
    page(val) {
      this.currentPage = val
      this.dataShow = this.totalPage[val - 1];
      this.toTop() //返回顶部
    },

    // 回到顶部
    toTop() {
      document.querySelector("#header").scrollIntoView(true);
    },
    // 下载图片
    downloadPicture(imgSrc, name) {
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.src = imgSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.download = name || "photo";
          a.href = url;
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        });
      };
    },
    handDown(url) {
      this.downloadPicture(url, "pic");
    },

  },
};
</script>
<style scoped>
@import url("../assets/css/Wallpapers.css");

.el-pagination {
  text-align: center;
}
</style>