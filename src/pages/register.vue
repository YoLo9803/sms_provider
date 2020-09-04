<template>
    <div>
        <div class='register-title'>會員註冊</div>
        <div class='register-form'>
            <el-form>
                <el-form-item prop="account">
                    <el-input placeholder='帳號'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="密碼"></el-input>
                </el-form-item>
                <div>
                    <el-button class='register-button' type="primary">註冊</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {};
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
        background: rgb(199, 199, 198);
    }
</style>