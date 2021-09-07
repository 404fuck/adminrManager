<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-04-15 15:04:41
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理
 * @FilePath: \sjoyAdminrManager\src\views\user\userManage.vue
-->
<template>
    <div>
        <div class="main-content">
            <el-tabs
                v-model="activeName"
                style="padding: 0px 20px"
                class="tabsStyle"
            >   
			    <!-- 用户列表 -->
                <el-tab-pane :label="$t('user.userList')" name="first">
                    <userList></userList>
                </el-tab-pane>
				<!-- 消息推送 -->
                <el-tab-pane :label="$t('messagePush')" name="second">
                    <el-row style="padding: 10px 20px">
                        <el-col :span="12">
                            <span class="font14 fontWeight">{{
                                $t("user.historyPush")
                            }}</span>
                        </el-col>
                        <el-col :span="12" class="right">
                            <el-button
                                class="themeAddBtn"
                                type="warning"
                                size="small"
                                @click="addMessage"
                                icon="el-icon-circle-plus"
                                >{{ $t("addPush") }}</el-button
                            >
                        </el-col>
                        <el-col class="top10">
							<el-table
								:data="tableData"
								border
								style="width: 100%"
							>
								<el-table-column
									type="index"
									:label="$t('user.number')"
									width="70"
									align="center"
								></el-table-column>
								<el-table-column
									prop
									:label="$t('user.pushTime')"
								>
									<template slot-scope="scope">
										<span>{{
											scope.row.create_time | moment
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="message_type"
									:label="$t('user.messageType')"
								></el-table-column>
								<el-table-column
									prop="push_title"
									:label="$t('user.pushTitle')"
								></el-table-column>
								<el-table-column
									prop="push_content"
									:label="$t('user.pushContent')"
								></el-table-column>
								<el-table-column
									prop="push_count"
									:label="$t('user.pushCount')"
								></el-table-column>
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
    </div>
</template>

<script>
import userList from "./userList";
export default {
    components: {
        userList,
    },
    name: "AppMain",
    data() {
        return {
            activeName: "first",
            tableData: null,
            shows: 1,

            total: 0,
            requestData: {
                page: 0,
                size: 10,
            },
        };
    },
    methods: {
        addMessage() {
            this.$router.push({
                path: "/addMessage",
            });
        },
        changeClick(val) {
            if (val == "4") {
                this.shows = 4;
            } else if (val == "1") {
                this.shows = 1;
            } else if (val == "2") {
                this.shows = 2;
            }
        },
        paginationChange(page) {
            this.requestData.page = page - 1;
            this.getData();
        },
        getData() {
            let that = this;
            this.tableLoading = true;
            this.request.usermsglist(this.requestData, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    that.tableData = res.data.msg_list;
                    that.total = res.data.count;
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
.active {
    color: #ffffff;
    background: #30cfb7;
}
</style>