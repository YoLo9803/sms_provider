<template>
    <div>
        <el-input v-model.number="amount" type='text' placeholder="請輸入儲值金額"></el-input>
        <div v-if="errorInfo">
            <span style="color: red">{{errorInfoText}}</span>
        </div>
        <el-button @click.prevent="handleDeposit" type="primary">儲值(點選後將直接開始付款!)</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
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
            }
            console.log(this.amount);
        }
    }
}
</script>

