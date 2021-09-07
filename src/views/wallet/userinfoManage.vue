<template>
  <div>
    <div class="main-content">
      <el-tabs v-model="activeName" style="padding:0px 20px 0px 20px" class="tabsStyle">
        <el-tab-pane :label="$t('wallet.platformWallet')" name="first">
          <platformWalle></platformWalle>
        </el-tab-pane>
        <el-tab-pane :label="$t('wallet.shopWallet')" name="second">
          <shopWalle></shopWalle>
        </el-tab-pane>
        <el-tab-pane :label="$t('wallet.userWallet')" name="three">
          <userWalle></userWalle>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import platformWalle from "./platformWalle";
import shopWalle from "./shopWalle";
import userWalle from "./userWalle";
export default {
  components: {
    platformWalle,
    shopWalle,
    userWalle
  },
  name: "AppMain",
  data() {
    return {
      titleText: this.$t("storeDetail"),
      activeName: "first"
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
</style>