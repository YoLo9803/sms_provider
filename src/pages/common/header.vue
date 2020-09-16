<template>
    <div>
        <el-container>
        <el-header style="font-size:32px">06478代收驗證碼平台
        </el-header>
        <el-main>
            <router-view></router-view>
            <!-- <div class="bottom">
                客服人員line ID : 08570987
            </div> -->
        </el-main>
        
        <div class="bottom">
            <el-tag style="font-size:18px" effect="plain">
                客服人員Line ID : 08570987
            </el-tag>
            <el-footer>
                @2020 sms provider
            </el-footer>
        </div>
           
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

    .bottom{
        width: 300px;
        position:absolute;
        left: 50%;
        margin-left: -150px;
        text-align: center;
        bottom: 0px;
    }

    .el-footer{
        position: relative;
    }
</style>