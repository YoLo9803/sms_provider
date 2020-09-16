<template>
    <el-container>
        <el-header>管理後台</el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col>
                        <el-menu
                        :default-active="$route.path"
                        router
                        @select="handleSelect">
                        <el-menu-item index='/admin/transactions' :route="{path: '/admin/transactions', params:{ isAdmin: true}}">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">查詢交易紀錄</span>
                        </el-menu-item>
                        <el-menu-item index='/admin/membersInfo' :route="{path: '/admin/membersInfo', params:{ isAdmin: true}}">
                            <i class="el-icon-user"></i>
                            <span slot="title">修改會員資料</span>
                        </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created(){
        if(this.$route.params.isAdmin != true){
            this.$message({
                message: '請先登入',
                type: 'warning'
            });
            this.$router.push({
                name: '登入'
            });
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    data(){
        return{
        }
    }
}
</script>

<style scoped>
    .el-header {
    background-color:#214366;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 36px;
    color: white;
    }
    
    .el-aside {
        height: 100%;
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
</style>