<template>
    <div>
        <div class='register-title'>會員註冊</div>
        <div class='register-form'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder='電子郵件' prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input v-model="ruleForm.password" placeholder="密碼" prefix-icon="el-icon-lock" show-password></el-input>
                </el-form-item>
                <div v-if="errorInfo">
                    <span style="color: red">{{errInfo}}</span>
                </div>
                <div>
                    <el-button class='register-button' type="primary" @click.prevent="submitForm('ruleForm')">註冊</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        //註冊
        submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/api/user/register', this.ruleForm)
                        .then((response) => {
                            console.log(response.data);
                            if (response.data == 1){
                                this.errorInfo = false;
                                this.errInfo = '';
                                this.$message({
                                    message: '成功創立帳戶! 重新導向至登入頁面',
                                    type: 'success'
                                });
                                this.$router.push({
                                    name: '登入'
                                });
                            }
                            else if(response.data == 0){
                                this.errorInfo = true;
                                this.errInfo = '此電子郵件已有人使用, 請使用其他電子郵件建立帳戶';
                            }
                            else{
                                this.errorInfo = true;
                                this.errInfo = '建立失敗, 請聯絡網站管理員';
                            }
                            
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    }
                    else{
                        console.log('error submit!!');
                    }
                });
            }
    },
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
    }
}
</script>

<style scoped lang="scss">
    .register-title{
        text-align: center;
        font-size:30px;
        color: black;
    }
    .register-button{
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
    .register-form{
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