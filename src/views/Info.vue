<template>
  <div class="info">
    <mt-header title="入馆须知">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="showDetail(item.content)">{{ index+1 }}、{{ item.content }}</li>
    </ul>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name: "info",
  data(){
    return{
      list:[]
    }
  },
  mounted(){
   this.getList()
  },
  methods: {
    showDetail(detail)  {
       MessageBox({
          title: "详情",
          message: detail,
        });
    },
    getList(){
      this.req('http://203.195.219.213:8081/NDLibrary/NewsController/allNews','post',{
        SIGN:'随意'
      }).then(result=>{
        this.list = (result.data.RESULT)
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
};
</script>
<style lang="scss" scoped>
.info {
  .mint-header {
    background-color: #5cc2d0;
  }
  ul{
    li{
      padding: .2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

