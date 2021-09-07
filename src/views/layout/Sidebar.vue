<template>
    <div class="sidebarStyle">
        
        <el-row style="margin-top: 70px; margin-left: -30px">
            <div class="imgBox">
                <img
                    src="../../static/images/logo1.png"
                    alt
                    width="120"
                    style="
                        position: relative;
                        top: 50%;
                        transform: translatey(-50%);
                    "
                />
            </div>
            <p style="color: #232426; font-weight: bold; font-size: 18px">
                {{ $t("layout.pingtaifuwu") }}
            </p>
        </el-row>
        <el-menu
            :default-active="$route.path"
            :router="true"
            class="el-menu-vertical-demo"
            background-color="#F1F4FA"
            text-color="#899599"
            :unique-opened="true"
            active-text-color="#1968BD"
        >   
            <el-menu-item
                v-if="String(isUser)=='true'"
                index="/storeState"
                style="margin-top: 40px; padding-left: 80px"
            >
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.storeGL")
                }}</span>
            </el-menu-item>
            <el-menu-item index="/storeManage" style="padding-left: 80px" v-if="String(isUser)=='true'">
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.storeManage")
                }}</span>
            </el-menu-item>
            <el-menu-item index="/userManage" style="padding-left: 80px" v-if="String(isUser)=='true'">
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.userGL")
                }}</span>
            </el-menu-item>
            <el-menu-item index="/offlineManage" style="padding-left: 80px" v-if="String(isUser)=='true'">
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.storeJS")
                }}</span>
            </el-menu-item>
            <el-menu-item index="/joinUsManage" style="padding-left: 80px" v-if="String(isUser)=='true'">
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.hezuoGL")
                }}</span>
            </el-menu-item>

            <el-menu-item index="/feedbackManage" style="padding-left: 80px" v-if="String(isUser)=='true'">
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.feedbackGL")
                }}</span>
            </el-menu-item>
            <el-menu-item index="/documentManage" style="padding-left: 80px" v-if="String(isUser)=='true'">
                <span slot="title" class="fontWeight spanStyle">{{
                    $t("layout.docGL")
                }}</span>
            </el-menu-item>
			<el-menu-item index="/systemUpdate" style="padding-left: 80px" v-if="String(isSystem)=='true'">
                <span slot="title" class="fontWeight spanStyle">系统更新</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: "Sidebar",
    computed:{
        isUser(){
            return this.$store.getters.isUser;
        },
        isSystem(){
            return this.$store.getters.isSystem;
        }
    },
    data() {
        return {};
    },
    created() {
        // console.log(typeof(this.isUser)); String
    },
};
</script>
<style scoped>
.el-menu-item.is-active i {
    color: white !important;
}
.el-menu-item:hover i {
    color: white !important;
}
.imgBox {
    width: 130px;
    height: 130px;
    text-align: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>