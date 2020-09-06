<template>
    <div>
        <h2 class="header">{{account}}</h2>
        <h2 v-on:deduction="onDeduction" class="header">{{fund}}</h2>
        <router-view v-on:login="onLogin"></router-view>
    </div>
</template>

<script>
export default {
    created(){
        this.accountId = -1,
        this.account = '帳戶: ',
        this.fund = '儲值金: '
    },
    data(){
        return {
            accountId : this.accountId
        };
    },
    methods:{
        onLogin(value){
            console.log('login event trigger');
            this.accountId = value.id;
            this.account = value.account;
            this.fund = value.fund;
        },
        onDeduction(value){
            console.log('event triggerd');
            this.fund = value;
        }
    }
}
</script>

<style scoped lang='scss'>
    .header {
        background-color: #0fb0ef;
    }
</style>