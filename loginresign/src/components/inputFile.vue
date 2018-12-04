<template>
  <div class="contains">
    <div class="leftCon" v-if="false">
      <!-- <InputFile /> -->
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="conLog">
      <el-form
        :model="formLogin"
        :rules="rules"
        ref="formLogin"
        class="formLogin"
      >
        <h1>登录</h1>
        <el-form-item prop="name">
          <!--<el-input v-model="formLogin.name" id="password" :onfocus="checkUser()" :onblur="uncheckUser()" placeholder="用户名"></el-input>-->
          <el-input v-model="formLogin.name" id="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!--<el-input type="password" v-model="formLogin.password" id="password" :onfocus="checkPass()" :onblur="uncheckPass()" placeholder="密码" autocomplete="off"></el-input>-->
          <el-input type="password" v-model="formLogin.password" id="password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="submitForm(formLogin)">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="remember" v-model="formLogin.checked" id="remember-password" label="记住账号密码" name="checked"></el-checkbox>
          <!-- <a href="#" class="forget" target="_black">忘记密码？</a> -->
          <router-link to="/Register"><el-button type="text" class="register">注册</el-button></router-link>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<span>没有账号？</span>-->
        <!--<router-link to="/Register"><el-button type="text">立即注册</el-button></router-link>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ElementUI from "element-ui";

var params = new URLSearchParams();
var cookieName='';
var cookiePwd='';
export default {
  name: "Login1",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    return {
      formLogin: {
        name: "",
        password: "",
        checked: false
      },
      rules: {
        name: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  //页面加载调用获取cookie值
  mounted() {
    this.getCookie();
    // this.clearCookie();
  },
  methods: {
    submitForm( formLogin ) {
      this.$refs[ 'formLogin' ].validate(( valid ) => {
        if (valid) {
          params = formLogin;
          console.log( params )
          axios.post( "/login", params ).then( res => {
            console.log(res.data);
            if(res.data.code === 0) {
              this.$message( {
                message: '登录成功！',
                type: 'success'
              });
              const self = this;
              if ( self.formLogin.checked === true ) {
                console.log("checked === true");
                // 传入账号名，密码和保存天数3个参数
                self.setCookie(self.formLogin.name,self.formLogin.password,7);
              } else {
                console.log('清空cookie');
                // 清空cookie
                self.clearCookie();
              }
            } else {
              this.$message.error(res.data.msg);
            }
          })
            .catch( res => {
              console.log( res );
            });
        } else {
          console.log( 'error submit!!' );
          // alert('请输入用户名或密码');
          this.$message({
            message : '请输入用户名或密码',
            type : 'warning'
          })
          return false;
        }
      })
    },
    // 设置cookie
    setCookie( c_name, c_pwd, exdays) {
      var exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString().replace(/(\s*$)/g, "");
      window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString();
    },
    // 获取cookie
    getCookie: function() {
      if ( document.cookie.length > 0 ) {
        this.formLogin.checked = true;
        var arr = document.cookie.split(';');// 显示的格式切割
        for ( var i = 0; i<arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          // 判断查找相对应的值
          console.log(arr2);
          if( arr2[0] === "userName" ) {
            this.formLogin.name = arr2[1]; //保存到保存数据的地方
            // } else if ( arr2[0] === "userPwd" ) {
          } else {
            this.formLogin.password  = arr2[1];
          }
          // this.formLogin.checked = true;
          // console.log(this.cookieName, this.cookiePwd);
        }
      }
    },
    // 清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改两值都为空，天数为负一天就好
    }
  }
};
// var userText = document.getElementById('username'); //重构表单

</script>

<style>
  a{
    text-decoration: none;
  }
  a:hover{
    text-decoration: blue;
  }
  .contains {
    width: 100%;
    height: 815px;
    background: url('../../static/images/login_bg.jpg');
    margin:0;
    padding:0;
  }
  .conLog {
    /*width: 396px;*/
    width:20%;
    height: 352px;
    float: right;
    padding-top: 288px;
    /*margin-right: 308px;*/
    margin-right:18%;
  }
  .conLog h1 {
    font-size: 26px;
  }
  .conLog .login_button{
    font-size:16px;
    /*height:35px;*/
    /*width:302px;*/
    width:100%;
    border-radius:20px;
  }
  .formLogin{
    background: #fff;
    padding: 10px 20px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .el-input{
    height:37px;
  }
  .formLogin .remember{
    float: left;
  }
  .formLogin .register {
    float: right;
  }
  #username {
    background:url("../../static/images/uncheckuser.png") no-repeat 5px 5px;
    padding-left:25px;
    font-size:14px;
    height:30px;
  }
  #password {
    background:url("../../static/images/uncheckpass.png") no-repeat 5px 5px;
    padding-left:25px;
    font-size:14px;
    height:30px;
  }

</style>



<!--<template>-->
  <!--<div class="login-wrapper">-->
    <!--<form class="form-signin" role="form">-->
      <!--<h2 class="form-signin-heading">点播系统</h2>-->
      <!--<input class="form-control" v-model="userName" v-on:keydown="doLogin($event)" placeholder="用户名" required autofocus>-->
      <!--<input type="password" class="form-control" v-model="passWord" v-on:keydown="doLogin($event)" placeholder="Password">-->
      <!--<div class="checkbox remember-password-container">-->
        <!--<input type="checkbox" value="remember-me" v-model="rememberPassword" id="remember-password-checkbox" v-on:click="doRememberPassword($event)">-->
        <!--<label for="remember-password-checkbox">-->
          <!--Remember me-->
        <!--</label>-->
      <!--</div>-->
      <!--<div class="btn btn-lg btn-primary btn-block" v-on:click="doLogin()">Sign in</div>-->
    <!--</form>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--// 设置cookie-->
  <!--export default setCookie(c_name,value,expiremMinutes){-->
    <!--var exdate = new Date();-->
    <!--exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);-->
    <!--document.cookie= c_name + "=" + escape(value)+((expiremMinutes==null) ? "" : ";expires="+exdate.toGMTString());-->
  <!--}-->
  <!--// 读取cookie-->
  <!--export default getCookie(c_name){-->
    <!--if (document.cookie.length>0)-->
    <!--{-->
      <!--var c_start=document.cookie.indexOf(c_name + "=");-->
      <!--if (c_start !== -1)-->
      <!--{-->
        <!--c_start=c_start + c_name.length+1;-->
        <!--var c_end=document.cookie.indexOf(";",c_start);-->
        <!--if (c_end === -1)-->
          <!--c_end = document.cookie.length-->
        <!--return unescape(document.cookie.substring(c_start, c_end))-->
      <!--}-->
    <!--}-->
    <!--return ""-->
  <!--}-->
  <!--// 删除cookie-->
  <!--export default delCookie(c_name){-->
    <!--var exp = new Date();-->
    <!--exp.setTime(exp.getTime() - 1);-->
    <!--var cval = this.getCookie(c_name);-->
    <!--if(cval!=null){-->
      <!--document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();-->
    <!--}-->
  <!--}-->
<!--export default {-->
  <!--name: 'InputFile',-->
  <!--data () {-->
    <!--return {-->
      <!--userName: "",-->
      <!--passWord: "",-->
      <!--rememberPassword: false-->
    <!--}-->
  <!--},-->
  <!--// 相当于init doAjax-->
  <!--beforeCreate() {-->
    <!--// console.log('login页面 加载完成！')-->
  <!--},-->
  <!--// 相当于ready 模板编译挂载之后-->
  <!--mounted: function() {-->
    <!--//读取cookie中的账号信息，如果有accountInfo的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码-->
    <!--this.loadAccountInfo();-->
  <!--},-->

  <!--methods: {-->
    <!--doLogin: function(event){-->

      <!--var mySelf = this;-->
      <!--const router = this.$router;-->
      <!--// console.log(router)-->
      <!--// router.go();-->
      <!--// router.push({path:'/index'})-->
      <!--// console.log(pars.domain)-->

      <!--var mySelf = this;-->
      <!--var userName = mySelf.userName;-->
      <!--var userPwd = mySelf.passWord;-->
      <!--// 记住密码checkbox的勾选状态 和账号信息的字符串-->
      <!--var rememberStatus = mySelf.rememberPassword;-->
      <!--var accountInfo = "";-->
      <!--accountInfo = userName + "&" + userPwd;-->

      <!--if (event && event.type === 'keydown' && event.keyCode !== 13) {-->
        <!--return;-->
      <!--}-->

      <!--// console.log("用户名：" + userName)-->
      <!--// console.log("密码：" + userPwd)-->

      <!--if (userName === ""){-->
        <!--showDialog('error','用户名不能为空！');-->
        <!--return;-->
      <!--}-->
      <!--if (userPwd === ""){-->
        <!--showDialog('error','密码不能为空！');-->
        <!--return;-->
      <!--}-->

      <!--axios.post( "/Login", function(ret) {-->

        <!--if (ret.code === 0) {-->
          <!--// 如果登录成功，则把账号信息保存在cookie当中-->
          <!--if (rememberStatus){-->
            <!--console.log("勾选了记住密码，现在开始写入cookie");-->
            <!--setCookie('accountInfo',accountInfo,1440*3);-->
          <!--}-->
          <!--else{-->
            <!--console.log("没有勾选记住密码，现在开始删除账号cookie");-->
            <!--delCookie('accountInfo');-->
          <!--}-->

          <!--// 若为本地环境 则手写cookie-->
          <!--if (window.location.href.indexOf('localhost') !== -1){-->
            <!--setCookie('token','zhaopeng_58e0cbbea951f0e79fafcee80da522b8',1440);-->
          <!--}-->
          <!--// console.log(window.location.href)-->
          <!--console.log('登录的返回值为0');-->
          <!--router.push({path:'/'});-->
        <!--} else {-->
          <!--showDialog('error','账号名或密码错误!');-->
        <!--}-->
      <!--}, "json");-->

    <!--},-->
    <!--doRememberPassword: function(event){-->
      <!--let mySelf = this;-->
      <!--let rememberStatus = mySelf.rememberPassword;-->
      <!--// event.preventDefault();-->
      <!--mySelf.rememberPassword = !rememberStatus;-->
      <!--//如果去掉勾选，则删掉cookie-->
      <!--// if (!rememberStatus){-->

      <!--// }-->
      <!--// mySelf.rememberPassword = false;-->
    <!--},-->
    <!--loadAccountInfo: function(){-->

      <!--let mySelf = this;-->
      <!--//zhaopeng&A15hOsu8YeGnCsjb-->
      <!--let accountInfo = getCookie('accountInfo');-->

      <!--//如果cookie里没有账号信息-->
      <!--if(Boolean(accountInfo) === false){-->
        <!--console.log('cookie中没有检测到账号信息！');-->
        <!--return false;-->
      <!--}-->
      <!--else{-->
        <!--//如果cookie里有账号信息-->
        <!--console.log('cookie中检测到账号信息！现在开始预填写！');-->
        <!--let userName = "";-->
        <!--let passWord = "";-->
        <!--let index = accountInfo.indexOf("&");-->

        <!--userName = accountInfo.substring(0,index);-->
        <!--passWord = accountInfo.substring(index+1);-->

        <!--mySelf.userName = userName;-->
        <!--mySelf.passWord = passWord;-->
        <!--mySelf.rememberPassword = true;-->
      <!--}-->
    <!--}-->

  <!--}-->
<!--}-->


<!--</script>-->
