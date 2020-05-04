<template>
  <div>
    <Card style="margin-top: 20px">
      <p slot="title">请输入站名</p>
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
        <div v-if="!this.NEXT">
          <FormItem label="水系" prop="system_name" style="margin-top: 50px; margin-left: 120px">
            <Select v-model="formData.system_name" style="width:200px">
              <Option
                v-for="item in systemList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="站名" prop="name" style="margin-left: 120px">
            <Input v-model="formData.name" style="width: 300px" placeholder="请输入站名"></Input>
          </FormItem>
          <div style="height: 40px;"></div>
        </div>
        <div v-else>
          <FormItem label="水系" prop="system_name">
            <Input disabled v-model="formData.system_name" style="width: 300px" placeholder="请输入站名"></Input>
          </FormItem>
          <FormItem label="站名" prop="name">
            <Input disabled v-model="formData.name" style="width: 300px" placeholder="请输入站名"></Input>
          </FormItem>
          <FormItem label="水位" prop="level">
            <Input v-model="formData.level" :number="TRUE" style="width: 300px" placeholder="请输入水位"></Input>&nbsp;单位：m
          </FormItem>
          <FormItem label="流量" prop="flow">
            <Input v-model="formData.flow" :number="TRUE" style="width: 300px" placeholder="请输入流量"></Input>&nbsp;单位：m^3/s
          </FormItem>
          <FormItem label="涨落" prop="potential">
            <Select v-model="formData.potential" style="width:200px">
              <Option
                v-for="item in potentialList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </div>
      </Form>
    </Card>
    <div class="button" v-if="!this.NEXT">
      <Button type="primary" @click="next('formData')">下一步</Button>
    </div>
    <div class="button" v-else>
      <Button type="primary" @click="last('formData')">上一步</Button>
      <Button style="margin-left: 10px" type="primary" @click="submit('formData')">提交</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
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
      NEXT: false,
      TRUE: true,
      formData: {
        system_name: "",
        name: "",
        level: "",
        flow: "",
        potential: ""
      },
      ruleValidate: {
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
    next(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getInfoFromName(name);
        } else {
          this.$Message.warning("请输入正确的内容");
        }
      });
    },
    last() {
      this.NEXT = false;
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const msg = this.$Message.loading({
            content: "Loading...",
            duration: 0
          });
          this.axios
            .post(
              process.env.VUE_APP_BASE_URL +
                process.env.VUE_APP_VERSION +
                process.env.VUE_APP_FILTER +
                "/water/alter_system",
              this.formData
            )
            .then(
              res => {
                setTimeout(msg, 0);
                let data = res.data;
                if (data.code == 2000) {
                  this.$Message.success("提交成功");
                  this.$router.replace({ path: "/water/alter" });
                } else if (res.data.code == 2008) {
                  this.$Message.warning("请重新登录后再尝试操作");
                  this.$router.replace({ path: "/login" });
                } else {
                  this.$Message.warning(
                    "提交失败，请稍后再次尝试。" + data.msg
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
    },
    getInfoFromName(name) {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/systeminfo?system_name=" +
            this.formData.system_name +
            "&name=" +
            this.formData.name
        )
        .then(
          res => {
            setTimeout(msg, 0);
            let data = res.data;
            if (data.code == 2000) {
              this.$Message.success("验证成功");
              this.NEXT = true;
              this.formData = data.data;
            } else if (data.code == 4000) {
              this.$Message.warning("请检查输入的站名是否存在.");
            } else {
              this.$Message.warning("拉取信息失败，请刷新或重试。" + data.msg);
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("拉取信息失败，请刷新或重试。");
          }
        );
    }
  },
  mounted() {}
};
</script>

<style scoped>
.button {
  text-align: right;
  margin-top: 30px;
}
</style>>