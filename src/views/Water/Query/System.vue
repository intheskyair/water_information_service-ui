<template>
  <div>
    <Row>
      <Col span="12">
        <Input
          search
          enter-button
          v-model="searchContent"
          style="width: 300px"
          placeholder="可输入关键字进行搜索"
          clearable
          @on-change="search"
        />
      </Col>
      <Col>
        <Select
          v-model="SearchWaterSystem"
          clearable
          style="width:200px; float: right"
          @on-change="search"
        >
          <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <span style="float: right; font-size: 16px">水系：</span>
      </Col>
    </Row>
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
      levelList: [
        {
          value: "长江",
          label: "长江"
        },
        {
          value: "黄河",
          label: "黄河"
        },
        {
          value: "松辽",
          label: "松辽"
        },
        {
          value: "海河",
          label: "海河"
        },
        {
          value: "淮河",
          label: "淮河"
        },
        {
          value: "珠江",
          label: "珠江"
        },
        {
          value: "太湖",
          label: "太湖"
        }
      ],
      SearchWaterSystem: "",
      searchContent: "",
      page: {
        number: 1,
        size: 10,
        total: 0
      },
      data: [], // 表格中当前显示的数据
      system_information: [], // 所有的总数据
      columns: [
        {
          title: "水系",
          key: "system_name"
        },
        {
          title: "站名",
          key: "name"
        },
        {
          title: "水位(m)",
          key: "level"
        },
        {
          title: "流量(m^3/s)",
          key: "flow"
        },
        {
          title: "涨落",
          key: "potential"
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
            "/water/system"
        )
        .then(
          response => {
            setTimeout(msg, 0);
            if (response.data.code == 2000) {
              this.system_information = response.data.data;
              this.initTable(1, 10, this.system_information.length);
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
        filename: "全国七大水系信息表"
      });
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    updataTable() {
      this.data = [];
      if (this.system_information.length >= this.page.number * this.page.size) {
        this.data = this.system_information.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.system_information.slice(
          (this.page.number - 1) * this.page.size
        );
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    searchInput() {
      this.data = this.system_information.filter(d => {
        return (
          d.name.indexOf(this.searchContent) > -1 ||
          d.system_name.indexOf(this.searchContent) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    selectChange() {
      this.data = this.system_information.filter(d => {
        return d.system_name.indexOf(this.SearchWaterSystem) > -1;
      });
      this.initTable(1, 10, this.data.length);
    },
    searchInputAndSelect() {
      this.data = this.system_information.filter(d => {
        return (
          (d.name.indexOf(this.searchContent) > -1 ||
            d.system_name.indexOf(this.searchContent) > -1) &&
          d.system_name.indexOf(this.SearchWaterSystem) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    search() {
      if (this.SearchWaterSystem == undefined && this.searchContent == "") {
        this.initTable(1, 10, this.system_information.length);
        this.updataTable();
      } else if (
        this.SearchWaterSystem != undefined &&
        this.searchContent != ""
      ) {
        this.searchInputAndSelect();
      } else if (this.searchContent != "") {
        this.searchInput();
      } else {
        this.selectChange();
      }
    }
  },
  mounted() {
    this.initWaterInformation();
  }
};
</script>
