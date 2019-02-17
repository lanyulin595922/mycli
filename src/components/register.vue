<template>
  <div i="register">
    <div class="modal">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <label class="label">手机</label>
        <el-form-item prop="accounts">
          <el-input
            type="text"
            v-model="ruleForm2.accounts"
            autocomplete="off"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <label class="label">用户名</label>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm2.username"
            autocomplete="off"
            placeholder="中、英文均可，最长xx个英文xx个"
          ></el-input>
        </el-form-item>
        <label class="label">密码</label>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm2.pass"
            autocomplete="off"
            placeholder="5-20英文、数字、区分大小写"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit" @click="submitForm('ruleForm2')">注册</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      }
      callback();
    };
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
        username: "",
        pass: "",
        accounts: ""
      },
      rules2: {
        username: [{ validator: validateName, trigger: "change" }],
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
        mobile: that.ruleForm2.accounts,
        pwd: that.ruleForm2.pass,
        username: that.ruleForm2.username
      };
      that.$axios.post("cloud/user/register", forData).then(res => {
        let that = this;
        if(res.data.result_code=="0"){
          that.$message({
            message: "注册成功",
            type: "success"
          });
        setTimeout(function(){
          that.$router.push({ name: "login", params: { id: "参数" } });
        },1000)
        }else{
          alert(res.data.result_msg);
        }
        console.log(res);
        
      });
    }
  }
};
</script>
<style lang="scss">
[i="register"] {
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
      height: 45px;
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
    .label {
      font-family: "Arial Negreta", "Arial Normal", "Arial";
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      color: #666666;
    }
    .el-form-item {
      margin-top: 10px;
    }
  }
}
</style>
