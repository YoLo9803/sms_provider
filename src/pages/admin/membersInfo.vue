<template>
    <div>
        <div class="center">
            <el-select v-model="userForm.id" filterable style="width:400px" placeholder="請選擇帳戶或搜尋" @change="selectUser">
                <el-option
                    v-for="user in users"
                :key="user.id"
                :label="user.account"
                :value="user.id">
                </el-option>
            </el-select>
        </div>

        <el-row type="flex" justify="center"> 
            <el-form :model="userForm" :rules="rules" ref="userForm">
                    <el-form-item prop="account" label="信箱">
                        <el-input v-model="userForm.account" placeholder='電子郵件' prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop='fund' label="儲值金">
                        <el-input v-model="userForm.fund" placeholder="儲值金" prefix-icon="el-icon-wallet"></el-input>
                    </el-form-item>
                    <el-form-item prop='type' label="帳號身分">
                        <el-select v-model="userForm.type" placeholder="請選擇" prefix-icon="el-icon-key">
                            <el-option
                            v-for="role in roles"
                            :key="role.value"
                            :label="role.label"
                            :value="role.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <div v-if="errorInfo" class="center">
                    <span style="color: red">{{errInfo}}</span>
                </div>
                <div class="center">
                    <el-button class='submit-button' type="primary" @click.prevent="submitForm('userForm')">修改</el-button>
                </div>
            </el-form>
        </el-row>
    </div>
</template>

<script>
export default {
    created(){
        // if(this.$route.params.isAdmin != true){
        //     this.$message({
        //         message: '請先登入',
        //         type: 'warning'
        //     });
        //     this.$router.push({
        //         name: '登入'
        //     });
        // }
        this.users = this.getUsers();
    },
    methods:{
        selectUser(){
            for(var index in this.users){
                if(this.users[index].id == this.userForm.id){
                    var user = this.users[index];
                    this.userForm.id = user.id;
                    this.userForm.account = user.account;
                    this.userForm.fund = user.fund;
                    this.userForm.type = user.type
                    break;
                }
            }
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //修改user api
                    this.$http.post('/api/user/update', this.userForm)
                    .then((respoonse) =>{
                        console.log(respoonse)
                        if(respoonse.data.affectedRows == '1'){
                            this.$message({
                                message: '修改會員資料成功!',
                                type: 'success'
                            });
                            this.userForm = {
                                id: '',
                                account: '',
                                fund: '',
                                type: '',
                            }
                            this.users = this.getUsers();
                        }
                        else{
                            this.$message.error('修改會員資料失敗, 請確認信箱是否重複, 或儲值金額是否錯誤')
                        }
                    }).catch((err) =>{
                        console.error(err);
                        this.$message.error('修改會員資料失敗, 請確認信箱是否重複, 或儲值金額是否錯誤')
                    })
                    console.log(this.userForm);
                }
                else{
                    console.log('error submit!!');
                }
            });
        },
        getUsers(){
            this.$http.get('/api/user')
            .then((response) => {
                this.users = response.data;
            }).catch((err) =>{
                console.error(err);
            })
        }
    },
    data(){
        return{
            errorInfo : false,
            userForm: {
                    id: '',
                    account: '',
                    fund: '',
                    type: '',
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
                fund: [
                    { required: true, message: '請輸入儲值金金額', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '請選擇帳戶等級', trigger: 'blur'}
                ]
            },
            roles:[
                {
                    label: '系統管理員',
                    value: '1'
                },
                {
                    label: '消費者',
                    value: '2'
                }
            ],
            users: []
        }
    }
}
</script>

<style scoped>
    .deposit-row{
        background: #a0e2ab;
    }

    .consumption-row{
        background: #e8e18c;
    }
    
    .center{
        text-align: center;
        margin-bottom: 20px;
    }
</style>