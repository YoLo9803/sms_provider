<template>
    <div>
        <h2 class="header">{{account}}</h2>
        <h2 class="header">{{fund}}</h2>
        <router-view v-on:childInit="onChildInit"></router-view>
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
        };
    },
    methods:{
        onChildInit( value ){
            console.log('event triggerd');
            console.log(value);
            this.account += value.account;
            this.fund +=value.fund;
        }
    }
}
</script>

<style scoped lang='scss'>
    .header {
        background-color: #0fb0ef;
    }
</style>