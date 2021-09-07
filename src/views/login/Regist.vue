<template>
  <el-container class="login login-container loginStyle"
                style="height:100%">
    <img class="container-left"
         src="../../static/images/logo.png" />
    <div class="container-right">
      <div class="login-main top10">
        <div class="container-right-header">
          <span class="right-title">
            <span class="title-company text-style"
                  style="color:#2082ED">{{company}}</span>

          </span>
        </div>
      </div>
      <div class="container-tabs font22">
        <span class="tab-regist">注 册</span>
      </div>

      <div class="container-body">
        <el-input placeholder="请输入手机号"
                  v-model.trim="phone"
                  class="input-with-select widthStyle font16"
                  size="large">
          <el-select v-model.trim="selectPhone"
                     slot="prepend"
                     placeholder="请选择"
                     class="text-style">
            <el-option label="+86"
                       value="1"
                       class="text-style"></el-option>
            <el-option label="+87"
                       value="2"
                       class="text-style"></el-option>
            <el-option label="+88"
                       value="3"
                       class="text-style"></el-option>
          </el-select>
        </el-input>

        <el-input class="pass widthStyle font16"
                  placeholder="验证码"
                  v-model.trim="code"
                  clearable
                  size="large">
          <el-button slot="append"
                     @click="sendCode"
                     :disabled="!show">
            <span class=" font16"
                  v-show="show">获取验证码</span>
            <span class="font16"
                  v-show="!show">{{count}} s</span>
          </el-button>
        </el-input>

        <el-input class="pass widthStyle font16"
                  placeholder="密码"
                  v-model.trim="pass"
                  show-password
                  size="large"></el-input>
        <el-input class="pass widthStyle font16"
                  placeholder="确认密码"
                  v-model.trim="repass"
                  show-password
                  size="large"
                  @keyup.enter.native="handleRegist"></el-input>

        <div class="login-bottom"
             style="margin-top:30px">
          <el-row class="widthStyle">
            <el-button type="primary"
                       @click="handleRegist"
                       class="registBtn font16"
                       style="height:50px">
              <span>注册</span>
            </el-button>
          </el-row>
          <el-row class="widthStyle">
            <el-button type="primary"
                       plain
                       @click="login"
                       style="height:50px"
                       class="loginBtn font16 top20">
              <span style="color:#2082ED">已有账号，去登录</span>
            </el-button>
          </el-row>
        </div>
      </div>
    </div>
  </el-container>
</template>


<script>
export default {
  components: {},
  computed: {},
  data () {
    return {
      language: '',
      company: "SJOY官网",
      phone: "",
      pass: "",
      repass: "",
      code: "",
      selectPhone: "+86",
      show: true,
      count: 0,
      timer: null
    };
  },
  methods: {
    handleRegist () {
      //验证数据
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }
      if (this.stringutils.isEmpty(this.code)) {
        this.toast.warning("请输入验证码");
        return;
      }
      if (this.stringutils.isEmpty(this.pass)) {
        this.toast.warning("请输入密码");
        return;
      }
      if (this.stringutils.isEmpty(this.repass)) {
        this.toast.warning("请确认密码");
        return;
      }

      if (this.pass !== this.repass) {
        this.toast.error("两次密码不一致");
        return;
      }

      //提交数据
      let data = {
        phone: this.phone,
        code: this.code,
        pwd: this.pass,
        confirmPwd: this.repass
      };
      let that = this;
      this.request.regist(data, function (res) {
        if (res.code == "1") {
          that.toast.success("注册成功");
          //缓存登录数据
          that.setMemory(res)
          that.$router.push({
            //你需要接受路由的参数再跳转
            path: "/storeState"
          });
        } else {
          that.toast.error(res.msg);
        }
      });
    },
    setMemory (res) {
      if (res.data != null) {

        var storeList = res.data.data
        var name = res.data.phone
        var logo = res.data.logo

        if (storeList != null) {
          this.setStoreList(res.data.data)
        }

        if (name != null && logo != null) {
          var user = {
            name: name,
            logo: logo
          }
          this.$store.dispatch('setUser', user)
        }
      }
    },
    login () {
      this.$router.push({
        path: "/login"
      });
    },

    sendCode () {
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }

      // 验证码倒计时
      if (!this.timer) {
        let data = { phone: this.phone };
        let that = this;
        this.request.sendSms(data, function (res) {
          if (res.code == "1") {
            that.toast.success("发送成功");
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
    }
  },
  created () { },
  mounted () { }
};
</script>
<style scoped>
.container-right {
  width: 450px;
  height: 620px;
  box-shadow: 42px 38px 37px rgba(221, 221, 221, 0.5);
}
.widthStyle {
  width: 365px;
}
.loginBtn {
  width: 100% !important;
  background: #ffffff !important;
  border-color: #2082ed !important;
}
.registBtn {
  width: 100% !important;
  background: #2082ed !important;
  border-color: #2082ed !important;
}

.title-company {
  margin-right: 35px;
}

.text-style {
  color: #768387;
  font-size: 14px;
}

.container-tabs {
  margin-top: 25px;
  line-height: 25px;
}

.container-body {
  width: 60%;
  margin: 30px 43px;
}

.tabs-active {
  font-size: 22px;
  color: #2082ed;
}

.tabs-unactive {
  font-size: 22px;
  color: #8c939b;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.pass {
  margin-top: 25px;
}
</style>