<template>
    <div id="app">
        <el-container>
        <el-header class="header">我是header</el-header>
        <el-container class="content">
            <el-aside class="aside">
                <el-button type='primary'>測試按鈕</el-button>
            </el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return {};
    }
}
</script>

<style lang="scss">
.header {
  background-color: #0fb0ef;
}
.content {
  height:calc(100vh - 50px);
  .aside {
    width: 200px;
  }
  .main {
    background-color: #e8e5e5;
  }
}
</style>