<template>
  <div class="home">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <footer class="ff">
      <router-link to="/home" class="item" tag="section">
        <span class="iconfont">&#xe637;</span>
        <p>书馆首页</p>
      </router-link>
      <router-link to="/home/recommend" class="item" tag="section">
        <span class="iconfont">&#xe731;</span>
        <p>图书推荐</p>
      </router-link>
      <router-link to="/home/profile" class="item" tag="section">
        <span class="iconfont">&#xe624;</span>
        <p>个人信息</p>
      </router-link>
    </footer>
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>
<style lang="scss" scoped>
.home {
  .fade-enter-active,
  .fade-leave-active {
    transition: all .8s ease;
    opacity: 0;
    transform: translate(0, 0);
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translate(-100%, 0);
  }
  .ff {
    background-color: #fff;
    border-top: 1px solid #79b8ef;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.6rem;
    justify-content: space-around;
    .item {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .iconfont {
        font-size: 0.26rem;
        color: #79b8ef;
      }
      p {
        color: #3195f9;
      }
      &.router-link-exact-active {
        background-color: #5cc2d0;
        .iconfont {
          font-size: 0.26rem;
          color: #fff;
        }
        p {
          color: #fff;
        }
      }
    }
  }
}
</style>
