<template>
  <div class="login">
    <section class="logo">
      <img src="../../public/images/ndts_app.png" alt />
    </section>
    <section class="username">
      <section class="icon-box">
        <span class="iconfont">&#xe618;</span>
      </section>
      <mt-field placeholder="请输入用户名" v-model="user.username"></mt-field>
    </section>
    <section class="password">
      <section class="icon-box">
        <span class="iconfont">&#xe62a;</span>
      </section>
      <mt-field placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
    </section>
    <mt-button type="primary" size="large" @click="loginHandle">登录</mt-button>
    <router-link to="/register" class="go-reg">没有账号？点击注册</router-link>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      user: {
        password: "",
        username: ""
      }
    };
  },
  methods: {
    loginHandle() {
      let { user } = this;
      if (!user.password || !user.username) {
        MessageBox("提示", "请输入用户名、密码");
      } else {
        this.req(
          "http://203.195.219.213:8081/NDLibrary/mobileLogin/Login",
          "post",
          {
            STUDENTNUMBER: user.username,
            PASSWORD: user.password
          }
        ).then(result => {
          if (result.data.RESULT == 1) {
            this.req(
              `http://203.195.219.213:8081/NDLibrary/picontroller/pi`,
              "post",
              { STUDENTNUMBER: user.username }
            ).then(result => {
              let user = result.data.RESULT[0];
              localStorage.setItem('isBookLogin',JSON.stringify(user))
              this.$router.push("/home");
            });
          } else {
            MessageBox("提示", "用户名、密码错误");
          }
        });
      }
    },
    req(url, method, data) {
      return this.$axios({
        url,
        method,
        data,
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url("../../public/images/desk_book.png") no-repeat top center;
  background-size: cover;
  .logo {
    text-align: center;
    padding-top: 0.9rem;
    img {
      width: 2rem;
    }
  }
  .username,
  .password {
    width: 70%;
    margin: auto;
    padding-bottom: 0.15rem;
    .icon-box {
      padding-left: 0.1rem;
      padding-bottom: 0.1rem;
      .iconfont {
        color: #5cc2d0;
        font-size: 0.25rem;
      }
    }
    .mint-cell {
      border: 1px solid #dcdfe6;
      border-radius: 0.05rem;
      height: 0.4rem !important;
      min-height: 0.4rem;
    }
  }
  .mint-button {
    width: 70%;
    margin: auto;
    background: #5cc2d0;
  }
  .go-reg {
    display: block;
    padding-left: 0.6rem;
    padding-top: 0.16rem;
    text-decoration: underline;
    color: #0078d7;
  }
}
</style>
