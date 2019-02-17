<template>
  <div i="video">
    <div class="video-v" v-if="isVideo">
    <video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
></video-player>
    </div>
    <div class="video-list">
      <ul >
        <li v-for="(data,index) in videoList" @click="checklist(data)">
          {{data.name}}
        </li>
      </ul>
    </div>
    <div class="novideo" v-if="!isVideo">
      此课程暂无视频。。。
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoArr:"",
      videoList:[],
      isVideo:true,
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          src: "http://120.77.44.112/DW1009_clip.mp4" //url地址
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }
    }
  },
  methods:{
    checklist(data){
      let that = this;
      that.$refs.videoPlayer.player.src(data.url)
    },
    getVideo(){
      let that = this;
      that.$axios({
          method: "GET",
          url: "cloud/video/list",
          params: {
            course_id:that.$route.params.id,
            token: that.getLocalStorage().token
          }
        })
        .then(res => {
          let that = this;
          console.log(res);
          
          if(res.data.data.list!==null){
            
            that.videoList = res.data.data.list;
            that.$refs.videoPlayer.player.src (that.videoList[0].url)
          }else{
            
            that.isVideo = false;
          }
        });
    }
  },
  mounted(){
    let that = this;
    that.getVideo();
  }
};
</script>

<style lang="scss">
[i="video"] {
  min-width: 1200px;
  height: 100%;
  display: flex;
  .video-js .vjs-big-play-button{
    font-size: 2.5em;
    line-height: 3.5em !important;
    width: 3.5em !important;
    height: 3.5em !important;
    -webkit-border-radius: 2.5em !important;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(0,0,0,0);
    border-width: 2px;
    margin: 0 auto;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-left: -1.5em;
}
  .vjs-custom-skin > .video-js .vjs-control-bar{
    background-color: rgba(0,0,0,0) !important;
  }
  .vjs-big-play-button:focus{
    outline-color: rgba(0,0,0,0)
  }
  .vjs-button:focus{
    outline-color: rgba(0,0,0,0)
  }
  .video-v{
    width: 85%;
    padding: 2%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .video-player{
    width: 100%;
  }
  }
  .video-list{
    width: 15%;
    height: 100%;
    border-left: 1px solid #e6e6e6;
    // height: 20px;
    // background-color: rgba(0, 0, 0, 0.5);
    ul{
      li{
        width: 100%;
        text-align: center;
        padding: 20px 0;
        cursor: pointer;
        &:hover{
          background-color: #099999;
          color: #fff;
        }
      }
    }
  }
  .novideo{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
    color:#000;
    font-size: 30px;
  }
  
}
</style>
