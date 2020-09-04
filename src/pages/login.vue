<template>
    <div>
        <div class='login-title'>會員登入</div>
        <div class='login-form'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder='電子郵件'></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input v-model="ruleForm.password" placeholder="密碼"></el-input>
                </el-form-item>
                <div v-if="errorInfo">
                    <span style="color: red">{{errInfo}}</span>
                </div>
                <div>
                    <el-button class='login-button' type="primary" @click="submitForm('ruleForm')">登陸</el-button>
                </div>
                    <router-link class='register-router-link' to='register'>註冊</router-link>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            errorInfo : false,
            ruleForm: {
                    account: '',
                    password: '',
            },
            rules: {
                account: [
                    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
                    {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        message: '請輸入電子郵件格式',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '請輸入密碼', trigger: 'blur' },
                    { min: 2, max: 18, message: '密碼長度應為2~18個字元'}
                ]
            }
        };
    },
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('sucess!!');
                    // 之後錯誤的話, 用這兩行
                    // this.errorInfo = true;
                    // this.errInfo = '錯誤';
                }
                else{
                    console.log('error submit!!');
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
    .login-title{
        // position: relative;
        // top:40%;
        // width:100%;
        // margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: black;
    }
    .login-button{
        text-align: center;
        width:30%;
        height:36px;
    }
    .register-router-link{
        font-size:16px;
        line-height:30px;
        color: gray;
        cursor: pointer;
        float:right;
    }
    .login-form{
        position: relative;
        left:50%;
        top:20px;
        width:300px;
        height:200px;
        padding:30px;
        transform:translateX(-50%);
        border-radius: 10px;
        background: rgb(199, 199, 198);
    }
</style>