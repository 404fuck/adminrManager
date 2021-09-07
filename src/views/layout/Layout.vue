<template>
  <el-container style="height:100%">
    <el-aside width="300px" style="padding-left:30px">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header style="border-bottom: 1px #e4e7ed solid;height:50px">
        <Navbar />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AppMain from "./AppMain";
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {},
  data() {
    return {};
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.layout {
  position: relative;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0;
}

.el-header {
  background: #ffffff;
}

.el-aside {
  background-color: #f1f4fa;
  color: #393939;
  text-align: center;
  padding: 0;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  padding: 0;
}

body > .el-container {
  height: 800px;
}
</style>