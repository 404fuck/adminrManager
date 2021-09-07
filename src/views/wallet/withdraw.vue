<!-- 提现申请-->
<template>
  <div class="withdrawStyle">
    <el-row style="padding:10px 20px">
      <el-col class="fontWeight font14">
        <span>{{$t('wallet.totalPrice')}}：</span>
        <span v-format="'#,##0.00'">{{totalPrice | price}}</span>
      </el-col>
      <el-col class="top15">
        <div class="table">
          <el-table border
                    stripe
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="tableLoading"
                    tooltip-effect="dark"
                    style="width: 100%">
            <el-table-column prop="dep_name"
                             :label="$t('wallet.dep_name')"></el-table-column>
            <el-table-column prop="account_name"
                             :label="$t('wallet.account_name')"></el-table-column>
            <el-table-column :label="$t('wallet.bank_account')"
                             width="220">
              <template slot-scope="scope">
                <div>
                  <span class="cell-span">{{$t('wallet.shoukuanren')+ scope.row.rec_name }}</span>
                  <br />
                  <span class="cell-span">{{$t('wallet.kaihuhang') + scope.row.bank_detail }}</span>
                  <br />
                  <span class="cell-span">{{$t('wallet.zhanghao') + scope.row.bank_account }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="bank_type"
                             :label="$t('wallet.bank_type')"></el-table-column>
            <el-table-column prop
                             :label="$t('wallet.apply_time')">
              <template slot-scope="scope">
                <span>{{scope.row.apply_time | moment}}</span>
              </template>
            </el-table-column>
            <el-table-column prop
                             :label="$t('wallet.settle_amount')">
              <template slot-scope="scope">
                <span>{{scope.row.settle_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('caozuo')">
              <template slot-scope="scope">
                <el-button type="text"
                           @click="editClick(scope.row)"
                           size="small">{{$t('wallet.writeDetail')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-pagination class="page-pagination center"
                   style="padding:20px 0px"
                   background
                   layout="prev, pager, next"
                   v-if="total > requestData.page_size"
                   :total="total"
                   :page-count="requestData.page_size"
                   @current-change="paginationChange"></el-pagination>

    <el-dialog :title="$t('wallet.writeDetail')"
               :visible.sync="dialogWrite"
               width="25%">
      <div class="line"
           style="margin-left:0px"></div>
      <el-row class="top10"
              style="padding:20px 0px;">
        <el-form label-width="100px"
                 :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item :label="$t('wallet.real_settle_type')+'：'"
                        prop="real_settle_type">
            <el-select class="store-select"
                       v-model="ruleForm.real_settle_type"
                       :placeholder="$t('wallet.writeSelect')"
                       style="width:100%">
              <el-option v-for="(item) in typeOpetion"
                         :key="item"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('wallet.real_settle_account')+'：'"
                        prop="real_settle_account">
            <el-select class="store-select"
                       v-model="ruleForm.real_settle_account"
                       :placeholder="$t('wallet.writeSelect')"
                       style="width:100%">
              <el-option :label="$t('wallet.companyName')"
                         value="1"></el-option>
            </el-select>
            <!-- <el-select
              class="store-select"
              v-model="ruleForm.real_settle_account"
              :placeholder="$t('wallet.writeSelect')"
              style="width:100%"
            ></el-select>-->
          </el-form-item>
          <el-form-item :label="$t('wallet.real_settle_username')+'：'"
                        prop="real_settle_userid">
            <el-select class="store-select"
                       v-model="ruleForm.real_settle_userid"
                       :placeholder="$t('wallet.writeSelect')"
                       style="width:100%">
              <el-option v-for="(item) in alluserData"
                         :key="item.id"
                         :label="item.username"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('wallet.real_settle_transfer_fee')+'：'"
                        prop="real_settle_transfer_fee">
            <el-input v-model.trim="ruleForm.real_settle_transfer_fee"
                      class="value-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('wallet.real_settle_time')+'：'"
                        prop="real_settle_time">
            <el-date-picker v-model="ruleForm.real_settle_time"
                            type="date"
                            :placeholder="$t('wallet.selectTime')"
                            style="width:335px"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('wallet.real_settle_voucher')+'：'"
                        prop="real_settle_voucher">
            <el-upload drag
                       class="avatar-uploader"
                       style="height:40px;border-radius: 0.074074rem;border: 0.018519rem solid #DCDFE6;"
                       :action="uploadUtils.uploadAction()"
                       :data="uploadUtils.uploadData()"
                       :show-file-list="true"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                       :limit="1">
              <div class="el-upload__text">{{$t('wallet.upload')}}</div>
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('wallet.real_note')+'：'"
                        style="clear:both;"
                        class="remarks">
            <el-input v-model.trim="ruleForm.real_note"
                      class="value-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="font14"
                       type="primary"
                       style="width:100px"
                       :loading="okLoading"
                       @click="submitForm('ruleForm')">{{$t('confirmBtn')}}</el-button>
            <el-button class="cancelBtn left10"
                       style="width:100px"
                       @click="dialogWrite = false">{{$t('cancelBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  data () {
    return {
      tableLoading: false,
      dialogWrite: false,
      okLoading: false,

      totalPrice: 0,
      total: 0,
      tableData: null,

      alluserData: null,
      selectItem: null,

      requestData: {
        sts: "0",
        page_num: 0,
        page_size: 10
      },
      imageUrl: null,

      typeOpetion: [
        this.$t("wallet.wangyinzhuanzhang"),
        this.$t("wallet.wallet"),
        this.$t("wallet.xianjinfukuan")
      ],

      ruleForm: {
        id: "",
        real_settle_transfer_fee: "", //手续费
        real_settle_type: "", //结算方式
        real_settle_account: this.$t("wallet.companyName"), //结算账户
        real_settle_userid: "", //用户id
        real_settle_fee: "", //结算金额
        real_settle_voucher: "", //结算凭证
        real_note: "", //备注
        real_settle_time: "", //结算时间
        real_settle_oper_user: "" //结算人
      },
      rules: {
        real_settle_type: [
          {
            required: true,
            message: this.$t("wallet.writeSettle_type"),
            trigger: "blur"
          }
        ],
        real_settle_account: [
          {
            required: true,
            message: this.$t("wallet.writeSettle_account"),
            trigger: "blur"
          }
        ],
        real_settle_userid: [
          {
            required: true,
            message: this.$t("wallet.writeSettle_username"),
            trigger: "blur"
          }
        ],
        real_settle_time: [
          {
            required: true,
            message: this.$t("wallet.writeSettle_time"),
            trigger: "blur"
          }
        ],
        real_settle_voucher: [
          {
            required: true,
            message: this.$t("wallet.writeSettle_voucher"),
            trigger: "blur"
          }
        ],
        real_settle_transfer_fee: [
          {
            required: true,
            message: this.$t("wallet.writeSettle_fee"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    editClick (val) {
      this.selectItem = val;
      this.dialogWrite = true;
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.walletdealsettle();
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.real_settle_voucher = res.msg;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      return this.uploadUtils.beforeAvatarUpload(file);
    },
    paginationChange (page) {
      this.requestData.page_num = page - 1;
      this.getData();
    },
    getData () {
      let that = this;
      this.tableLoading = true;
      this.request.walletsettlepage(this.requestData, function (res) {
        that.tableLoading = false;
        if (res.code == "1") {
          that.tableData = res.data.list;
          that.total = res.data.total;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    walletsettletotal () {
      let that = this;
      this.request.walletsettletotal({}, function (res) {
        if (res.code == "1") {
          that.totalPrice = res.data;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    alluser () {
      let that = this;
      this.request.alluser({}, function (res) {
        if (res.code == "1") {
          that.alluserData = res.data;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    walletdealsettle () {
      let that = this;
      this.okLoading = true;
      this.ruleForm.real_settle_fee = this.selectItem.settle_amount;
      this.ruleForm.real_settle_oper_user = this.selectItem.real_settle_oper_user;
      this.ruleForm.id = this.selectItem.id;
      this.request.walletdealsettle(this.ruleForm, function (res) {
        that.okLoading = false;
        that.$refs["ruleForm"].resetFields();
        if (res.code == "1") {
          that.dialogWrite = false;
          that.toast.success(that.$t("wallet.settingSuccess"));
          that.stringutils.arrRemove(that.tableData, that.selectItem);
        } else {
          that.toast.error(res.msg);
        }
      });
    }
  },
  created () {
    this.getData();
    this.walletsettletotal();
    this.alluser();
  },
  mounted () { }
};
</script>
<style scoped>
</style>