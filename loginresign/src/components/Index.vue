<template>
    <Login />
</template>

<script>
import Login from "./login/Login";
import Register from "./login/Register";
import axios from "axios";

var params = new URLSearchParams();

export default {
  name: "Index",
  components: { Login, Register },
}
</script>
<style>
.contains {
  width: 100%;
  height: 938px;
  background: url(../../static/images/login_bg.jpg);
  margin:0;
  padding:0;
}
.form {
  background: #fff;
  padding: 30px 20px;
}
</style>
