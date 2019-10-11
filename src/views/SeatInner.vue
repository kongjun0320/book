<template>
  <div class="seat-inner-box">
    <mt-header title="座位预约详情">
      <router-link to="/seat" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-button type="default" class="my-mint-button" @click="overHandle">结束预约</mt-button>
  </div>
</template>
<script>
export default {
  name: "seatInner",
  data() {
    return {
      id: -1
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    overHandle() {
      this.req(
        "http://203.195.219.213:8081/NDLibrary/seatcontroller/endreading",
        "post",
        {id:this.id}
      ).then(result => {
        this.$router.push('/seat')
      });
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
.seat-inner-box {
  .mint-header {
    background-color: #5cc2d0;
  }
  .my-mint-button {
    display: block;
    margin: 0.1rem auto;
  }
}
</style>
