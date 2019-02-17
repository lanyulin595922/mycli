<template>
  <div i="index">
    <idxhead :index=0></idxhead>
    <!-- 侧边导航栏 -->
    <el-container style="height: 100%;padding-top:80px">
      <el-aside width="250px">
        <el-menu default-active="0">
          <el-menu-item
            :index="index+''"
            v-for="(data,index) in categoryList"
            @click="getcourselist(data)"
            
          >
            <template slot="title">{{data.name}}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="idx-container">
        <ul>
          <li v-for="(data,index) in courseList" @click="intovideo(data)">
            <div class="video-img">
              <img src="../../static/images/u62.png" alt>
            </div>
            <div class="video-name">{{data.name}}</div>
          </li>
        </ul>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import idxhead from "../common/header";
export default {
  data() {
    return {
      username: "",
      categoryList: [],
      courseList:[],
    };
  },
  components: {
    idxhead
  },
  methods: {
    init() {
      let that = this;
      that.$axios({
          method: "GET",
          url: "cloud/category/list",
          params: {
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.categoryList = res.data.data.list;
          // console.log(that.categoryList);
          that.$axios({
          method: "GET",
          url: "/cloud/course/list",
          params: {
            category_id:that.categoryList[0].id,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.courseList = res.data.data.list;
          // console.log(that.courseList);
        });
        });
        
    },
    getcourselist(data) {
      let that = this;
      console.log(data);
      that.$axios({
          method: "GET",
          url: "/cloud/course/list",
          params: {
            category_id:data.id,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.courseList = res.data.data.list;
          console.log(that.courseList);
        });
    },
    intovideo(data){
      let that = this;
      that.$router.push({ name: "video", params: { id: data.id } });
    }
  },
  mounted() {
    let that = this;
    that.init();
  }
};
</script>

<style lang="scss">
[i="index"] {
  height: 100%;
  .el-aside {
    // padding-top: 80px;
    border-right: 1px solid #eee;
  }
  .el-menu {
    border: none;
  }
  .idx-container {
    height: 100%;
    padding: 20px;
    overflow: hidden;
    overflow-y: auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-content: baseline;
      li {
        height: 200px;
        cursor: pointer;
        margin: 0 20px;
        .video-img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 260px;
          height: 160px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .video-name{
          text-align: center;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
