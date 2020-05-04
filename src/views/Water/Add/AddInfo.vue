<template>
  <div>
    <Card>
      <p slot="title">录入信息</p>
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
        <FormItem label="信息类型" prop="level">
          <Select v-model="selectType" style="width:200px">
            <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <div v-if="selectType == '重点河道'">
          <FormItem label="站名" prop="name">
            <Input v-model="formData.name" style="width: 300px" placeholder="请输入站名"></Input>
          </FormItem>
          <FormItem label="站址" prop="address">
            <Input v-model="formData.address" style="width: 300px" placeholder="请输入站址"></Input>
          </FormItem>
          <FormItem label="河名" prop="river_name">
            <Input v-model="formData.river_name" style="width: 300px" placeholder="请输入河名"></Input>
          </FormItem>
          <FormItem label="水位" prop="river_level">
            <Input
              v-model="formData.river_level"
              :number="TRUE"
              style="width: 300px"
              placeholder="请输入水位"
            ></Input>&nbsp;单位：m
          </FormItem>
          <FormItem label="流量" prop="flow">
            <Input v-model="formData.flow" :number="TRUE" style="width: 300px" placeholder="请输入流量"></Input>&nbsp;单位：m^3/s
          </FormItem>
          <FormItem label="警戒水位" prop="alert_river_level">
            <Input
              v-model="formData.alert_river_level"
              :number="TRUE"
              style="width: 300px"
              placeholder="请输入警戒水位"
            ></Input>&nbsp;单位：m
          </FormItem>
        </div>
        <div v-else-if="selectType == '重点水库'">
          <FormItem label="站名" prop="name">
            <Input v-model="formData.name" style="width: 300px" placeholder="请输入站名"></Input>
          </FormItem>
          <FormItem label="站址" prop="address">
            <Input v-model="formData.address" style="width: 300px" placeholder="请输入站址"></Input>
          </FormItem>
          <FormItem label="河名" prop="river_name">
            <Input v-model="formData.river_name" style="width: 300px" placeholder="请输入河名"></Input>
          </FormItem>
          <FormItem label="库水位" prop="river_level">
            <Input
              v-model="formData.river_level"
              :number="TRUE"
              style="width: 300px"
              placeholder="请输入库水位"
            ></Input>&nbsp;单位：m
          </FormItem>
          <FormItem label="储水量" prop="flow">
            <Input v-model="formData.flow" :number="TRUE" style="width: 300px" placeholder="请输入流量"></Input>&nbsp;单位：亿m^3
          </FormItem>
          <FormItem label="汛限水位" prop="alert_river_level">
            <Input
              v-model="formData.alert_river_level"
              :number="TRUE"
              style="width: 300px"
              placeholder="请输入警戒水位"
            ></Input>&nbsp;单位：m
          </FormItem>
        </div>
      </Form>
      <div v-if="selectType == '七大水系'">
        <Form ref="system" :model="system" :rules="systemRuleValidate" :label-width="120">
          <FormItem label="水系" prop="system_name">
            <Select v-model="system.system_name" style="width:200px">
              <Option
                v-for="item in systemList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="站名" prop="name">
            <Input v-model="system.name" style="width: 300px" placeholder="请输入站名"></Input>
          </FormItem>
          <FormItem label="水位" prop="level">
            <Input v-model="system.level" :number="TRUE" style="width: 300px" placeholder="请输入水位"></Input>&nbsp;单位：m
          </FormItem>
          <FormItem label="流量" prop="flow">
            <Input v-model="system.flow" :number="TRUE" style="width: 300px" placeholder="请输入流量"></Input>&nbsp;单位：m^3/s
          </FormItem>
          <FormItem label="涨落" prop="potential">
            <Select v-model="system.potential" style="width:200px">
              <Option
                v-for="item in potentialList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div v-if="selectType == '热点信息'">
        <Upload
          v-if="this.file.length == 0"
          :before-upload="handleUpload"
          accept="image/gif, image/jpeg, image/png, image/jpg"
          type="drag"
          :action="uploadUrl"
          name="contributeHistoryPhoto"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽文件到这里上传热点信息图片</p>
          </div>
        </Upload>
        <Row v-else style="padding: 20px 0; height: 118px; text-align: center; position:relative;">
          <Col style>
            <Icon size="40" type="ios-checkmark-circle-outline" />
            <p style="font-size: 16px;">上传成功</p>
          </Col>
        </Row>
      </div>
    </Card>
    <div class="button">
      <Button type="primary" @click="handleReset('formData')">清空</Button>
      <Button style="margin-left: 10px" type="primary" @click="submit('formData')">提交</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      TRUE: true,
      selectType: "重点河道",
      levelList: [
        {
          value: "重点河道",
          label: "重点河道"
        },
        {
          value: "重点水库",
          label: "重点水库"
        },
        {
          value: "七大水系",
          label: "七大水系"
        },
        {
          value: "热点信息",
          label: "热点信息"
        }
      ],
      systemList: [
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
      potentialList: [
        {
          value: "落",
          label: "落"
        },
        {
          value: "平",
          label: "平"
        },
        {
          value: "涨",
          label: "涨"
        }
      ],
      uploadUrl:
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_VERSION +
        process.env.VUE_APP_FILTER +
        "/water/upload", // 这个没有用
      formData: {
        name: "",
        address: "",
        river_name: "",
        river_level: "",
        flow: "",
        alert_river_level: ""
      },
      system: {
        system_name: "",
        name: "",
        level: "",
        flow: "",
        potential: ""
      },
      file: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "站名不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "站址不能为空",
            trigger: "blur"
          }
        ],
        river_name: [
          {
            required: true,
            message: "河名不能为空",
            trigger: "blur"
          }
        ],
        river_level: [
          {
            required: true,
            message: "请输入正整数或小数，小数点后最多两位。",
            trigger: "change",
            pattern: /^([1-9]([0-9]{0,3})[\.][0-9]{1,2}|[0]|\d[\.][0-9]{1,2}|[1-9]([0-9]{0,3}))$/
          }
        ],
        flow: [
          {
            required: true,
            message: "请输入正整数或小数，小数点后最多两位。",
            trigger: "change",
            pattern: /^([1-9]([0-9]{0,3})[\.][0-9]{1,2}|[0]|\d[\.][0-9]{1,2}|[1-9]([0-9]{0,3}))$/
          }
        ],
        alert_river_level: [
          {
            required: true,
            message: "请输入正整数或小数，小数点后最多两位。",
            trigger: "change",
            pattern: /^([1-9]([0-9]{0,3})[\.][0-9]{1,2}|[0]|\d[\.][0-9]{1,2}|[1-9]([0-9]{0,3}))$/
          }
        ]
      },
      systemRuleValidate: {
        system_name: [
          {
            required: true,
            message: "水系名不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "站名不能为空",
            trigger: "blur"
          }
        ],
        potential: [
          {
            required: true,
            message: "涨落不能为空",
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "请输入正整数或小数，小数点后最多两位。",
            trigger: "change",
            pattern: /^([1-9]([0-9]{0,3})[\.][0-9]{1,2}|[0]|\d[\.][0-9]{1,2}|[1-9]([0-9]{0,3}))$/
          }
        ],
        flow: [
          {
            required: true,
            message: "请输入正整数或小数，小数点后最多两位。",
            trigger: "change",
            pattern: /^([1-9]([0-9]{0,3})[\.][0-9]{1,2}|[0]|\d[\.][0-9]{1,2}|[1-9]([0-9]{0,3}))$/
          }
        ]
      }
    };
  },
  methods: {
    handleUpload(file) {
      this.file.push(file);
      return false;
    },
    handleReset(name) {
      this.file = [];
      this.$refs[name].resetFields();
    },
    submit(name) {
      if ((this.selectType == "重点河道") | (this.selectType == "重点水库")) {
        this.$refs[name].validate(valid => {
          if (valid) {
            const msg = this.$Message.loading({
              content: "Loading...",
              duration: 0
            });
            var url;
            if (this.selectType == "重点河道") {
              url =
                process.env.VUE_APP_BASE_URL +
                process.env.VUE_APP_VERSION +
                process.env.VUE_APP_FILTER +
                "/water/river";
            } else {
              url =
                process.env.VUE_APP_BASE_URL +
                process.env.VUE_APP_VERSION +
                process.env.VUE_APP_FILTER +
                "/water/reservoir";
            }
            this.axios.post(url, this.formData).then(
              res => {
                setTimeout(msg, 0);
                let data = res.data;
                if (data.code == 2000) {
                  this.$Message.success("提交成功");
                  this.handleReset("formData");
                } else if (res.data.code == 2008) {
                  this.$Message.warning("请重新登录后再尝试操作");
                  this.$router.replace({ path: "/login" });
                } else {
                  this.$Message.warning(
                    "提交失败，请检查是否该信息已存在。" + data.msg
                  );
                }
              },
              res => {
                setTimeout(msg, 0);
                this.$Message.warning("提交失败，请刷新或重试。");
              }
            );
          } else {
            this.$Message.warning("请输入正确的内容");
          }
        });
      } else if (this.selectType == "七大水系") {
        // 七大水系
        const msg = this.$Message.loading({
          content: "Loading...",
          duration: 0
        });
        this.axios
          .post(
            process.env.VUE_APP_BASE_URL +
              process.env.VUE_APP_VERSION +
              process.env.VUE_APP_FILTER +
              "/water/system",
            this.system
          )
          .then(
            res => {
              setTimeout(msg, 0);
              let data = res.data;
              if (data.code == 2000) {
                this.$Message.success("提交成功");
                this.handleReset("formData");
              } else if (res.data.code == 2008) {
                this.$Message.warning("请重新登录后再尝试操作");
                this.$router.replace({ path: "/login" });
              } else {
                this.$Message.warning(
                  "提交失败，请检查是否该信息已存在。" + data.msg
                );
              }
            },
            res => {
              setTimeout(msg, 0);
              this.$Message.warning("提交失败，请刷新或重试。");
            }
          );
      } else {
        // 热点信息图片;
        const msg = this.$Message.loading({
          content: "Loading...",
          duration: 0
        });
        let config = {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary = " + new Date().getTime()
          }
        };
        // 处理file上传文件
        let req = new FormData();
        for (let i = 0; i < this.file.length; i++) {
          req.append("file", this.file[i]);
        }
        this.axios
          .post(
            process.env.VUE_APP_BASE_URL +
              process.env.VUE_APP_VERSION +
              process.env.VUE_APP_FILTER +
              "/water/file",
            req,
            config
          )
          .then(
            res => {
              setTimeout(msg, 0);
              let data = res.data;
              if (data.code == 2000) {
                this.$Message.success("提交成功");
                this.handleReset("formData");
              } else if (res.data.code == 2008) {
                this.$Message.warning("请重新登录后再尝试操作");
                this.$router.replace({ path: "/login" });
              } else {
                this.$Message.warning(
                  "提交失败，请检查是否该信息已存在。" + data.msg
                );
              }
            },
            res => {
              setTimeout(msg, 0);
              this.$Message.warning("提交失败，请刷新或重试。");
            }
          );
      }
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style scoped>
#radio {
  width: 200px;
  height: 60px;
  text-align: center;
  font-size: 16px;
  line-height: 60px;
}
.button {
  text-align: center;
  margin-top: 30px;
}
</style>