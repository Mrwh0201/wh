<template>
  <div class="contains">
    <div class="conRes">
      <el-form :model="formRes" :rules="rules" ref="formRes" label-width="80px" class="ruleForm">
        <h1>注册</h1>
        <el-form-item label="登录名" prop="name">
          <el-input v-model="formRes.name" class="el-input" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formRes.realname" class="el-input" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formRes.phone" class="el-input" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="formRes.password"
            placeholder="请输入登录密码"
            autocomplete="off"
            id="pws" class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码"  prop="checkPass">
          <el-input
            type="password"
            v-model="formRes.checkPass"
            placeholder="请输入确认密码"
            autocomplete="off" class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="region">
          <el-select v-model="formRes.region" class="el-input" placeholder="请选择">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="维保人员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form :model="formRes" :rules="rules" ref="formRes" class="ruleForm1">
          <el-form-item>
            <el-button type="primary" class="res-button" @click="submitForm(formRes)">注册并提交申请</el-button>
          </el-form-item>
          <el-form-item>
            <span>已有账号？</span>
            <router-link to="/Login"><el-button type="text">立即登录</el-button></router-link>
          </el-form-item>
        </el-form>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ElementUI from 'element-ui'
var params = new URLSearchParams()
var reg = /^1[3|4|5|7|8][0-9]\d{8}$/
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formRes.checkPass !== '') {
          this.$refs.formRes.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formRes.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的11位手机号码'));
      } else{
        callback();
      }
    }
    return {
      formRes: {
        name: "",
        realname: "",
        phone: "",
        password: "",
        checkPass: "",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          // { min: 4, message: "请输入真实姓名", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            // message:'请输入手机号码',
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        password: [
          { validator: validatePass, required:true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
        // region: [
        //   { required: true, message: "请选择角色类型", trigger: "change" }
        // ]
      }
    };
  },
  methods: {
    submitForm( formRes ) {
      this.$refs['formRes'].validate((valid) => {
      if ( valid ) {
          console.log( 'submit!' );
          params = formRes;
          console.log( params );
          axios.post( "/register", params)
            .then(( res ) => {
              console.log(res.data);
              if( res.data.code === 0 ){
                this.$message({
                  message:'您的注册信息已经提交给超级管理员，请等待！',
                  type: 'success'
                })

                window.history.back();
                this.$refs['formRes'].resetFields();
              } else {
                // this.$message( res.data.msg )
                console.log(res.data)
              }
            })
            .catch( res => {
              console.log( res );
              this.$message.error(res.data.msg)

            });
          console.log( '成功注册并提交给管理员' );
          // this.$message( "成功注册并提交给管理员" );
        } else {
          console.log( 'error submit!!' );
          return false;
        }
      });

    }
  }
};
</script>

<style>
.contains {
  width: 100%;
  height: 815px;
  background: url("../../../static/images/login_bg.jpg");
  margin: 0;
  padding: 0;
}
.conRes {
  width:20%;
  height: 421px;
  float: right;
  padding-top: 200px;
  margin-right:18%;
}
.conRes h1 {
  font-size: 26px;
  margin:5px;
}
.ruleForm {
  width:447px;
  height:421px;
  background: #fff;
  padding: 10px 20px;
  text-align: center;
  border-radius:5px;
}
.el-input__icon{
  height:40px;
}
  .ruleForm1{
    background: #fff;
    width:100%;
    padding: 10px 20px;
    margin-left:-20px;
    text-align: center;
    border-radius:5px;
    margin-top:-10px;
  }
 .el-form-item{
   height:30px;
  }
 .res-button{
   width:100%;
  border-radius:20px;
   font-size: 16px;
 }
  .el-input,.el-input .el-input__inner {
    height:30px;
  }
  .el-form-item__error{
    padding-top:0;
  }
</style>
