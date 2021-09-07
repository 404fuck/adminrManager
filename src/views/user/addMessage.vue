<!-- 新建推送-->
<template>
  <div class="main addMessageStyle">
    <hr style="position: relative;top: -10px;" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <span style="color:#8C939B;">{{$t("user.userList")}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#232426">{{$t("addPush")}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content" v-loading="dataLoading">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t("addPush")}}</div>
      </el-row>
      <hr />
      <el-row style="padding:30px 50px">
        <el-col class="left50" style="padding-bottom:20px">
          <span
            class="font14 fontWeight"
            style="color: #232426;padding: 0 12px 0 0;"
          >{{$t("messagePush")}}：</span>
          <span class="font14">
            {{$t("user.sex")}}：
            <el-select
              class="store-select"
              :placeholder="$t('all')"
              size="small"
              style="width:200px"
              v-model="requestData.sex"
            >
              <el-option v-for="(item) in sexOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </span>
          <span class="font14 left30">
            {{$t("user.age")}}：
            <el-input
              placeholder
              type="number"
              v-model.trim="requestData.age_pre"
              style="width:70px"
              size="small"
            ></el-input>
            <span style="padding:0px 10px">{{$t("user.to")}}</span>
            <el-input
              placeholder
              type="number"
              v-model.trim="requestData.age_sub"
              style="width:70px"
              size="small"
            ></el-input>
          </span>
          <span class="font14 left30">
            {{$t('city')}}：
            <el-select
              class="store-select"
              :placeholder="$t('all')"
              size="small"
              style="width:200px"
              v-model="requestData.city"
            >
              <el-option v-for="(item) in cityOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </span>
          <el-button
            class="font14 left30"
            type="primary"
            size="small"
            @click="searchClick()"
          >{{$t('select')}}</el-button>
          <el-button class="clearBtn left30" size="small" @click="resetClick()">{{$t('user.reset')}}</el-button>
          <el-row style="margin-left:85px" class="top10">
            <span class="font14">
              {{$t('user.selectCount')}}
              <span style="color:#FE5353">{{total}}</span>
              {{$t('user.count')}}
            </span>
          </el-row>
        </el-col>
        <el-col>
          <el-form
            label-width="130px"
            class="demo-ruleForm"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item :label="$t('user.messageType')+'：'" prop="message_type">
              <el-select
                class="value-input"
                :placeholder="$t('user.messageType')"
                v-model="ruleForm.message_type"
              >
                <el-option v-for="(item) in typeOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('user.pushTitle')+'：'" prop="push_title">
              <el-input v-model.trim="ruleForm.push_title" class="value-input"></el-input>
            </el-form-item>

            <el-form-item :label="$t('user.pushContent')+'：'" prop="push_content">
              <el-input
                type="textarea"
                v-model="ruleForm.push_content"
                rows="10"
                maxlength="70"
                onchange="this.value=this.value.substring(0, 70)"
                onkeydown="this.value=this.value.substring(0, 70)"
                onkeyup="this.value=this.value.substring(0, 70)"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.pushUrl')+'：'" prop="push_url">
              <el-input v-model.trim="ruleForm.push_url" class="value-input"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="font14"
                type="primary"
                style="width:100px"
                :loading="okLoading"
                @click="submitForm('ruleForm')"
              >{{$t('user.send')}}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkURL = (rule, value, callback) => {
      let bl = this.stringutils.checkUrl(value);
      if (bl || value == null || value.length <= 0) {
        callback();
      } else {
        callback(new Error(this.$t("singleStore.noUrl")));
      }
    };
    return {
      okLoading: false,
      dataLoading: false,
      sexOptions: [this.$t("all"), this.$t("user.man"), this.$t("user.women")],
      cityOptions: [],
      typeOptions: [
        this.$t("user.youhuihuodong"),
        this.$t("user.xitongweihu"),
        this.$t("user.yingxiaohuodong")
      ],
      total: 0,

      requestData: null,

      ruleForm: {
        push_count: 0, //用户数量,
        message_type: "", // "消息类型",
        push_title: "", //"推送标题",
        push_content: "", //"推送内容",
        push_url: "" //"推送链接",
      },

      rules: {
        message_type: [
          {
            required: true,
            message: this.$t("user.writeMessageType"),
            trigger: "blur"
          }
        ],
        push_title: [
          {
            required: true,
            message: this.$t("user.writePushTitle"),
            trigger: "blur"
          }
        ],
        push_content: [
          {
            required: true,
            message: this.$t("user.writePushContent"),
            trigger: "blur"
          }
        ],
        push_url: [{ validator: checkURL, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pushuser();
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    resetClick() {
      this.requestData = this.defauiltData();
      this.getData();
    },
    searchClick() {
      if (this.requestData.age_pre == "" && this.requestData.age_sub != "") {
        this.toast.error(this.$t("user.age_times"));
        return;
      } else if (
        Number(this.requestData.age_pre) > Number(this.requestData.age_sub)
      ) {
        this.toast.error(this.$t("user.age_timeLength"));
        return;
      } else if (
        Number(this.requestData.age_pre) < 0 ||
        Number(this.requestData.age_sub) < 0
      ) {
        this.toast.error(this.$t("user.age_time"));
        return;
      }

      if (this.requestData.city == this.$t("all")) {
        this.requestData.city = "";
      }
      if (this.requestData.sex == this.$t("all")) {
        this.requestData.sex = "";
      }
      this.getData();
    },
    defauiltData() {
      return {
        lock_status: "", // 状态(0解冻, 1冻结),
        age_pre: "", // 起始年龄,- 1查全部,
        age_sub: "", //结束年龄,- 1查全部,
        page: 1,
        size: 10,
        sex: "", //,
        city: "", //,
        phone_nick: "" // "手机号/用户名",
      };
    },
    citylist() {
      let that = this;
      this.request.citylist({}, function(res) {
        if (res.code == "1") {
          for (let i in res.data) {
            that.cityOptions.push(res.data[i].city_cn);
          }
          that.cityOptions.splice(0, 0, that.$t("all"));
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    getData() {
      let that = this;
      this.dataLoading = true;
      this.request.listuser(this.requestData, function(res) {
        that.dataLoading = false;
        if (res.code == "1") {
          that.total = res.data.count;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    pushuser() {
      let that = this;
      for (let i in this.requestData) {
        this.ruleForm[i] = this.requestData[i];
      }
      this.ruleForm.push_count = this.total;
      this.okLoading = true;
      this.request.pushuser(this.ruleForm, function(res) {
        that.okLoading = false;
        if (res.code == "1") {
          that.toast.success(that.$t("user.seedSuccess"));
          that.$router.back(-1);
        } else {
          that.toast.error(res.msg);
        }
      });
    }
  },
  created() {
    this.requestData = this.defauiltData();
    this.citylist();
    this.getData();
  }
};
</script>
<style scoped>
.value-input {
  width: 350px;
  height: 35px;
}
</style>