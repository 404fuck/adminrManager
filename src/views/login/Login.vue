<!--
 * @Author: zzt
 * @Date: 2021-03-04 20:15:32
 * @LastEditTime: 2021-04-30 12:05:48
 * @LastEditors: Please set LastEditors
 * @Description: 登录页
 * @FilePath: \sjoyAdminrManager\src\views\login\Login.vue
-->
<template>
    <el-container class="login-container">
        <img class="container-left" src="../../static/images/loginLogo.png" />
        <div class="container-right">
            <div class="login-main">
                <div class="container-right-header">
                    <span class="right-title">
						<a class="title-company" :href="$store.getters.language =='zh_CN'?'http://www.mjoyapp.com/cn/index.php':'http://www.mjoyapp.com/en/index.php'" target="_blank">
                            {{ $t("login.website") }}
                        </a>
                        <selectLang></selectLang>
                    </span>
                </div>
            </div>
            <div class="container-tabs">
                <el-link
                    :underline="false"
                    @click="clickLeft"
                >
                    <span
					    class="tabs-unactive"
                        >MJOY平台管理系统</span
                    >
                </el-link>
                <!-- <el-link :underline="false"
                 @click="clickRight"
                 style="padding-left:15px">
          <span :class="curentabs==1?'tabs-active':'tabs-unactive'">手机验证登陆</span>
        </el-link>-->
            </div>

            <div class="container-body">
                <el-input
                    :placeholder="$t('login.phonePH')"
                    v-model.trim="phone"
                    class="input-with-select widthStyle font16"
                    size="large"
                >
                    <!-- <el-select v-model.trim="selectPhone" slot="prepend" class="text-style">
            <el-option label="+86" value="1" class="text-style"></el-option>
            <el-option label="+87" value="2" class="text-style"></el-option>
            <el-option label="+88" value="3" class="text-style"></el-option>
          </el-select>-->
                </el-input>

                <el-input
                    v-show="curentabs == 0"
                    class="pass widthStyle font16"
                    :placeholder="$t('login.pwdPH')"
                    v-model.trim="pass"
                    show-password
                    size="large"
                    @keyup.enter.native="handleLogin"
                    style="border-right: 1px solid #dcdfe6; border-radius: 4px"
                ></el-input>
                <el-input
                    v-show="curentabs == 1"
                    class="pass widthStyle font16"
                    :placeholder="$t('login.code')"
                    v-model.trim="code"
                    clearable
                    size="large"
                    @keyup.enter.native="handleLogin"
                >
                    <el-button
                        slot="append"
                        @click="sendCode"
                        :disabled="!show"
                    >
                        <span class="checkbox-text font16" v-show="show">{{
                            $t("login.getCode")
                        }}</span>
                        <span class="checkbox-text" v-show="!show"
                            >{{ count }} s</span
                        >
                    </el-button>
                </el-input>
                <el-row class="widthStyle right top10">
                    <!-- <el-link type="info"
                   @click="resetPass">
            <span class="font12"
                  style="color:#808080">忘记密码</span>
          </el-link>-->
                </el-row>
                <!-- <div class="login-btn">
          
          <el-checkbox class="checkbox" v-model.trim="checked"><span class="checkbox-text">记住登录</span></el-checkbox>
          <el-button class="btn" type="primary" round size="mini" @click="handleLogin"> </el-button>
        </div>-->

                <div class="login-bottom" style="margin-top: 50px">
                    <el-row class="widthStyle">
                        <el-button
                            type="primary"
                            class="primary loginBtn"
                            @click="handleLogin"
                            style="height: 50px"
                            :loading="loginLoading"
                        >
                            <span class="font16">{{ $t("login.login") }}</span>
                        </el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </el-container>
</template>


<script>
import selectLang from "./selectLang";
export default {
    components: { selectLang },
    data() {
        return {
            curentabs: 0,
            phone: "",
            pass: "",
            code: "",
            select: "",
            selectPhone: "+86",
            checked: false,
            show: true,
            count: 0,
            timer: null,
            loginLoading: false,
        };
    },
    methods: {
        clickLeft() {
            this.curentabs = 0;
        },
        clickRight() {
            this.curentabs = 1;
        },
        resetPass() {
            this.$router.push({
                path: "/resetPass",
            });
        },
        regist() {
            this.$router.push({
                path: "/regist",
            });
        },

        handleLogin() {
            if (this.curentabs == 0) {
                this.handlePassLogin();
            } else {
                this.handlePhoneLogin();
            }
        },
        //账号密码登入
        handlePassLogin() {
            //验证数据
            if (this.stringutils.isEmpty(this.phone)) {
                this.toast.warning(this.$t("login.phonePH"));
                return;
            }
            if (this.stringutils.isEmpty(this.pass)) {
                this.toast.warning(this.$t("login.inputPWD"));
                return;
            }

            //提交数据
            let data = {
                phone: this.phone,
                pwd: this.pass,
            };

            let that = this;
            this.loginLoading = true;
            this.request.pwdlogin(data, function (res) {
                that.loginLoading = false;
                if (res.code == "1") {
                    let isUserFlag = false;
                    let res_data = res.data;
                    let authOrities = res_data.authorities;
                    that.$store.dispatch("setToken", res_data.token);
                    that.$store.dispatch("setUser", {
                        name: res_data.username,
                        logo: res_data.logo,
                    });
                    for (let i in authOrities) {
                        if (authOrities[i].authority=="ROLE_PLATFORM_UPGRADE") {
                            that.$store.dispatch("setIsSystem", true);
                            break;
                        }
                        if (authOrities[i].authority=="ROLE_PLATFORM_USER") {
                            isUserFlag = true;
                            that.$store.dispatch("setIsUser", true);
                            break;
                        }
                    }
                    if( isUserFlag){
                        that.$router.push({
                            //你需要接受路由的参数再跳转
                            path: "/storeState",
                        });

                    }else{
                        that.$router.push({
                            //你需要接受路由的参数再跳转
                            path: "/systemUpdate",
                        });
                    }
                   
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        // 手机号验证码登入 （暂未开放）
        handlePhoneLogin() {
            //验证数据
            if (!this.stringutils.isMobileNumber(this.phone)) {
                return;
            }
            if (this.stringutils.isEmpty(this.code)) {
                this.toast.warning(this.$t("login.writeCode"));
                return;
            }

            //提交数据
            let data = {
                phone: this.phone,
                verifyCode: this.code,
            };
            let that = this;
            this.loginLoading = true;
            this.request.phonelogin(data, function (res) {
                that.loginLoading = false;
                if (res.code == "1") {
                    that.toast.success(that.$t("login.loginSuccess"));

                    if (
                        res.data.data != null &&
                        res.data.data[0].guide_status == 0
                    ) {
                        that.$router.push({
                            //你需要接受路由的参数再跳转
                            path: "/reportManage",
                        });
                    } else {
                        that.$router.push({
                            //你需要接受路由的参数再跳转
                            path: "/storeState",
                        });
                    }
                } else {
                    that.toast.error(res.msg);
                }
            });
        },
        setUser(user) {
            this.$store.dispatch("setUser", user);
        },
        sendCode() {
            if (!this.stringutils.isMobileNumber(this.phone)) {
                return;
            }
            // 验证码倒计时
            if (!this.timer) {
                let data = { phone: this.phone };
                let that = this;
                this.request.sendSmsPhone(data, function (res) {
                    if (res.code == "1") {
                        that.toast.success(that.$t("login.sendSuccess"));
                        that.count = 60;
                        that.show = false;
                        that.timer = setInterval(() => {
                            if (that.count > 0 && that.count <= 60) {
                                that.count--;
                            } else {
                                that.show = true;
                                clearInterval(that.timer);
                                that.timer = null;
                            }
                        }, 1000);
                    } else {
                        that.toast.error(res.msg);
                    }
                });
            }
        },
    },
    created() {
        this.$store.dispatch("setIsSystem", false);
        this.$store.dispatch("setIsUser", false);
    },
    mounted() {},
};
</script>
<style scoped>
.checkbox-text {
    font-size: 16px;
}
.widthStyle {
    width: 365px;
}
.loginBtn {
    width: 100% !important;
    background: #30cfb7 !important;
    border-color: #30cfb7 !important;
}
.registBtn {
    width: 100% !important;
    background: #ffffff !important;
    border-color: #30cfb7 !important;
}

.text-style {
    color: #768387;
    font-size: 14px;
}

.container-tabs {
    margin-top: 80px;
    line-height: 40px;
}

.container-body {
    width: 60%;
    margin: 60px 43px;
}

.tabs-active {
    font-size: 22px;
    color: #30CFB7;
}
.tabs-unactive {
	font-size: 22px;
    color: #333;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.pass {
    margin-top: 25px;
}
</style>