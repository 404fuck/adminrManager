<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-03-08 17:25:28
 * @LastEditors: Please set LastEditors
 * @Description: 合作申请管理
 * @FilePath: \sjoyAdminrManager\src\views\joinUs\joinUsManage.vue
-->
<template>
    <div>
        <div class="main-content">
            <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="padding: 0px 20px"
                class="tabsStyle"
            >
                <el-tab-pane :label="$t('inbox')" name="0">
                    <el-row
                        class="row-header"
                        style="padding: 20px 20px 10px"
                    >
                        <el-col>
                            <span class="font14">
                                {{ $t("joinUS.joinType") }}：
                                <el-select
                                    class="store-select"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width: 200px"
                                    v-model="requestData.join_type"
                                >
                                    <el-option
                                        v-for="item in questionOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </span>
                            <el-button
                                class="font14 left25"
                                type="primary"
                                size="small"
                                @click="search"
                                >{{ $t("select") }}</el-button
                            >
                        </el-col>
                    </el-row>
                    <el-row style="padding: 10px 20px">
                        <el-col>
							<el-table
								border
								:data="tableData"
								v-loading="tableLoading"
								style="width: 100%"
							>
								<el-table-column
									prop
									:label="$t('joinUS.apply_date')"
								>
									<template slot-scope="scope">
										<span>{{
											scope.row.apply_date | moment
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="join_typeName"
									:label="$t('joinUS.join_typeName')"
								></el-table-column>
								<el-table-column
									prop="company_name"
									:label="$t('joinUS.company_name')"
								></el-table-column>
								<el-table-column
									prop="contact_person"
									:label="$t('joinUS.contact_person')"
								></el-table-column>
								<el-table-column
									prop="contact_mobile"
									:label="$t('joinUS.contact_mobile')"
								></el-table-column>
								<el-table-column
									prop="city_name"
									:label="$t('city')"
								></el-table-column>
								<el-table-column
									prop
									:label="$t('joinUS.note')"
								>
                                    <template slot-scope="scope">
										<span>{{
											scope.row.note | empty
										}}</span>
									</template>
                                </el-table-column>
								<el-table-column :label="$t('caozuo')" width="140">
									<template slot-scope="scope">
										<el-button
											type="text"
											@click="replyClick(scope.row)"
											size="small"
											>{{
												$t("joinUS.reply")
											}}</el-button
										>
										<el-button
											type="text"
											@click="
												unrememberClick(scope.row)
											"
											size="small"
											>{{
												$t("joinUS.unremember")
											}}</el-button
										>
									</template>
								</el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('joinUS.reply')" name="1">
                    <el-row
                        class="row-header"
                        style="padding: 20px 20px 10px"
                    >
                        <el-col>
                            <span class="font14">
                                {{ $t("joinUS.joinType") }}：
                                <el-select
                                    class="store-select"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width: 200px"
                                    v-model="requestData.join_type"
                                >
                                    <el-option
                                        v-for="item in questionOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </span>
                            <el-button
                                class="font14 left25"
                                type="primary"
                                size="small"
                                @click="search"
                                >{{ $t("select") }}</el-button
                            >
                        </el-col>
                    </el-row>
                    <el-row style="padding: 10px 20px">
                        <el-col>
							<el-table
								border
								:data="tableData"
								v-loading="tableLoading"
								style="width: 100%"
							>
								<el-table-column
									prop
									:label="$t('joinUS.apply_date')"
								>
									<template slot-scope="scope">
										<span>{{
											scope.row.apply_date | moment
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="join_typeName"
									:label="$t('joinUS.join_typeName')"
								></el-table-column>
								<el-table-column
									prop="company_name"
									:label="$t('joinUS.company_name')"
								></el-table-column>
								<el-table-column
									prop="contact_person"
									:label="$t('joinUS.contact_person')"
								></el-table-column>
								<el-table-column
									prop="contact_mobile"
									:label="$t('joinUS.contact_mobile')"
								></el-table-column>
								<el-table-column
									prop="city_name"
									:label="$t('city')"
								></el-table-column>
								<el-table-column
									prop
									:label="$t('joinUS.note')"
								>
                                    <template slot-scope="scope">
										<span>{{
											scope.row.note | empty
										}}</span>
									</template>
                                </el-table-column>
								<el-table-column
									prop
									:label="$t('joinUS.contact_note')"
                                    width="140"
								>
                                    <template slot-scope="scope">
										<span>{{
											scope.row.contact_note | empty
										}}</span>
									</template>
                                </el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('yihulue')" name="2">
                    <el-row
                        class="row-header"
                        style="padding: 20px 20px 10px"
                    >
                        <el-col>
                            <span class="font14">
                                {{ $t("joinUS.joinType") }}：
                                <el-select
                                    class="store-select"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width: 200px"
                                    v-model="requestData.join_type"
                                >
                                    <el-option
                                        v-for="item in questionOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </span>
                            <el-button
                                class="font14 left25"
                                type="primary"
                                size="small"
                                @click="search"
                                >{{ $t("select") }}</el-button
                            >
                        </el-col>
                    </el-row>
                    <el-row style="padding: 10px 20px">
                        <el-col>
							<el-table
								border
								:data="tableData"
								v-loading="tableLoading"
								style="width: 100%"
							>
								<el-table-column
									prop
									:label="$t('joinUS.apply_date')"
								>
									<template slot-scope="scope">
										<span>{{
											scope.row.apply_date | moment
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="join_typeName"
									:label="$t('joinUS.join_typeName')"
								></el-table-column>
								<el-table-column
									prop="company_name"
									:label="$t('joinUS.company_name')"
								></el-table-column>
								<el-table-column
									prop="contact_person"
									:label="$t('joinUS.contact_person')"
								></el-table-column>
								<el-table-column
									prop="contact_mobile"
									:label="$t('joinUS.contact_mobile')"
								></el-table-column>
								<el-table-column
									prop="city_name"
									:label="$t('city')"
								></el-table-column>
								<el-table-column
									prop
									:label="$t('joinUS.note')"
								>
                                    <template slot-scope="scope">
										<span>{{
											scope.row.note | empty
										}}</span>
									</template>
                                </el-table-column>
								<el-table-column
									prop="ignore_reason"
									:label="$t('ignore_reason')"
                                    width="140"
								>
                                </el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-pagination
                class="page-pagination center"
                style="padding: 20px 0px"
                background
                layout="prev, pager, next"
                v-if="total > requestData.page_size"
                :total="total"
                :page-count="requestData.page_size"
                @current-change="paginationChange"
            ></el-pagination>
        </div>

        <el-dialog
            :title="$t('joinUS.replyNote')"
            :visible.sync="dialogFeedback"
            width="35%"
        >
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 0px">
                <el-col>
                    <el-input
                        type="textarea"
                        placeholder
                        v-model.trim="remarkValue"
                        rows="7"
                    ></el-input>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="cancelBtn left10"
                    style="width: 100px"
                    @click="dialogFeedback = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    v-loading="replyLoading"
                    @click="replyOKClick"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            :title="$t('joinUS.unremember')"
            :visible.sync="dialogIgnore"
            width="20%"
        >
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 0px">
                <el-col>
                    <span class="font14">
                        {{ $t("reason") }}：
                        <el-select
                            class="store-select"
                            :placeholder="$t('joinUS.writeSelect')"
                            size="small"
                            style="width: 80%"
                            v-model="whyValue"
                        >
                            <el-option
                                v-for="item in whyOptions"
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
                    @click="dialogIgnore = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    class="font14"
                    type="primary"
                    style="width: 100px"
                    v-loading="unrememberLoading"
                    @click="unrememberOKClick"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {},
    name: "AppMain",
    data() {
        return {
            tableLoading: false,
            replyLoading: false,
            unrememberLoading: false,
            titleText: this.$t("storeDetail"),
            activeName: "0",
            tableData: null,
            dialogFeedback: false,
            dialogIgnore: false,

            questionOptions: [
                { name: this.$t("all"), id: "" },
                { name: this.$t("joinUS.questionOptions0"), id: "0" },
                { name: this.$t("joinUS.questionOptions1"), id: "1" },
                { name: this.$t("joinUS.questionOptions2"), id: "2" },
                { name: this.$t("joinUS.questionOptions3"), id: "3" },
                { name: this.$t("joinUS.questionOptions4"), id: "4" },
            ],

            whyValue: null,
            whyOptions: [
                this.$t("whyOptions0"),
                this.$t("whyOptions1"),
                this.$t("whyOptions2"),
            ],

            remarkValue: null,

            selectItem: null,
            total: 0,
            requestData: {
                flag: "", //"0"收件箱，"1"已反馈翻页，"2"已忽略翻页
                join_type: "", //问题来源
                page_num: 0,
                page_size: 10,
            },
        };
    },
    methods: {
        paginationChange(page) {
            this.requestData.page_num = page - 1;
            this.getData();
        },
        replyClick(val) {
            this.selectItem = val;
            this.dialogFeedback = true;
        },
        replyOKClick() {
            this.savereply(this.selectItem.id);
        },
        unrememberOKClick() {
            this.saveignore(this.selectItem.id);
        },
        unrememberClick(val) {
            this.selectItem = val;
            this.dialogIgnore = true;
        },
        handleClick() {
            this.requestData.page_num = 0;
            this.getData();
        },
        getData() {
            let that = this;
            this.tableLoading = true;
            this.requestData.flag = this.activeName;
            this.request.appjoinpage(this.requestData, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    for (let i in res.data.list) {
                        res.data.list[i].join_typeName = [
                            that.$t("joinUS.questionOptions0"),
                            that.$t("joinUS.questionOptions1"),
                            that.$t("joinUS.questionOptions2"),
                            that.$t("joinUS.questionOptions3"),
                            that.$t("joinUS.questionOptions4"),
                        ][res.data.list[i].join_type];
                    }
                    that.tableData = res.data.list;
                    that.total = res.data.total;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        search() {
            this.requestData.page = 0;
            this.getData();
        },
        saveignore(id) {
            let that = this;
            if (this.whyValue == null || this.whyValue.length <= 0) {
                that.toast.info(that.$t("writeIngore_reason"));
                return;
            }
            this.unrememberLoading = true;
            this.request.ajsaveignore(
                { rec_id: id, ignore_reason: this.whyValue },
                function (res) {
                    that.unrememberLoading = false;
                    that.dialogIgnore = false;
                    if (res.code == "1") {
                        that.toast.success(that.$t("unrememberSuccess"));
                        that.stringutils.arrRemove(
                            that.tableData,
                            that.selectItem
                        );
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
        savereply(id) {
            let that = this;

            if (this.remarkValue == null || this.remarkValue.length <= 0) {
                that.toast.info(that.$t("joinUS.writeNote"));
                return;
            }
            this.replyLoading = true;
            this.request.ajsavecontact(
                { rec_id: id, note: this.remarkValue },
                function (res) {
                    that.replyLoading = false;
                    that.dialogFeedback = false;
                    if (res.code == "1") {
                        that.toast.success(that.$t("joinUS.noteSuccess"));
                        that.stringutils.arrRemove(
                            that.tableData,
                            that.selectItem
                        );
                    } else {
                        that.toast.error(res.msg);
                    }
                }
            );
        },
    },
    created() {
        this.getData();
    },
};
</script>

<style scoped>
</style>