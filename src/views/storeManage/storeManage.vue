<!-- 在线门店管理 (已通过)-->
<template>
    <div>
        <div class="main-content">
            <el-tabs
                v-model="activeName"
                style="padding:0px 20px"
                class="tabsStyle"
                @tab-click="handleClick"
            >
                <!-- 已通过 -->
                <el-tab-pane
                    :label="$t('storeManage.passed')+' ('+passedData+')'"
                    name="first"
                    :lazy="true"
                >
                    <el-row class="row-header" style="padding:20px 20px 10px">
                        <!-- 筛选 -->
                        <el-col>
                            <span class="font14" style="line-height:33px;overflow: hidden;float:left">
                                <div :title="$t('storeManage.caterType')" style="float:left;max-width:75px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{$t('storeManage.caterType')}}：</div>
                                <el-select
                                    v-model="foodTypeSelectData"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width:170px"
                                >
                                    <el-option
                                        v-for="item in foodTypeList"
                                        :label="item.dict"
                                        :key="item.id"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </span>
                            <span class="font14 left30" style="line-height:33px;overflow: hidden;float:left">
                                <div :title="$t('storeManage.city')" style="float:left;max-width:75px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{$t('storeManage.city')}}：</div>
                                <el-select
                                    v-model="citySelectData"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width:170px"
                                >
                                    <el-option
                                        v-for="item in cityList"
                                        :label="item.area_name"
                                        :key="item.area_id"
                                        :value="item.area_id"
                                    ></el-option>
                                </el-select>
                            </span>
                             <span class="font14 left30" style="line-height:33px;overflow: hidden;float:left">
                                <div title="门店类型" style="float:left;max-width:75px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">门店类型：</div>
                                <el-select
                                    v-model="dep_type"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width:170px"
                                >
                                    <el-option
                                        v-for="item in depTypeList"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </span>
                            <span class="font14 left30" style="line-height:33px;overflow: hidden;float:left">
                                <div :title="$t('storeManage.businessStatus')" style="float:left;max-width:75px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{$t('storeManage.businessStatus')}}：</div>
                                <el-select
                                    v-model="statusSelectData"
                                    :placeholder="$t('all')"
                                    size="small"
                                    style="width:170px"
                                >
                                    <el-option
                                        v-for="item in statusList"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </span>
                            <span class="font14" style="float:right">
                                <el-input
                                    v-model="inputData"
                                    :placeholder="$t('singleStore.storeName')"
                                    size="small"
                                    style="width:170px"
                                ></el-input>
                                <el-button
                                    class="left25 font14"
                                    type="primary"
                                    size="small"
                                    @click="searchClick"
                                >{{$t("select")}}</el-button>
                            </span>
                        </el-col>
                        <el-col class="top10">
                            <span class="font14 fontWeight" style="line-height:33px;overflow: hidden;float:left"><div :title="$t('storeManage.totalStores')" style="float:left;max-width:80px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{$t('storeManage.totalStores')}}</div><div style="float:left;">：{{allData}} {{$t('storeManage.home')}}</div></span>
                            <span class="font14 fontWeight" style="line-height:33px;overflow: hidden;margin-left:40px;float:left"><div :title="$t('storeManage.yesterdaySubmit')" style="float:left;max-width:80px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{$t('storeManage.yesterdaySubmit')}}</div><div style="float:left;">：{{lastDayData}} {{$t('storeManage.home')}}</div></span>
                        </el-col>
                        <!-- 表格 -->
                        <el-col class="top10">
                            <el-table
                                :data="tableData"
                                border
                                v-loading="dataLoading"
                                style="width: 100%"
                            >
                                <el-table-column
                                    type="index"
                                    :label="$t('singleStore.number')"
                                    width="70"
                                    align="center"
                                ></el-table-column>
                                <el-table-column :label="$t('storeManage.storeName')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.dept_name | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.storeNo')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.dep_id | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.housekeeperNum')" prop>
                                    <template slot-scope="scope">
                                        <router-link
                                            :to="{path:'/storeState',query:{housekeeperNum:scope.row.commit_phone}}"
                                            style="text-decoration: none;color: #2082ED;"
                                        >{{scope.row.commit_phone| empty}}</router-link> 
                                        <div style="color: #8C939B;">{{`(商户号：${scope.row.company_id})`}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.auditTime')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.update_time | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.reviewer')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.auditor | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="在线门店营业状态" prop>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.online_sts == '0'" :class="scope.row.online_sts =='0'?'activeColor':''">下线</span>
                                        <span v-else>{{statusList[scope.row.dep_sts].label| empty}}</span>
                                    </template>
                                </el-table-column>
                                    <el-table-column label="外卖门店营业状态" prop>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.delivery_online_sts == '0'" :class="scope.row.delivery_online_sts =='0'?'activeColor':''">下线</span>
                                        <span v-else-if="scope.row.delivery_sts == '0'">-</span>
                                        <span v-else>{{takeStatusList[scope.row.has_delivery]}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.operation')" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="lookClick(scope.row)"
                                            type="text"
                                            size="small"
                                            v-loading="dataLoading"
                                        >{{$t('storeManage.look')}}</el-button>
                                        <!-- :class="scope.row.online_sts==='0'?'activeColor':''" -->
                                        <el-button
                                            type="text"
                                            size="small"
                                            @click="onlinestsClick(scope.row)"
                                        >
                                        <!-- {{scope.row.online_sts==="0"? $t('storeManage.upOnline'):'下线'}} -->
                                        管理
                                        </el-button>
                                        <el-button type="text" size="small" @click="delClick(scope.row)">{{$t('storeManage.del')}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- 待审核 -->
                <el-tab-pane
                    :label="$t('storeManage.toBeReviewed')+' ('+toAuditData+')'"
                    name="second"
                    :lazy="true"
                >
                    <el-row class="row-header" style="padding:20px 20px 10px">
                        <!-- 筛选 -->
                        <el-col>
                            <span class="font14 fontWeight">{{$t('storeManage.totalStores')}}：{{allData}} {{$t('storeManage.home')}}</span>
                            <span class="font14 fontWeight left50">{{$t('storeManage.yesterdaySubmit')}}：{{lastDayData}} {{$t('storeManage.home')}}</span>
                            <span class="font14" style="float:right">
                                <el-input
                                    v-model="inputData"
                                    :placeholder="$t('singleStore.storeName')"
                                    size="small"
                                    style="width:170px"
                                ></el-input>
                                <el-button
                                    class="left25 font14"
                                    type="primary"
                                    size="small"
                                    @click="searchClick"
                                >{{$t("select")}}</el-button>
                            </span>
                        </el-col>
                        <!-- 表格 -->
                        <el-col class="top10">
                            <el-table
                                :data="tableData"
                                border
                                v-loading="dataLoading"
                                style="width: 100%"
                            >
                                <el-table-column
                                    type="index"
                                    :label="$t('singleStore.number')"
                                    width="70"
                                    align="center"
                                ></el-table-column>
                                <el-table-column :label="$t('storeManage.storeName')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.dept_name | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.housekeeperNum')" prop>
                                    <template slot-scope="scope">
                                            <router-link
                                            :to="{path:'/storeState',query:{housekeeperNum:scope.row.commit_phone}}"
                                            style="text-decoration: none;color: #2082ED;"
                                        >{{scope.row.commit_phone| empty}}</router-link> 
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.submitTime')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.update_time | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.operation')" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="lookClick(scope.row)"
                                            type="text"
                                            size="small"
                                        >{{$t('storeManage.look')}}</el-button>
                                        <el-button type="text" size="small" @click="checkPassClick(scope.row)">{{$t('storeManage.pass')}}</el-button>
                                        <el-button type="text" size="small" @click="checkNoPassClick(scope.row)">{{$t('storeManage.noPass')}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- 不通过 -->
                <el-tab-pane
                    :label="$t('storeManage.noPass')+'  ('+noPassData+')'"
                    name="third"
                    :lazy="true"
                >
                    <el-row class="row-header" style="padding:20px 20px 10px">
                        <!-- 筛选 -->
                        <el-col>
                            <span class="font14 fontWeight">{{$t('storeManage.totalStores')}}：{{allData}} {{$t('storeManage.home')}}</span>
                            <span class="font14 fontWeight left50">{{$t('storeManage.yesterdaySubmit')}}：{{lastDayData}} {{$t('storeManage.home')}}</span>
                            <span class="font14" style="float:right">
                                <el-input
                                    v-model="inputData"
                                    :placeholder="$t('singleStore.storeName')"
                                    size="small"
                                    style="width:170px"
                                ></el-input>
                                <el-button
                                    class="left25 font14"
                                    type="primary"
                                    size="small"
                                    @click="searchClick"
                                >{{$t("select")}}</el-button>
                            </span>
                        </el-col>
                        <!-- 表格 -->
                        <el-col class="top10">
                            <el-table
                                :data="tableData"
                                border
                                v-loading="dataLoading"
                                style="width: 100%"
                            >
                                <el-table-column
                                    type="index"
                                    :label="$t('singleStore.number')"
                                    width="70"
                                    align="center"
                                ></el-table-column>
                                <el-table-column :label="$t('storeManage.storeName')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.dept_name | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.housekeeperNum')" prop>
                                    <template slot-scope="scope">
                                        <router-link
                                            :to="{path:'/storeState',query:{housekeeperNum:scope.row.commit_phone}}"
                                            style="text-decoration: none;color: #2082ED;"
                                        >{{scope.row.commit_phone| empty}}</router-link> 
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.submitTime')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.update_time | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.reviewer')" prop>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.auditor | empty}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.reasonsFailure')" prop>
                                    <template slot-scope="scope">
                                        <el-tooltip :content="scope.row.note" placement="right-start" effect="light" :disabled="scope.row.note===''||scope.row.note===null||scope.row.reason===''?true:false">
                                            <span style="color:#FE5353;cursor: pointer;">{{scope.row.reason | empty}}</span>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('storeManage.operation')" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="lookClick(scope.row)"
                                            type="text"
                                            size="small"
                                        >{{$t('storeManage.look')}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <!-- 分页 -->
            <el-pagination
                class="page-pagination center"
                style="padding:20px 0px"
                background
                layout="prev, pager, next"
                :total="total"
                v-if="total > requestData.size"
                :page-size="requestData.size"
                :current-page="requestData.page"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
        <!-- 查看资质详情 弹窗 -->
        <el-dialog :title="$t('storeManage.inforQualifica')" :visible.sync="isDetailsDialog" width="60%">
            <div class="line" style="margin-left:0px"></div>
            <el-row class="top10" style="padding: 20px 10px 40px 10px;">
                <el-col :span="9">
                    <div style="border-right:1px solid #E6EAEF;height:480px">
                        <h3 class="font16">{{$t('storeManage.basicInfor')}}</h3>
                        <ul class="infor-list">
                            <li>
                                <span class="label" :title="$t('storeManage.storeName')">{{$t('storeManage.storeName')}}：</span>
                                <span class="infor">{{infoList.dept_name}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.businessAddress')">{{$t('storeManage.businessAddress')}}：</span>
                                <span class="infor">{{infoList.state_area_cn+infoList.cityAreaCn+infoList.dep_address}}</span>
                                    
                                
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.postalCode')">{{$t('storeManage.postalCode')}}：</span>
                                <span class="infor">{{infoList.postal_code}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.contacts')">{{$t('storeManage.contacts')}}：</span>
                                <span class="infor">{{infoList.contact}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.depPhone')">{{$t('storeManage.depPhone')}}：</span>
                                <span class="infor">{{infoList.dep_phone}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.email')">{{$t('storeManage.email')}}：</span>
                                <span class="infor">{{infoList.email}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.cityAreaCn')">{{$t('storeManage.cityAreaCn')}}：</span>
                                <span class="infor">{{infoList.city_area_cn}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.foodTypeCn')">{{$t('storeManage.foodTypeCn')}}：</span>
                                <span class="infor">{{infoList.food_type_cn}}</span>
                            </li>
                            <li>
                                <span class="label" :title="$t('storeManage.halal')">{{$t('storeManage.halal')}}：</span>
                                <span class="infor">{{infoList.halal==="0"?$t('no'):$t('yes')}}</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="left40">
                        <h3 class="font16">{{$t('storeManage.certificate')}}</h3>
                        <div class="license-pic">
                            <div class="left pic_img">
                                <el-image
                                    :lazy="true"
                                    :src="infoList.business_certificate_photo"
                                    :preview-src-list="srcPicList1"
                                ></el-image>
                            </div>
                            <div class="right">
                                <div class="pic_img">
                                    <el-image
                                        :lazy="true"
                                        :src="infoList.fa_front"
                                        :preview-src-list="srcPicList1"
                                    ></el-image>
                                </div>
                                <div class="pic_img top10">
                                    <el-image
                                        :lazy="true"
                                        :src="infoList.fa_back"
                                        :preview-src-list="srcPicList1"
                                    ></el-image>
                                </div>
                            </div>
                        </div>
                        <h3 class="font16 top30">{{$t('storeManage.photosOfBusiness')}}</h3>
                        <div class="place-pic">
                            <div class="pic_img">
                                <el-image
                                    :lazy="true"
                                    :src="infoList.applicant_dept_gate_photo"
                                    :preview-src-list="srcPicList2"
                                ></el-image>
                            </div>
                            <div class="left20 pic_img">
                                <el-image
                                    :lazy="true"
                                    :src="infoList.dept_inner_photo"
                                    :preview-src-list="srcPicList2"
                                ></el-image>
                            </div>
                        </div>
                    </div>
                </el-col>
                <div class="dialogClose">
                    <el-button type="primary" @click="isDetailsDialog = false">{{$t('storeManage.close')}}</el-button>
                </div>
            </el-row>
        </el-dialog>
        <!-- 原因，弹窗下拉数据 -->
        <el-dialog
            :title="reasonType==='0'?$t('storeManage.downOnline'):reasonType==='1'?$t('storeManage.del'):$t('storeManage.noPass')"
            :visible.sync="isOnlinestsDialog"
            width="20%"
            @close="handleClose"
        >
            <div class="line" style="margin-left:0px"></div>
            <el-row class="top10" style="padding:20px 0px">
                <el-col>
                    <span class="font14">
                        {{$t("reason")}}：
                        <el-select
                            v-model="reasonData"
                            :placeholder="$t('pleaseSelect')"
                            size="small"
                            style="width:78%"
                        >
                            <el-option
                                v-for="item in reasonSelectList"
                                :label="item.msg"
                                :key="item.id"
                                :value="item.msg"
                            ></el-option>
                        </el-select>
                    </span>
                    <div style="clear:both;"></div>
                    <!-- 备注 -->
                    <span class="font14" v-show="reasonType==='2'" style="line-height:100px">
                        {{$t('wallet.real_note')}}： 
                        <el-input type="textarea" v-model="remarksData" resize="none" rows="3"  style="width:78%;" :placeholder="$t('storeManage.remarksTipsText')"></el-input>
                    </span>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="font14"
                    type="primary"
                    style="width:100px"
                    @click="handleSure"
                >{{$t("confirmBtn")}}</el-button>
                <el-button
                    class="cancelBtn left10"
                    style="width:100px"
                    @click="isOnlinestsDialog = false"
                >{{$t("cancelBtn")}}</el-button>
            </div>
        </el-dialog>
        <!-- 确定 弹窗 -->
        <el-dialog
            :visible.sync="isSureDialog"
            width="23%"
            title="门店管理"
            @close="handleClose"
            >
            <hr>
            <!-- <div class="isSurecenter" v-show="reasonType==='0'||reasonType==='1'">{{$t('storeManage.confirmLaunch')}}"{{isdeptName}}"{{$t('storeManage.store')}}</div> -->
            <div class="isSurecenter" v-show="reasonType===''">{{$t('storeManage.sure')}}"{{isdeptName}}"{{$t('storeManage.storeApproved')}}</div>
            <el-form ref="form" label-width="100px" v-show="reasonType==='0'||reasonType==='1'">
                <el-form-item label="在线门店：">
                    <el-radio-group v-model="OnlineStore">
                    <el-radio label="1">上线</el-radio>
                    <el-radio label="0" :disabled="dep_stsType=='3' || onlinestsData.online_sts =='0'">下线</el-radio>
                    </el-radio-group>
                    <div v-show="OnlineStore == '0'">
                        <span>下线原因：</span>
                        <span v-if="onlinestsData.online_sts =='0'"><span v-if="onlinestsData.reason == ''">---</span><span v-else>{{onlinestsData.reason}}</span></span>
                        <span v-else-if="dep_stsType=='3'">门店停业</span>
                        
                        <el-select v-else
                            v-model="reasonData"
                            :placeholder="$t('pleaseSelect')"
                            size="small"
                        >
                            <el-option
                                v-for="item in reasonSelectList"
                                :label="item.msg"
                                :key="item.id"
                                :value="item.msg"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="外卖门店：" v-show="delivery_stsType == '1'">
                    <el-radio-group v-model="TakeoutShop">
                    <el-radio label="1">上线</el-radio>
                    <el-radio label="0" :disabled="hasType=='2' || onlinestsData.delivery_online_sts =='0'">下线</el-radio>
                    </el-radio-group>
                    <div v-show="TakeoutShop == '0'">
                         <span>下线原因：</span>
                        <span v-if="onlinestsData.delivery_online_sts =='0'"><span v-if="onlinestsData.delivery_offline_reason == ''">---</span><span v-else>{{onlinestsData.delivery_offline_reason}}</span></span>
                        <span v-else-if="hasType=='2'">门店停业</span>
                        <el-select v-else
                            v-model="delivery_offline_reason"
                            :placeholder="$t('pleaseSelect')"
                            size="small"
                        >
                            <el-option
                                v-for="item in reasonSelectList"
                                :label="item.msg"
                                :key="item.id"
                                :value="item.msg"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer center">
                <el-button
                    class="font14"
                    type="primary"
                    style="width:100px"
                    @click="handleSure"
                >{{$t("confirmBtn")}}</el-button>
                <el-button
                    class="cancelBtn left10"
                    style="width:100px"
                    @click="isSureDialog = false"
                >{{$t("cancelBtn")}}</el-button>
            </div>
       </el-dialog>
       
    </div>
</template>
<script>
export default {
    inject: ["reload"], //页面刷新
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {}
        }
    },
    name: "storeManage",
    data() {
        return {
            OnlineStore:'1',
            TakeoutShop:'1',
            activeName: "first", //默认展开第一项（已通过）
            dataLoading: false, //数据懒加载
            //点评门店审核状态数量
            passedData: 0, //已通过
            noPassData: 0, //不通过
            toAuditData: 0, //待审核
            lastDayData: 0, //昨日提交
            allData: 0, //门店总数
            //筛选 model
            foodTypeSelectData: "",
            citySelectData: "",
            statusSelectData: "",
            dep_type: "",
            inputData: "",
            //option
            foodTypeList: [],
            cityList: [],
            statusList: [
                { label: this.$t('all'), value: "" },
                { label: '营业', value: "1" },
                { label: '休息', value: "2" },
                { label: '停业', value: "3" }
            ],
            depTypeList:[
                { label: this.$t('all'), value: "" },
                { label: '在线门店', value: "2" },
                { label: '外卖门店', value: "1" },
            ],
            takeStatusList:{
                "":this.$t('all'),
                "0":'休息',
                "1":'营业',
                "2":'停业',},
            //table
            tableData: [],
            //点评门店审核列表 参数
            total: 0,
            requestData: {
                check_sts: "0", //0已通过,1待审核,2不通过
                food_type_id: 0,
                cityId: 0,
                dep_sts: "0",
                name_phone: "",
                page: 1,
                size: 10,
                token: "",
                dep_type:''
            },
            //点评门店审核信息查询
            infoList: {},
            infoData: {
                dep_id: "",
                token: ""
            },
            isDetailsDialog: false,  //查看弹窗
            //经营照片预览
            srcPicList1: [],
            srcPicList2: [],
            //上下线
            reasonData:"",
            delivery_offline_reason:'',
            reasonSelectList:[],
            onlinestsData: {
                dep_id: "",
                online_sts: "",
                reason: "",
                delivery_online_sts:'',
                delivery_offline_reason:'',
                token: ""
            },
            isOnlinestsDialog: false,//下线弹窗
            isSureDialog: false, // 确定
            isdeptName: "", //获取门店名称
            //删除
            delData:{
                dep_id: "",
                reason: "",
                token: ""
            },
            //原因 
            reasonType:"",
            //审核是否通过
            remarksData:"",
            checkPassData:{
                dep_id: "",
                check_sts:"",
                note:"",
                reason: "",
                token: ""
            },
            dep_stsType:'',
            delivery_stsType:'',
            hasType:''
           
        };
    },
    methods: {
        //tab 切换
        handleClick(tab, event) {
            this.requestData.check_sts = tab.index;
            this.inputData = "";
            // console.log(this.requestData);
            this.requestData.page = 1; //初始
            this.onlineList();
        },
        //查询筛选table
        searchClick() {
            this.requestData.page = 1; //初始
            this.onlineList();
        },
        //查看 资质详情 弹窗
        lookClick(row) {
            // console.log(row);
            this.infoData.dep_id = row.dep_id;
            this.isDetailsDialog = true;
            this.lookInfo();
        },
        //上下线
        onlinestsClick(row,value) {
            this.reasonType=value="0";
            this.onlinestsData.dep_id = row.dep_id;
            this.onlinestsData.online_sts = row.online_sts;
            this.onlinestsData.delivery_online_sts = row.delivery_online_sts;
            this.onlinestsData.reason = row.reason;
            this.onlinestsData.delivery_offline_reason = row.delivery_offline_reason;
            this.isdeptName = row.dept_name;
            this.dep_stsType = row.dep_sts;
            this.delivery_stsType = row.delivery_sts;
            this.hasType = row.has_delivery 
            // 在线门店营业状态为“停业”或“下线”，点击管理默认选中“下线”且不能点击（外卖门店同）
            if(row.dep_sts == '3' || this.onlinestsData.online_sts == '0'){
                this.OnlineStore = '0'
            }else{
                this.OnlineStore = '1'
            }
            if(row.has_delivery  == '2' || this.onlinestsData.delivery_online_sts == '0'){
                this.TakeoutShop = '0'
            }else{
                this.TakeoutShop = '1'
            }
            //判断当前状态
            if (row.online_sts==="0") {
                this.isSureDialog = true;
            } else {
                this.isSureDialog = true;
                // this.isOnlinestsDialog = true;
            }   
            this.reasonList(value);
        },
       
        //删除
        delClick(row,value){
            this.reasonType=value="1";
            this.delData.dep_id = row.dep_id;
            this.isOnlinestsDialog = true;
            this.reasonList(value);
        },
        //审核是否通过
        //审核不通过
        checkNoPassClick(row,value){
            this.checkPassData.dep_id = row.dep_id;
            this.checkPassData.check_sts = "2";
            this.reasonType=value="2";
            this.isOnlinestsDialog = true;
            this.reasonList(value);
        },
        //审核通过
        checkPassClick(row,value){
            this.checkPassData.dep_id = row.dep_id;
            this.checkPassData.check_sts = "3";
            this.isdeptName = row.dept_name;
            this.reasonType=value="";
            this.isSureDialog = true;
            this.reasonList(value);
        },
        handleClose() { //关闭 原因 弹窗
            this.reasonData = "";
            this.remarksData = "";
        },
        handleSure(value,checkSts,takeoutValue) { //确定 原因 弹窗
           let that =this;
           value = this.onlinestsData.online_sts;
           takeoutValue = this.onlinestsData.delivery_online_sts;
           checkSts=this.checkPassData.check_sts;
           //传个上线状态value 
            if (this.reasonType==="0") {
                // 外卖门店
                if(this.TakeoutShop === '1'){
                    this.isOnlinestsDialog = false;
                    takeoutValue="1"
                }else{
                    if(this.hasType != '2' && takeoutValue != '0'){
                        if(this.delivery_offline_reason==="" || this.delivery_offline_reason===null){
                        this.toast.error(this.$t('pleaseSelect'));
                        return false;
                    };
                    this.isOnlinestsDialog = false;
                    takeoutValue="0"
                    }
                    
                }
                this.onlinestsData.delivery_online_sts = takeoutValue;
                // 在线门店
                if(this.OnlineStore==="1"){
                    
                    this.isOnlinestsDialog = false;
                    value="1"
                    
                }else{
                    if(this.dep_stsType != '3' && value != '0'){
                        if(this.reasonData==="" || this.reasonData===null){
                        this.toast.error(this.$t('pleaseSelect'));
                        return false;
                    };
                    this.isOnlinestsDialog = false;
                    value="0"
                    }
                    
                }
                this.onlinestsData.online_sts = value;
                this.onLinests(value,takeoutValue);
           }else if (this.reasonType==="1"){
                //删除
                if(this.reasonData==="" || this.reasonData===null){
                    this.toast.error(this.$t('pleaseSelect'));
                    return false;
                };
                this.isOnlinestsDialog = false;
                this.del();
                
           }else{
               //审核是否通过
                if (checkSts==="2") {
                    if(this.reasonData==="" || this.reasonData===null){
                        this.toast.error(this.$t('pleaseSelect'));
                        return false;
                    };
                    this.isOnlinestsDialog = false;
                } else {
                    this.isSureDialog = false;
                }
                console.log(this.checkPassData);
                this.checkPass();
           }
    
           
        },
        // 分页
        handleCurrentChange(page) {
            this.requestData.page = page;
            this.onlineList();
        },
    
        /*
          ----接口数据处理---
        */

        //点评门店审核列表 分页
        onlineList() {
            this.dataLoading = true;
            let that = this;
            this.requestData.food_type_id = this.foodTypeSelectData; //餐饮类型
            this.requestData.cityId = this.citySelectData; //城市ID
            this.requestData.dep_sts = this.statusSelectData; //门店状态
            this.requestData.name_phone = this.inputData; //门店名称/手机号
            //门店类型（查询全部和在线门店都传空,1外卖门店）
            if(this.dep_type == '2'){
                this.requestData.dep_type = ''
            }else{
                this.requestData.dep_type = this.dep_type
            }
            console.log(this.requestData);
            this.request.onlineList(this.requestData, function(res) {
                if (res.code == "1") {
                    that.dataLoading = false;
                    const req_data = res.data;
                    console.log(req_data);
                    that.tableData = req_data.data;
                    that.total = req_data.all_count;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //点评门店审核状态数量
        statuScount() {
            let that = this;
            this.request.statuScount({}, function(res) {
                if (res.code == "1") {
                    const req_data = res.data;
                    // console.log(req_data);
                    that.passedData = req_data.passed;
                    that.noPassData = req_data.no_pass;
                    that.toAuditData = req_data.to_audit;
                    that.lastDayData = req_data.last_day;
                    that.allData = req_data.all;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取餐饮类型
        getFootType(lang) {
            if (this.foodTypeDic != null) {
                this.foodTypeList = this.foodTypeDic[lang];
            }
        },
        getFoodTypeOptions() {
            let that = this;
            this.request.getcateringtype({}, function(res) {
                if (res.code == "1") {
                    const req_data = res.data;
                    // console.log(req_data);
                    that.foodTypeDic = req_data;
                    that.getFootType(that.language);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取城市
        getAreainfo() {
            let that = this;
            this.request.getareainfo({}, function(res) {
                if (res.code == "1") {
                    const req_data = res.data;
                    console.log(req_data);
                    that.cityList = req_data;
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //点评门店审核信息查询
        lookInfo() {
            this.dataLoading = true;
            let that = this;
            this.request.lookInfo(this.infoData, function(res) {
                if (res.code == "1") {
                    that.dataLoading = false;
                    const req_data = res.data;
                    that.infoList = req_data;
                    console.log(that.infoList);
                    let businePhoto = that.infoList.business_certificate_photo;
                    let frontPhoto = that.infoList.fa_front;
                    let backPhoto = that.infoList.fa_back;

                    let deptPhoto = that.infoList.applicant_dept_gate_photo;
                    let innerPhoto = that.infoList.dept_inner_photo;
                    that.srcPicList1.push(businePhoto, frontPhoto, backPhoto);
                    that.srcPicList2.push(deptPhoto, innerPhoto);
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //上下线
        onLinests(value,takeoutValue) {
            let that = this;
            this.onlinestsData.reason = this.reasonData;
             this.onlinestsData.delivery_offline_reason = this.delivery_offline_reason;
            console.log(this.onlinestsData);
            this.request.onLinests(this.onlinestsData, function(res) {
                if (res.code == "1") {
                    that.onlinestsData.online_sts=value;
                    that.onlinestsData.delivery_online_sts=takeoutValue;
                    if (value==="0" || takeoutValue =='0') {
                        that.toast.success(that.$t('offlineSucc'));
                    } else {
                        that.toast.success(that.$t('succLaunch'))
                    }
                    that.reload(); //页面刷新
                    
                } else {
                    that.toast.error(res.msg);
                }
            });
           
        },
        //删除
        del() {
            let that = this;
            this.delData.reason = this.reasonData;
            console.log(this.delData);
            this.request.del(this.delData, function(res) {
                if (res.code == "1") {
                    that.toast.success(that.$t("delSucc"));
                    that.reload(); //页面刷新
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        // 审核是否通过
        checkPass() {
            let that = this;
            this.checkPassData.reason = this.reasonData;
            this.checkPassData.note = this.remarksData;
            console.log(this.checkPassData);
            this.request.checkPass(this.checkPassData, function(res) {
                if (res.code == "1") {
                    that.toast.success(that.$t('storeManage.operationSucc'));
                    that.reload(); //页面刷新
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        //获取原因 option
        reasonList(value) {
            let that = this;
            this.request.reasonList({reason_type:value}, function(res) {
                if (res.code == "1") {
                    const req_data = res.data;
                    that.reasonSelectList = req_data;
                    console.log(value)
                } else {
                    that.toast.error(res.msg);
                }
            });
        },

    },
    created() {
        this.onlineList();
        this.statuScount();
        this.getFoodTypeOptions();
        this.getAreainfo();
        
    },
    watch: {
        language: {
            handler(newVal, oldVal) {
                this.getFootType(newVal);
            }
        }
        
    }
};
</script>
<style scoped>
.activeColor{
    color: #FE5353 !important;
}
.infor-list {
    padding: 0;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
}
.infor-list li {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    font-size: 14px;
}
.infor-list li .label {
    text-align: right;
    float: left;
    min-width: 75px;
    max-width: 85px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.infor-list li .infor {
    text-align: left;
    width: 70%;
    float: left;
    margin-left: 10px;
}
.license-pic {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
}
.license-pic .left {
    float: left;
    width: 45%;
    height: 182px;
    border-radius: 8px;
    border: 1px solid #d8d8d8;
    overflow: hidden;
}
.license-pic .right {
    width: 23%;
    margin-left: 20px;
    float: left;
    overflow: hidden;
}
.license-pic .right .pic_img {
    width: 99%;
    height: 85px;
    border-radius: 8px;
    border: 1px solid #d8d8d8;
    overflow: hidden;
}
.place-pic {
    margin-top: 20px;
    overflow: hidden;
}
.place-pic .pic_img {
    float: left;
    overflow: hidden;
    width: 45%;
    height: 182px;
    border-radius: 8px;
    border: 1px solid #d8d8d8;
}
.pic_img,
.pic_img .el-image {
    display: block;
    width: 100%;
    height: 100%;
}
.dialogClose {
    text-align: center;
    margin-top: 40px;
}
.dialogClose button {
    margin-top: 40px;
    width: 100px;
    height: 36px;
    font-size: 14px;
}
.isSurecenter{
   text-align:center;
   color:#232426;
   font-weight:bold;
   font-size:14px;
   margin: 30px auto;
}

</style>