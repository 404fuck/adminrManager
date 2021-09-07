<template>
    <div class="settlementStyle">
        <div class="main-content">
            <el-row>
                <el-col >
                    <el-tabs
                        v-model="tableTabsValue"
                        @tab-click="tabsHandleClick"
                        style="padding: 0px 20px"
                        class="tabsStyle"
                        :lazy="true"
                    >   
                        <el-tab-pane
                            :label="$t('wallet.unsettled')"
                            name="0"
                            
                        ></el-tab-pane>
                        <el-tab-pane
                            :label="$t('wallet.settled')"
                            name="1"
                        ></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col class="accountBox">
                    <div class="changebox fl">
                        <span
                            :class="{ active: accountIndex == index }"
                            class="accountBtn"
                            v-for="(item, index) in accountTitles"
                            :key="index"
                            @click="changeAccount(index)"
                            >{{ item }}
                        </span>
                    </div>
                    <div class="fl fontWeight left25">
                        {{ $t("wallet.totalPrice_unsettled") }}：
                        <span
                            v-format="'#,##0.00'"
                            style="font-size: 16px; color: #fe5353"
                            >{{ totalPrice | price }}</span
                        >
                    </div>
                    <div class="fr">
                        <el-input
                            v-model="searhValue"
                            placeholder="门店名称/开户人/手机号/电子邮箱"
                            size="small"
                            style="width: 280px"
                        ></el-input>
                        <el-button
                            class="left25 font14"
                            type="primary"
                            size="small"
                            @click="searchClick"
                            >{{ $t("select") }}</el-button
                        >
                    </div>
                </el-col>
                <el-col style="padding: 10px 40px">
                    <el-table
                        border
                        :data="tableData"
                        v-loading="tableLoading"
                        style="width: 100%"
                    >
                        <el-table-column
                            :label="$t('wallet.housekeeperNum')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.mobile_inf
                                }}</span>
                                <div style="color: #8c939b">
                                    {{
                                        `(ID：${scope.row.company_id})`
                                    }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('wallet.dep_name')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.dep_name
                                }}</span>
                                <div style="color: #8c939b">
                                    {{
                                        `(ID：${scope.row.dep_id})`
                                    }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('wallet.bank_account')"
                            prop="bank_name"
                        >
                        </el-table-column>
                        <el-table-column
                            prop
                            :label="$t('wallet.businessDate')"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.settle_date | moment_ss
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column   
                            prop
                            :label="tableTabsValue=='0'?$t('wallet.amount_settled'):$t('wallet.realPay_amount')"
                        >
                            <template slot-scope="scope">
                                <span
                                    style="color: #fe5353"
                                    v-format="'#,##0.00'"
                                    >{{
                                        scope.row.amount | price
                                    }}</span
                                >
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('caozuo')" width="140">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="editLookClick(scope.row)"
                                    size="small"
                                    >{{
                                        tableTabsValue=='0'?$t("wallet.writeDetail"):$t("wallet.lookDetail")
                                    }}</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col class="center" style="margin: 20px auto">
                    <el-pagination
                        class="page-pagination"
                        background
                        layout="prev, pager, next"
                        v-if="
                            currentPage.total > currentPage.size &&
                            tableData != null
                        "
                        :total="currentPage.total"
                        :page-size="currentPage.size"
                        :current-page="currentPage.page"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
        <!-- 填写结算信息 -->
        <el-dialog
            :visible.sync="dialogWrite"
            width="50%"
        >
            <el-row :gutter="120" style="padding:0 15px">
                <el-col :span="11">
                    <div class="dialog-title">{{curInfoData.dep_name|empty}}</div>
                    <ul class="infor-list">
                        <li>
                            <span class="label">账户类型：</span>
                            <span class="infor">{{curInfoData.account_type=='0'?'个人':'对公'}}</span>
                        </li>
                        <li>
                            <span class="label">开户人：</span>
                            <span class="infor">{{curInfoData.account_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">开户银行：</span>
                            <span class="infor">{{curInfoData.bank_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">分行名称：</span>
                            <span class="infor">{{curInfoData.depart_bank_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">银行账号：</span>
                            <span class="infor">{{curInfoData.bank_account|empty}}</span>
                        </li>
                        <li>
                            <span class="label">电子邮箱：</span>
                            <span class="infor">{{curInfoData.email|empty}}</span>
                        </li>
                        <li>
                            <span class="label">关联手机号：</span>
                            <span class="infor">{{curInfoData.relation_mobile|empty}}</span>
                        </li>
                    </ul>
                    <div class="infor-total">
                        <span class="label">待结算金额：</span>
                        <span class="infor" v-format="'#,##0.00'">{{ curInfoData.real_amount | price }}</span>
                    </div>
                </el-col>
                <el-col :span="13">
                    <div class="dialog-title">填写结算信息</div>
                    <el-form
                        :label-width="language=='zh_CN'?'100px':'180px'"
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                    >
                        <el-form-item
                            :label="$t('wallet.real_settle_type') + '：'"
                        >   
                            <el-input
                               disabled
                                type="text"
                                :placeholder="$t('wallet.wangyinzhuanzhang')"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('wallet.real_settle_account') + '：'"
                            prop="settle_bank_name"
                        >   
                            <el-input
                                v-model.trim="ruleForm.settle_bank_name"
                                type="text"
                                :placeholder="$t('wallet.writeSettle_account')"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('wallet.real_settle_username') + '：'"
                            prop="user_name"
                        >   

                            <el-input
                                v-model.trim="ruleForm.user_name"
                                type="text"
                                :placeholder="$t('wallet.writeSettle_username')"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('wallet.real_settle_transfer_fee') + '：'"
                            prop="brokerage"
                        >
                            <el-input
                                disabled
                                v-model.trim="ruleForm.brokerage"
                                type="number"
                                :placeholder="$t('wallet.writeSettle_fee')"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('wallet.real_settle_time') + '：'"
                            prop="settle_date"
                        >
                            <el-date-picker
                                v-model="ruleForm.settle_date"
                                type="datetime"
                                :placeholder="$t('wallet.selectTime')"
                                style="width: 100%"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            :label="$t('wallet.real_settle_voucher') + '：'"
                            prop="voucher"
                        >
                            <el-upload
                                ref="upload" 
                                class="avatar-uploader"
                                style="
                                    height: 40px;
                                    border-radius: 0.074074rem;
                                    border: 1px solid #dcdfe6;
                                    padding:0 15px;
                                "
                                :action="uploadUtils.uploadAction()"
                                :data="uploadUtils.uploadData()"
                                :show-file-list="true"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :limit="1"
                            >
                                <div style="text-align:right;color:#2082ED">
                                    {{ $t("wallet.upload") }}
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item
                            :label="$t('wallet.real_note') + '：'"
                            class="remarks"
                        >
                            <el-input
                                v-model.trim="ruleForm.note"
                                type="text"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row slot="footer" class="center" style="margin:25px 0;">
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    @click="submitForm('ruleForm')"
                    >{{ $t("confirmBtn") }}</el-button
                >
                <el-button
                    class="font14"
                    style="width: 100px"
                    @click="cancelForm('ruleForm')"
                    >{{ $t("cancelBtn") }}</el-button
                >
            </el-row>
        </el-dialog>
        <!-- 查看结算信息 -->
        <el-dialog
            :visible.sync="dialogDetail"
            width="50%"
        >
            <el-row :gutter="120" style="padding:0 15px">
                <el-col :span="11">
                    <div class="dialog-title">{{curInfoData.dep_name|empty}}</div>
                    <ul class="infor-list">
                        <li>
                            <span class="label">账户类型：</span>
                            <span class="infor">{{curInfoData.account_type=='0'?'个人':'对公'}}</span>
                        </li>
                        <li>
                            <span class="label">开户人：</span>
                            <span class="infor">{{curInfoData.account_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">开户银行：</span>
                            <span class="infor">{{curInfoData.bank_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">分行名称：</span>
                            <span class="infor">{{curInfoData.depart_bank_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">银行账号：</span>
                            <span class="infor">{{curInfoData.bank_account|empty}}</span>
                        </li>
                        <li>
                            <span class="label">电子邮箱：</span>
                            <span class="infor">{{curInfoData.email|empty}}</span>
                        </li>
                        <li>
                            <span class="label">关联手机号：</span>
                            <span class="infor">{{curInfoData.relation_mobile|empty}}</span>
                        </li>
                    </ul>
                    <!-- <div class="infor-total">
                        <span class="label">待结算金额：</span>
                        <span class="infor" v-format="'#,##0.00'">{{ curInfoData.real_amount | price }}</span>
                    </div> -->
                </el-col>
                <el-col :span="13">
                    <div class="dialog-title">填写结算信息</div>
                    <ul class="infor-list">
                        <li>
                            <span class="label">结算方式：</span>
                            <span class="infor">{{curInfoData.account_type=='0'?$t('wallet.wangyinzhuanzhang'):'-'}}</span>
                        </li>
                        <li>
                            <span class="label">结算账户：</span>
                            <span class="infor">{{curInfoData.settle_bank_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">结算人：</span>
                            <span class="infor">{{curInfoData.user_name|empty}}</span>
                        </li>
                        <li>
                            <span class="label">手续费：</span>
                            <span class="infor">{{curInfoData.brokerage|price}}</span>
                        </li>
                        <li>
                            <span class="label">结算时间：</span>
                            <span class="infor">{{curInfoData.settle_date|moment_ss}}</span>
                        </li>
                        <li>
                            <span class="label">结算凭证：</span>
                            <span class="infor top10">
                                <img v-if="curInfoData.voucher!=''" :src="curInfoData.voucher" width="100" height="100">
                                <img v-else src="../../static/images/defaultImg.png" width="100" height="100">
                                
                            </span>
                        </li>
                        <li style="margin-top:52px">
                            <span class="label">备注：</span>
                            <span class="infor">{{curInfoData.note|empty}}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row slot="footer" class="center" style="margin:25px 0;">
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    @click="dialogDetail=false"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.user;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {}
        }
    },
    name: "offlineManage",
    data() {
        return {
            tableTabsValue: "0",
            accountIndex: 0,
            accountTitles: [
                this.$t("wallet.personal_name"),
                this.$t("wallet.company_name"),
            ],
            activeIndex: "0",
            tableData: null,
            dialogDetail: false,
            dialogWrite: false,
            okLoading: false,
            tableLoading: false,
            totalPrice: 0,
            searhValue:"",
            requestData: {
                settle_sts: "0", //0,待结算；1,已结算
                page_num: 0,
                page_size: 10,
                account_type:"0",//0:个人，1：公司
                searchKey:"",//搜索条件
            },
            totalData:{
                settle_sts: "0", //0,待结算；1,已结算
                account_type:"0",//0:个人，1：公司
                searchKey:"",//搜索条件
            },
            //分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
            curInfoData:{
                dep_name:"",
                account_type:'',
                account_name:"",
                bank_name:"",
                depart_bank_name:"",
                bank_account:"",
                email:"",
                relation_mobile:"",
                amount:"",
            },
            ruleForm: {
                id: "",
                company_id: "",
                dep_id: "",
                dep_name: "",
                brokerage: "", //手续费
                settle_type: '0', //结算方式 默认网银转账
                user_name: "", //结算人
                voucher: "", //结算凭证
                note: "", //备注
                settle_date: "", //结算时间
                settle_bank_name: "", //结算账户
                bank_account: "",
                settle_bank_id: "",
                sts: "",
                user_id: "",
                
            },
            rules: {
                settle_type: [
                    {
                        required: true,
                        message: this.$t("wallet.writeSettle_type"),
                        trigger: "blur",
                    },
                ],
                settle_bank_name: [
                    {
                        required: true,
                        message: this.$t("wallet.writeSettle_account"),
                        trigger: "blur",
                    },
                ],
                user_name: [
                    {
                        required: true,
                        message: this.$t("wallet.writeSettle_username"),
                        trigger: "blur",
                    },
                ],
                settle_date: [
                    {
                        required: true,
                        message: this.$t("wallet.writeSettle_time"),
                        trigger: "blur",
                    },
                ],
                voucher: [
                    {
                        required: true,
                        message: this.$t("wallet.writeSettle_voucher"),
                        trigger: "blur",
                    },
                ],
                brokerage: [
                    {
                        required: true,
                        message: this.$t("wallet.writeSettle_fee"),
                        trigger: "blur",
                    },
                ],
                
            },
        };
    },
    methods: {
        changeAccount(index) {
            this.accountIndex = index;
            this.offlineSettlePages();
            this.totalAmount();
        },
        searchClick() {
            this.offlineSettlePages();
            this.totalAmount();
        },
        tabsHandleClick(tab, event) {
            this.activeIndex = String(tab.index);
            this.totalAmount();
            this.offlineSettlePages();
        },
        //待结算-已结算 编辑-查看
        editLookClick(row) {
            console.log(row);
            this.curInfoData = row;
            if(this.tableTabsValue=='0'){
                this.dialogWrite = true;
            }else{
                this.dialogDetail = true;
            }
            
        },
        totalAmount() {
            let that = this;
            this.totalData.settle_sts = this.activeIndex;
            this.totalData.account_type = String(this.accountIndex);
            this.totalData.searchKey = this.searhValue;
            this.request.totalAmount(this.totalData, function (res) {
                if (res.code == "1") {
                    that.totalPrice = Number(res.data);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        offlineSettlePages() {
            let that = this;
            this.tableLoading = true;
            this.requestData.settle_sts = this.activeIndex;
            this.requestData.page_num = this.currentPage.page - 1; // 当前页 ,
            this.requestData.page_size = this.currentPage.size; // 一页的数量 ,
            this.requestData.account_type = String(this.accountIndex);
            this.requestData.searchKey = this.searhValue;
            this.request.offlineSettlePages(this.requestData, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    let res_data = res.data;
                    that.tableData = res_data.list;
                    that.currentPage.total = res_data.total;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.offlineSettlePages();
        },
        /*
        ----待结算---
        */
        beforeAvatarUpload(file) {
            return this.uploadUtils.beforeAvatarUpload(file);
        },
        handleAvatarSuccess(res, file) {
            if (Number(res.code) > 0) {
                this.ruleForm.voucher = res.msg;
            } else {
                this.ruleForm.voucher = "";
                this.toast.error(res.msg);
            }
        },
        //重置-取消
        cancelForm(formName) {
            this.ruleForm.note = "";
            this.$refs.upload.clearFiles();//清空上传凭证
            this.$refs[formName].resetFields();
            this.dialogWrite = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.transfer();
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },
        transfer() {
            let that = this;
            this.okLoading = true;
            this.ruleForm.id = Number(this.curInfoData.id);
            this.ruleForm.company_id = this.curInfoData.company_id;
            this.ruleForm.dep_id = this.curInfoData.dep_id;
            this.ruleForm.dep_name = this.curInfoData.dep_name;
            this.ruleForm.bank_account = this.curInfoData.bank_account;
            this.request.transfer(this.ruleForm, function (res) {
                that.okLoading = false;
                if (res.code == "1") {
                    that.toast.success(that.$t("wallet.submitSuccess"));
                    that.cancelForm("ruleForm");
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
    },
    created() {
        this.offlineSettlePages();
        this.totalAmount();
       
    },
};
</script>

<style scoped>
.accountBox {
    padding: 23px 40px 10px;
    line-height: 30px;
    font-size: 14px;
    overflow: hidden;
}
.changebox {
    width: 200px;
    height: 30px;
    border-radius: 2px;
    border: 1px solid #d3d9e2;
}
.accountBtn {
    display: inline-block;
    width: 100px;
    height: 30px;
    color: #232426;
    text-align: center;
    cursor: pointer;
}
.accountBtn.active {
    background: #30cfb7;
    color: #fff;
}
.dialog-title{
    font-size: 16px;
    font-weight: bold;
    color: #393939;
    border-bottom: 1px solid #eee;
    height: 40px;
    margin-bottom: 25px;
}
.infor-list {
    padding: 0;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
}
.infor-list li {
    width: 100%;
    margin-top: 25px;
    overflow: hidden;
    font-size: 14px;
}
.infor-list li .label {
    text-align: left;
    float: left; 
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #232426;
}
.infor-list li .infor {
    float: right;
    color: #303336;
}
.infor-total{
    margin-top: 100px;
    overflow: hidden;
    font-weight: bold;
}
.infor-total .label {
    text-align: left;
    float: left; 
    font-size: 14px;
    color: #232426;
}
.infor-total .infor {
    float: right;
    color: #FE5353;
    font-size: 18px;
}
</style>