<template>
  <div class="contains">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
              <i class="el-icon-location"></i>
              <span>首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">网管</template>
            <el-menu-item index="2-1">服务器</el-menu-item>
            <el-menu-item index="2-2">网络设备</el-menu-item>
            <el-menu-item index="2-3">存储设备</el-menu-item>
            <el-menu-item index="2-4">虚拟机</el-menu-item>
            <el-menu-item index="2-5">中间件</el-menu-item>
            <el-menu-item index="2-6">软件</el-menu-item>
            <el-menu-item index="2-7">线路</el-menu-item>
            <el-menu-item index="2-8">拓扑</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">动环</template>
            <el-menu-item index="3-1">动力</el-menu-item>
            <el-menu-item index="3-2">空调</el-menu-item>
            <el-menu-item index="3-3">环境</el-menu-item>
            <el-menu-item index="3-4">热场</el-menu-item>
            <el-menu-item index="3-5">视频监控</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">告警</template>
            <el-menu-item index="4-1">告警统计</el-menu-item>
            <el-menu-item index="4-2">告警信息</el-menu-item>
            <el-menu-item index="4-3">告警配置</el-menu-item>
            <el-menu-item index="4-4">告警测试</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">资产</template>
            <el-menu-item index="5-1">资产查看</el-menu-item>
            <el-menu-item index="5-2">资产变更</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">工单</template>
            <el-menu-item index="6-1">发起工单</el-menu-item>
            <el-menu-item index="6-2">工单管理</el-menu-item>
            <el-menu-item index="6-3">历史工单</el-menu-item>
          </el-submenu>
          <el-menu-item index="7">报单</el-menu-item>
          <el-menu-item index="8">巡检</el-menu-item>
          <el-menu-item index="9">大屏</el-menu-item>
          <el-submenu index="10">
            <template slot="title">容量管理</template>
            <el-menu-item index="10-1">容量管理首页</el-menu-item>
            <el-menu-item index="10-2">U位管理</el-menu-item>
            <el-menu-item index="10-3">能耗管理</el-menu-item>
            <el-menu-item index="10-4">称重管理</el-menu-item>
          </el-submenu>
          <el-submenu index="11">
            <template slot="title">系统配置</template>
            <el-menu-item index="11-1">模型导入</el-menu-item>
            <el-menu-item index="11-2">线路导入</el-menu-item>
            <el-menu-item index="11-3">视频配置</el-menu-item>
          </el-submenu>
          <el-submenu index="12">
            <template slot="title">系统管理</template>
            <el-menu-item index="12-1">用户管理</el-menu-item>
            <el-menu-item index="12-2">角色管理</el-menu-item>
            <el-menu-item index="12-3">工单日志</el-menu-item>
            <el-menu-item index="12-4">日志管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="13">注销登录</el-menu-item>
        </el-menu>
      </el-col>
      </el-row>
    <div class="rightCon">
      <div class="xtitle">
        <!--<span>当前位置：<a href="#">个人中心</a>/<a href="#">用户管理</a></span>-->
        <el-breadcrumb separator="/">
          <!--<div style="position: relative;"><span>当前位置：</span></div>-->
          <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="userlabel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户列表" name="first">
            <div class="ttbabel">
              <el-form :mode="seleform" ref="seleform" label-width="30%" class="seleform">
                <el-form-item label="员工姓名：" label-width="40%" prop="name">
                  <el-input v-model="seleform.name" margin-left="40%"></el-input>
                </el-form-item>
                <el-form-item label="状态：" style="text-align: center;" prop="state">
                  <el-select  v-model="seleform.state">
                    <el-option value="全部" selected>全部</el-option>
                    <el-option value="未启用">未启用</el-option>
                    <el-option value="已启用">已启用</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色：" prop="role">
                  <el-select v-model="seleform.role" multiple placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
              </el-form>
              <div class="btn">
                <el-button type="primary">新增员工</el-button>
                <el-button type="danger">批量删除</el-button>
              </div>
              <div class="clearfloat"></div>
            </div>
            <div class="usertable">
              <el-table
                ref="multipleTable"
                :data="userinfo"
                tooltip-effect="dark"
                style="width:100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="登录账号" width="120" prop="name"></el-table-column>
                <el-table-column label="真实姓名" width="120" prop="realname"></el-table-column>
                <el-table-column label="员工ID" width="120" prop="id"></el-table-column>
                <el-table-column label="手机号码" width="120" prop="callphone"></el-table-column>
                <el-table-column label="角色" width="120" prop="role"></el-table-column>
                <el-table-column label="状态" width="70" prop="state"></el-table-column>
                <el-table-column label="备注" width="120" prop="remarks"></el-table-column>
                <el-table-column label="操作" width="120" prop="opration"></el-table-column>
              </el-table>
              <div class="total" id="total"><span>共XXX个用户信息</span></div>
              <!--<div class="page"><div id="pagination" class="pull-right"></div></div>-->
              <div class="page"><el-pagination background layout="prev, pager, next" :total="1000"></el-pagination></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册审核" name="second">
            <div class="ttbabel">
              <el-form :mode="seleform" ref="seleform" label-width="40%" width="100%" class="seleform">
                <el-form-item label="员工姓名：" prop="name">
                  <el-input v-model="seleform.name"></el-input>
                </el-form-item>
                <el-button type="primary">搜索</el-button>
              </el-form>
              <div class="btn">
                <el-button type="primary">批量同意</el-button>
                <el-button type="danger">批量忽略</el-button>
                <el-button type="danger">批量删除</el-button>
              </div>
              <div class="clearfloat"></div>
            </div>
            <div class="usertable">
              <el-table
                ref="multipleTable"
                :data="userinfo"
                tooltip-effect="dark"
                style="width:100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="登录账号" width="180" prop="name"></el-table-column>
                <el-table-column label="真实姓名" width="180" prop="realname"></el-table-column>
                <el-table-column label="手机号码" width="200" prop="callphone"></el-table-column>
                <el-table-column label="角色" width="160" prop="role"></el-table-column>
                <el-table-column label="操作" width="220" prop="opration"></el-table-column>
              </el-table>
              <div class="total" id="total"><span>共XXX个用户信息</span></div>
              <div class="page"><el-pagination background layout="prev, pager, next" :total="1000"></el-pagination></div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="clearfloat"></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeName: 'first',
      options: [
        {
          value: '1',
          label: '【动环】'
        },
        {
          value: '2',
          label: '【空调】'
        },
        {
          value: '3',
          label: '【初级管理员】'
        }
      ],
      tableData: [{
        name: 'wangxiaoer',
        realname: '王小二',
        userid: '1',
        tel: '13265239856',
        role: '管理员',
        state: '1',
        remarks: ''
      }],
      seleform: [{
        name: '',
        state: '',
        role: ''
      }],
      userinfo: [{
        name: '',
        realname: '',
        id: '',
        callphone: '',
        role: '',
        state: '',
        remarks: '',
        opration: ''
      }]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
  .clearfloat{
    height:0;
    clear:both;
  }
.contains{
  background:rgba(215,215,215,1);
  width:100%;
  position: relative;
}
  .tac{
    width:30%;
    text-align: left;
    float:left;
  }
  .rightCon{
    width:65%;
    float:left;
  }
  .rightCon .xtitle{
    font-size:14px;
    height:50px;
    position:relative;
    border-bottom:1px solid #c9c9c9;
    background:#f6f7fb;
  }
  .rightCon .xtitle span {
    position:absolute;
    top:15px;
    left:2%;
    height:50px;
  }
  .rightCon .xtitle a{
    text-decoration: none;
  }
  .rightCon .userlabel{
    width:100%;
    height:58px;
    line-height: 58px;
    color:#121312;
    margin-bottom:20px;
  }
  .rightCon .userlabel .el-tabs{
    padding:10px 10px;
  }
  .rightCon .ttbabel{
    position: relative;
    width:100%;
  }
  .rightCon .ttbabel .seleform{
    width:75%;
    float:left;
  }
  .rightCon .ttbabel .el-form-item{
    float: left;
    width:30%;
  }
  .rightCon .ttbabel .btn{
    float:right;
    margin-right:2%;
  }
  .rightCon .usertable{
    position: relative;
    width:100%;
  }
  .rightCon .table tr{
    background:#c0d8fc;
    color:#111;
  }
  .rightCon tr:hover{
    background:#deebfe;
  }
  .rightCon .table td,.rightCon table th{
    padding:10px 22px;
    margin:-10px;
  }
  .rightCon .total{
    float:left;
  }
  .rightCon .page{
    float: right;
  }
</style>
