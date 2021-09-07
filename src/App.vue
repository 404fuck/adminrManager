<template>
    <div id="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    //页面刷新
    provide() {
        return {
            reload: this.reload,
        };
    },
    data() {
        return {
            isRouterAlive: true,
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    created() {
        if (this.language.length <= 0) {
            this.$store.dispatch("setLanguage", "en_US");
        }
    },
};
</script>

<style>

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #f6f8fa;
    font-family: "Microsoft YaHei", "微软雅黑" !important;
}
#app {
    width: 100%;
    height: 100%;
    /* 仅适用于Mac OS X / macOS （抗锯齿，页面更加清晰）*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.main-content {
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    margin: 22px;
    min-height: 835px;
}
/* 自定义滚动条 */
::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(144,147,153,.3);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb:hover{
    background: rgba(144,147,153,.4); 
    
}
input:-webkit-autofill {
      box-shadow: 0 0 1000px 1000px white inset !important;
}
input{
    font-family: "Microsoft YaHei";
}
.lineHeight20 {
    line-height: 20px;
}
/* tabs样式 */
.tabsStyle .el-tabs__item.is-active {
    color: #30cfb7;
    font-size: 16px;
    font-weight: bold;
}
.tabsStyle .el-tabs__item {
    color: #303336;
    font-size: 16px;
}
.tabsStyle .el-tabs__active-bar {
    background-color: #30cfb7;
    height: 4px;
}
.tabsStyle .el-tabs__nav-scroll {
    line-height: 60px;
}
/* 新建推送 */
.addMessageStyle .el-textarea__inner {
    width: 350px !important;
}
.el-upload {
    width: 100% !important;
    height: 100% !important;
}
.el-menu {
    border: none !important;
}
.no-margin-padding {
    margin: 0;
    padding: 0;
}
.avatar {
    object-fit: cover;
}
/* 设置滚动条隐藏但可以滚动 */
.el-aside::-webkit-scrollbar {
    display: none !important;
}
.el-row{
    width: 100%;
}
.el-textarea__inner{
    font-family: "Microsoft YaHei";
    box-shadow:none;
    outline: none;
    resize: none; 
    -webkit-appearance: none;
}
.note-textarea .el-textarea__inner {
    font-size: 14px;
    height: 130px;
}
.cursorInput .el-input__inner{
    cursor: pointer;
}
/* 定义全局公用样式 */
.el-table--border td,
.el-table--border th {
    border-right: none !important;
}
.el-table th,
.el-table td {
    text-align: center !important;
}
.el-table th {
    background: #f4f7fd !important;
    color: #232426 !important;
}
.cell {
    font-size: 12px;
}
.titleRate .el-rate {
    display: inline-block;
}
.el-table__empty-block {
    margin-left: -30px !important;
}
/* select字体 */
.el-select-dropdown__item.selected {
    color: #30cfb7 !important;
}
.el-table__header-wrapper,
.el-table__footer-wrapper {
    height: 46px;
    line-height: 20px;
}
.el-select .el-input.is-disabled .el-input__inner {
    height: 32px !important;
}

.el-button--text {
    color: #2082ed !important;
}
.size-div .el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5 !important;
}
.size-div .el-table::before {
    height: 0px !important;
}
.size-div .el-table__fixed::before,
.el-table__fixed-right::before {
    height: 0px !important;
}
.size-div .el-button--text {
    color: #2082ed !important;
}

/* 关联菜品 */
.el-breadcrumb {
    margin-left: 20px;
    font-size: 12px;
    position: relative;
}
.line {
    background-color: #eeeeee;
    height: 1px;
    margin-left: 30px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: white !important;
    border: 1px #30cfb7 solid !important;
    color: #30cfb7 !important;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    background: white !important;
    border: 1px #d3d9e2 solid !important;
    color: #303336 !important;
}
.el-dialog__body {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
.el-form-item__label {
    color: #232426 !important;
    font-weight: bold !important;
}
.el-dialog__title {
    color: #393939 !important;
    font-weight: bold !important;
}
.el-dropdown-menu__item {
    color: #888a8d !important;
}
.el-dropdown-menu__item .active {
    color: red !important;
}
.el-dropdown-menu__item.is-disabled {
    color: #30cfb7 !important;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #30cfb7 !important;
    border-color: #30cfb7 !important;
}
.el-submenu__title {
    padding: 0px !important;
    color: #393939 !important;
}
.el-submenu__title:hover {
    /* color: white !important; */
    background: none !important;
}
.el-submenu [class^="el-icon-"] {
    margin-left: -20px !important;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #303336 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #30cfb7;
    border-color: #30cfb7;
}
.el-slider__runway.disabled .el-slider__bar {
    background: #30cfb7 !important;
}
.el-menu-item.is-active {
    color: #ffffff !important;
    background: #30cfb7 !important;
    font-size: 14px !important;
    border-radius: 100px 0px 0px 100px !important;
    /* margin-left: 20px !important; */
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #30cfb7 !important;
    background: #30cfb7 !important;
}
.el-radio__input.is-disabled .el-radio__inner {
    border-color: #dadce0 !important;
    background: #f5f7fa !important;
}

.el-menu-item {
    /* margin-left: 20px !important; */
    text-align: left;
    color: #303336 !important;
}
.el-menu-item,
.el-submenu__title {
    border-radius: 100px 0px 0px 100px !important;
}
.el-submenu {
    text-align: left;
}
.el-submenu .el-menu-item-group .el-menu-item {
    padding-left: 80px !important;
}
.el-menu-item:hover,
.el-submenu__title:focus {
    outline: none !important;
    color: #ffffff !important;
    background: #30cfb7 !important;
    font-size: 14px !important;
    border-radius: 100px 0px 0px 100px !important;
    /* margin-left: 20px !important; */
}
.el-menu-item:hover {
    color: #ffffff !important;
    background: #30cfb7 !important;
    font-size: 14px !important;
    border-radius: 100px 0px 0px 100px !important;
    /* margin-left: 20px !important; */
}
.el-switch__label.is-active {
    color: #232426 !important;
}
.el-switch__label {
    color: #8c939b !important;
}
.recomStyle .el-radio__input.is-checked + .el-radio__label {
    color: #8c939b !important;
}
.recomStyle .el-radio__label {
    font-weight: bold !important;
    color: #8c939b !important;
}
.el-radio__input.is-checked + .el-radio__label {
    color: #232426;
}
.el-radio__input.is-focus .el-radio__inner {
    border-color: #8c939b;
}
.el-radio__inner:hover {
    border-color: #2082ed;
}

/* UI-Btn */
/* 新增 */
.themeAddBtn {
    background: #2082ed;
    color: white;
    border-color: #2082ed;
    font-size: 14px;
}
.themeAddBtn:hover {
    background: #2082ed;
    color: white;
    border-color: #2082ed;
    font-size: 14px;
}

/* 取消 */
.cancelBtn {
    background: #fff;
    border-color: #30cfb7;
    color: #30cfb7;
    font-size: 14px;
}
.cancelBtn:hover {
    background: #fff;
    border-color: #30cfb7;
    color: #30cfb7;
    font-size: 14px;
}
/* 上传 */
.updataBtn {
    background: rgba(48, 207, 183, 0.1);
    border-color: #30cfb7;
    color: #30cfb7;
    font-size: 14px;
}
.updataBtn:hover {
    border-color: #30cfb7;
    background: rgba(48, 207, 183, 0.1);
    color: #30cfb7;
    font-size: 14px;
}
/* 重置 */
.clearBtn {
    background-color: rgba(48, 207, 183, 0.1);
    border-color: #30cfb7;
    color: #30cfb7;
    font-size: 14px;
}
.clearBtn:hover {
    background-color: rgba(48, 207, 183, 0.1);
    border-color: #30cfb7;
    color: #30cfb7;
    font-size: 14px;
}

.title-line {
    border-left: 4px #30cfb7 solid;
    padding-left: 10px;
    color: #393939;
    font-size: 16px;
    font-weight: bold;
}

hr {
    width: 98%;
    border: none;
    background: #eff2f3;
    height: 1px;
    margin-top: 20px;
}

.fontWeight {
    font-weight: bold;
}
.padding0 {
    padding: 0px;
}

/* font-size */
.font18 {
    font-size: 18px;
}
.font20 {
    font-size: 20px;
}
.font22 {
    font-size: 22px;
}
.font12 {
    font-size: 12px;
}

.font14 {
    font-size: 14px;
}

.font16 {
    font-size: 16px;
}
.font30 {
    font-size: 30px;
}

.fontWeight {
    font-weight: bold;
}

/* 登录注册页样式 */
.login-container {
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100%;
    background: url("../src/static/images/loginBg.png") no-repeat center;
    background-size: cover;
    overflow: hidden;
}
.container-right {
    position: fixed;
    top: 180px;
    right: 250px;
    z-index: 999;
    background: #fff;
    width: 450px;
    height: 580px;
    box-shadow: 42px 38px 37px rgba(221, 221, 221, 0.5);
}
.container-left {
    position: fixed;
    top: 60px;
    left: 70px;
    z-index: 999;
}
.title-company {
    font-size: 14px;
    color: #30cfb7;
    margin-right: 35px;
    text-decoration: none;
}

.box-card {
    width: 529px;
}

.checkbox-text {
    font-size: 14px;
}

.login-main {
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #fff;
}

.right-title {
    float: right;
    line-height: 39px;
    text-align: center;
    margin-right: 18px;
    display: flex;
    align-items: center;
}

/* float */
.fl {
    float: left;
}
.fr {
    float: right;
}
/* text-align */
.center {
    text-align: center;
}
.right {
    text-align: right;
}
.left {
    text-align: left;
}

/* margin */
.top5 {
    margin-top: 5px;
}
.top10 {
    margin-top: 10px;
}
.top15 {
    margin-top: 15px;
}
.top20 {
    margin-top: 20px;
}
.top30 {
    margin-top: 30px;
}
.top40 {
    margin-top: 40px;
}
.top50 {
    margin-top: 50px;
}
.right10 {
    margin-right: 10px;
}
.left20 {
    margin-left: 20px;
}
.left25 {
    margin-left: 25px;
}
.left10 {
    margin-left: 10px;
}
.left8 {
    margin-left: 8px;
}
.left5 {
    margin-left: 5px;
}
.left15 {
    margin-left: 15px;
}
.left30 {
    margin-left: 30px;
}
.left40 {
    margin-left: 40px;
}
.left50 {
    margin-left: 50px;
}
.left110 {
    margin-left: 110px;
}
.left130 {
    margin-left: 130px;
}
.padding20 {
    padding: 20px;
}
/* 公共头部标题 */
.com-header {
	position: relative;
    height: 70px;
	line-height: 70px;
	margin: 0 18px;
	font-size: 16px;
    color: #393939;
    font-weight: bold;
    border-bottom: 1px solid #e6eaef;
}
.com-header .leftLine{
	position: absolute;
	left: -18px;
	top: 25px;
	width: 4px;
	height: 20px;
	background: #30cfb7;
}
.settingStyle .el-form-item__content {
    margin-left: 0px !important;
}
.settingStyle .inputStyle .el-input__inner {
    border: none !important;
}
.settingStyle .settle .el-form-item__content {
    display: inline-block !important;
}
.settingStyle .el-input-group__append {
    background: none;
    border-left: none;
    font-weight: bold;
    color: #232426;
}
.settingStyle .inpuText .el-input__inner {
    border-right: none !important;
}

.settingStyle .el-form-item__label {
    text-align: left !important;
    float: none;
}
.storeListStyle .el-image__inner {
    object-fit: cover;
}
.el-table_5_column_37 {
    border-width: 5px;
}
.el-image__inner {
    object-fit: cover;
}
.el-image__error {
    font-size: 12px !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}
.el-image-viewer__img {
    max-height: 65% !important;
    max-width: 65% !important;
}
.el-image-viewer__close {
    color: white !important;
}
.el-tooltip__popper.is-light {
    color: #606266 !important;
    border: 1px solid #30cfb7 !important;
}
/* 上传图片文件适配 */
.avatar-uploader .el-upload-list {
    position: absolute;
    top: -2px;
}
/* 多选框 */
.checkbox-group .el-checkbox{
    margin-top: 30px;
    width: 20%;
    position: relative;
}
.checkbox-group .el-checkbox .el-checkbox__label{
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 95%;
}
/* 上传文件 */
.addUpdate .el-upload{
    text-align: left;
}
</style>