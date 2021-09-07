<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-04-16 15:07:37
 * @LastEditors: Please set LastEditors
 * @Description: 文档管理
 * @FilePath: \sjoyAdminrManager\src\views\document\documentManage.vue
-->

<template>
    <div>
        <div class="main-content">
            <el-tabs
                v-model="activeName"
                @tab-click="handleClick(activeName)"
                style="padding: 0px 20px"
                class="tabsStyle"
            >
                <el-tab-pane :label="$t('document.userxieyi')" name="0">
                    <el-row
                        class="row-header"
                        style="padding: 20px 20px 0px"
                    >
                        <el-col class="right">
                            <el-button
                                class="font14"
                                type="primary"
                                size="small"
                                @click="uploadFileClick(0)"
                                style="
                                    background: #2082ed;
                                    border-color: #2082ed;
                                "
                                >{{ $t("document.upload") }}</el-button
                            >
                        </el-col>
                        <el-col class="top10">
							<el-table
								ref="multipleTable"
								:data="tableData"
								border
								v-loading="dataLoading"
							>
								<el-table-column
									type="index"
									:label="$t('document.no')"
									align="center"
									width="70"
								></el-table-column>
								<el-table-column
									prop="name"
									align="center"
									:label="$t('document.docname')"
								></el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.uploadtime')"
								> 
								    <template slot-scope="scope">
										<span>{{
											scope.row.create_time | moment_ss
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.gengxintime')"
								>
								    <template slot-scope="scope">
										<span>{{
											scope.row.update_time | moment_ss
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="edit_user"
									align="center"
									:label="$t('document.bianji')"
								></el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.caozuo')"
								>
									<template slot-scope="scope">
										<el-button
											type="text"
											size="small"
											@click="
												updateFileClick(
													0,
													scope.row.id
												)
											"
											>{{
												$t("document.replace")
											}}</el-button
										>
										<el-button
											@click="
												delFileClick(scope.row.id)
											"
											type="text"
											size="small"
											>{{
												$t("document.del")
											}}</el-button
										>
									</template>
								</el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('document.shouce')" name="1">
                    <el-row
                        class="row-header"
                        style="padding: 20px 20px 0px"
                    >
                        <el-col class="right">
                            <el-button
                                class="font14"
                                type="primary"
                                size="small"
                                @click="uploadFileClick(1)"
                                style="
                                    background: #2082ed;
                                    border-color: #2082ed;
                                "
                                >{{ $t("document.upload") }}</el-button
                            >
                        </el-col>

                        <el-col class="top10">
							<el-table
								ref="multipleTable"
								:data="tableData"
								border
								v-loading="dataLoading"
							>
								<el-table-column
									type="index"
									:label="$t('document.no')"
									align="center"
									width="70"
								></el-table-column>
								<el-table-column
									prop="name"
									align="center"
									:label="$t('document.docname')"
								></el-table-column>
								<el-table-column
									prop="doc_type"
									align="center"
									:label="$t('document.doctype')"
								></el-table-column>
								<el-table-column
									prop=""
									align="center"
									:label="$t('document.uploadtime')"
								>
								    <template slot-scope="scope">
										<span>{{
											scope.row.create_time | moment_ss
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.gengxintime')"
								>
								    <template slot-scope="scope">
										<span>{{
											scope.row.update_time | moment_ss
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="edit_user"
									align="center"
									:label="$t('document.bianji')"
								></el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.caozuo')"
								>
									<template slot-scope="scope">
										<el-button
											type="text"
											size="small"
											@click="
												updateFileClick(
													1,
													scope.row.id
												)
											"
											>{{
												$t("document.replace")
											}}</el-button
										>
										<el-button
											@click="
												delFileClick(scope.row.id)
											"
											type="text"
											size="small"
											>{{
												$t("document.del")
											}}</el-button
										>
									</template>
								</el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('document.question')" name="2">
                    <el-row
                        class="row-header"
                        style="padding: 20px 20px 0px"
                    >
                        <el-col class="right">
                            <el-button
                                class="themeAddBtn"
                                type="primary"
                                size="small"
                                @click="addQuestion"
                                >{{ $t("document.addQuestion") }}</el-button
                            >
                        </el-col>
                        <el-col class="top10">
							<el-table
								ref="multipleTable"
								:data="tableData"
								border
								v-loading="dataLoading"
							>
								<el-table-column
									type="index"
									:label="$t('singleStore.number')"
									align="center"
									width="70"
								></el-table-column>
								<el-table-column
									prop="title"
									align="center"
									:label="$t('document.wtitle')"
								></el-table-column>
								<el-table-column
									align="center"
									:label="$t('document.cpgongneng')"
								>
									<template slot-scope="scope">
										<span
											v-if="gongnengOption != null"
											>{{
												gongnengOption[
													scope.row.function_id
												]
											}}</span
										>
									</template>
								</el-table-column>
								<el-table-column
									align="center"
									:label="$t('document.cpname')"
								>
									<template slot-scope="scope">
										<span
											v-if="prodateOption != null"
											>{{
												prodateOption[
													scope.row.product_id
												]
											}}</span
										>
									</template>
								</el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.gengxintime')"
								>
								
								    <template slot-scope="scope">
										<span>{{
											scope.row.update_time | moment_ss
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="edit_user"
									align="center"
									:label="$t('document.bianji')"
								></el-table-column>
								<el-table-column
									prop
									align="center"
									:label="$t('document.caozuo')"
									width="140"
								>
									<template slot-scope="scope">
										<el-button
											type="text"
											size="small"
											@click="
												editQuestion(scope.row.id)
											"
											>{{
												$t("document.edit")
											}}</el-button
										>
										<el-button
											type="text"
											size="small"
											@click="
												delFileClick(scope.row.id)
											"
											>{{
												$t("document.del")
											}}</el-button
										>
									</template>
								</el-table-column>
							</el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogWrite" width="25%">
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 0px">
                <el-form
                    label-width="100px"
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                >
                    <el-form-item
                        :label="$t('document.docname')"
                        prop="path"
                        class="withdrawStyle"
                    >
                        <el-upload
                            drag
                            class="avatar-uploader"
                            style="
                                height: 40px;
                                border-radius: 0.074074rem;
                                border: 0.018519rem solid #dcdfe6;
                            "
                            accept=".pdf, .PDF"
                            :action="uploadPDF.uploadAction()"
                            :data="uploadPDF.uploadData()"
                            :show-file-list="true"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :limit="1"
                        >
                            <div class="el-upload__text">
                                {{ $t("wallet.upload") }}
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="cancelBtn left10"
                            style="width: 100px"
                            @click="dialogWrite = false"
                            >{{ $t("cancelBtn") }}</el-button
                        >
                        <el-button
                            class="font14"
                            type="primary"
                            style="width: 100px"
                            v-loading="uploading"
                            @click="submitForm('ruleForm')"
                            >{{ $t("confirmBtn") }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-row>
        </el-dialog>

        <el-dialog title :visible.sync="delDialogVisible" width="20%" center>
            <p class="center fontWeight" style="color: #232426">
                {{ $t("document.confirmDelete") }}
            </p>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="cancelBtn left10"
                    style="width: 100px"
                    @click="delDialogVisible = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    class="font14 delBtn"
                    type="primary"
                    style="width: 100px; background: #2082ed; border: none"
                    @click="delOKUser()"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        docActiveName: {
            get() {
                return this.$store.getters.docActiveName;
            },
            set(val) {},
        },
    },
    name: "documentManage",
    data() {
        return {
            dialogTitle: "",
            doc_id: "",
            product_id: "",
            delDialogVisible: false,
            activeName: "0",
            dialogWrite: false,
            dataLoading: false,
            uploading: false,
            tableData: null,
            dialogFeedback: false,
            dialogIgnore: false,
            file: null,
            proData: null,
            gonData: null,
            prodateOption: null,
            gongnengOption: null,
            ruleForm: {
                type: 0,
                path: null,
                id: null,
                name: null,
            },
            rules: {
                path: [
                    {
                        required: true,
                        message: this.$t("uplaodFile"),
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        // 文档删除
        delOKUser() {
            let that = this;
            this.request.docDel({ id: this.ruleForm.id }, function (res) {
                if (res.code == "1") {
                    that.delDialogVisible = false;
                    // that.findlist(that.ruleForm.type);
                    that.toast.success(that.$t("delSucc"));
                    var newTab = [];
                    var i = 0;
                    for (let i in that.tableData) {
                        if (that.tableData[i].id != that.ruleForm.id) {
                            newTab.push(that.tableData[i]);
                        }
                    }
                    that.tableData = newTab;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        editQuestion(id) {
            this.$router.push({ path: "/updateQuestion", query: { id: id } });
        },
        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (
                        that.ruleForm.id != null ||
                        that.ruleForm.id != undefined
                    ) {
                        that.docUpdate();
                    } else {
                        that.docAdd();
                    }
                } else {
                    //   console.log('error submit!!');
                    return false;
                }
            });
        },

        // this.dialogTitle = this.$t("document.userxieyi")
        // this.dialogTitle = this.$t("document.shouce")

        updateFileClick(val, id) {
            this.ruleForm.type = val;
            this.ruleForm.id = id;
            this.dialogWrite = true;
            if (val == 0) {
                this.dialogTitle = this.$t("document.userxieyi");
            } else {
                this.dialogTitle = this.$t("document.shouce");
            }
        },
        delFileClick(id) {
            this.delDialogVisible = true;
            this.ruleForm.id = id;
        },
        uploadFileClick(val) {
            this.ruleForm.type = val;
            this.dialogWrite = true;
            if (val == 0) {
                this.dialogTitle = this.$t("document.userxieyi");
            } else {
                this.dialogTitle = this.$t("document.shouce");
            }
        },
        handleAvatarSuccess(res, file) {
            if (res.code == "1") {
                this.ruleForm.path = res.data.path;
                this.ruleForm.name = res.data.name;
                this.file = URL.createObjectURL(file.raw);
            } else {
                this.ruleForm.path = null;
                this.toast.error(res.msg);
            }
        },
        beforeAvatarUpload(file) {
            // return this.uploadUtils.beforeAvatarUpload(file);
        },
        addQuestion() {
            this.$router.push({
                path: "/addQuestion",
            });
        },
        handleClick(val) {
            this.findlist(val);
        },
        findlist(type) {
            let that = this;
            this.dataLoading = true;
            this.request.findlist({ type: type }, function (res) {
                that.dataLoading = false;
                if (res.code == "1") {
                    that.tableData = res.data;
                    for (let i in that.tableData) {
                        that.product_id = that.tableData[i].id;
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        docAdd() {
            let that = this;
            this.uploading = true;
            this.request.docAdd(this.ruleForm, function (res) {
                that.uploading = false;
                if (res.code == "1") {
                    that.dialogWrite = false;
                    that.findlist(that.ruleForm.type);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        docUpdate() {
            let that = this;
            this.uploading = true;
            this.request.docUpdate(this.ruleForm, function (res) {
                that.uploading = false;
                if (res.code == "1") {
                    that.dialogWrite = false;
                    that.findlist(that.ruleForm.type);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        productlist(product) {
            let that = this;
            this.dataLoading = true;
            this.request.productlist({ product: product }, function (res) {
                that.dataLoading = false;
                if (res.code == "1") {
                    if (product == 0) {
                        that.proData = res.data;
                    } else {
                        that.gonData = res.data;
                    }
                    that.getOption(that.language);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        getOption(lang) {
            if (this.proData != null) {
                var dic = {};
                for (let i in this.proData[lang]) {
                    dic[this.proData[lang][i].id] = this.proData[lang][i].dict;
                    this.doc_id = this.proData[lang][i].id;
                }

                this.prodateOption = dic;
            }
            if (this.gonData != null) {
                var dic = {};
                for (let i in this.gonData[lang]) {
                    dic[this.gonData[lang][i].id] = this.gonData[lang][i].dict;
                }
                this.gongnengOption = dic;
            }
        },
    },
    created() {
        this.productlist(0);
        this.productlist(1);

        this.activeName = this.docActiveName;
        this.findlist(this.activeName);
    },
    watch: {
        activeName: {
            handler(newVal, oldVal) {
                this.$store.dispatch("setDocActiveName", newVal);
            },
        },
    },
};
</script>
<style scoped>
.delBtn {
    background: #30cfb7 !important;
    color: white !important;
}
</style>