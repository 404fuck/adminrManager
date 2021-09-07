<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-04-15 15:04:25
 * @LastEditors: Please set LastEditors
 * @Description: 商户管理--消息推送
 * @FilePath: \sjoyAdminrManager\src\views\singleStore\storeState.vue
-->
<template>
    <div>
        <div class="main-content" ref="mainContent">
            <el-tabs
                v-model="activeName"
                style="padding: 0px 20px"
                class="tabsStyle"
                :lazy="true"
            >
                <el-tab-pane :label="$t('singleStore.storeList')" name="first">
                    <storeList></storeList>
                </el-tab-pane>

                <el-tab-pane :label="$t('messagePush')" name="second">
                    <el-row style="padding: 10px 20px">
                        <el-col :span="12">
                            <span class="font14 fontWeight"
                                >{{ $t("singleStore.historyPush") }}：</span
                            >
                        </el-col>
                        <el-col :span="12" class="right">
                            <el-button
                                class="themeAddBtn"
                                type="warning"
                                size="small"
                                @click="dialogAdd = true"
                                icon="el-icon-circle-plus"
                                >{{ $t("addPush") }}</el-button
                            >
                        </el-col>
                        <el-col class="top10">
                            <el-table
                                :data="tableData"
                                border
                                style="width: 100%"
                                v-loading="tableLoading"
                            >
                                <el-table-column
                                    type="index"
                                    :label="$t('singleStore.number')"
                                    width="70"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop
                                    :label="$t('singleStore.pushTime')"
                                >
                                    <template slot-scope="scope">
                                        <span>{{
                                            scope.row.create_time | moment
                                        }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop
                                    :label="$t('singleStore.pushTitle')"
                                >
                                    <template slot-scope="scope">
                                        <span>{{
                                            scope.row.push_title | empty
                                        }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop
                                    :label="$t('singleStore.pushContent')"
                                >
                                    <template slot-scope="scope">
                                        <span>{{
                                            scope.row.push_content | empty
                                        }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop
                                    :label="$t('singleStore.pushUrl')"
                                >
                                    <template slot-scope="scope">
                                        <span>{{
                                            scope.row.push_url | empty
                                        }}</span>
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
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog :title="$t('addPush')" :visible.sync="dialogAdd" width="37%">
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 30px 0px 0px">
                <el-form
                    label-width="130px"
                    class="demo-ruleForm"
                    ref="ruleForm"
                    :model="ruleForm"
                    :rules="rules"
                >
                    <el-form-item
                        :label="$t('singleStore.pushTitle') + '：'"
                        prop="push_title"
                    >
                        <el-input
                            v-model.trim="ruleForm.push_title"
                            class="value-input"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        :label="$t('singleStore.pushContent') + '：'"
                        prop="push_content"
                    >
                        <el-input
                            type="textarea"
                            v-model.trim="ruleForm.push_content"
                            rows="10"
                            maxlength="200"
                            onchange="this.value=this.value.substring(0, 200)"
                            onkeydown="this.value=this.value.substring(0, 200)"
                            onkeyup="this.value=this.value.substring(0, 200)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="$t('singleStore.pushUrl') + '：'"
                        prop="push_url"
                    >
                        <el-input
                            v-model.trim="ruleForm.push_url"
                            class="value-input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="font14"
                            type="primary"
                            style="width: 100px"
                            :loading="okLoading"
                            @click="submitForm('ruleForm')"
                            >{{ $t("singleStore.send") }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import storeList from "./storeList";
export default {
    components: {
        storeList,
    },
    name: "storeState",
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
            titleText: this.$t("storeDetail"),
            activeName: "first",
            dialogAdd: false,
            tableLoading: false,
            okLoading: false,

            tableData: null,

            total: 0,
            requestData: {
                page: 0,
                size: 10,
            },

            ruleForm: {
                push_title: "", // "推送标题",
                push_content: "", //"推送内容",
                push_url: "", //"推送链接",
            },

            rules: {
                push_title: [
                    {
                        required: true,
                        message: this.$t("singleStore.writePushTitle"),
                        trigger: "blur",
                    },
                ],
                push_content: [
                    {
                        required: true,
                        message: this.$t("singleStore.writePushContent"),
                        trigger: "blur",
                    },
                ],
                push_url: [{ validator: checkURL, trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.pushcompany();
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },
        paginationChange(page) {
            this.requestData.page = page - 1;
            this.getData();
        },
        getData() {
            let that = this;
            this.tableLoading = true;
            this.request.companymsglist(this.requestData, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    that.tableData = res.data.msg_list;
                    that.total = res.data.count;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        pushcompany() {
            let that = this;
            this.okLoading = true;
            this.request.pushcompany(this.ruleForm, function (res) {
                that.okLoading = false;
                if (res.code == "1") {
                    that.dialogAdd = false;
                    that.tableData.splice(0, 0, res.data);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
    },
    created() {
        this.getData();
    },
};
</script>

<style scoped>
</style>