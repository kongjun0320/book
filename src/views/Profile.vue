<template>
  <div class="profile">
    <mt-header title="个人信息">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="info">
      <img src="../../public/images/avatar.jpg" alt />
      <mt-field label="昵称：" v-model="user.username"></mt-field>
      <mt-field label="真实姓名" v-model="user.realname"></mt-field>
      <mt-field label="电话" v-model="user.telephone"></mt-field>
      <mt-field label="学号" v-model="user.studentnumber"></mt-field>
      <mt-field label="状态" v-model="user.state"></mt-field>
      <mt-field label="RFID卡号" v-model="user.rfid_no"></mt-field>
      <mt-button type="default" size="large" @click="editInfoHandle">修改</mt-button>
    </section>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name: "profile",
  data() {
    return {
      user: {
        username: "",
        state: "",
        rfid_no: "",
        realname: "",
        telephone: "",
        studentnumber: ""
      }
    };
  },
  mounted() {
    let loginUser = JSON.parse(localStorage.getItem("isBookLogin"));
    this.user = { ...loginUser };
  },
  methods: {
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
    },
    editInfoHandle() {
      MessageBox({
        title: "提示",
        message: "确定要修改吗?",
        showCancelButton: true
      }).then(result => {
        if (result == "confirm") {
          this.req(
            "http://203.195.219.213:8081/NDLibrary/picontroller/changepi",
            "post",
            {
              ID: this.user.id,
              PASSWORD: this.user.password,
              REALNAME: this.user.realname,
              RFID_NO: this.user.rfid_no,
              STUDENTNUMBER: this.user.studentnumber,
              TELEPHONE: this.user.telephone,
              USERNAME: this.user.username
            }
          ).then(result => {
            if(result.data.RESULT = '修改成功！'){
                localStorage.setItem('isBookLogin',JSON.stringify(this.user))
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.profile {
  .mint-header {
    background-color: #5cc2d0;
  }
  .info {
    img {
      display: block;
      margin: 0.1rem auto;
      width: 1.7rem;
      height: 1.7rem;
    }
    .mint-cell {
      border-bottom: 1px solid #b8bbbf;
    }
    .mint-button {
      margin-top: 0.1rem;
    }
  }
}
</style>
