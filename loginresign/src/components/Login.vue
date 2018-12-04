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
          <el-checkbox-group v-model="formLogin.type">
            <el-checkbox class="remember" id="remember-password" label="记住账号密码" name="type"></el-checkbox>
          </el-checkbox-group>
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

var SetCookie = function(username, password) {
  let Then = new Date();
  Then.setTime(Then.getTime() + 1866240000000);
  document.cookie = "username=" + username + "%%" + password + ";expires=" + Then.toGMTString();
};

export default {
  name: "Login",
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

    // var GetCookie = function(){
    //   var nmpsd; var nm; var psd;
    //   var cookieString = new String(document.cookie);
    //   var cookieHeader = 'userName=';
    //   var beginPosition = cookieString.indexOf(cookieHeader);
    //   cookieString = cookieString.substring(beginPosition);
    //   var ends = cookieString.index(";");
    //   if (ends !== -1) {
    //     cookieString = cookieString.substring(0,ends);
    //   }
    //   if (beginPosition > -1) {
    //     nmpsd = cookieString.substring(cookieHeader.length);
    //     if (nmpsd !== '') {
    //       beginPosition = nmpsd.indexOf('%%');
    //       nm = nmpsd.substring(0, beginPosition);
    //       psd = nmpsd.substring(beginPosition+2);
    //       document.getElementById("username").value = nm;
    //       docuemnt.getElementsById("password").value = psd;
    //       if ( nm !== "" && psd !== "") {
    //         document.getElementById('remember-password').checked = true;
    //       }
    //
    //     }
    //   }
    // }

    return {
      formLogin: {
        name: "",
        password: "",
        type: false
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
              // if(params.type) {
              //   SetCookie(params.name, params.password);
              // } else {
              //   SetCookie( "" , "" )
              // }
              // window.location.href = "http://www.baidu.com";
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
  background: url('../../../static/images/login_bg.jpg');
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
  background:url("../../../static/images/uncheckuser.png") no-repeat 5px 5px;
  padding-left:25px;
  font-size:14px;
  height:30px;
}
#password {
  background:url("../../../static/images/uncheckpass.png") no-repeat 5px 5px;
  padding-left:25px;
  font-size:14px;
  height:30px;
}

</style>
