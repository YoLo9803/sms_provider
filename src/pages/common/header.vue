<template>
    <div>
        <el-container>
        <el-header style="font-size:36px">快速取碼
            <div class="right">
                <i v-if="this.isLogin" class="el-icon-user" style="padding:10px"></i>
                <span v-if="this.isLogin">{{account}}</span>
                <i v-if="this.isLogin" class="el-icon-wallet" style="padding:10px"></i>
                <span v-if="this.isLogin">${{fund}}</span>
            </div>
        </el-header>
        <el-main>
            <router-view v-on:updateHeader="updateUserInfo"></router-view>
        </el-main>
        </el-container>
        <!-- <div class="header">
            <h2>{{account}}</h2>
            <h2>{{fund}}</h2>
            <router-link class='register-router-link' to='deposit'>儲值</router-link>
        </div> -->
    </div>
</template>

<script>
export default {
    created(){
        this.accountId = -1,
        this.account = '',
        this.fund = '',
        this.isLogin = false
    },
    data(){
        return {
            accountId : this.accountId,
            fund : this.fund,
            account : this.account,
            isLogin : false
        };
    },
    methods:{
        updateUserInfo(value){
            this.accountId = value.id == undefined ? this.accountId : value.id;
            this.account = value.account == undefined ? this.account : value.account;
            this.fund = value.fund == undefined ? this.fund : value.fund;
            this.isLogin = true;
        }
    }
}
</script>

<style scoped lang='scss'>
    .el-header, .el-footer {
    // background-color: #c1dafb;
    color: #333;
    line-height: 65px;
    text-align: center;
    }
    .right{
        // background-color: #c1dafb;
        text-align: right;
        font-size: 20px;

    }
</style>