<!--
 * @Author: zzt
 * @Date: 2021-04-09 15:19:47
 * @LastEditTime: 2021-05-17 15:09:23
 * @LastEditors: Please set LastEditors
 * @Description: 系统更新
 * @FilePath: \sjoyAdminrManager\src\views\systemUpdate\systemUpdate.vue
-->
<template>
    <div>
        <div class="main-content">
            <el-row class="com-header">
                <span>系统更新</span>
                <div class="leftLine"></div>
            </el-row>
            <el-row style="padding: 30px 40px">
                <el-row>
                    <el-col :span="12" class="left fontWeight font14 top5">历史更新</el-col>
                    <el-col :span="12" class="right">
                        <el-button
                            class="themeAddBtn "
                            type="primary"
                            size="small"
                            @click="addUpdate"
                            >添加更新</el-button
                        >
                    </el-col>
                </el-row>
                <el-col class="top10">
                    <el-table
                        border
                        :data="tableData"
                        v-loading="tableLoading"
                        style="width: 100%"
                    >
                        <el-table-column :label="'更新时间'" width="250">
                            <template slot-scope="scope">
                                <span>{{ scope.row.upgradeTime | empty }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="'服务器地址'"  width="280">
                            <template slot-scope="scope">
                                <span>{{ scope.row.serverUrl | empty }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="'更新服务'"   width="280">
                            <template slot-scope="scope">
                                <span>{{ scope.row.serveList | empty }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop
                            :label="'主要更新内容'"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.upgradeInfoList | empty
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('caozuo')" width="160">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="lookDetails(scope.row)"
                                    >{{$t('look')}}</el-button
                                >
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="editUpdate(scope.row)"
                                    >{{$t('edit')}}</el-button
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
    name: "systemUpdate",
    data() {
        return {
            tableData: null,
            tableLoading: false,
           
            //分页
            currentPage: {
                total: 0,
                page: 1,
                size: 10,
            },
        };
    },
    methods: {
        //添加更新
        addUpdate(){
            this.$router.push('/addUpdate');
        },
        //分页
        handleCurrentChange(page) {
            this.currentPage.page = page;
            this.upgradePage();
        },
        lookDetails(row){
            this.$router.push({ path: "/detailsUpdate", query: { id: row.id } });
        },
        editUpdate(row){
            this.$router.push({ path: "/editUpdate", query: { id: row.id } });
        },
        //表格数据
        upgradePage(){
            let that = this;
            let data={
                page_num : this.currentPage.page-1,
                page_size : this.currentPage.size,
            };
            this.tableLoading = true;
            this.request.upgradePage(data, function (res) {
                that.tableLoading = false;
                if (res.code == "1") {
                    let res_data = res.data;
                    let tableList = res_data.list;
                    for (let i in tableList) {
                        tableList[i].content = JSON.parse(tableList[i].content);
                        tableList[i].serveList = [];
                        tableList[i].upgradeInfoList= [];
                        tableList[i].upgradeTime= "";
                        for (let j in tableList[i].content) {
                            if((tableList[i].content)[j].upgrade_info!=""){
                                tableList[i].upgradeTime = (tableList[i].content)[j].upgrade_time;
                                tableList[i].serveList.push(j);
                                tableList[i].upgradeInfoList.push((tableList[i].content)[j].upgrade_info);
                            }
                        }
                        tableList[i].serveList=tableList[i].serveList.join('/')
                        tableList[i].upgradeInfoList=tableList[i].upgradeInfoList.join('；')
                    }
                    that.currentPage.total = res_data.total;
                    that.tableData = tableList;
                    console.log(tableList);
                } else {
                    that.toast.error(res.msg);
                }
            
            });
        }

    },
    created() {
        this.upgradePage();
    },
    watch: {},
};
</script>
<style scoped>
</style>