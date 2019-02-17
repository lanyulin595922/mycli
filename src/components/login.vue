<template>
  <div class="login" i="login">
    <div class="modal">
      <div class="image">
        <img src="../../static/images/logo.jpg" alt>
      </div>
      <div class="title">全套Java、Android、HTML5前端、Python、大数据视频</div>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="accounts">
          <el-input
            type="text"
            v-model="ruleForm2.accounts"
            autocomplete="off"
            placeholder="请输入登录帐号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm2.pass"
            autocomplete="off"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit" @click="submitForm('ruleForm2')">登录</div>
        </el-form-item>
      </el-form>
      <div class="toregister">
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateAccounts = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      ruleForm2: {
        pass: "",
        accounts: ""
      },
      rules2: {
        accounts: [{ validator: validateAccounts, trigger: "change" }],
        pass: [{ validator: validatePass, trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
      let that = this;
      const forData = {
        auth_code: "123",
        username: that.ruleForm2.accounts,
        pwd: that.ruleForm2.pass
      };
      that.$axios.post("cloud/user/login", forData).then(res => {
        let that = this;
        if (res.data.result_code == "0") {
          let usermsg = {
            username: that.ruleForm2.accounts,
            token: res.data.data.token
          };
          localStorage.setItem("usermsg", JSON.stringify(usermsg));
          that.$message({
            message: "登陆成功",
            type: "success"
          });
          setTimeout(function(){
            that.$router.push({ name: "index", params: { id: "参数" } });
          },1000)
        } else {
          alert(res.data.result_msg);
        }
      });
    }
  }
};
</script>
<style lang="scss">
[i="login"] {
  width: 100%;
  height: 100%;
  background-color: rgba(9, 153, 153, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    flex-wrap: wrap;
    width: 520px;
    height: 580px;
    background-color: #fff;
    border-radius: 12px;
    padding: 75px 100px;
    .image {
      width: 239px;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .title {
      text-align: center;
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
      font-weight: 700;
      font-style: normal;
      font-size: 20px;
      color: #177663;
      line-height: 32px;
      margin-bottom: 30px;
    }
    .el-form-item__label {
      text-align: left;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-input.is-active .el-input__inner,
    .el-input__inner:focus {
      border-color: #177663;
    }
    .el-input__inner {
      // width: 300px;
      height: 60px;
    }
    .submit {
      width: 100%;
      height: 60px;
      background-color: rgba(9, 153, 153, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
    .toregister {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        color: #999999;
        &:hover {
          color: rgb(102, 102, 102);
        }
      }
    }
  }
}
</style>
