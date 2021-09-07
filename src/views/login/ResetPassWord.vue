<template>
  <el-container class="login login-container loginStyle"
                style="height:100%">
    <img class="container-left"
         src="../../static/images/logo.png"></img>
    <div class="container-right">
      <div class="login-main top10">
        <div class="container-right-header"><span class="right-title"><span class="title-company text-style"
                  style="color:#2082ED">{{company}}</span>
          </span></div>

      </div>
      <div class="container-tabs">
        <span class="font22 fontWeight"
              style="display:block;color:#5C6268">
          重置密码
        </span>
        <span class="font12"
              style="color:#FD7B4D">
          (仅限于平台注册手机号)
        </span>
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
            <span class="font16"
                  v-show="show">获取验证码</span>
            <span class="font16"
                  v-show="!show">{{count}} s</span>
          </el-button>
        </el-input>

        <el-input class="pass widthStyle font16"
                  placeholder="密码"
                  v-model.trim="pass"
                  show-password
                  size="large">
        </el-input>
        <el-input class="pass widthStyle font16"
                  placeholder="确认密码"
                  v-model.trim="repass"
                  show-password
                  size="large"
                  @keyup.enter.native="handleReSetPass">
        </el-input>

        <div class="login-btn"
             style="margin-top:40px">
          <el-row class="widthStyle">
            <el-button class="registBtn font16"
                       type="primary"
                       size="large"
                       @click="handleReSetPass"
                       style="height:50px"> <span>确认</span></el-button>
          </el-row>
          <el-row class="widthStyle top20">
            <el-button type="primary"
                       @click="login"
                       class="loginBtn font16"
                       style="height:50px">
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
  components: {

  },
  computed: {
  },
  data () {
    return {
      company: "SJOY官网",
      phone: "",
      pass: "",
      repass: "",
      code: "",
      selectPhone: "+86", show: true,
      count: 0,
      timer: null

    }
  },
  methods: {
    handleReSetPass () {
      //验证数据
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }
      if (this.stringutils.isEmpty(this.code)) {
        this.toast.warning('请输入验证码')
        return;
      }
      if (this.stringutils.isEmpty(this.pass)) {
        this.toast.warning('请输入密码')
        return;
      }
      if (this.stringutils.isEmpty(this.repass)) {
        this.toast.warning('请确认密码')
        return;
      }

      if (this.pass !== this.repass) {
        this.toast.error('两次密码不一致')
        return;
      }


      //提交数据
      let data = {
        phone: this.phone,
        code: this.code,
        pwd: this.pass,
        confirmPwd: this.repass,

      }
      let that = this;
      this.request.resetpass(data, function (res) {
        if (res.code == '1') {
          that.toast.success('重置成功')
          that.$router.push({//你需要接受路由的参数再跳转
            path: '/login'
          });
        } else {
          that.toast.error(res.msg)
        }

      })
    }

    , login () {
      this.$router.push({
        path: '/login'
      });
    }
    , sendCode () {
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }

      // 验证码倒计时
      if (!this.timer) {
        let data = { phone: this.phone };
        let that = this;
        this.request.sendSmsPhone(data, function (res) {
          if (res.code == '1') {
            that.toast.success('发送成功')
            that.count = 60
            that.show = false
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= 60) {
                that.count--
              } else {
                that.show = true
                clearInterval(that.timer)
                that.timer = null
              }
            }, 1000)
          } else {
            that.toast.error(res.msg)
          }
        })
      }
    }, handleSetToken (token) {
      this.$store.dispatch('setToken', token)
    }

  },
  created () {
  },
  mounted () {
  },

}
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
  margin: 15px 43px;
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