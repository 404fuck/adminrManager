<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-04-18 21:53:16
 * @LastEditors: Please set LastEditors
 * @Description: 商户管理--商户列表
 * @FilePath: \sjoyAdminrManager\src\views\singleStore\storeList.vue
-->
<template>
    <div>
        <el-row class="row-header" style="padding: 20px 20px 10px">
            <el-col>
                <span class="font14">
                    {{ $t("singleStore.canyinType") }}：
                    <el-select
                        class="store-select"
                        v-model="requestData.food_type"
                        :placeholder="$t('all')"
                        size="small"
                        style="width: 200px"
                    >
                        <el-option
                            v-for="item in foodTypeOptions"
                            :key="item.id"
                            :label="item.dict"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </span>
                <span class="font14 left30">
                    {{ $t("city") }}：
                    <el-select
                        class="store-select"
                        v-model="requestData.city_area"
                        :placeholder="$t('all')"
                        size="small"
                        style="width: 200px"
                    >
                        <el-option
                            v-for="item in areasOptions"
                            :key="item.area_id"
                            :label="item.area_name"
                            :value="item.area_id"
                        ></el-option>
                    </el-select>
                </span>
                <span class="font14 left30">
                    <el-input
                        v-model="requestData.mobile_dept"
                        class="store-select"
                        :placeholder="$t('singleStore.storeName')"
                        size="small"
                        style="width: 200px"
                    ></el-input>
                </span>
                <el-button
                    class="left30 font14"
                    type="primary"
                    size="small"
                    @click="search"
                    >{{ $t("select") }}</el-button
                >
                <el-button
                    class="clearBtn left30"
                    size="small"
                    @click="resetClick()"
                    >{{ $t("singleStore.reset") }}</el-button
                >
            </el-col>
        </el-row>
        <el-row style="padding: 10px 20px">
            <el-col>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    :span-method="objectSpanMethod"
                    v-loading="dataLoading"
                >
                    <el-table-column
                        prop="index"
                        :label="$t('singleStore.number')"
                        align="center"
                        width="70"
                    ></el-table-column>
                    <el-table-column
                        prop
                        align="center"
                        :label="$t('singleStore.mobile_inf')"
                        width="170"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.mobile_inf }}</span>
                            <div style="color: #8c939b">
                                {{ `(商户号：${scope.row.faher_ID})` }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dep_comp_name"
                        align="center"
                        :label="$t('singleStore.dep_comp_name')"
                    ></el-table-column>
                    <el-table-column
                        prop="dep_ID"
                        align="center"
                        :label="$t('singleStore.storeNo')"
                    ></el-table-column>
                    <el-table-column
                        prop
                        align="center"
                        :label="$t('singleStore.canyinType')"
                    >
                        <template slot-scope="scope">
                            <span v-if="language == stringutils.zh_CN()">{{
                                scope.row.food_type_cn | empty
                            }}</span>
                            <span v-else-if="language == stringutils.ms_MY()">{{
                                scope.row.food_type_my | empty
                            }}</span>
                            <span v-else>{{
                                scope.row.food_type_en | empty
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop align="center" :label="$t('city')">
                        <template slot-scope="scope">
                            <span>{{ scope.row.city_area | empty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        align="center"
                        :label="$t('singleStore.siness')"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.business_area | empty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop
                        align="center"
                        :label="$t('singleStore.address')"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.dep_address | empty }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        :label="$t('singleStore.creat_time')"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.creat_time | moment }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        :label="'企业支付名称'"
                        prop="main_page"
                    >
                    </el-table-column>
                    <el-table-column :label="$t('caozuo')" width="200">
                        <template slot-scope="scope">
                            <el-button 
                                type="text" 
                                @click="addMainInfoClick(scope.row)"
                                size="small"
                                >{{scope.row.main_page==null?'添加信息':'编辑信息'}}</el-button
                            >
                            <el-button
                                type="text"
                                @click="freezeClick(scope.row)"
                                size="small"
                                >{{
                                    scope.row.lock_status == "1"
                                        ? $t("jiedong")
                                        : $t("dongjie")
                                }}</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click="delClick(scope.row)"
                                >{{ $t("singleStore.delete") }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-pagination
            class="page-pagination center"
            style="padding: 20px 0px"
            background
            layout="prev, pager, next"
            v-if="total > requestData.size"
            :total="total"
            :page-count="requestData.size"
            @current-change="paginationChange"
        ></el-pagination>

        <el-dialog
            :title="$t('singleStore.storezizhi')"
            :visible.sync="dialogVisible"
            width="37%"
            @close="handleClose"
        >
            <div class="line" style="margin-left: 0px"></div>
            <el-row style="padding: 20px 0px">
                <el-col :span="12">
                    <span>{{ $t("singleStore.zhizhao") }}：</span>
                    <div
                        style="height: 376px; border: 2px #d8d8d8 dotted"
                        class="top10"
                    >
                        <el-image
                            style="width: 100%; height: 100%"
                            lazy
                            :src="currentStore.business_license"
                        ></el-image>
                    </div>
                </el-col>
                <el-col :span="11" class="left20">
                    <el-row>
                        <el-col>
                            <span>{{ $t("singleStore.zhengjian") }}：</span>
                            <div
                                style="
                                    height: 182px;
                                    border: 2px #d8d8d8 dotted;
                                "
                                class="top10"
                            >
                                <el-image
                                    style="width: 100%; height: 100%"
                                    lazy
                                    :src="currentStore.fa_front"
                                ></el-image>
                            </div>
                        </el-col>
                        <el-col class="top10">
                            <div
                                style="
                                    height: 182px;
                                    border: 2px #d8d8d8 dotted;
                                "
                            >
                                <el-image
                                    style="width: 100%; height: 100%"
                                    lazy
                                    :src="currentStore.fa_back"
                                ></el-image>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="themeBtn"
                    style="width: 100px"
                    type="primary"
                    @click="closeClick"
                    >{{ $t("singleStore.close") }}</el-button
                >
            </div>
        </el-dialog>

        <el-dialog title :visible.sync="centerDialogVisible" width="20%" center>
            <p class="center fontWeight" style="padding: 20px; color: #232426">
                {{
                    $t("confirmJiedong") +
                    selectItem.dep_comp_name +
                    $t("zhanghu")
                }}？
            </p>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="cancelBtn left10"
                    style="width: 100px"
                    @click="centerDialogVisible = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    v-loading="dialogLoading"
                    @click="freezeOKClick('0')"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>

        <el-dialog
            :title="$t('dongjieReason')"
            :visible.sync="dialogDisabled"
            width="20%"
            @close="handleClose"
        >
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 0px">
                <el-col>
                    <span class="font14" style="min-width:20%">{{ $t("reason") }}：</span>
                    <el-select
                        class="store-select"
                        v-model="freezeWhyValue"
                        :placeholder="$t('all')"
                        size="small"
                        style="width: 78%;margin-left:2%"
                    >
                        <el-option
                            v-for="item in freezeOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                    
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    v-loading="dialogLoading"
                    @click="freezeOKClick('1')"
                    >{{ $t("confirmBtn") }}</el-button
                >
                <el-button
                    class="cancelBtn left10"
                    style="width: 100px"
                    @click="dialogDisabled = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
            </div>
        </el-dialog>

        <el-dialog title :visible.sync="delDialogVisible" width="20%" center>
            <p class="center fontWeight" style="padding: 20px; color: #232426">
                {{
                    $t("singleStore.confirmDelete") +
                    selectItem.dep_comp_name +
                    $t("zhanghu")
                }}
                ？
            </p>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="cancelBtn left10"
                    style="width: 100px"
                    @click="delDialogVisible = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    v-loading="dialogLoading"
                    @click="delOKClick()"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>
        <!-- 添加企业支付名称 -->
        <el-dialog :title="'企业支付名称'" :visible.sync="isMainInfoDialog" width="20%">
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 0px">
                <el-col>
                    <span class="font14" style="min-width:20%">名称：</span>
                    <el-input
                        class="left10"
                        v-model="mainInfoValue"
                        style="width: 78%;margin-left:2%"
                        placeholder="请输入企业支付名称"
                    ></el-input>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    @click="mainInfoConfirm"
                    >{{ $t("confirmBtn") }}</el-button
                >
                <el-button
                    class="cancelBtn"
                    style="width: 100px"
                    @click="isMainInfoDialog = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },

    data() {
        return {
            dialogLoading: false,
            dataLoading: false,
            delDialogVisible: false,
            dialogVisible: false,
            dialogDisabled: false,
            centerDialogVisible: false,
            tableData: null,
            total: 0,

            currentStore: {
                business_license: "",
                fa_front: "",
                fa_back: "",
            },

            foodTypeOptions: [],
            areasOptions: [],
            freezeOptions: [
                this.$t("eyidainping"),
                this.$t("dengluyichang"),
                this.$t("beitousu"),
                this.$t("qita"),
            ],
            freezeWhyValue: "",
            selectItem: { dep_comp_name: null },
            requestData: null,
            //添加企业支付名称
            rowDepId:"",
            mainInfoValue:"",
            isMainInfoDialog:false,
        };
    },
    methods: {
        //添加企业支付名称
        addMainInfoClick(row){
            this.mainInfoValue="";
            this.isMainInfoDialog  = true;
            this.rowDepId = row.dep_ID;

        },
        mainInfoConfirm(){
            if(this.mainInfoValue==""){
                this.toast.error('请先输入企业名称');
                return false;
            }
            let that = this;
            let data = {
                dept_id: this.rowDepId,
                main_page: this.mainInfoValue
            }
            this.request.mainPageUrl(data, function (res) {
                if (res.code == "1") {
                   that.toast.success('添加成功');
                   that.isMainInfoDialog  = false;
                   that.getData();
                } else {
                    that.toast.error(res.msg);
                }
            });

        },
        handleClose() {
            this.freezeWhyValue = "";
            this.currentStore = {
                business_license: "",
                fa_front: "",
                fa_back: "",
            };
        },
        defauiltData() {
            return {
                dep_sts: "", //门店状态0筹备中1营业中2休息中3已停业
                food_type: "", // "餐饮类型,不传该参数,填""即可,会查询全部",
                city_area: "", //"城市",
                comment_on: "", //"是否入驻点评(0否,1是)",
                mobile_dept: "", //"门店名称/手机号",
                page: 0,
                size: 10,
            };
        },
        resetClick() {
            this.requestData = this.defauiltData();
            this.getData();
        },
        closeClick() {
            this.dialogVisible = false;
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // 要合并的列的索引
            let arr = [0, 1];
            // 设置要合并的列
            if (arr.indexOf(columnIndex) !== -1) {
                // 用于设置合并开始的行号，rowspan 不为 0，不是第一行时, 则该行需要向下合并
                if (column.rowspan !== 0) {
                    return {
                        rowspan: row.rowspan, // 要合并的行数
                        colspan: 1,
                    };
                } else {
                    return {
                        rowspan: 0, // column.rowspan === 0 隐藏该单元格
                        colspan: 0,
                    };
                }
            }
        },
        paginationChange(page) {
            this.requestData.page = page - 1;
            this.getData();
        },
        getData() {
            this.dataLoading = true;
            let that = this;
            this.request.listcompany(this.requestData, function (res) {
                that.dataLoading = false;
                if (res.code == "1") {
                    var temp = [];

                    var index = 1;
                    for (let i in res.data) {
                        if (
                            res.data[i].dept_infoList == null ||
                            res.data[i].dept_infoList == undefined
                        ) {
                            that.tableData = null;
                            return;
                        }

                        for (
                            var j = 0;
                            j < res.data[i].dept_infoList.length;
                            j++
                        ) {
                            if (j == 0) {
                                res.data[i].dept_infoList[j].index = index;
                                res.data[i].dept_infoList[j].rowspan =
                                    res.data[i].dept_infoList.length;
                                index++;
                            } else {
                                res.data[i].dept_infoList[j].rowspan = 0;
                            }
                            res.data[i].dept_infoList[j].depStates = [
                                that.$t("singleStore.choubeizhong"),
                                that.$t("singleStore.yingyezhong"),
                                that.$t("singleStore.zantingyingye"),
                                that.$t("singleStore.yitingye"),
                            ][res.data[i].dept_infoList[j].dep_sts];

                            res.data[i].dept_infoList[j].comment_on == "1"
                                ? (res.data[i].dept_infoList[
                                      j
                                  ].comment_onName = that.$t("yes"))
                                : (res.data[i].dept_infoList[
                                      j
                                  ].comment_onName = that.$t("no"));
                            temp.push(res.data[i].dept_infoList[j]);
                        }
                    }
                    that.tableData = temp;
                    that.total = res.count;
                    console.log(that.tableData);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getFoodTypeOptions() {
            let that = this;
            this.request.getcateringtype({}, function (res) {
                if (res.code == "1") {
                    that.foodTypeDic = res.data;
                    that.getFootType(that.language);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getAreainfo() {
            let that = this;
            this.request.getareainfo({}, function (res) {
                if (res.code == "1") {
                    that.areasOptions = res.data;
                    that.areasOptions.splice(0, 0, {
                        area_id: "",
                        area_name: that.$t("all"),
                    });
                } else {
                    // console.log("=====getareainfo "+res.msg);
                    that.toast.error(res.msg);
                }
            });
        },
        findStore(id) {
            let that = this;
            this.request.findqual({ company_id: id }, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.$set(that, "currentStore", res.data);
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        findStoreClick(id) {
            this.dialogVisible = true;
            this.findStore(id);
        },
        freezeClick(value) {
            this.selectItem = value;
            if (value.lock_status == "0") {
                this.dialogDisabled = true;
            } else {
                this.centerDialogVisible = true;
            }
        },
        freezeOKClick(value) {
            if (
                value == "1" &&
                (this.freezeWhyValue == null || this.freezeWhyValue.length <= 0)
            ) {
                this.toast.error(this.$t("wallet.writeDongjieReason"));
                return;
            }
            this.lockdept(this.selectItem.dep_ID, value, this.freezeWhyValue);
        },
        lockdept(id, state, why) {
            let that = this;
            //"param": 状态(0解冻,1冻结),
            this.dialogLoading = true;
            this.request.lockdept(
                { lock_status: state, dept_id: id, lock_reason: why },
                function (res) {
                    if (res.code == "1") {
                        that.dialogDisabled = false;
                        that.centerDialogVisible = false;
                        that.dialogLoading = false;
                        for (let i in that.tableData) {
                            if (
                                that.tableData[i].dep_ID ==
                                that.selectItem.dep_ID
                            ) {
                                that.tableData[i].lock_status = state;
                            }
                        }
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        delClick(item) {
            this.selectItem = item;
            this.delDialogVisible = true;
        },
        delOKClick() {
            this.removedept();
        },
        removedept() {
            let that = this;
            this.dialogLoading = true;
            this.request.removedept(
                { dept_id: this.selectItem.dep_ID },
                function (res) {
                    that.dialogLoading = false;
                    if (res.code == "1") {
                        that.delDialogVisible = false;
                        that.getData();
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        search() {
            this.requestData.page = 0;
            if (this.requestData.food_type == this.$t("all")) {
                this.requestData.food_type = "";
            }
            if (this.requestData.city_area == this.$t("all")) {
                this.requestData.city_area = "";
            }
            this.getData();
        },
        getFootType(lang) {
            if (this.foodTypeDic != null) {
                this.foodTypeOptions = this.foodTypeDic[lang];
            }
        },
    },

    created() {
        this.requestData = this.defauiltData();
        this.getData();
        this.getFoodTypeOptions();
        this.getAreainfo();
        //传值housekeeperNum
        // console.log(this.$route.query.housekeeperNum);
        if (this.$route.query.housekeeperNum) {
            this.requestData.mobile_dept = this.$route.query.housekeeperNum;
        }
    },
    watch: {
        language: {
            handler(newVal, oldVal) {
                this.getFootType(newVal);
            },
        },
    },
};
</script>
<style>
</style>