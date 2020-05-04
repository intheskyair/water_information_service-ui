<template>
  <div>
    <Input
      search
      enter-button
      v-model="searchContent"
      style="width: 300px"
      placeholder="可输入关键字进行搜索"
      clearable
      @on-change="search"
    />
    <Table border ref="table" :columns="columns" :data="data" style="margin-left: -8px"></Table>
    <Button style="float: right" type="primary" size="large" @click="exportData()">
      <Icon type="ios-download-outline"></Icon>Export source data
    </Button>
    <Page
      :total="this.page.total"
      :current="this.page.number"
      :page-size="this.page.size"
      show-sizer
      show-elevator
      show-total
      @on-change="changePageNumber"
      @on-page-size-change="changePageSize"
    />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      searchContent: "",
      page: {
        number: 1,
        size: 10,
        total: 0
      },
      data: [], // 表格中当前显示的数据
      reservoir_information: [], // 所有的总数据
      columns: [
        {
          title: "站名",
          key: "name"
        },
        {
          title: "站址",
          key: "address"
        },
        {
          title: "河名",
          key: "river_name"
        },
        {
          title: "库水位(米)",
          key: "river_level"
        },
        {
          title: "储水量（亿m^3）",
          key: "storage"
        },
        {
          title: "限汛水位（米）",
          key: "alert_river_level"
        },
        {
          title: "时间",
          key: "last_modified_time"
        }
      ]
    };
  },
  methods: {
    initWaterInformation() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/reservoir"
        )
        .then(
          response => {
            setTimeout(msg, 0);
            if (response.data.code == 2000) {
              this.reservoir_information = response.data.data;
              this.initTable(1, 10, this.reservoir_information.length);
              this.updataTable(); // 请求完数据后刷新自动表格数据
            } else {
              this.$Message.warning(response.data.msg);
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "全国重点水库信息表"
      });
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    updataTable() {
      this.data = [];
      if (
        this.reservoir_information.length >=
        this.page.number * this.page.size
      ) {
        this.data = this.reservoir_information.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.reservoir_information.slice(
          (this.page.number - 1) * this.page.size
        );
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    searchInput() {
      this.data = this.reservoir_information.filter(d => {
        return (
          d.name.indexOf(this.searchContent) > -1 ||
          d.river_name.indexOf(this.searchContent) > -1 ||
          d.address.indexOf(this.searchContent) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    search() {
      if (this.searchContent == "") {
        this.initTable(1, 10, this.reservoir_information.length);
        this.updataTable();
      } else {
        this.searchInput();
      }
    }
  },
  mounted() {
    this.initWaterInformation();
  }
};
</script>
