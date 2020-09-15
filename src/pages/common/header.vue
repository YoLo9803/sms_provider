<template>
    <div>
        <el-container>
        <el-header style="font-size:36px">快速取碼
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>@2020 sms provider</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    created(){
        console.log('created');
        this.accountId = -1,
        this.account = '',
        this.fund = '',
        this.isLogin = false
    },
    data(){
        return {
            accountId : '',
            fund : '',
            account : '',
            isLogin : false
        };
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
    .el-footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80px;
    }
</style>