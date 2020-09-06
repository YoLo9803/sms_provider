<template>
    <div>
        <h2 class="header">{{account}}</h2>
        <h2 class="header">{{fund}}</h2>
        <router-view v-on:updateHeader="updateUserInfo"></router-view>
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
            accountId : this.accountId,
            fund : this.fund,
            account : this.account
        };
    },
    methods:{
        updateUserInfo(value){
            console.log('event trigger');
            this.accountId = value.id == undefined ? this.accountId : value.id;
            this.account = value.account == undefined ? this.account : value.account;
            this.fund = value.fund == undefined ? this.fund : value.fund;
        }
    }
}
</script>

<style scoped lang='scss'>
    .header {
        background-color: #0fb0ef;
    }
</style>