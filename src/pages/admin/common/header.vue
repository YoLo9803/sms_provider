<template>
    <el-container>
        <el-header>管理後台</el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col>
                        <el-menu
                        default-active="1" 
                        router
                        @select="handleSelect"
                        class="el-menu-vertical-demo">
                        <el-menu-item index="1" :route="{path: 'admin/transactions'}">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">查詢交易紀錄</span>
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
    background-color: #94d6f5;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 36px;
    }
    
    .el-aside {
        height: 100%;
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
</style>