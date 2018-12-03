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
          <el-input v-model="formLogin.name" id="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formLogin.password" id="password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_button" @click="submitForm(formLogin)">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="remember" v-model="formLogin.checked" id="remember-password" label="记住账号密码" name="checked"></el-checkbox>
          <router-link to="/Register"><el-button type="text" class="register">注册</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ElementUI from "element-ui";

var params = new URLSearchParams();

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
    background: url('../../../static/images/login_bg.jpg');
    margin:0;
    padding:0;
  }
  .conLog {
    width:20%;
    height: 352px;
    float: right;
    padding-top: 288px;
    margin-right:18%;
  }
  .conLog h1 {
    font-size: 26px;
  }
  .conLog .login_button{
    font-size:16px;
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
