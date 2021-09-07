<!--
 * @Author: zzt
 * @Date: 2021-04-09 15:20:47
 * @LastEditTime: 2021-05-12 20:56:46
 * @LastEditors: Please set LastEditors
 * @Description: 系统更新详情
 * @FilePath: \sjoyAdminrManager\src\views\systemUpdate\detailsUpdate.vue
-->
<template>
    <div>
        <div class="main-content">
            <el-row class="com-header">
                <span>更新详情</span>
                <div class="leftLine"></div>
            </el-row>
            <el-row class="details-container" v-if="detailData!=null">
                <el-col class="top20">
                    服务器地址：
                    {{detailData.server_url|empty}}
                </el-col>
                <el-col class="top20">
                    APK下载地址：
                    {{detailData.apk_url|empty}}
                </el-col>
                <el-col>
                    <hr/>
                </el-col>
                <el-row class="details-list" :gutter="100">
                    <el-col :span="8">
                        <h3 class="listTit">Mjoy Manager</h3>
                        <div v-if="detailData.manager.versionCode!=''&&detailData.manager.versionCode!=null">
                            <ul class="detailList">
                                <li>
                                    强制更新：
                                    {{detailData.manager.mustUpdate==true?$t('yes'):$t('no')}}
                                </li>
                                <li>
                                    更新时间：
                                    {{detailData.manager.upgrade_time}}
                                </li>
                                <li>
                                    版本：
                                    {{detailData.manager.versionName}}
                                </li>
                                <li>
                                    版本号：
                                    {{detailData.manager.versionCode}}
                                </li>
                                <li>
                                    更新企业：
                                    <span
                                       v-for="(item,index) in detailData.company_info"
                                       :key="index"
                                       >
                                       {{item.mobile_inf|empty}}&nbsp;&nbsp;
                                    </span>
                                </li>
                                <li>
                                    更新内容
                                    <div class="top10">{{detailData.manager.upgrade_info}}</div>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <h3 class="listTit">Mjoy waiter</h3>
                        <div v-if="detailData.waiter.versionCode!=''&&detailData.waiter.versionCode!=null">
                            <ul class="detailList">
                                <li>
                                    强制更新：
                                    {{detailData.waiter.mustUpdate==true?$t('yes'):$t('no')}}
                                </li>
                                <li>
                                    更新时间：
                                    {{detailData.waiter.upgrade_time}}
                                </li>
                                <li>
                                    版本：
                                    {{detailData.waiter.versionName}}
                                </li>
                                <li>
                                    版本号：
                                    {{detailData.waiter.versionCode}}
                                </li>
                                <li>
                                    更新企业：
                                    <span
                                       v-for="(item,index) of detailData.dept_info"
                                       :key="index"
                                       >
                                       {{item.dep_comp_name|empty}}&nbsp;&nbsp;
                                    </span>
                                </li>
                                <li>
                                    更新内容
                                    <div class="top10">{{detailData.waiter.upgrade_info}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="top30">
                            <h3 class="listTit">Mjoy waiter(HD)</h3>
                            <div v-if="detailData.waiterHD.versionCode!=''&&detailData.waiterHD.versionCode!=null">
                                <ul class="detailList">
                                    <li>
                                        强制更新：
                                        {{detailData.waiter.mustUpdate==true?$t('yes'):$t('no')}}
                                    </li>
                                    <li>
                                        更新时间：
                                        {{detailData.waiterHD.upgrade_time}}
                                    </li>
                                    <li>
                                        版本：
                                        {{detailData.waiterHD.versionName}}
                                    </li>
                                    <li>
                                        版本号：
                                        {{detailData.waiterHD.versionCode}}
                                    </li>
                                    <li>
                                        更新企业：
                                        <span
                                            v-for="item of detailData.dept_info"
                                            :key="item.upgrade_id"
                                            >
                                            {{item.dep_comp_name|empty}}&nbsp;&nbsp;
                                        </span>
                                    </li>
                                    <li>
                                        更新内容
                                       <div class="top10">{{detailData.waiterHD.upgrade_info}}</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="top20" v-else>
                                更新门店：
                                全部门店
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-col class="backBtn">
                    <el-button
                        class="font14"
                        style="width:100px;height:40px"
                        type="primary"
                        size="small"
                        @click="goBack"
                    >{{$t('back')}}</el-button>
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
            set(val) {}
        }
    },
    name: "detailsUpdate",
    data() {
        return {
           detailData:null,
        };
    },
    methods: {
        goBack(){
            this.$router.back(-1);
        },
        upgradeDetail(){
            let that = this;
            let data = {
                id: Number(this.$route.query.id),
            };
            this.request.upgradeDetail(data, function (res){
                if (res.code == "1") {
                    let res_data= res.data;
                    that.detailData = res_data;
                    console.log(res_data);
                }

            })
            
        }
        

    },
    created() {
        this.upgradeDetail();
        
    },
    watch: {
       
        
    }
};
</script>
<style scoped>
    .details-container{
        padding: 30px 20px 0 100px;
        font-size: 14px;
        color: #505050;
    }
    .listTit{
        font-size: 16px;
        color: #545454;
    }
    .detailList{
        padding: 0;
        margin: 0;
    }
    .detailList li{
        margin-top: 20px;
        padding: 0;
        list-style: none;
    }
    .backBtn{
        margin-top: 50px;
        margin-bottom: 30px;
    }
</style>