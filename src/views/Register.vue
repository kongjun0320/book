<template>
  <div class="register">
    <section class="logo">
      <img src="../../public/images/ndts_app.png" alt />
    </section>
    <section class="username">
      <section class="icon-box">
        <span class="iconfont">&#xe71f;</span>
      </section>
      <mt-field placeholder="学号" v-model="user.username"></mt-field>
    </section>
    <section class="password">
      <section class="icon-box">
        <span class="iconfont">&#xe62a;</span>
      </section>
      <mt-field placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
      <mt-field
        placeholder="确认秘密"
        class="confirm-pwd"
        type="password"
        v-model="user.confirmPassword"
      ></mt-field>
    </section>
    <mt-button type="primary" size="large" @click="regHandle">注册</mt-button>
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
  name: "register",
  data() {
    return {
      user: {
        password: "",
        confirmPassword: "",
        username: ""
      }
    };
  },
  methods: {
     regHandle() {
      let { user } = this;
      if (!user.password || !user.username || !user.confirmPassword) {
        MessageBox("提示", "请输入用户名、密码");
      } else {
        this.req(
          "http://203.195.219.213:8081/NDLibrary/mobilezc/zc",
          "post",
          {
            STUDENTNUMBER: user.username,
            PASSWORD: user.password,
            PASSWORD1: user.confirmPassword
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
            MessageBox("提示", "注册失败");
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
.register {
  width: 100vw;
  height: 100vh;
  background: url("../../public/images/desk_book.png") no-repeat top center;
  background-size: cover;
  .logo {
    text-align: center;
    padding-top: 0.9rem;
    img {
      width: 2.4rem;
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
    .confirm-pwd {
      margin-top: 0.1rem;
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
    background-color: #5cc2d0;
    margin: auto;
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
