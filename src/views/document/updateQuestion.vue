<!-- 新建问题-->
<template>
  <div class="main">
    
    <el-breadcrumb separator="/" class="top20">
      <el-breadcrumb-item>
        <span style="color:#8C939B;">{{$t('document.question')}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="color:#232426">{{$t('document.uploadQuestion')}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content"
         v-loading="dataLoading">
      <el-row style="padding-top:20px">
        <div class="title-line">{{$t('document.uploadQuestion')}}</div>
      </el-row>
      <hr />
      <el-row style="padding:30px 50px">
        <el-form label-width="130px"
                 :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item :label="$t('document.wtitle')+'：'"
                        prop="title">
            <el-input class="value-input"
                      v-model.trim="ruleForm.title">
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('document.cpname')+'：'"
                        prop="product_name">
            <el-select class="value-input"
                       v-model="ruleForm.product_id"
                       :placeholder="$t('document.productName')">
              <el-option v-for="item in prodateOption"
                         :key="item.id"
                         :label="item.dict"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('document.cpgongneng')+'：'"
                        prop="function">
            <el-select class="value-input"
                       v-model="ruleForm.function_id"
                       :placeholder="$t('document.productGongneng')">
              <el-option v-for="item in gongnengOption"
                         :key="item.id"
                         :label="item.dict"
                         :value="item.id">
                         <span style="font-size: 13px">{{ item.dict }}</span>
                <el-button
                  style="float: right;border:none"
                  icon="el-icon-close"
                  circle
                  size="mini"
                  @click="deletClick(item)"
                ></el-button></el-option>
            </el-select>
            <el-button
              type="primary"
              style="margin-left: 22px;border: 1px #1D82ED solid;color: #1D82ED;background: rgba(32, 130, 237, 0.06)"
              @click="addProductClick"
              class="themeImportBtn"
            >
              <i class="el-icon-circle-plus"></i>
              {{$t('document.addRemen')}}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('document.quesDetail')+'：'"
                        prop="content">
            <wangEnduit v-model="ruleForm.content"></wangEnduit>
          </el-form-item>
          <el-form-item>
            <el-button class="font14"
                       type="primary"
                       style="width:100px"
                       v-loading="uploading"
                       @click="submitForm('ruleForm')">{{$t('confirmBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
         <!-- 新建产品功能弹窗 -->
    <el-dialog
      :title="$t('document.question')"
      :visible.sync="showDialog"
      width="25%">
      <div
        class="line top15"
        style="margin-left:0px;"
      ></div>
      <div
        class="dialog-content"
        append-to-body
      >
        <el-form class="top10">
          <el-form-item :label="$t('document.cpgongneng')+'：'">
            <el-input
            style="width:80%"
              v-model="dict_name_cn"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="el-row center" style="padding-bottom:40px">
          <el-button
            type="primary"
            class="cancel-certify cancelBtn"
            style="margin-right:40px"
            @click="alertCancelClick"
          >{{$t('cancelBtn')}}</el-button>
          <el-button
            type="primary"
            class="add-certify themeBtn"
            @click="alertAddClick"
            :loading="alertButtonLoading"
          >{{$t('confirmBtn')}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import wangEnduit from "../components/wangEnduit";

export default {
  components: { wangEnduit },
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
      showDialog:false,
      alertButtonLoading: false,
      dict_name_cn:'',
      dataLoading: false,
      detail: "",
      uploading: false,
      proData: null,
      gonData: null,
      prodateOption: null,
      gongnengOption: null,
      ruleForm: {
        type: 2,
        title: null,//产品标题(必填)",
        product_id: null,// 产品名称ID(整型, 必填),
        function_id: null,//产品功能ID(必填)",
        content: null,//文档内容(必填)",
      },
      rules: {
        title: [
          {
            required: true,
            message: this.$t("document.questionTitle"),
            trigger: "blur"
          }
        ],
        product_id: [
          {
            required: true,
            message: this.$t("document.productName"),
            trigger: "blur"
          }
        ],
        function_id: [
          {
            required: true,
            message: this.$t("document.productGongneng"),
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: this.$t("document.questionDetail"),
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    //删除产品功能
    deletClick(item) {
      let that = this;
      that.request.profunctiondel({ id: item.id }, function(res) {
        if (res.code == "1") {
          that.toast.success(that.$t("delSucc"));
          that.gongnengOption.splice(item, 1);
          that.ruleForm.function_id = "";
          that.productlist(true);
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    //添加产品功能弹窗
    addProductClick() {
      this.showDialog = true;
    },

    //弹出框确定按钮
    alertAddClick() {
      this.alertButtonLoading = true;
      this.addProduct();
    },
    //弹出框取消按钮
    alertCancelClick() {
      this.dict_name_cn = "";
      this.showDialog = false;
    },
    addProduct() {
      let that = this;
      that.request.profunctionadd({dict_name_cn: this.dict_name_cn},function(res) {
          that.alertButtonLoading = false;
          that.showDialog = false;
          if (res.code == "1") {
            that.toast.success(that.$t("addSucc"));
            that.productlist(true);
          } else {
            that.toast.error(res.msg);
          }
        }
      );
    },
    submitForm (formName) {
      let that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updatequestion()
        } else {
          //   console.log('error submit!!');
          return false;
        }
      });
    },
    productlist (product) {
      let that = this;
      this.dataLoading = true;
      this.request.productlist({ product: product }, function (res) {
        that.dataLoading = false
        if (res.code == "1") {
          if (product == 0) {
            that.proData = res.data
          } else {
            that.gonData = res.data
          }
          that.getOption(that.language)
        } else {
          that.toast.error(res.msg);
        }
      }
      );
    },
    getOption (lang) {
      if (this.proData != null) {
        this.prodateOption = this.proData[lang]
      }
      if (this.gonData != null) {
        this.gongnengOption = this.gonData[lang]
      }
      if (this.gonData != null && this.proData != null) {
        this.findDoc()
      }
    },
    updatequestion () {
      let that = this;
      this.uploading = true;
      this.request.updatequestion(this.ruleForm, function (res) {
        that.uploading = false
        if (res.code == "1") {
          that.$router.back(-1)
        } else {
          that.toast.error(res.msg);
        }
      }
      );
    },
    findDoc () {
      let that = this;
      this.uploading = true;
      this.request.findDoc({ id: this.$route.query.id }, function (res) {
        that.uploading = false
        if (res.code == "1") {
          that.ruleForm = res.data
        } else {
          that.toast.error(res.msg);
        }
      }
      );
    }
  },
  created () {
    this.productlist(0)
    this.productlist(1)
  },
  watch: {
    language: {
      handler (newVal, oldVal) {
        this.getOption(newVal)
      }
    }
  }
};
</script>
<style scoped>
.value-input {
  width: 350px;
  height: 35px;
}
</style>