<template>
  <div>
    <el-row class="row-header top10" style="padding:20px 20px 10px 20px">
      <el-col>
        <span class="font14">
          {{$t('wallet.userStates')}}：
          <el-select
            class="store-select"
            v-model="requestData.account_type"
            :placeholder="$t('all')"
            size="small"
            style="width:200px"
          >
            <el-option
              v-for="(item) in stateOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="font14 left30">
          <el-input
            class="store-select"
            v-model.trim="requestData.search_key"
            :placeholder="$t('wallet.storeMessage')"
            size="small"
            style="width:200px"
          ></el-input>
        </span>
        <el-button
          class="font14 left30"
          type="primary"
          size="small"
          @click="search"
        >{{$t('select')}}</el-button>
      </el-col>
    </el-row>
    <el-row style="padding:10px 20px">
      <el-col>
        <div class="table">
          <el-table border stripe :data="tableData" style="width: 100%" v-loading="tableLoading">
            <el-table-column type="index" :label="$t('wallet.number')" width="50" align="center"></el-table-column>
            <el-table-column prop="mobile" :label="$t('wallet.userName/mobile')"></el-table-column>
            <el-table-column prop :label="$t('wallet.createTime')">
              <template slot-scope="scope">
                <span>{{scope.row.create_time | moment}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dep_comp_name" :label="$t('wallet.dep_comp_name')"></el-table-column>
            <el-table-column prop="balance_count" :label="$t('wallet.balance_count')"></el-table-column>
            <el-table-column prop="nick_name" :label="$t('wallet.user_name')"></el-table-column>
            <el-table-column prop="identify_id" :label="$t('wallet.identify_id')"></el-table-column>
            <el-table-column prop :label="$t('wallet.userStates')">
              <template slot-scope="scope">
                <span v-if="scope.row.is_frozen == '-1'" style="color:red" class="font12">
                  <span style="color:#606266">{{$t('dongjie')}}</span>
                  ({{scope.row.frozen_reason}})
                </span>
                <div v-else>
                  <span v-if="scope.row.sts == '1'">{{$t('wallet.jihuo')}}</span>
                  <span v-else>{{$t('wallet.weijihuo')}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop :label="$t('caozuo')">
              <template slot-scope="scope">
                <el-button
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
          class="cancelBtn left10"
          style="width:100px"
          @click="dialogDisabled = false"
        >{{$t('cancelBtn')}}</el-button>
        <el-button
          class="font14"
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
  computed: {},
  data() {
    return {
      dialogLoading: false,
      tableData: null,
      tableLoading: false,
      centerDialogVisible: false,
      dialogDisabled: false,

      stateOptions: [
        { value: "", name: this.$t("all") },
        { value: "0", name: this.$t("wallet.weijihuo") },
        { value: "1", name: this.$t("wallet.jihuo") },
        { value: "-1", name: this.$t("dongjieStates") }
      ],

      selectItem: {
        mobile: null
      },
      freezeOptions: [
        this.$t("wallet.freezeOptions0"),
        this.$t("wallet.freezeOptions1"),
        this.$t("wallet.freezeOptions2"),
        this.$t("wallet.freezeOptions3")
      ],
      freezeWhyValue: null,

      total: 0,
      requestData: {
        page_num: 0,
        page_size: 10,
        flag: "1", //,:0-平台钱包,1-商户钱包,2-用户钱包
        account_type: "",
        search_key: "" // 查询字段
      }
    };
  },
  methods: {
    handClose() {
      this.freezeWhyValue = "";
    },
    search() {
      this.requestData.page_num = 0;
      this.getData();
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
          that.tableData = res.data.content;
          that.total = res.data.totalElements;
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
    walletunfrozen(id) {
      let that = this;
      this.dialogLoading = true;
      this.request.walletunfrozen(
        { wallet_id: id, frozen_reason: "" },
        function(res) {
          if (res.code == "1") {
            that.centerDialogVisible = false;
            that.dialogLoading = false;
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
              that.tableData[i].frozen_reason = why;
            }
          }
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