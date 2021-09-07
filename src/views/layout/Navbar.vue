<template>
    <div class="no-margin-padding head-root">
        <el-row>
            <el-col class="right" style="padding-right: 40px">
                <span class="el-dropdown-link" style="color: #303336">
                    <el-dropdown trigger="click" @command="handleDropdown">
                        <span class="el-dropdown-link" style="color: #303336">
                            {{ curentUser.name }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <span
                                style="
                                    padding-left: 10px;
                                    color: #303336;
                                    font-size: 14px;
                                "
                                >{{ $t("systemLang") }}</span
                            >
                            <el-dropdown-item
                                command="zh_CN"
                                :disabled="language === 'zh_CN'"
                                class="text-style"
                                >中文</el-dropdown-item
                            >
                            <el-dropdown-item
                                command="en_US"
                                :disabled="language === 'en_US'"
                                class="text-style"
                                >English</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>

                <span style="padding: 0px 10px">|</span>
                <span style="color: #303336; cursor: pointer" @click="loginout">
                    <img
                        src="../../static/images/sign_out.png"
                        alt
                        width="14"
                        style="position: relative; top: 3px"
                    />
                    {{ $t("layout.exitLogin") }}
                </span>
            </el-col>
        </el-row>
        <span v-if="systemNotiCount > 0" class="newMessage">{{
            systemNotiCount
        }}</span>
        <el-popover
            ref="popover5"
            placement="bottom"
            width="160"
            v-model="loginoutShow"
        >
            <p>{{ $t("layout.shifoujixu") }}</p>
            <div style="text-align: right; margin: 0">
                <el-button
                    size="mini"
                    type="text"
                    @click="loginoutShow = false"
                    >{{ $t("cancelBtn") }}</el-button
                >
                <el-button
                    type="primary"
                    size="mini"
                    @click="loginout"
                    :loading="loginoutLoading"
                    >{{ $t("confirmBtn") }}</el-button
                >
            </div>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: "nav-bar",
    components: {},
    data() {
        return {
            selectEdit: false,
            store_value: "",
            shows: "",
            loginoutShow: false,
            loginoutLoading: false,

            timer: null,
            systemNotiCount: 0,
        };
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        curentUser() {
            return this.$store.getters.user;
        },
        token() {
            return this.$store.getters.token;
        },
    },
    methods: {
        open(val) {
            this.changeDeptguide(val);
        },
        handleSetLanguage(lang) {
            this.$store.dispatch("setLanguage", lang);
            this.$i18n.locale = lang;
        },
        message() {
            this.$router.replace("/noticeManage");
        },
        handleDropdown(commands) {
            if (commands == "loginout") {
                this.loginout();
            } else if (commands == "zh_CN" || commands == "en_US") {
                this.handleSetLanguage(commands);
            } else if (commands == "settings") {
                // this.toast.info('账户设置')
                this.$router.replace("/user");
            } else {
                this.changeDeptguide(commands);
            }
        },
        loginout() {
            let that = this;

            that.loginoutShow = false;
            that.loginoutLoading = false;

            that.$router.replace("/login");
            that.stringutils.clearData();
        },
    },
    created() {},
    destroyed() {},
    watch: {
        $route: {
            handler: function (val, oldVal) {
                this.selectEdit = val.meta.selectEdit;
            },
            // 深度观察监听
            deep: true,
        },
    },
};
</script>
<style scoped>
.active {
    color: red;
}
.newMessage {
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 178px;
    background: red;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 10px;
    color: white;
    text-align: center;
}
.head-root {
    position: relative;
}

.left-logo {
    position: absolute;
    background-color: #33ccf5;
    text-align: center;
    line-height: 40px;
    width: 174px;
    color: #fff;
    display: block;
    align-content: center;
}

.left-logo-img {
    width: 86px;
    height: 30px;
    margin-top: 5px;
}

.center-title {
    padding-left: 10px;
}

.right-title {
    position: relative;
    margin-left: 174px;
    margin-right: 0px;
    background-color: #fff;
    line-height: 50px;
    height: 50px;
    color: #000;
}

.select-store {
    color: #666666;
    font-size: 12px;
    float: left;
    line-height: 50px;
    text-align: center;
    margin-left: 18px;
}

.store {
    font-size: 16px;
}

.el-option {
    color: #666666;
    float: left;
    size: mini;
    line-height: 39px;
    text-align: center;
    margin-left: 18px;
    display: flex;
    align-items: center;
}

.store-select {
    margin-left: 15px;
    width: 180px;
    color: #8e8d8d;
    height: 32px;
}

.right-logo {
    /* float: right; */
    line-height: 39px;
    text-align: center;
    /* margin-right: 18px; */
    display: inline-block;

    align-items: center;
}

.international {
    vertical-align: top;
}

.right-menu-item {
    display: inline-block;
    margin: 0 8px;
}

.right-logo img {
    align-items: center;
    margin-right: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #768387;
    font-size: 12px;
}
</style>