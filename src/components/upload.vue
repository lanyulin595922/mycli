<template>
  <div i="upload">
    <idxhead index="1"></idxhead>
    <div class="upload-container">
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
        <el-button type="primary" @click="dialogFormVisible = true">立刻创建</el-button>
      </div>
      <div class="f-title">课程</div>
      <div>
        <el-select v-model="course" placeholder="请选择" :disabled="category?false:true">
          <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" @click="coursedialog = true">立刻创建</el-button>
      </div>

      <!-- 课程类别 -->
      <div class="video-type">
        <div class="f-title">类型</div>
        <el-radio
          v-model="vradio"
          :label="data.id"
          v-for="(data,index) in videoType"
          @change="checkType(data)"
        >{{data.name}}</el-radio>
      </div>
      <!-- 视频名称 -->
      <div class="video-title">
        <div class="f-title">标题</div>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入标题"
          maxlength="60"
          resize="none"
          v-model="videoTitle"
        ></el-input>
      </div>
      <div class="video-des">
        <div class="f-title">简介</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8}"
          placeholder="请输入标题"
          resize="none"
          v-model="videoDes"
        ></el-input>
      </div>
      <div class="video-upload">
        <div class="f-title">上传视频</div>
        <el-upload
          class="upload-video"
          multiple
          action="http://120.77.44.112:8084/cloud/mediaFile/upload"
          :data="token"
          accept=".mp4"
          :on-preview="videoPreview"
          :on-remove="videoRemove"
          :on-success="uploadvideo"
          :file-list="fileListvideo"
          list-type="text"
        >
          <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
        </el-upload>
      </div>
      <div class="upload-btn">
        <el-button type="primary" @click="release">立即发布</el-button>
      </div>
      <!-- 分区弹窗 -->
      <el-dialog title="创建分区" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分区名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createf">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 创建课程弹窗 -->
      <el-dialog title="创建课程" :visible.sync="coursedialog">
        <el-select v-model="coursecategory" placeholder="请选择">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-form :model="form">
          <el-form-item label="课程名称">
            <el-input v-model="form.coursename" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-upload
          class="upload-img"
          ref="upload"
          action="http://120.77.44.112:8084/cloud/mediaFile/upload"
          :data="token"
          accept=".jpg, .png"
          :on-preview="imgPreview"
          :on-remove="imgRemove"
          :on-success="uploadimg"
          :file-list="fileList"
          list-type="picture"
          :limit="1"
        >
          <el-button slot="trigger" size="small" type="primary" :disabled.sync="imgserveable">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传一个jpg/png文件</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="coursedialog = false">取 消</el-button>
          <el-button type="primary" @click="createcourse">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import idxhead from "../common/header";
export default {
  data() {
    return {
      category: "",
      course: "",
      coursecategory: "",
      courseison: false,
      dialogFormVisible: false,
      coursedialog: false,
      form: {
        name: "",
        coursename: ""
      },
      categoryList: [],
      courseList: [],
      fileList: [],
      videoType: [],
      vradio: "",
      videoTitle: "",
      videoDes: "",
      fileList: [],
      fileListvideo: [],
      uploadvideolist: [],
      imgserveable: false,
      token: {
        token: this.getLocalStorage().token
      }
    };
  },
  watch: {},
  components: {
    idxhead
  },
  methods: {
    init() {
      let that = this;
      //获取课程列表
      that
        .$axios({
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
      //获取课程类别
      that
        .$axios({
          method: "GET",
          url: "cloud/videoType/list",
          params: {
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          that.videoType = res.data.data.list;
        });
    },
    createf() {
      let that = this;

      let ajaxData = {
        data: {
          name: that.form.name
        },
        token: that.getLocalStorage().token
      };
      that
        .$axios({
          method: "POST",
          url: "/cloud/category",
          data: ajaxData
        })
        .then(res => {
          console.log(res);
          alert("创建成功");
          that.dialogFormVisible = !that.dialogFormVisible;
          that.init();
        });
    },
    changecategory() {
      let that = this;
      console.log();
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
    //创建课程
    createcourse() {
      let that = this;
      if (!that.coursecategory) {
        that.$message.error("请选择分类");
      } else {
        let ajaxData = {
          data: {
            category_id: that.coursecategory,
            name: that.form.coursename
          },
          token: that.getLocalStorage().token
        };
        that
          .$axios({
            method: "POST",
            url: "/cloud/course",
            data: ajaxData
          })
          .then(res => {
            // console.log(res);
            that.$message({
              message: "创建课程成功",
              type: "success"
            });
            that.coursedialog = !that.coursedialog;
            that.init();
          });
      }
    },
    checkType(data) {
      let that = this;
      that.rvideo = data.id;
    },
    //发布
    release() {
      let that = this;
      if (!that.category) {
        this.$message.error("请选择分区");
        return;
      }
      if (!that.course) {
        this.$message.error("请选择课程");
        return;
      }
      if (!that.vradio) {
        this.$message.error("请选择课程");
        return;
      }
      if (!that.videoTitle) {
        this.$message.error("请输入标题");
        return;
      }
      if (!that.uploadvideolist) {
        this.$message.error("请上传视频");
        return;
      }
      let ajaxData = {
        data: that.uploadvideolist,
        // {
        //   course_id: that.course,
        //   description: that.videoDes,
        //   name: that.videoTitle,
        //   id: that.category,
        //   tags: "",
        //   url: that.uploadvideolist,
        //   video_type_id: that.rvideo
        // },
        token: that.getLocalStorage().token
      };
      console.log(ajaxData);
      that
        .$axios({
          method: "POST",
          url: "cloud/video/list",
          data: ajaxData
        })
        .then(res => {
          console.log(res);
          that.$message({
            message: "发布成功",
            type: "success"
          });
          setTimeout(function() {
            that.$router.push({ name: "index", params: { id: "参数" } });
          }, 1000);
        });
    },
    //上传图片
    imgRemove(file, fileList) {
      let that = this;
      that.imgserveable = false;
      document.querySelector(".upload-img input").removeAttribute("disabled");
      console.log(file, fileList);
    },
    imgPreview(file) {
      console.log(file);
    },
    uploadimg(res) {
      let that = this;
      if (res.result_code == 0) {
        that.imgserveable = true;
        document
          .querySelector(".upload-img input")
          .setAttribute("disabled", "true");
      }
      console.log(res);
    },
    //上传视频
    videoRemove(file, fileList) {
      let that = this;
      console.log(file, fileList);
    },
    videoPreview(file) {
      console.log(file);
    },
    uploadvideo(res, file, fileList) {
      let that = this;
      var subStr = new RegExp(".mp4", "ig"); //创建正则表达式对象,不区分大小写,全局查找
      let videoName = file.name.replace(subStr, ""); 
      
      if (res.result_code == 0) {
        var videourl = "http://120.77.44.112" + res.data.path;
        console.log(videourl);
        that.uploadvideolist.push({
          course_id: that.course,
          video_type_id: that.rvideo,
          url: videourl,
          name: videoName
        });
      }
      console.log(that.uploadvideolist);
    }
  },
  mounted() {
    let that = this;
    that.init();
  }
};
</script>

<style lang="scss">
[i="upload"] {
  display: flex;
  justify-content: center;
  padding-top: 80px;
  .upload-container {
    min-width: 1200px;
    padding: 20px;
    .f-title {
      margin: 20px 0;
    }
    .video-type {
      padding-top: 20px;
    }
    .upload-btn {
      margin-top: 40px;
    }
    .el-button--primary {
      background-color: #099999;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #099999;
      background: #099999;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #099999;
    }
    .video-upload {
      width: 50%;
    }
  }
}
</style>
