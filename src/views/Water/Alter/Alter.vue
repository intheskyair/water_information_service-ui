<template>
  <div>
    <Card v-if="!this.selectType" style="margin-top: 20px">
      <p slot="title">信息类型</p>请选择您要修改的信息类型：
      <div style="height: 140px;">
        <Row style="margin-top: 50px">
          <Button
            @click="select('river')"
            type="primary"
            style="margin-left: 100px; height: 70px; width: 160px"
          >重点河道</Button>
          <Button
            @click="select('reservoir')"
            type="primary"
            style="margin-left: 50px; height: 70px; width: 160px"
          >重点水库</Button>
          <Button
            @click="select('system')"
            type="primary"
            style="margin-left: 50px; height: 70px; width: 160px"
          >七大水系</Button>
        </Row>
      </div>
    </Card>
    <router-view @initAlter="initAlter" />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      selectType: false
    };
  },
  methods: {
    initAlter() {
      this.selectType = false;
    },
    select(type) {
      this.selectType = true;
      if (type == "river") {
        this.$router.push({ path: "/water/alter/river" });
      } else if (type == "reservoir") {
        this.$router.push({ path: "/water/alter/reservoir" });
      } else {
        this.$router.push({ path: "/water/alter/system" });
      }
    }
  },
  mounted() {},
  watch: {
    $route(parem) {
      //下面根据parem里不同的值做相应的处理
      if (parem.path == "/water/alter") {
        this.initAlter();
      }
    }
  }
};
</script>
