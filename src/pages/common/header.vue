<template>
    <div>
        <el-header class="header">header</el-header>
        <h2 class="header">{{title}}</h2>
        <router-view v-on:childInit="onChildInit"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title : '原本的Title',
        };
    },
    methods:{
        onChildInit( value ){
            console.log('event triggerd');
            console.log(value);
            this.title = value;
        }
    }
}
</script>

<style scoped lang='scss'>
    .header {
        background-color: #0fb0ef;
    }
</style>