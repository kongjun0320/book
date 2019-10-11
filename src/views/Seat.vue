<template>
  <div class="seat">
    <mt-header title="座位预约">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="seat-box">
      <h2 class="title">自选座位</h2>
      <section class="inner-title">
        <span>请选择座位</span>
        <section class="item-box">
          <section class="img-box">
            <img src="../../public/images/1.png" alt />
            <p>可预约</p>
          </section>
          <section class="img-box">
            <img src="../../public/images/2.png" alt />
            <p>预约中</p>
          </section>
          <section class="img-box">
            <img src="../../public/images/3.png" alt />
            <p>已有人</p>
          </section>
        </section>
      </section>
    </section>
    <section class="seat-list">
      <section class="row-box" v-for="(ii, index) in resultSeatList" :key="index">
        <span class="first">{{ index+1 }}排</span>
        <section
          disabled
          class="img-box"
          v-for="(item) in ii  "
          :key="item.id"
          @click="bookHandle(item,index+1,(item.id%6==0?6: item.id%6))"
        >
          <i
            class="iconfont img"
            :class="{active:(item.state==='可预约'),active2:(item.state==='已有人'),active3:(item.state==='预约中')}"
          >&#xe62f;</i>
          <span>{{ item.id%6==0?6: item.id%6 }}</span>
        </section>
      </section>
    </section>
    <mt-button
      type="default"
      class="my-mint-button"
      @click="overHandle"
      :disabled="isCancelBook"
    >结束预约</mt-button>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name: "seat",
  data() {
    return {
      currentIndex: -1,
      seatList: [],
      resultSeatList: [],
      currentSeatId: -1,
      isCancelBook: true
    };
  },
  mounted() {
    this.getSeatList();
  },
  methods: {
    overHandle() {
      MessageBox({
        title: "提示",
        message: "是否结束预约!!!",
        showCancelButton: true
      }).then(result => {
        if (result == "confirm") {
          this.req(
            "http://203.195.219.213:8081/NDLibrary/seatcontroller/endreading",
            "post",
            { id: this.currentSeatId }
          ).then(result => {
            this.getSeatList();
          });
        }
      });
    },
    getSeatList() {
      this.seatList = [];
      this.resultSeatList = [];
      this.req(
        "http://203.195.219.213:8081/NDLibrary/seatcontroller/seat",
        "post",
        {
          SIGN: "随意"
        }
      ).then(result => {
        this.seatList = result.data.RESULT;
        let temp = [];
        this.seatList.forEach((item, index) => {
          if (index % 6 == 0 && index > 0) {
            this.resultSeatList.push(temp);
            temp = [];
          }
          temp.push(item);
        });
        let rest = this.seatList.length % 6;
        let tt = this.seatList.splice(this.seatList.length - rest);
        this.resultSeatList.push(tt);
      });
    },
    bookHandle(item, row, col) {
      if (item.state != "可预约") {
        MessageBox({
          title: "提示",
          message: "此座位不能预约",
          showCancelButton: true
        });
        return;
      }
      MessageBox({
        title: "提示",
        message: `是否确定预约${row}排${col}列`,
        showCancelButton: true
      }).then(result => {
        if (result == "confirm") {
          let user = JSON.parse(localStorage.getItem("isBookLogin"));
          this.req(
            "http://203.195.219.213:8081/NDLibrary/seatcontroller/yuyue",
            "post",
            {
              id: item.id,
              studentnumber: user.studentnumber,
              rfid_no: user.rfid_no
            }
          ).then(result => {
            if (result.data.STATUS == "201") {
              MessageBox({
                title: "提示",
                message: `不能预约多个座位`,
                showCancelButton: true
              });
            } else if (result.data.STATUS == "200") {
              this.currentSeatId = item.id;
              this.isCancelBook = false;
              this.getSeatList();
              MessageBox({
                title: "提示",
                message: `预约成功`,
                showCancelButton: true
              });
            }
          });
        }
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
.seat {
  .my-mint-button {
    display: block;
    margin: 0.1rem auto;
  }
  .mint-header {
    background-color: #5cc2d0;
  }
  .seat-box {
    padding: 0.1rem;
    .title {
      text-align: center;
      border-radius: 6px;
      color: #fff;
      width: 1.4rem;
      padding: 0.1rem 0;
      background-color: #79cd92;
    }
    .inner-title {
      display: flex;
      justify-content: space-between;
      span {
        padding: 0.1rem;
        color: #333;
      }
      .item-box {
        flex: 1;
        .img-box {
          float: right;
          text-align: center;
          margin-left: 0.2rem;
          img {
            width: 0.24rem;
            height: 0.24rem;
          }
          p {
            font-size: 10px;
            color: #999;
          }
        }
      }
    }
  }
  .seat-list {
    margin-top: 0.1rem;
    flex-wrap: wrap;
    .row-box {
      display: flex;
      padding-left: 0.1rem;
      .first {
        color: #999;
      }
      .img-box {
        width: 15%;
        position: relative;
        text-align: center;
        margin-bottom: 0.1rem;
        .img {
          font-size: 0.3rem;
          &.active {
            color: #1afa29;
          }
          &.active3 {
            color: #f4ea2a;
          }
          &.active2 {
            color: #d81e06;
          }
        }
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.1rem;
        }
      }
    }
  }
}
</style>

