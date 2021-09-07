<!-- 设置-->
<template>
  <div class="main settingStyle">
    <div class="main-content">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('wallet.setting')}}</div>
      </el-row>
      <hr />
      <el-row style="padding:30px 100px">
        <el-col :span="12">
          <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item
              :label="$t('wallet.settle_type')+'：'"
              prop="settle_type"
              class="settle"
              style="display:inline-block"
            >
              <el-radio v-model="ruleForm.settle_type" label="0">T+0</el-radio>
              <el-radio v-model="ruleForm.settle_type" label="1">T+1</el-radio>
            </el-form-item>
            <el-form-item
              :label="$t('wallet.amount_day')"
              style="margin-left:0px !important"
              prop="amount_day"
            >
              <el-input
                :placeholder="$t('wallet.amountMoney_day')"
                v-model.trim="ruleForm.amount_day"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="top10"
              :label="$t('wallet.count_day')"
              style="margin-left:0px !important"
              prop="count_day"
            >
              <el-input
                class="inpuText"
                :placeholder="$t('wallet.countDay')"
                v-model.trim="ruleForm.count_day"
                style="width:400px;"
              >
                <template slot="append">{{$t('wallet.stoke')}}</template>
              </el-input>
            </el-form-item>
            <el-form-item
              class="top10"
              :label="$t('wallet.min_amount')"
              style="margin-left:0px !important"
              prop="min_amount"
            >
              <el-input
                :placeholder="$t('wallet.minCount_amount')"
                v-model.trim="ruleForm.min_amount"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="top10"
              :label="$t('wallet.max_amount')"
              style="margin-left:0px !important"
              prop="max_aount"
            >
              <el-input
                :placeholder="$t('wallet.minCount_amount')"
                v-model.trim="ruleForm.max_aount"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="top10"
              :label="$t('wallet.max_count_company')"
              style="margin-left:0px !important"
              prop="max_count_company"
            >
              <el-input
                class="inpuText"
                :placeholder="$t('wallet.count_company')"
                v-model.trim="ruleForm.max_count_company"
                style="width:400px;"
              >
                <template slot="append" class="font14 fontWeight">{{$t('wallet.once')}}</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="font14 left40 top20"
                type="primary"
                size="small"
                style="width:100px"
                :loading="okLoading"
                @click="submitForm('ruleForm')"
              >{{$t('wallet.save')}}</el-button>
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
    return {
      okLoading: false,
      ruleForm: {
        min_amount: "", // 最小提现额度, 单次最小金额,
        amount_day: "", // 每日最大结算额度 ,
        count_day: "", // 每日最大结算笔数 ,
        max_aount: "", // 最大提现额度, 单次最大金额,
        max_count_company: "", // 公司每日最大提现笔数 ,
        settle_type: "0" // 结算方案 ,
      },
      rules: {
        settle_type: [
          {
            required: true,
            message: this.$t("wallet.writeAmount_day"),
            trigger: "blur"
          }
        ],
        amount_day: [
          {
            required: true,
            message: this.$t("wallet.writeAmount_day"),
            trigger: "blur"
          }
        ],
        count_day: [
          {
            required: true,
            message: this.$t("wallet.writeCount_day"),
            trigger: "blur"
          }
        ],
        min_amount: [
          {
            required: true,
            message: this.$t("wallet.writeMin_amount"),
            trigger: "blur"
          }
        ],
        max_aount: [
          {
            required: true,
            message: this.$t("wallet.writeMax_amount"),
            trigger: "blur"
          }
        ],
        max_count_company: [
          {
            required: true,
            message: this.$t("wallet.writeMax_count_company"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.walletlimit();
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    walletlimit() {
      let that = this;
      this.okLoading = true;
      this.request.walletlimit(this.ruleForm, function(res) {
        that.okLoading = false;
        if (res.code == "1") {
          that.toast.success(that.$t("wallet.settingSuccess"));
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    getwalletlimit() {
      let that = this;
      this.request.getwalletlimit({}, function(res) {
        if (res.code == "1") {
          that.ruleForm = res.data;
        } else {
          that.toast.error(res.msg);
        }
      });
    }
  },
  created() {
    this.getwalletlimit();
  }
};
</script>
<style scoped>
.value-input {
  width: 350px;
  height: 35px;
}
ul li {
  list-style: none;
}
.labelBlock {
  display: block;
  color: #232426;
  font-weight: bold;
  font-size: 14px;
}
.inputText {
  width: 400px;
  border-radius: 0.074074rem;
  border: 0.018519rem solid #dcdfe6;
}
.inputText span {
  float: right;
  position: relative;
  right: 10px;
}
</style>