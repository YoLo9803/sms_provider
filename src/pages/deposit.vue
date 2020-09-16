<template>
    <div>
        <div class="middle">
            <el-tag v-if="this.user.isLogin" effect="plain">
                <i v-if="this.user.isLogin" class="el-icon-user" style="padding:10px"></i>
                {{this.user.account}}
                <i v-if="this.user.isLogin" class="el-icon-wallet" style="padding:10px"></i>
                ${{this.user.fund}}
            </el-tag>
            <el-tag v-if="this.user.isLogin" effect="plain" type="success" style="margin-left:10px">
                <el-link :underline="false" type="success" disabled @click.prevent="directToDepositPage">儲值</el-link>
            </el-tag>
        </div>
            <div class="left">
                <el-page-header @back="goBack"></el-page-header>
            </div>
        <div class="padding">
        <el-row type="flex" justify="center">
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
            <el-input v-model.number="amount" type='text' placeholder="請輸入儲值金額"></el-input>
            <div v-if="errorInfo">
                <span style="color: red">{{errorInfoText}}</span>
            </div>
            </el-col>
        </el-row>
        </div>
        <div class="padding">
        <el-row type="flex" justify="center">
            <el-button @click.prevent="handleDeposit" type="primary">儲值(點選後將直接開始付款!)</el-button>
        </el-row>
        </div>
    </div>
    
</template>

<script>
export default {
    created(){
        if(this.$route.params.user == undefined){
            this.$message({
                message: '請先登入',
                type: 'warning'
            });
            this.$router.push({
                name: '登入'
            });
        }
        else{
            this.user = this.$route.params.user;
        }
    },
    data(){
        return{
            user: [],
            payment: this.payment,
            amount: this.amount,
            errorInfo:false,
            errorInfoText: '',
            rules:{
                amount:[
                    { required: true, message: '請輸入儲值金額', trigger: 'blur' },
                    { type: 'number', message: '只能輸入數字', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        handleDeposit(){
            if (this.amount == undefined || this.amount == ''){
                this.errorInfo = true;
                this.errorInfoText = '請輸入儲值金額';
            }
            else if (this.amount > 3000){
                this.errorInfo = true;
                this.errorInfoText = '儲值金額請在3000元以下';
            }
            else if(this.amount < 0){
                this.errorInfo = true;
                this.errorInfoText = '請輸入有效的儲值金額';
            }
            else{
                this.errorInfo = false;
                this.errorInfoText = '';
                console.log(this.amount);
                console.log('金額無誤, 跳至付款畫面')
                // this.$http.get('/api/user/payment/payAction')
                // .then((response) => {
                //     console.log(response.data);
                //     return response.data;
                // });
                window.location.href = "https://smspvabackend.herokuapp.com/api/payment/payAction?price=" + this.amount + '&userId=' + this.user.id;
            }
        },
        goBack(){
            this.$router.push({
                name: '快速取碼',
                params: {
                    user: this.user
                }
            });
        }
    }
}
</script>

<style>
  .right{
    /* background-color: #c1dafb; */
    text-align: right;
    font-size: 16px;
    }
    .left{
    /* background-color: #c1dafb; */
    text-align: left;
    font-size: 16px;
    }
    .padding{
        padding:10px;
    }
    .middle{
      text-align: center;
      margin-bottom: 20px;
  }
</style>

