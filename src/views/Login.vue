<template>
  <div class="login">
    <a-form-model
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="rules" v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login(this.loginForm).then((rep) => {
            // 记录登录信息
            this.$store.dispatch('setUserInfo', rep);
            // 跳转路由
            this.$router.push({
              name: 'Home',
            });
          }).catch((err) => {
            this.$message.error(err);
          });
          return true;
        }
        this.$message.error('登录失败');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.login{
  .login-form{
    max-width: 500px;
    margin: 100px auto;
    border:1px solid #eee;
    padding: 24px 20px 6px;
  }
}
</style>
