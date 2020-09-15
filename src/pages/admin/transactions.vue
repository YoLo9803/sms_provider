<template>
    <div>
        <el-row :gutter="10" type="flex" justify="center">
            <el-col :span="6">
                <div>
                    <el-select v-model="selectedUsers" multiple filterable collapse-tags style="width:300px" placeholder="請選擇帳戶或搜尋">
                        <el-option
                            v-for="user in users"
                        :key="user.id"
                        :label="user.account"
                        :value="user.id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <el-button type="primary" @click.prevent="searchTransactions">搜尋</el-button>
                </div>
            </el-col>
        </el-row>
        <div>
            <el-table
                :data="transactionData"
                :row-class-name="tableRowClassName"
                style="width: 100%">
                <el-table-column
                    prop="account"
                    label="用戶">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="消費種類">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="金額">
                </el-table-column>
                <el-table-column
                    prop="isFinish"
                    label="是否完成付款">
                </el-table-column>
                <el-table-column
                    prop="country"
                    label="國家">
                </el-table-column>
                <el-table-column
                    prop="service"
                    label="服務">
                </el-table-column>
                </el-table>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.selectedUsers = this.getUsers();
    },
    methods:{
        searchTransactions(){
            console.log(this.selectedUsers);
            this.$http.get('api/payment',
                {
                    params:{
                        userIds: this.selectedUsers
                    }
                })
            .then((response) =>{
                console.log(response.data);
                this.formatTransactionData(response.data);
            })
        },
        formatTransactionData(transactions){
            var data = [];
            transactions.forEach(item => {
                if(isNaN(item.statusOrCountry)){
                    console.log(item.statusOrCountry);
                    var country = this.countrys[item.statusOrCountry];
                    var service = this.services[item.tradeNoOrService];
                    data.push({
                        account: item.account,
                        type: '取碼',
                        amount: item.amount,
                        isFinish: '已付款',
                        country: country,
                        service: service
                    })
                }
                else{
                    data.push({
                        account: item.account,
                        type: '儲值',
                        amount: item.amount,
                        isFinish: item.statusOrCountry == '0' ? '尚未付款' : '已付款',
                        country: '-',
                        service: '-'
                    })
                }
                this.transactionData = data;
            });
        },
        getUsers(){
            this.$http.get('/api/user')
            .then((response) => {
                this.users = response.data;
            }).catch((err) =>{
                console.error(err);
            })
        },
        tableRowClassName({row}){
            return row.type == '取碼' ?  'deposit-row' :  'consumption-row';
        },
    },
    data(){
        return{
            selectedUsers: [],
            users: [],
            transactionData: [],
            services:{
                opt37: "Line"
            },
            countrys:{
                MY: "+60馬來西亞Malaysia",
                PT: "+351葡萄牙Portugal",
                ID: "+62印度尼西亞Indonesia",
            }
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
</style>