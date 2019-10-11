<template>
  <div class="home2">
    <section class="hh">
      <mt-header title="书馆首页">
        <router-link to="/login" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right" @click="isShowMore=!isShowMore"></mt-button>
      </mt-header>
      <transition name="fade">
        <section class="more-box" v-if="isShowMore">
          <section class="item">
            <span class="iconfont">&#xe624;</span>
            <span @click="$router.push('/home/profile')">个人信息</span>
          </section>
          <section class="item">
            <span class="iconfont">&#xe61d;</span>
            <span @click="lgout">退出登录</span>
          </section>
        </section>
      </transition>
    </section>

    <mt-swipe :auto="2000">
      <mt-swipe-item>
        <img src="../../public/images/LBT.jpg" alt />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../public/images/LBT2.jpg" alt />
      </mt-swipe-item>
    </mt-swipe>

    <section class="info" v-if="infoArr">
      <marquee loop="4"> <p >{{ infoArr }}</p></marquee>
    </section>
    <section class="nav-box">
      <section class="item" @click="$router.push('/home/recommend')">藏书查询</section>
      <section class="item" @click="$router.push('/seat')">座位预约</section>
      <section class="item" @click="$router.push('/near')">附近书馆</section>
      <section class="item" @click="$router.push('/info')">入馆须知</section>
    </section>
  </div>
</template>
<script>
export default {
  name: 'home2',
  data () {
    return {
      isShowMore: false,
      infoArr:null
    }
  },
  mounted(){
    this.getInfo()
  },
  methods:{
    lgout(){
      localStorage.removeItem('isBookLogin')
      this.$router.push('/login')
    },
    getInfo(){
      this.req('http://203.195.219.213:8081/NDLibrary/NewsController/oneNews ','post',{
      SIGN:'随意'
      }).then(result=>{
        this.infoArr = result.data.RESULT
      })
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
}
</script>
<style lang="scss" scoped>
.home2 {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .hh {
    position: relative;
    .mint-header {
      background-color: #5cc2d0;
    }
    .more-box {
      position: absolute;
      top: 0.4rem;
      right: 0;
      z-index: 99;
      height: 0.87rem;
      width: 1.57rem;
      background-color: rgba(92, 194, 208, 0.82);
      border: 1px solid rgba(92, 194, 208, 0.82);
      .item{
        height: .4rem;
        padding-left: .1rem;
        line-height: .4rem;
        color: #fff;
        &:first-of-type{
          border-bottom: 1px solid #fff;
        }
        span{
          &:nth-of-type(2){
            padding-left: .15rem;
          }
        }
        .iconfont{
          font-size: .2rem;
        }
      }
    }
  }

  .mint-swipe {
    height: 2rem;
    .mint-swipe-items-wrap {
      height: 2rem;
      .mint-swipe-item {
        height: 2rem;
        width: 100%;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .info {
    // border-bottom: 2px solid #5cc2d0;
    padding-bottom: 0.1rem;
    background-color: #f1f2f3;
    p {
      color: #101010;
      padding: 0.2rem 0;
      padding-left: 0.1rem;
      // font-weight: 800;
      white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
  }
  .nav-box {
    display: flex;
    padding: 0 0.2rem;
    padding-bottom: .3rem;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    background:url('../../public/images/book.jpg') no-repeat;
    background-size: cover;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 57%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.05rem;
      height: 1rem;
      background: #5cc2d0;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 0.05rem;
      width: 1.6rem;
      background: #5cc2d0;
    }
    .item {
      width: 40%;
      margin-top: 0.3rem;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-size: 0.18rem;
      font-weight: 800;
      border-radius: 0.04rem;
      background-color: #5cc2d0;
      color: #fff;
    }
  }
}
</style>
