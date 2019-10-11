<template>
  <div class="recommmend">
    <mt-header title="图书推荐">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="search-box">
      <input type="text" v-model="searchValue" />
      <mt-button type="primary" @click="searchBookHandle">搜索</mt-button>
    </section>
    <section class="ul-box" v-if="list">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li v-for="(item, index) in list" :key="index">
          <img src="../../public/images/b1.jpg" alt />
          <section class="desc">
            <h1>{{ item.bookname }}</h1>
            <p>{{ item.contentabstract }}</p>
            <span>{{ item.press }}</span>-
            <span>{{ item.authorname }}</span>
          </section>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: "recommend",
  data() {
    return {
      loading: false,
      list: null,
      searchValue: ""
    };
  },
  mounted() {
    this.getBook();
  },
  methods: {
    searchBookHandle() {
      this.req(
        "http://203.195.219.213:8081/NDLibrary/searchbook/byBN",
        "post",
        {
          BOOKNAME: this.searchValue
        }
      ).then(result => {
          this.list = result.data.RESULT;
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
    },
    getBook() {
      this.req(
        "http://203.195.219.213:8081/NDLibrary/pushbookcontroller/pushbook",
        "post",
        {
          SIGN: "随便"
        }
      ).then(result => {
        this.list = result.data.RESULT;
      });
    },
    loadMore() {}
  }
};
</script>
<style lang="scss" scoped>
.recommmend {
  .mint-header {
    background-color: #5cc2d0;
  }
  .ul-box {
    height: calc(100vh - 1rem);
    overflow: auto;
    ul {
      padding: 0.1rem 0;
      li {
        border-bottom: 1px solid #5cc2d0;
        padding: 0.1rem;
        display: flex;
        img {
          display: block;
          width: 0.6rem;
          height: 0.6rem;
        }
        .desc {
          flex: 1;
          padding-left: 0.1rem;
          h1 {
            font-size: 0.18rem;
            padding-bottom: 0.05rem;
            font-weight: 800;
          }
          p {
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: calc(100vw - 1rem);
            &:nth-of-type(1) {
              padding-bottom: 0.05rem;
            }
          }
        }
      }
    }
  }
  .search-box {
    height: 0.46rem;
    padding: 0.05rem;
    border-bottom: 1px solid #ccc;
    position: relative;
    input {
      border: 1px solid #ccc;
      height: 0.3rem;
      width: 80%;
      border-radius: 4px;
      padding: .1rem;
    }
    .mint-button {
      position: absolute;
      top: 0.04rem;
      right: 0.07rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      background-color: #5cc2d0;
    }
  }
}
</style>
