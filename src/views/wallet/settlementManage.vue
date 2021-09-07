<template>
  <div class="settlementStyle">
    <div class="main-content">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="padding:0px 20px 0px 20px"
        class="tabsStyle"
      >
        <el-tab-pane :label="$t('wallet.cashApplication')" name="first">
          <withdraw></withdraw>
        </el-tab-pane>
        <el-tab-pane :label="$t('wallet.settled')" name="second">
          <el-row style="padding:10px 20px">
            <el-col class="fontWeight font14">
              <span>{{$t('wallet.totalPrice')}}：</span>
              <span v-format="'#,##0.00'">{{totalPrice | price}}</span>
            </el-col>
            <el-col class="top15">
              <div class="table">
                <el-table
                  border
                  stripe
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column prop="dep_name" :label="$t('wallet.dep_name')"></el-table-column>
                  <el-table-column prop="account_name" :label="$t('wallet.account_name')"></el-table-column>
                  <el-table-column prop :label="$t('wallet.bank_account')" width="220">
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
                  <el-table-column prop="bank_type" :label="$t('wallet.bank_type')"></el-table-column>
                  <el-table-column prop :label="$t('wallet.apply_time')">
                    <template slot-scope="scope">
                      <span>{{scope.row.apply_time | moment}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop :label="$t('wallet.settle_amount')">
                    <template slot-scope="scope">
                      <span>{{scope.row.settle_amount}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('caozuo')">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="lookClick(scope.row)"
                        size="small"
                      >{{$t('wallet.lookDetail')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-pagination
            class="page-pagination center"
            style="padding:20px 0px"
            background
            layout="prev, pager, next"
            v-if="total > requestData.page_size"
            :total="total"
            :page-count="requestData.page_size"
            @current-change="paginationChange"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :title="$t('wallet.lookDetail')" :visible.sync="dialogDetail" width="25%">
      <div class="line" style="margin-left:0px"></div>
      <el-row class="top10" style="padding:20px">
        <el-form label-width="100px" class="demo-ruleForm" v-loading="dataLoading">
          <el-form-item :label="$t('wallet.real_settle_type')+'：'">{{ruleForm.real_settle_type}}</el-form-item>
          <el-form-item
            :label="$t('wallet.real_settle_account')+'：'"
          >{{ruleForm.real_settle_account}}</el-form-item>
          <el-form-item
            :label="$t('wallet.real_settle_username')+'：'"
          >{{ruleForm.real_settle_oper_user}}</el-form-item>
          <el-form-item
            :label="$t('wallet.real_settle_transfer_fee')+'：'"
          >{{ruleForm.real_settle_transfer_fee}}</el-form-item>
          <el-form-item
            :label="$t('wallet.real_settle_time')"
          >{{ruleForm.real_settle_time | moment}}</el-form-item>
          <el-form-item :label="$t('wallet.real_settle_voucher')+'：'">
            <el-image
              fit
              style="width: 100px; height: 100px"
              :src="ruleForm.real_settle_voucher"
              :preview-src-list="[ruleForm.real_settle_voucher]"
            ></el-image>
          </el-form-item>
          <el-form-item :label="$t('wallet.real_note')+'：'">{{ruleForm.real_note}}</el-form-item>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer center">
        <el-button
          class="font14"
          type="primary"
          style="width:100px"
          @click="dialogDetail = false"
        >{{$t('confirmBtn')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import withdraw from "./withdraw";
export default {
  components: {
    withdraw
  },
  name: "AppMain",
  data() {
    return {
      titleText: this.$t("storeDetail"),
      activeName: "first",
      tableData: null,
      dialogDetail: false,
      dataLoading: false,

      totalPrice: 0,
      total: 0,
      requestData: {
        sts: "1",
        page_num: 0,
        page_size: 10
      },
      ruleForm: {
        real_settle_transfer_fee: "", //手续费
        real_settle_type: "", //结算方式
        real_settle_account: this.$t("wallet.companyName"), //结算账户
        real_settle_username: "", //用户
        real_settle_fee: "", //结算金额
        real_settle_voucher: "", //结算凭证
        real_note: "", //备注
        real_settle_time: "" //结算时间
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      if (event == "second") {
        this.getData();
      }
    },
    lookClick(val) {
      this.dialogDetail = true;
      this.walletsettledetail(val.id);
    },
    walletsettlerealtotal() {
      let that = this;
      this.request.walletsettlerealtotal({}, function(res) {
        if (res.code == "1") {
          that.totalPrice = res.data;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    getData() {
      let that = this;
      this.tableLoading = true;
      this.request.walletsettlepage(this.requestData, function(res) {
        that.tableLoading = false;
        if (res.code == "1") {
          that.tableData = res.data.list;
          that.total = res.data.total;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    walletsettledetail(id) {
      let that = this;
      this.dataLoading = true;
      this.request.walletsettledetail({ id: id }, function(res) {
        that.dataLoading = false;
        if (res.code == "1") {
          that.ruleForm = res.data;
          that.ruleForm.img = that.ruleForm.real_settle_voucher
            .split("/")
            .pop();
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    paginationChange(page) {
      this.requestData.page_num = page - 1;
      this.getData();
    }
  },
  created() {
    this.getData();
    this.walletsettlerealtotal();
  }
};
</script>

<style scoped>
</style>