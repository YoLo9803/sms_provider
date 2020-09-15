<template>
    <div>
        <div class="right">
            <el-tag v-if="this.user.isLogin" effect="plain">
                <i v-if="this.user.isLogin" class="el-icon-user" style="padding:10px"></i>
                {{this.user.account}}
            </el-tag>
        </div>
        <div class="right">
            <el-tag type="success" effect="plain" v-if="this.user.isLogin">
                <i v-if="this.user.isLogin" class="el-icon-wallet" style="padding:10px"></i>
                ${{this.user.fund}}
                <el-button style="color:green;" type="text" @click.prevent="directToDepositPage">儲值</el-button>
            </el-tag>
        </div>
            <el-row :gutter="10" type="flex" justify="center">
                <el-col :xs="6" :sm="5" :md="4" :lg="3" :xl="2">
                    <div>
                        <el-select value-key="value" v-model="service" clearable filterable placeholder="選擇服務或搜尋">
                        <el-option
                        v-for="service in services"
                        :key="service.value"
                        :label="service.name"
                        :value="service">
                        </el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="5" :md="4" :lg="4" :xl="3">
                    <div>
                        <el-select value-key="value" v-model="country" clearable filterable placeholder="選擇國家或搜尋">
                            <el-option
                            v-for="country in countrys"
                            :key="country.value"
                            :label="country.EName+country.CName+country.Code+ '  $' +country.price"
                            :value="country">
                            <span style="float: left; font-size: 13px">{{ country.Code }}</span>
                            <span style="float: left">{{ country.CName }}</span>
                            <span style="float: left">{{ country.EName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ "$" + country.price }}</span>
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="5" :md="1" :lg="1" :xl="1">
                    <div>
                        <el-popconfirm
                            title="確定取碼嗎?" @onConfirm="getNumber">
                        <el-button type="primary" slot="reference">快速取碼</el-button>
                        </el-popconfirm>
                    </div>
                </el-col>
            </el-row>
            <div v-if="errorInfo">
                    <span style="color: red">{{errInfo}}</span>
            </div>
        <el-row type="flex" justify="center">
            <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
            <div>
                <el-table
                :data="numberData"
                :row-class-name="tableRowClassName"
                v-if="this.numberData.length>0"
                style="width: 100%">
                <el-table-column
                    prop="time"
                    label="倒數時間">
                </el-table-column>
                <el-table-column
                    prop="country"
                    label="國家">
                </el-table-column>
                <el-table-column
                    prop="service"
                    label="服務"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="號碼">
                </el-table-column>
                <el-table-column
                    prop="sms"
                    label="接收代碼"
                    width="300">
                    <template slot-scope="scope">
                        <el-button
                        size="mini" v-if="scope.row.isGetMessageButtonVisible"
                        type="primary"
                        @click.prevent="handleGetMessage(scope.$index, scope.row)">接收訊息</el-button>
                        <span>{{scope.row.sms}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger" v-if="scope.row.isDeleteButtonVisiable"
                        @click.prevent="handleDelete(scope.$index, scope.row)">刪除</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    created(){
        if(this.$route.params.user != undefined){
            this.user = this.$route.params.user;
        }
        else if(this.$route.params.userId == undefined){
            this.$message({
                message: '請先登入',
                type: 'warning'
            });
            this.$router.push({
                name: '登入'
            });
        }
        else{
            this.$http.get('/api/user/' + this.$route.params.userId + '/accountInfo')
                .then((res)=>{
                    this.user = {
                        id: res.data.id,
                        account: res.data.account,
                        fund: res.data.fund,
                        isLogin: true
                    }
                })
        }
    },
    data(){
        return {
            user: [],
            errorInfo : false,
            //select item data
            services: [{
            value: 'opt37',
            name: 'Line'
            }],
            service: '',

            countrys: [{
            value: 'MY',
            Code: '+60',
            CName: '馬來西亞',
            EName: 'Malaysia',
            price: 35
            }, {
            value: 'ID',
            Code: '+62',
            CName: '印度尼西亞',
            EName: 'Indonesia',
            price: 30
            }, {
            value: 'PT',
            Code: '+351',
            CName: '葡萄牙',
            EName: 'Portugal',
            price: 30
            }],
            country: '',

            numberData: []
            };
    },
    methods:{
        directToDepositPage(){
            this.$router.push({
                name: '儲值',
                params:{
                    user: this.user
                }
            })
        },
        getNumber(){
            if (this.service == '' || this.country == ''){
                this.errorInfo = true;
                this.errInfo = '請選擇服務與國家';
            }
            else{
                this.errorInfo = false;
                this.errInfo = '';
                this.$http.get('/api/user/' + this.user.id + '/fund')
                    .then((res) => {
                        var fund = res.data.fund;
                        if (fund >= this.country.price){
                            this.$http.get('/api/smspva/getnumber', {
                                params: {service: this.service.value, 
                                        country: this.country.value}
                                })
                                .then((response) => {
                                    if(response.data['response'] == "1"){
                                        // TODO: 取碼table影響寫這
                                        var amount  = fund -= this.country.price;
                                        this.$http.post('api/user/setAmountOfFund', {
                                            userId: this.user.id,
                                            amount: amount
                                        }).
                                        then(() => {
                                            this.user.fund = amount;
                                            var smsPvaData = {
                                                country: this.country.Code + this.country.CName + this.country.EName,
                                                service: this.service.name,
                                                countryAPICode : this.country.value,
                                                serviceAPICode: this.service.value,
                                                number: response.data.number,
                                                id: response.data.id,
                                            }
                                            this.appendTable(smsPvaData);
                                            this.startCountDown(this.numberData[this.numberData.length - 1]);
                                            this.$message({
                                                message: '取碼成功, 從帳戶扣除' + this.country.price + '元',
                                                type: 'success'
                                            });
                                        });
                                        this.$http.post('api/payment/createConsumptionRecored', {
                                                userId: this.user.id,
                                                amount: this.country.price,
                                                service: this.service.value,
                                                country: this.country.value
                                        });
                                    }
                                    else{
                                        this.errorInfo = true;
                                        this.errInfo = '取碼失敗, 取消扣款, 請再試一次';
                                        console.error(response.data);
                                    }
                                }).catch((err) => {
                                    console.error(err);
                                    return;
                                });
                        }
                        else{
                            this.errorInfo = true;
                            this.errInfo = '餘額不足, 請確認儲值金額';
                            return;
                        }
                    }).catch((err) => {
                        console.error(err);
                        return;
                    });
            }
        },

        handleDelete(index){
            this.numberData.splice(index, 1);
        },

        handleGetMessage(index, row){
            this.$http.get('/api/smspva/getSms',
                {
                    params:{
                        country: row.countryAPICode,
                        service: row.serviceAPICode,
                        id: row.id
                    }
                }
            ).then((response) =>{
                if(response.data.response == "1"){
                    row.sms = response.data.sms;
                    row.isGetMessageButtonVisible = false;
                    row.isEnabled =false;
                    this.$message({
                        message: '成功取得訊息!',
                        type: 'success'
                    });
                    this.$http.get('/api/smspva/ban', {
                        params:{
                            service: row.serviceAPICode,
                            id: row.id
                        }
                    })
                }
                else if (response.data.response == "2"){
                    this.$message('未接收到訊息, 請20秒後再試一次');
                    var timer = 20000;
                    row.isGetMessageButtonVisible = false;
                    row.sms = '請20秒後再試一次';
                    var clock = window.setInterval(() => {
                        timer -= 1000;
                        row.sms = '請' + (timer/1000) + '秒後再試一次';
                        row.isGetMessageButtonVisible = false;
                        if (timer == 0){
                            row.isGetMessageButtonVisible = true;
                            row.sms = '';
                            window.clearInterval(clock);
                            return;
                        }
                    }, 1000);
                }
                else{
                    this.$message({
                        message: '此號碼已超過時限或是完成訊息接收',
                        type: 'warning'
                    });
                    row.isGetMessageButtonVisible = false;
                    row.isDeleteButtonVisiable = false;
                    row.isEnabled =false;
                    row.sms == '';
                }
                
            }).catch((err) => {
                console.error(err);
            })
        },

        tableRowClassName({row}){
            return row.isEnabled ?  '' :  'deleted-row';
        },

        startCountDown(item){
            var clock = window.setInterval(() => {
                item.timer -= 1000;
                var minutes = Math.floor((item.timer/1000/60) % 60)
                var seconds = Math.floor((item.timer/1000) % 60)
                item.time = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
                if (item.timer == 0){
                    window.clearInterval(clock);
                    item.isEnabled = item.isDeleteButtonVisiable = item.isGetMessageButtonVisible = false;
                    item.sms = '';
                    return;
                }
            }, 1000);
        },
        appendTable(data){
            this.numberData.push({
                id: data.id,
                time: '10:00',
                timer: 600000,//十分鐘的總秒數
                country: data.country,
                number: data.number,
                countryAPICode : data.countryAPICode,
                service: data.service,
                serviceAPICode: data.serviceAPICode,
                sms: '',
                isEnabled: true,
                isDeleteButtonVisiable: true,
                isGetMessageButtonVisible: true 
            })
        }
    }
}
</script>

<style>
  .el-table .deleted-row {
    opacity: 0.8;
    }
  .right{
    text-align: right;
    font-size: 16px;
    }
</style>