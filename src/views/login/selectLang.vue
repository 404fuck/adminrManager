<template>
  <div>
    <el-dropdown trigger="click"
                 @command="handleSetLanguage">
      <span class="el-dropdown-link text-style">
        {{language==='zh_CN'?'中文':'English'}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh_CN"
                          :disabled="language==='zh_CN'"
                          class="text-style">中文</el-dropdown-item>
        <el-dropdown-item command="en_US"
                          :disabled="language==='en_US'"
                          class="text-style">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  computed: {
    language: {
      get () {
        return this.$store.getters.language;
      },
      set (val) { }
    }
  },
  data () {
    return {
      timer: null,
    };
  },
  methods: {
    handleSetLanguage (lang) {
      this.$store.dispatch('setLanguage', lang)
      this.$i18n.locale = lang
    }
  },
  created () {

  },
};
</script>
<style scoped>
</style>