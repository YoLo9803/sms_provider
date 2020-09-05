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
                    console.log(JSON.stringify(this.ruleForm));
                    this.$http.post('/api/user/login', JSON.stringify(this.ruleForm))
                    .then((response) => {
                        if (response.data == 0){
                            this.errorInfo = true;
                            this.errorInfo = '查無此帳號, 請確認電子郵件是否輸入正確';
                        }
                        else if(response.data == -1){
                            this.errorInfo = true;
                            this.errorInfo = '密碼錯誤';
                        }
                        else if(response.status == 200){
                            console.log('login success');
                        }
                    })
                    .then((err)=>{
                        console.log(err);
                    })
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
        background: rgb(224, 224, 224);
    }
</style>