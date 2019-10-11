<template>
  <div class="near">
    <mt-header title="附近书馆">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="map-container" id="map-container"></section>
  </div>
</template>
<script>
export default {
  name: "near",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = new AMap.Map("map-container", {
      resizeEnable: true,
    });
    this.make_mkder();
  },
  methods: {
    make_mkder() {
      var placeSearch = new AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: "包头市"
      });

      placeSearch.search("图书馆", function(status, result) {
        // 查询成功时，result即对应匹配的POI信息
        console.log(result);
        var pois = result.poiList.pois;
        for (var i = 0; i < pois.length; i++) {
          var poi = pois[i];
          var marker = [];
          marker[i] = new AMap.Marker({
            position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: poi.name
          });
          // 将创建的点标记添加到已有的地图实例：
          this.map.add(marker[i]);
        }
        this.map.setFitView();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.near {
  .mint-header {
    background-color: #5cc2d0;
  }
  .map-container {
    height: calc(100vh - 0.4rem)
  }
}
</style>

