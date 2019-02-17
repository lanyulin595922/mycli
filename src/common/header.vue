<template>
  <div i="header">
      <div class="m-name">
          <!-- <img src="../../static/images/logo.jpg" alt> -->
          码帮科技
      </div>
      <div class="m-right">
          <ul class="m-catalog">
          <li :class="{'catalog-active':index==0}">
              <router-link to="index">首页</router-link>
          </li>
          <li :class="{'catalog-active':index==1}" v-if="username=='admin'">
              <router-link to="upload">上传</router-link>
          </li>
          <li :class="{'catalog-active':index==2}" v-if="username=='admin'">
              <router-link to="delvideo">视频管理</router-link>
          </li>
      </ul>
      <ul class="m-personal">
          <li>
              {{username}}
          </li>
          <!-- <li>
              设置
          </li> -->
          <li @click="userout">
              退出
          </li>
      </ul>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        index:0
    },
  data(){
      return{
          username:""
      }
  },
  methods:{
      userout(){
          let that = this;
          that.$message({
            message: "退出成功",
            type: "success"
          });
          setTimeout(function(){
              localStorage.removeItem('usermsg');
              that.$router.push({ name: "login", params: { id: "参数" } });
          },1000)
      }
  },
  mounted() {
      let that =this;
      if(localStorage.getItem("usermsg")){
      let usermsg = JSON.parse(localStorage.getItem("usermsg"))
      that.username = usermsg.username
    }
  },
}
</script>

<style lang="scss">
    [i="header"] {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 80px;
        background-color: rgba(9, 153, 153, 1);
        display: flex;
        align-items: center;
        padding: 0 30px;
        z-index: 10;
        .m-name{
            width: 10%;
            font-size: 32px;
            font-weight: 700;
            color:#fff;
            margin-right: 100px;
            img{
                width: 100%;
            }
        }
        .m-right{
            width: 80%;
            display: flex;
            justify-content: space-between;
        }
        .m-catalog{
            display: flex;
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            li{
                padding: 5px 20px;
                cursor: pointer;
                &:hover{
                    color: rgba($color: #fff, $alpha: 0.8);
                }
                a{
                    color:#fff;
                }
            }
        }
        .m-personal{
            display: flex;
            color: #E4E4E4;
            font-size: 15px;
            font-weight: 700;
            li{
                padding: 5px 20px;
                cursor: pointer;
                a{
                    color: #E4E4E4;
                }
                &:hover{
                    color: #fff;
                }
            }
        }
        .catalog-active{
            background: rgba($color: #fff, $alpha: 0.9);
            border-radius: 8px;
            a{
                color:#177663 !important;
            }
        }
    }
</style>
