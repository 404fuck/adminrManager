<template>
  <div>
    <el-row style="padding:10px 20px">
      <el-col>
        <div class="table">
          <el-table border stripe :data="tableData" style="width: 100%" v-loading="tableLoading">
            <el-table-column type="index" :label="$t('wallet.number')" width="50" align="center"></el-table-column>
            <el-table-column prop="isCompanyName" :label="$t('wallet.userType')"></el-table-column>
            <el-table-column prop="mobile" :label="$t('wallet.mobile')"></el-table-column>
            <el-table-column prop :label="$t('wallet.createTime')">
              <template slot-scope="scope">
                <span>{{scope.row.create_time | moment}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="balance_count" :label="$t('wallet.balance_count')"></el-table-column>
            <el-table-column prop="nick_name" :label="$t('wallet.nick_name')"></el-table-column>
            <el-table-column prop="identify_id" :label="$t('wallet.identify_id')"></el-table-column>
            <el-table-column :label="$t('caozuo')">
              <template slot-scope="scope">
                <div v-if="scope.row.isCompany == '2'">
                  <el-button
                    type="text"
                    @click="lookClick(scope.row)"
                    size="small"
                  >{{$t('wallet.look')}}</el-button>
                  <el-button
                    type="text"
                    @click="topUpClick(scope.row)"
                    size="small"
                  >{{$t('wallet.chongzhi')}}</el-button>
                </div>
                <el-button
                  v-else
                  type="text"
                  @click="lockClick(scope.row)"
                  size="small"
                >{{scope.row.is_frozen == '-1'? $t('jiedong'):$t('dongjie')}}</el-button>
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

    <el-dialog :title="$t('wallet.chongzhiList')" :visible.sync="dialogDetail" width="35%">
      <div class="line" style="margin-left:0px"></div>
      <el-row class="top10" style="padding:20px 0px">
        <el-col>
          <div class="table">
            <el-table
              border
              stripe
              :data="walletHistory"
              style="width: 100%"
              v-loading="wallethisLoding"
            >
              <el-table-column :label="$t('wallet.recharge_amount')">
                <template slot-scope="scope">
                  <span v-format="'#,##0.00'">{{scope.row.recharge_amount | price}}</span>
                </template>
              </el-table-column>
              <el-table-column prop :label="$t('wallet.recharge_time')">
                <template slot-scope="scope">
                  <span>{{scope.row.create_time | moment_ss}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="page-pagination center"
              style="padding:20px 0px"
              background
              layout="prev, pager, next"
              v-if="walletTotal > requestWallethis.page_size"
              :total="walletTotal"
              :page-count="requestWallethis.page_size"
              @current-change="walletPageChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer center">
        <el-button
          class="font14"
          type="primary"
          style="width:100px"
          @click="dialogDetail = false"
        >{{$t('wallet.close')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('wallet.chongzhi')" :visible.sync="dialogIgnore" width="25%">
      <div class="line" style="margin-left:0px"></div>
      <el-row class="top10" style="padding:20px 0px">
        <el-col>
          <span class="font14">
            {{$t('wallet.recharge_amount')}}：
            <el-input
              v-model.trim="topUpData.recharge_amount"
              :placeholder="$t('wallet.writeRecharge_amount')"
              size="small"
              style="width:80%"
            ></el-input>
          </span>
        </el-col>
        <el-col class="top20">
          <span class="font14">
            {{$t('wallet.pwd')}}：
            <el-input
              v-model.trim="topUpData.account_pwd"
              :placeholder="$t('wallet.writePWD')"
              size="small"
              style="width:80%"
              show-password
            ></el-input>
          </span>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer center">
        <el-button
          class="cancelBtn left10"
          @click="dialogIgnore = false"
          style="width:100px"
        >{{$t('cancelBtn')}}</el-button>
        <el-button
          class="font14"
          type="primary"
          style="width:100px"
          v-loading="dialogLoading"
          @click="topUpOKClick()"
        >{{$t('confirmBtn')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('dongjieReason')"
      :visible.sync="dialogDisabled"
      width="20%"
      @close="handClose"
    >
      <div class="line" style="margin-left:0px"></div>
      <el-row class="top10" style="padding:20px 0px">
        <el-col>
          <span class="font14">
            {{$t('reason')}}：
            <el-select
              class="store-select"
              v-model="freezeWhyValue"
              :placeholder="$t('all')"
              size="small"
              style="width:80%"
            >
              <el-option v-for="(item) in freezeOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer center">
        <el-button
          class="cancelBtn"
          style="width:100px"
          @click="dialogDisabled = false"
        >{{$t('cancelBtn')}}</el-button>
        <el-button
          class="font14 left10"
          type="primary"
          style="width:100px"
          v-loading="dialogLoading"
          @click="freezeOKClick()"
        >{{$t('confirmBtn')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title :visible.sync="centerDialogVisible" width="20%" center>
      <p
        class="center fontWeight"
        style="padding: 20px;color: #232426;"
      >{{$t('confirmJiedong')+selectItem.mobile+$t('zhanghu')}}？</p>
      <div slot="footer" class="dialog-footer center">
        <el-button
          class="cancelBtn left10"
          style="width:100px"
          @click="centerDialogVisible = false"
        >{{$t('cancelBtn')}}</el-button>
        <el-button
          class="font14"
          type="primary"
          style="width:100px"
          v-loading="dialogLoading"
          @click="unfreezeOKClick()"
        >{{$t('confirmBtn')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    <script>
export default {
  components: {},
  data() {
    return {
      dialogLoading: false,
      dialogDetail: false,
      dialogIgnore: false,
      dialogDisabled: false,
      centerDialogVisible: false,
      titleText: this.$t("wallet.platformWallet"),

      tableLoading: false,
      wallethisLoding: false,

      freezeOptions: [
        this.$t("wallet.freezeOptions0"),
        this.$t("wallet.freezeOptions1"),
        this.$t("wallet.freezeOptions2"),
        this.$t("wallet.freezeOptions3")
      ],
      freezeWhyValue: null,

      walletHistory: null,
      tableData: null,
      selectItem: {
        mobile: null
      },

      total: 0,
      requestData: {
        page_num: 0,
        page_size: 10,
        flag: "0", //,:0-平台钱包,1-商户钱包,2-用户钱包
        search_key: "" // 查询字段
      },

      walletTotal: 0,
      requestWallethis: {
        page_num: 0,
        page_size: 10,
        account_id: "" // 查询字段
      },

      topUpData: {
        account_id: null, //账户id
        account_pwd: null, //账户密码
        recharge_amount: null //充值额度
      }
    };
  },
  methods: {
    handClose() {
      this.freezeWhyValue = "";
    },
    topUpClick(val) {
      this.selectItem = val;
      this.dialogIgnore = true;
    },
    topUpOKClick() {
      this.walletrecharg();
    },
    walletPageChange(page) {
      this.requestWallethis.page_num = page - 1;
      this.wallethis(this.selectItem._id);
    },
    lookClick(val) {
      this.dialogDetail = true;
      this.selectItem = val;
      this.wallethis(val._id);
    },
    walletrecharg() {
      let that = this;
      if (this.topUpData.recharge_amount <= 0) {
        this.toast.info(this.$t("wallet.chongzhiSetting"));
        return;
      }
      this.dialogLoading = true;
      this.topUpData.account_id = this.selectItem._id;
      this.request.walletrecharg(this.topUpData, function(res) {
        that.dialogIgnore = false;
        if (res.code == "1") {
          that.dialogLoading = false;
          that.toast.success(that.$t("wallet.chongzhiSuccess"));
          for (var i in that.tableData) {
            if (that.tableData[i] == that.selectItem) {
              that.tableData[i].balance_count =
                Number(that.tableData[i].balance_count) +
                Number(that.topUpData.recharge_amount);
            }
          }
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    wallethis(id) {
      let that = this;
      this.wallethisLoding = true;
      this.requestWallethis.account_id = id;
      this.request.wallethis(this.requestWallethis, function(res) {
        if (res.code == "1") {
          that.dialogLoading = false;
          that.wallethisLoding = false;
          that.walletHistory = res.data.content;
          that.walletTotal = res.data.totalElements;
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    lockClick(val) {
      this.selectItem = val;
      if (val.is_frozen == "-1") {
        //解冻
        this.centerDialogVisible = true;
      } else {
        this.dialogDisabled = true;
      }
    },
    walletfrozen(id, why) {
      let that = this;
      this.dialogLoading = true;
      this.request.walletfrozen({ wallet_id: id, frozen_reason: why }, function(
        res
      ) {
        if (res.code == "1") {
          that.dialogLoading = false;
          that.dialogDisabled = false;
          for (let i in that.tableData) {
            if (that.tableData[i]._id == id) {
              that.tableData[i].is_frozen = "-1";
            }
          }
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    walletunfrozen(id) {
      let that = this;
      this.dialogLoading = true;
      this.request.walletunfrozen(
        { wallet_id: id, frozen_reason: "" },
        function(res) {
          if (res.code == "1") {
            that.dialogLoading = false;
            that.centerDialogVisible = false;
            for (let i in that.tableData) {
              if (that.tableData[i]._id == id) {
                that.tableData[i].is_frozen = "0";
              }
            }
          } else {
            that.toast.error(res.msg);
          }
        }
      );
    },
    unfreezeOKClick() {
      this.walletunfrozen(this.selectItem._id);
    },
    freezeOKClick() {
      if (this.freezeWhyValue != null) {
        this.walletfrozen(this.selectItem._id, this.freezeWhyValue);
      } else {
        this.toast.error(this.$t("wallet.writeDongjieReason"));
      }
    },
    paginationChange(page) {
      this.requestData.page_num = page - 1;
      this.getData();
    },
    getData() {
      let that = this;
      this.tableLoading = true;
      this.request.walletlist(this.requestData, function(res) {
        that.tableLoading = false;
        if (res.code == "1") {
          for (let i in res.data.content) {
            res.data.content[i].isCompanyName = [
              that.$t("wallet.isCompanyName0"),
              that.$t("wallet.isCompanyName1"),
              that.$t("wallet.platformWallet"),
              that.$t("wallet.moneyWallet")
            ][res.data.content[i].isCompany];
          }
          that.tableData = res.data.content;
          that.total = res.data.totalElements;
        } else {
          that.toast.error(res.msg);
        }
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>
<style scoped>
</style>