<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-04-15 14:56:11
 * @LastEditors: Please set LastEditors
 * @Description: 用户列表
 * @FilePath: \sjoyAdminrManager\src\views\user\userList.vue
-->
<template>
    <div>
        <el-row class="row-header" style="padding: 20px 20px 10px">
            <el-col>
                <el-button-group>
                    <el-button
                        :class="{ active: shows == 1 }"
                        @click="changeClick(1)"
                        style="width: 100px; height: 32px; line-height: 7px"
                        >{{ $t("all") }}</el-button
                    >
                    <el-button
                        :class="{ active: shows == 2 }"
                        @click="changeClick(2)"
                        style="width: 100px; height: 32px; line-height: 7px"
                        >{{ $t("user.yidongjie") }}</el-button
                    >
                </el-button-group>
                <span class="font14 left30">
                    {{ $t("user.sex") }}：
                    <el-select
                        class="store-select"
                        v-model="requestData.sex"
                        :placeholder="$t('all')"
                        size="small"
                        style="width: 200px"
                    >
                        <el-option
                            v-for="item in sexOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </span>
                <span class="font14 left30">
                    {{ $t("user.age") }}：
                    <el-input
                        placeholder
                        v-model.trim="requestData.age_pre"
                        type="number"
                        style="width: 70px"
                        size="small"
                    ></el-input>
                    <span style="padding: 0px 10px">{{ $t("user.to") }}</span>
                    <el-input
                        placeholder
                        v-model.trim="requestData.age_sub"
                        type="number"
                        style="width: 70px"
                        size="small"
                    ></el-input>
                </span>
                <span class="font14 left30">
                    {{ $t("city") }}：
                    <el-select
                        class="store-select"
                        v-model="requestData.city"
                        :placeholder="$t('all')"
                        size="small"
                        style="width: 200px"
                    >
                        <el-option
                            v-for="item in cityOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </span>
                <span class="font14 left30">
                    <el-input
                        class="store-select"
                        v-model.trim="requestData.phone_nick"
                        :placeholder="$t('user.storeMessage')"
                        size="small"
                        style="width: 200px"
                    ></el-input>
                </span>
                <el-button
                    class="font14 left30"
                    type="primary"
                    size="small"
                    @click="searchClick()"
                    >{{ $t("select") }}</el-button
                >
                <el-button
                    class="clearBtn left30"
                    size="small"
                    @click="resetClick()"
                    >{{ $t("user.reset") }}</el-button
                >
            </el-col>
        </el-row>
        <el-row style="padding: 10px 20px">
            <el-col>
				<el-table
					border
					ref="multipleTable"
					tooltip-effect="dark"
					style="width: 100%"
					:data="tableData"
					v-loading="tableLoading"
				>
					<el-table-column
						type="index"
						:label="$t('user.number')"
						width="70"
						align="center"
					></el-table-column>
					<el-table-column prop :label="$t('user.head')">
						<template slot-scope="scope">
							<el-image
								style="
									width: 44px;
									height: 44px;
									border-radius: 50%;
								"
								:src="scope.row.logo"
							></el-image>
						</template>
					</el-table-column>
					<el-table-column
						prop="nick_name"
						:label="$t('user.nick_name')"
					></el-table-column>
					<el-table-column
						prop="phone"
						:label="$t('user.phone')"
					></el-table-column>
					<el-table-column
						prop="sex"
						:label="$t('user.sex')"
					></el-table-column>
					<el-table-column
						prop="birthday"
						:label="$t('user.birthday')"
					></el-table-column>
					<el-table-column
						prop="city"
						:label="$t('city')"
					></el-table-column>
					<el-table-column prop :label="$t('user.create_time')">
						<template slot-scope="scope">
							<span>{{ scope.row.creat_time | moment }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="comment_count"
						:label="$t('user.comment_count')"
					></el-table-column>
					<el-table-column
						prop="order_count"
						:label="$t('user.order_count')"
					></el-table-column>
					<el-table-column
						prop="order_total"
						:label="$t('user.order_total')"
					></el-table-column>
					<el-table-column :label="$t('caozuo')" width="140">
						<template slot-scope="scope">
							<el-button
								type="text"
								@click="lockClick(scope.row)"
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
								@click="delUser(scope.row)"
								>{{ $t("user.delete") }}</el-button
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

        <el-dialog title :visible.sync="centerDialogVisible" width="20%" center>
            <p class="center fontWeight" style="padding: 20px; color: #232426">
                {{
                    $t("confirmJiedong") +
                    selectItem.phone +
                    this.$t("zhanghu")
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
            @close="handClose"
        >
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 0px">
                <el-col>
                    <span class="font14">
                        {{ $t("reason") }}：
                        <el-select
                            class="store-select"
                            v-model="freezeWhyValue"
                            :placeholder="$t('all')"
                            size="small"
                            style="width: 80%"
                        >
                            <el-option
                                v-for="item in freezeOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </span>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="cancelBtn left10"
                    style="width: 100px"
                    @click="dialogDisabled = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    v-loading="dialogLoading"
                    @click="freezeOKClick('1')"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>

        <el-dialog title :visible.sync="delDialogVisible" width="20%" center>
            <p class="center fontWeight" style="padding: 20px; color: #232426">
                {{
                    $t("user.confirmDelete") + selectItem.phone + $t("zhanghu")
                }}
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
                    @click="delOKUser()"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
    <script>
export default {
    data() {
        return {
            dialogLoading: false,
            delDialogVisible: false,
            titleText: this.$t("user.userList"),
            shows: 1,
            dialogDisabled: false,
            centerDialogVisible: false,
            tableLoading: false,

            sexOptions: [
                this.$t("all"),
                this.$t("user.man"),
                this.$t("user.women"),
            ],
            cityOptions: [],

            selectItem: { phone: "" },

            freezeOptions: [
                this.$t("eyidainping"),
                this.$t("dengluyichang"),
                this.$t("beitousu"),
                this.$t("qita"),
            ],
            freezeWhyValue: null,

            total: 0,
            tableData: null,
            requestData: null,
        };
    },
    methods: {
        handClose() {
            this.freezeWhyValue = "";
        },
        paginationChange(page) {
            this.requestData.page = page - 1;
            this.getData();
        },
        freezeOKClick(value) {
            if (
                value == "1" &&
                (this.freezeWhyValue == null || this.freezeWhyValue.length <= 0)
            ) {
                this.toast.error(this.$t("wallet.writeDongjieReason"));
                return;
            }
            this.lockUser([this.selectItem.phone], this.freezeWhyValue, value);
        },
        lockClick(val) {
            this.selectItem = val;
            if (val.lock_status == "0") {
                //解冻
                this.dialogDisabled = true;
            } else {
                this.centerDialogVisible = true;
            }
        },
        resetClick() {
            this.requestData = this.defauiltData();
            this.getData();
        },
        searchClick() {
            if (
                this.requestData.age_pre == "" &&
                this.requestData.age_sub != ""
            ) {
                this.toast.error(this.$t("user.age_times"));
                return;
            } else if (
                Number(this.requestData.age_pre) >
                Number(this.requestData.age_sub)
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

            this.requestData.page = 0;
            if (this.requestData.city == this.$t("all")) {
                this.requestData.city = "";
            }
            if (this.requestData.sex == this.$t("all")) {
                this.requestData.sex = "";
            }
            this.getData();
        },
        changeClick(val) {
            if (val == 1) {
                this.shows = 1;
                this.requestData.lock_status = "";
            } else {
                this.shows = 2;
                this.requestData.lock_status = "1";
            }
            this.getData();
        },
        defauiltData() {
            return {
                lock_status: "", // 状态(0解冻, 1冻结),
                age_pre: "", // 起始年龄,- 1查全部,
                age_sub: "", //结束年龄,- 1查全部,
                page: 0,
                size: 10,
                sex: "", //,
                city: "", //,
                phone_nick: "", // "手机号/用户名",
            };
        },
        getData() {
            let that = this;
            this.tableLoading = true;
            this.request.listuser(this.requestData, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    that.tableData = res.data.user_list;
                    that.total = res.data.count;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        delUser(val) {
            this.selectItem = val;
            this.delDialogVisible = true;
        },
        delOKUser() {
            this.removeuser();
        },
        removeuser() {
            let that = this;
            this.dialogLoading = true;
            var arr = [this.selectItem.phone];
            this.request.removeuser({ phone_arr: arr }, function (res) {
                if (res.code == "1") {
                    that.delDialogVisible = false;
                    that.dialogLoading = false;
                    for (let i in that.tableData) {
                        for (let j in arr) {
                            if (that.tableData[i].phone == arr[j]) {
                                that.tableData.splice(i, 1);
                            }
                        }
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        lockUser(arr, why, state) {
            //"state": 状态(0解冻,1冻结),
            let that = this;
            this.dialogLoading = true;
            this.request.lockuser(
                { phone_arr: arr, lock_reason: why, lock_status: state },
                function (res) {
                    if (res.code == "1") {
                        that.dialogDisabled = false;
                        that.centerDialogVisible = false;
                        that.dialogLoading = false;
                        for (let i in that.tableData) {
                            for (let j in arr) {
                                if (that.tableData[i].phone == arr[j]) {
                                    that.tableData[i].lock_status = state;
                                }
                            }
                        }
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        citylist() {
            let that = this;
            this.request.citylist({}, function (res) {
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
    },

    mounted() {},
    created() {
        this.requestData = this.defauiltData();
        this.getData();
        this.citylist();
    },
};
</script>
<style scoped>
.active {
    color: white;
    background: #30cfb7;
}
</style>