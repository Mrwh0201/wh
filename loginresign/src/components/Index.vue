<template>
  <!-- <div class="contains">
    <div class="leftCon" v-if="false">

      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="rightCon">
      <div class="form" v-if="real">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogForm('ruleForm')">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="记住账号密码" name="type"></el-checkbox>
            </el-checkbox-group>
            <a href="#" target="_black">忘记密码</a>
          </el-form-item>
        </el-form>
        <el-form>
          <span>没有账号？</span>
          <a href @click="changeRegStatus()">立即注册</a>
        </el-form>
      </div>
      <div class="form" v-else>
        <el-form
          :model="ruleForm1"
          :rules="rules"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="登录名" prop="name">
            <el-input v-model="ruleForm1.username" placeholder="请输入登录名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm1.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="name">
            <el-input v-model="ruleForm1.tel" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm1.pass"
              placeholder="请输入登陆密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm1.checkPass"
              placeholder="请输入确认密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色类型" prop="region">
            <el-select v-model="ruleForm1.region" placeholder="请选择">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="维保人员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRegForm('ruleForm')">注册并提交申请</el-button>
          </el-form-item>
          <el-form-item>
            <span>已有账号？</span>
            <a href="#" @click="changeLoginStatus()">立即登录</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div> -->
    <Login />
</template>

<script>
import Login from "./login/Login";
import Register from "./login/Register";
import InputFile from "./inputFile";
import axios from "axios";

var params = new URLSearchParams();

export default {
  name: "Index",
  components: { Login, InputFile, Register },
  data() {
    return {
      real: false, //登录注册标识
      //登录表单
      ruleForm: {
        username: "",
        pass: "",
        type: false
      },
      rules: {
        //登录表单规则
        username: [
          { required: true, message: "请输入用户名", trigger: "blur,change" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blue" }]
      },
      //注册表单
      ruleForm1: {
        username: "",
        realName: "",
        tel: "",
        pass: "",
        checkPass: "",
        region: ""
      },
      rules: {
        //注册表单规则
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 4, message: "请输入真实姓名", trigger: "blur" }
        ],
        tel: [
          {
            required: true,
            pattern: /^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "请输入正确手机号码",
            trigger: "blur, change"
          }
        ],
        pass: [],
        region: [
          { required: true, message: "请选择角色类型", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    changeRegStatus() {
      //改变显示状态
      return {
        real: true
      };
      console.log("realll", real);
    },
    changeLoginStatus() {
      //改变显示状态
      return {
        real: false
      };
      console.log("reaaaal", real);
    },
    //点击登录按钮触发
    submitLogForm(ruleForm) {
      params = ruleForm;
      axios
        .post("", params)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
          alert("用户名或密码不正确，请重新输入");
        });
    },
    //点击注册按钮触发
    submitRegForm(formName) {
      params = formName;
      axios
        .post("", params)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style>
.contains {
  width: 100%;
  height: 938px;
  background: url(../../static/images/login_bg.jpg);
  margin:0;
  padding:0;
}
.leftCon {
  width: 50%;
  padding-top: 300px;
  float: left;
}
.leftCon .el-upload__tip{
    color:#fff;
}
.rightCon {
  width: 30%;
  height: 395px;
  float: right;
  padding-top: 200px;
  margin-right: 10%;
}
.form {
  background: #fff;
  padding: 30px 20px;
}
</style>
