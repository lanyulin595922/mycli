<template>
  <div i="delvideo">
    <idxhead index="2"></idxhead>
    <div class="delvideo-container">
      <div class="f-title">分区</div>
      <div>
        <el-select v-model="category" placeholder="请选择" @change="changecategory()">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button type="danger" @click="delcategory()">立刻删除</el-button>
      </div>
      <div class="f-title">课程</div>
      <div>
        <el-select v-model="course" placeholder="请选择" :disabled="category?false:true" @change="changecourse()">
          <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="danger" @click="delcourse()">立刻删除</el-button>
      </div>
      <div class="f-title">视频</div>
      <div>
        <el-select v-model="videoId" placeholder="请选择" :disabled="category&&course?false:true">
          <el-option v-for="item in videoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="danger" @click="delvideo()">立刻删除</el-button>
      </div>
    </div>
    
    </div>
  </div>
</template>

<script>
import idxhead from "../common/header";
export default {
  data() {
    return {
      category: "",
      categoryList: [],
      course:"",
      courseList:[],
      videoId:"",
      videoList:[],
    };
  },
  methods: {
    init() {
      let that = this;
      //获取课程列表
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
        });
    },
    delcategory() {
      let that = this;
      if (!that.category) {
        this.$message.error("请选择分区");
        return;
      }
      console.log(that.category);
      that.$axios({
          method: "DELETE",
          url: "cloud/category",
          params: {
            id:that.category,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.$message({
            message: "删除成功",
            type: "success"
          });
          that.category="";
          that.getcategory();
          console.log(res);
        });
    },
    changecategory() {
      let that = this;
      //获取课程列表
      that
        .$axios({
          method: "GET",
          url: "/cloud/course/list",
          params: {
            category_id: that.category,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.courseList = res.data.data.list;
          // console.log(that.courseList);
        });
    },
    delcourse(){
        let that = this;
      if (!that.category) {
        this.$message.error("请选择分区");
        return;
      }
      if (!that.course) {
        this.$message.error("请选择课程");
        return;
      }
      console.log(that.course);
      that.$axios({
          method: "DELETE",
          url: "cloud/course",
          params: {
            id:that.course,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.$message({
            message: "删除成功",
            type: "success"
          });
          that.course="";
          that.changecategory();
          console.log(res);
        });
    },
    changecourse(){
        let that = this;
      //获取视频列表
      that
        .$axios({
          method: "GET",
          url: "/cloud/video/list",
          params: {
            course_id: that.course,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.videoList = res.data.data.list;
          // console.log(that.courseList);
        });
    },
    delvideo(){
        let that = this;
      if (!that.category) {
        this.$message.error("请选择分区");
        return;
      }
      if (!that.course) {
        this.$message.error("请选择课程");
        return;
      }
      if (!that.videoId) {
        this.$message.error("请选择视频");
        return;
      }
      let videoId = [];
      videoId.push(that.videoId)
      console.log(videoId);
      that.$axios({
          method: "DELETE",
          url: "cloud/video",
          params: {
            id:that.videoId,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.$message({
            message: "删除成功",
            type: "success"
          });
          that.videoId="";
          that.changecourse();
          
        });
    }
  },
  components: {
    idxhead
  },
  mounted() {
    let that = this;
    that.init();
  }
};
</script>

<style lang="scss">
[i="delvideo"] {
  display: flex;
  justify-content: center;
  padding-top: 80px;
  .delvideo-container {
    min-width: 1200px;
    padding: 20px;
    .f-title {
      margin: 20px 0;
    }
  }
}
</style>
