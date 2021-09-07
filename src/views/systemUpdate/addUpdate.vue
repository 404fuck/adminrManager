<!--
 * @Author: zzt
 * @Date: 2021-04-09 15:21:17
 * @LastEditTime: 2021-05-17 21:42:34
 * @LastEditors: Please set LastEditors
 * @Description: 添加系统更新
 * @FilePath: \sjoyAdminrManager\src\views\systemUpdate\addUpdate.vue
-->
<template>
    <div>
        <div class="main-content">
            <el-row class="com-header">
                <span>{{isEdit?'编辑更新':'添加更新'}}</span>
                <div class="leftLine"></div>
            </el-row>
            <div class="add-container">
                <el-row :gutter="100">
                    <el-col :span="8">
                        <div>服务器地址</div>
                        <el-select
                            v-model="requestData.server_url"
                            placeholder="请选择"
                            class="top10"
                            style="width: 100%"
                        >
                            <el-option
                                v-for="(item,index) in serverUrlList"
                                :key="index"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <div>APK下载地址</div>
                        <el-select
                            v-model="requestData.apk_url"
                            placeholder="请选择"
                            class="top10"
                            style="width: 100%"
                        >
                            <el-option
                                v-for="(item,index) in apkUrlList"
                                :key="index"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <!-- Mjoy Manager -->
                <h3 class="top50">Mjoy Manager</h3>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>强制更新</div>
                        <div class="top20">
                            <el-radio v-model="requestData.manager.mustUpdate" :label="false">否</el-radio>
                            <el-radio
                                v-model="requestData.manager.mustUpdate"
                                style="margin-left: 80px"
                                :label="true"
                                >是</el-radio
                            >
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>更新日期</div>
                        <el-input
                            class="top10"
                            v-model="requestData.manager.upgrade_time"
                            style="width: 100%"
                            placeholder="请输入更新新日期"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>版本</div>
                        <el-input
                            class="top10"
                            v-model="requestData.manager.versionName"
                            style="width: 100%"
                            placeholder="请输入版本"
                        ></el-input>
                    </el-col>
                    <el-col :span="8">
                        <div>版本号</div>
                        <el-input
                            class="top10"
                            type="number"
                            v-model="requestData.manager.versionCode"
                            style="width: 100%"
                            placeholder="请输入版本号"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>更新企业</div>
                        <el-input
                            @focus="isDialogShow=true"
                            class="cursorInput top10"
                            v-model="companyListInput"
                            style="width: 100%"
                            placeholder="请选择"
                            readonly
                            suffix-icon="el-icon-arrow-down"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <div>APK</div>
                        <el-upload
                            class="top10 addUpdate"
                            name="file"
                            :action="`${stringutils.getBaseUrl()}/api/pf/upgrade/updateAPK`"
                            :show-file-list="false"
                            :on-success="fileSuccess1"
                            :on-progress="uploadProcess1"
                        >    
                            <el-input
                                v-model="updateAPKManager"
                                style="width: 61.5%"
                                placeholder="请上传APK"
                                readonly
                            ></el-input>
                            <el-button class="updataBtn" style="width: 100px; margin-left: 20px">上传APK</el-button>
                            <el-progress :percentage="percentage1" v-if="isProcess1" style="width: 67%"></el-progress>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="16">
                        <div>更新内容：</div>
                        <el-input
                            class="top10 note-textarea"
                            type="textarea"
                            v-model="requestData.manager.upgrade_info"
                        >
                        </el-input>
                    </el-col>
                </el-row>
                <!-- Mjoy waiter -->
                <h3 class="top50">Mjoy waiter</h3>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>强制更新</div>
                        <div class="top20">
                            <el-radio v-model="requestData.waiter.mustUpdate" :label="false">否</el-radio>
                            <el-radio
                                v-model="requestData.waiter.mustUpdate"
                                style="margin-left: 80px"
                                :label="true"
                                >是</el-radio
                            >
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>更新日期</div>
                        <el-input
                            class="top10"
                            v-model="requestData.waiter.upgrade_time"
                            style="width: 100%"
                            placeholder="请输入更新新日期"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>版本</div>
                        <el-input
                            class="top10"
                            v-model="requestData.waiter.versionName"
                            style="width: 100%"
                            placeholder="请输入版本"
                        ></el-input>
                    </el-col>
                    <el-col :span="8">
                        <div>版本号</div>
                        <el-input
                            class="top10"
                            type="number"
                            v-model="requestData.waiter.versionCode"
                            style="width: 100%"
                            placeholder="请输入版本号"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="12">
                        <div>APK</div>
                        <el-upload
                            class="top10 addUpdate"
                            name="file"
                            :action="`${stringutils.getBaseUrl()}/api/pf/upgrade/updateAPK`"
                            :show-file-list="false"
                            :on-success="fileSuccess2"
                            :on-progress="uploadProcess2"
                        >    
                            <el-input
                                v-model="updateAPKWaiter"
                                style="width: 61.5%"
                                placeholder="请上传APK"
                                readonly
                            ></el-input>
                            <el-button class="updataBtn" style="width: 100px; margin-left: 20px">上传APK</el-button>
                            <el-progress :percentage="percentage2" v-if="isProcess2" style="width: 67%"></el-progress>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="16">
                        <div>更新内容：</div>
                        <el-input
                            class="top10 note-textarea"
                            type="textarea"
                            v-model="requestData.waiter.upgrade_info"
                        >
                        </el-input>
                    </el-col>
                </el-row>
                <!-- Mjoy waiter(HD) -->
                <h3 class="top50">Mjoy waiter(HD)</h3>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>强制更新</div>
                        <div class="top20">
                            <el-radio v-model="requestData.waiterHD.mustUpdate" :label="false">否</el-radio>
                            <el-radio
                                v-model="requestData.waiterHD.mustUpdate"
                                style="margin-left: 80px"
                                :label="true"
                                >是</el-radio
                            >
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>更新日期</div>
                        <el-input
                            class="top10"
                            v-model="requestData.waiterHD.upgrade_time"
                            style="width: 100%"
                            placeholder="请输入更新新日期"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="8">
                        <div>版本</div>
                        <el-input
                            class="top10"
                            v-model="requestData.waiterHD.versionName"
                            style="width: 100%"
                            placeholder="请输入版本"
                        ></el-input>
                    </el-col>
                    <el-col :span="8">
                        <div>版本号</div>
                        <el-input
                            class="top10"
                            type="number"
                            v-model="requestData.waiterHD.versionCode"
                            style="width: 100%"
                            placeholder="请输入版本号"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="12">
                        <div>APK</div>
                        <el-upload
                            class="top10 addUpdate"
                            name="file"
                            :action="`${stringutils.getBaseUrl()}/api/pf/upgrade/updateAPK`"
                            :show-file-list="false"
                            :on-success="fileSuccess3"
                            :on-progress="uploadProcess3"
                        >    
                            <el-input
                                v-model="updateAPKHD"
                                style="width: 61.5%"
                                placeholder="请上传APK"
                                readonly
                            ></el-input>
                            <el-button class="updataBtn" style="width: 100px; margin-left: 20px">上传APK</el-button>
                            <el-progress :percentage="percentage3" v-if="isProcess3" style="width: 67%"></el-progress>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="top20" :gutter="100">
                    <el-col :span="16">
                        <div>更新内容：</div>
                        <el-input
                            class="top10 note-textarea"
                            type="textarea"
                            v-model="requestData.waiterHD.upgrade_info"
                        >
                        </el-input>
                    </el-col>
                </el-row>
                <!-- 更新门店 -->
                <el-row class="top30" :gutter="100">
                    <el-col :span="8">
                        <div>更新门店</div>
                        <el-input
                            @focus="isDialogShow2=true"
                            class="cursorInput top10"
                            v-model="depListInput"
                            style="width: 100%"
                            placeholder="请选择"
                            readonly
                            suffix-icon="el-icon-arrow-down"
                        ></el-input>
                    </el-col>
                </el-row>
                <!-- 保存--取消 -->
                <el-row class="add-btn">
                    <el-button
                        class="font14"
                        style="width: 100px; height: 40px"
                        type="primary"
                        size="small"
                        @click="saveConfirm()"
                        >{{ $t("save") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        style="width: 100px; height: 40px"
                        size="small"
                        @click="goBack"
                        >{{ $t("cancel") }}</el-button
                    >
                </el-row>
            </div>
        </div>
        <!-- 选择企业 -->
        <el-dialog :visible.sync="isDialogShow" width="40%" title="选择企业" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 15px 30px 15px">
                <el-col>
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange(checkAll,1)"
                        >全选</el-checkbox
                    >
                    <el-checkbox-group
                        class="checkbox-group"
                        v-model="checkedArr"
                        @change="handleCheckedChange(checkedArr,1)"
                    >
                        <el-checkbox
                            v-for="(item, index) in checkOptions"
                            :label="item.id"
                            :key="index"
                            >{{ item.mobile_inf }}</el-checkbox
                        >
                    </el-checkbox-group>
                </el-col>
                <el-col class="top50 center">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        v-if="
                            currentPage.total > currentPage.size &&
                            checkOptions.length != 0
                        "
                        :total="currentPage.total"
                        :page-size="currentPage.size"
                        :current-page="currentPage.page"
                        @current-change="paginationChange"
                    ></el-pagination>
                </el-col>
                <el-col class="line top20" style="margin-left: 0px"></el-col>
                <el-col class="top30 center">
                    <el-button
                        class="font14"
                        style="width: 100px; height: 40px"
                        type="primary"
                        size="small"
                        @click="dialogConfirm(1)"
                        >{{ $t("confirmBtn") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        style="width: 100px; height: 40px"
                        size="small"
                        @click="dialogCancel(1)"
                        >{{ $t("cancelBtn") }}</el-button
                    >
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 更新门店  -->
        <el-dialog :visible.sync="isDialogShow2" width="40%" title="选择门店" :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="line" style="margin-left: 0px"></div>
            <el-row class="top10" style="padding: 20px 15px 30px 15px">
                <el-col>
                    <el-checkbox
                        :indeterminate="isIndeterminate2"
                        v-model="checkAll2"
                        @change="handleCheckAllChange(checkAll2,2)"
                        >全选</el-checkbox
                    >
                    <el-checkbox-group
                        class="checkbox-group"
                        v-model="checkedArr2"
                        @change="handleCheckedChange(checkedArr,2)"
                    >
                        <el-checkbox
                            v-for="(item, index) in checkOptions2"
                            :label="item.dep_ID"
                            :key="index"
                            >{{ item.dep_comp_name }}</el-checkbox
                        >
                    </el-checkbox-group>
                </el-col>
                <el-col class="top50 center">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        v-if="
                            currentPage2.total > currentPage2.size &&
                            checkOptions2.length != 0
                        "
                        :total="currentPage2.total"
                        :page-size="currentPage2.size"
                        :current-page="currentPage2.page"
                         @current-change="paginationChange2"
                    ></el-pagination>
                </el-col>
                <el-col class="line top20" style="margin-left: 0px"></el-col>
                <el-col class="top30 center">
                    <el-button
                        class="font14"
                        style="width: 100px; height: 40px"
                        type="primary"
                        size="small"
                        @click="dialogConfirm(2)"
                        >{{ $t("confirmBtn") }}</el-button
                    >
                    <el-button
                        class="cancelBtn"
                        style="width: 100px; height: 40px"
                        size="small"
                        @click="dialogCancel(2)"
                        >{{ $t("cancelBtn") }}</el-button
                    >
                </el-col>
            </el-row>
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
    props:{
        isEdit:{
            type:Boolean,
            default:false,
        },
        propId:{
            type: String,
            default:'',
        }
    },
    name: "addUpdate",
    data() {
        return {
            serverUrlList:['http://www.shule666.com','http://up.shule666.com','http://192.168.1.207'],
            apkUrlList:['http://www.sjoyfood.com','http://up.sjoyfood.com','http://192.168.1.104:8090'],
            updateAPKManager:'',
            updateAPKWaiter:'',
            updateAPKHD:'',
            requestData:{
                apk_url:"",
                server_url:"",
                company_info:[],
                dept_info:[],
                id:"",
                manager:{
                    mustUpdate:false,
                    upgrade_info : "",
                    upgrade_time : "",
                    versionCode : null,
                    versionName : "",
                },
                waiter :{
                    mustUpdate:false,
                    upgrade_info : "",
                    upgrade_time : "",
                    versionCode : null,
                    versionName : "",
                },
                waiterHD :{
                    mustUpdate:false,
                    upgrade_info : "",
                    upgrade_time : "",
                    versionCode : null,
                    versionName : "",
                },

            },
            companyListInput:"",
            depListInput:"",
            getCompanyList:[],
            getDepList:[],
            //选择企业
            isDialogShow: false,
            checkOptions: [],
            checkAll: false,
            checkedArr: [],
            isIndeterminate: false,
            currentPage: {
                total: 0,
                page: 1,
                size: 28,
            },
            //选择门店
            isDialogShow2: false,
            checkOptions2: [],
            checkAll2: false,
            checkedArr2: [],
            isIndeterminate2: false,
            currentPage2: {
                total: 0,
                page: 1,
                size: 28,
            },
            // 上传apk进度条
            percentage1:0,
            isProcess1:false,
            percentage2:0,
            isProcess2:false,
            percentage3:0,
            isProcess3:false,
            
        };
    },
    methods: {
        dialogConfirm(status){
            if(status==1){
                if(this.checkedArr.length<=0){
                    this.toast.error('请选择企业！')
                }else{
                    this.companyListInput= "";
                    let companyList =[];
                    console.log(this.checkedArr);
                    this.checkOptions.forEach(items=>{
                        this.checkedArr.forEach(item=>{
                            if(items.id==item){
                                companyList.push(items.mobile_inf);
                            }
                        })
                    })
                    this.companyListInput = companyList.join('/');
                    this.isDialogShow = false;
                }
            }else if(status==2){
                if(this.checkedArr2.length<=0){
                    this.toast.error('请选择门店！')
                }else{
                    this.depListInput= "";
                    let depList =[];
                    this.checkOptions2.forEach(items=>{
                        this.checkedArr2.forEach(item=>{
                            if(items.dep_ID==item){
                                depList.push(items.dep_comp_name);
                            }
                        })
                    })
                    this.depListInput = depList.join('/');
                    this.isDialogShow2 = false;
                }
            }else{
                return false;
            }
        },
        dialogCancel(status){
            if(status==1){
                this.checkedArr=[];
                this.isDialogShow = false;
            }else if(status==2){
                this.checkedArr2=[];
                this.isDialogShow2 = false;
            }else{
                return false;
            }
        },
        
        handleCheckAllChange(val,stausVal) {
            if(stausVal==1){
                this.isIndeterminate = false;
                if(val){
                    this.checkOptions.forEach(item=>{
                        this.checkedArr.push(item.id);
                    })
                    
                }else{
                    this.checkedArr= [];
                    this.getCompanyList= [];
                }
            }else if(stausVal==2){
                this.isIndeterminate2 = false;
                if(val){
                    this.checkOptions2.forEach(item=>{
                        this.checkedArr2.push(item.dep_ID);
                    })
                }else{
                    this.checkedArr2= [];
                    this.getDepList= [];
                }
            }else{
                return false;
            }
        },
        handleCheckedChange(value,stausVal) {
            if(stausVal==1){
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.checkOptions.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.checkOptions.length;
                this.checkedArr.forEach(item=>{
                    this.getCompanyList.push({id:item})
                })
            }else if(stausVal==2){
                let checkedCount2 = value.length;
                this.checkAll2 = checkedCount2 === this.checkOptions2.length;
                this.isIndeterminate2 =
                    checkedCount2 > 0 && checkedCount2 < this.checkOptions2.length;
                this.checkedArr2.forEach(item=>{
                    this.getDepList.push({dep_id:item})
                })
                
            }else{
                return false;
            }
            
        },
        paginationChange(page) {
            this.currentPage.page = page;
            this.allCompany();
        },
        paginationChange2(page) {
            this.currentPage2.page = page;
            this.allDep();
        },
        //所有企业的翻页列表
        allCompany() {
            let that = this;
            let data = {
                page_num: this.currentPage.page - 1,
                page_size: this.currentPage.size,
            };
            this.request.allCompany(data, function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    that.checkOptions = res_data.list;
                    that.currentPage.total = res_data.total;
                    // console.log(that.checkOptions);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //所有门店的翻页列表
        allDep() {
            let that = this;
            let data = {
                page_num: this.currentPage2.page - 1,
                page_size: this.currentPage2.size,
            };
            this.request.allDep(data, function (res) {
                if (res.code == "1") {
                    let res_data = res.data;
                    that.checkOptions2 = res_data.list;
                    that.currentPage2.total = res_data.total;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //上传apk
        uploadProcess1(res, file){
            this.isProcess1 = true;
            this.percentage1 = file.percentage.toFixed(0);
        },
        fileSuccess1(res,file){
            if(res.code == "1"){
                this.updateAPKManager = file.name;
                this.isProcess1 = false;
                this.percentage1 = 0;
                this.toast.success('上传成功！');
            }else{
                this.toast.error(res.msg);
            }

        },
        uploadProcess2(res, file){
            this.isProcess2 = true;
            this.percentage2 = file.percentage.toFixed(0);
        },
        fileSuccess2(res,file){
            if(res.code == "1"){
                this.updateAPKWaiter = file.name;
                this.isProcess2 = false;
                this.percentage2 = 0;
                this.toast.success('上传成功！');
            }else{
                this.toast.error(res.msg);
            }
        },
        uploadProcess3(res, file){
            this.isProcess3 = true;
            this.percentage3 = file.percentage.toFixed(0);
        },
        fileSuccess3(res,file){
            if(res.code == "1"){
                this.updateAPKHD = file.name;
                this.isProcess3 = false;
                this.percentage3 = 0;
                this.toast.success('上传成功！');
            }else{
                this.toast.error(res.msg);
            }

        },
        
        updateAPK(){
            let that = this;
            let data = {
                file:""
            }
            this.request.updateAPK(data, function (res) {
                if (res.code == "1") {
                   console.log(`上传成功！`);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        
        //新建更新信息
        saveUpgrade(){
            let that = this;
            this.getCompanyList =[];
            this.getDepList =[];
            if(this.checkedArr.length!=0){
                this.checkedArr.forEach(item=>{
                    this.getCompanyList.push({id:item})

                })
            }
            if(this.checkedArr2.length!=0){
                this.checkedArr2.forEach(item=>{
                    this.getDepList.push({dep_id:item})

                })
            }
            console.log(this.getCompanyList);
            console.log(this.getDepList);
            this.requestData.company_info = this.getCompanyList;
            this.requestData.dept_info = this.getDepList;
            this.requestData.manager.versionCode = Number(this.requestData.manager.versionCode);
            this.requestData.waiter.versionCode = Number(this.requestData.waiter.versionCode);
            this.requestData.waiterHD.versionCode = Number(this.requestData.waiterHD.versionCode);
            this.request.saveUpgrade(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success('保存成功！');
                    setTimeout(() => {
                        that.goBack();
                    }, 500);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //编辑更新信息
        updateUpgrade(){
            let that = this;
            this.getCompanyList =[];
            this.getDepList =[];
            if(this.checkedArr.length!=0){
                this.checkedArr.forEach(item=>{
                    this.getCompanyList.push({id:item})

                })
            }
            if(this.checkedArr2.length!=0){
                this.checkedArr2.forEach(item=>{
                    this.getDepList.push({dep_id:item})

                })
            }
            console.log(this.getCompanyList);
            console.log(this.getDepList);
            this.requestData.company_info = this.getCompanyList;
            this.requestData.dept_info = this.getDepList;
            this.requestData.manager.versionCode = Number(this.requestData.manager.versionCode);
            this.requestData.waiter.versionCode = Number(this.requestData.waiter.versionCode);
            this.requestData.waiterHD.versionCode = Number(this.requestData.waiterHD.versionCode);
            this.request.updateUpgrade(this.requestData, function (res) {
                if (res.code == "1") {
                    that.toast.success('保存成功！');
                    setTimeout(() => {
                        that.goBack();
                    }, 500);
                } else {
                    that.toast.error(res.msg);
                }
            });

        },
        //详情
        upgradeDetail(){
            let that = this;
            let data = {
                id: Number(this.propId),
            };
            this.request.upgradeDetail(data, function (res){
                if (res.code == "1") {
                    let res_data= res.data;
                    let companyList = [];
                    let depList =[];
                    if(res_data.company_info!=null&&res_data.company_info.length>0){
                        res_data.company_info.forEach(item=>{
                            companyList.push(item.mobile_inf);
                            that.checkedArr.push(item.id)
                        });
                        that.companyListInput = companyList.join('/');
                    };
                    if(res_data.dept_info!=null&&res_data.dept_info.length>0){
                        res_data.dept_info.forEach(item=>{
                            depList.push(item.dep_comp_name);
                            that.checkedArr2.push(item.dep_ID)
                        });
                        that.depListInput = depList.join('/');
                    };
                    that.requestData = res_data;
                    console.log(that.requestData);
                }

            })
            
        },
        saveConfirm(){
            if(this.isEdit){
                this.updateUpgrade();
            }else{
                this.saveUpgrade();
            }
            
        },
        goBack() {
            this.$router.back(-1);
        },
    },
    created() {
        this.allCompany();
        this.allDep();
    },
    mounted(){
        //编辑更新
        if(this.isEdit){
            this.upgradeDetail()
        }
    },
   
    watch: {
        
    },
};
</script>
<style scoped>
.add-container {
    padding: 50px 20px 0 100px;
    font-size: 14px;
    color: #505050;
}
.add-btn {
    padding: 50px 0;
}
</style>