<template>
    <div>
            <el-row :gutter="10" type="flex" justify="center">
                <el-col :span="3">
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
                <el-col :span="4">
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
                <el-col :span="1">
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
            <el-col :span="14">
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
                        <el-input size="mini" style="width: 150px" v-if="!scope.row.sms == ''" v-model="scope.row.sms"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini" v-if="scope.row.isRestoreButtonEnabled"
                        @click.prevent="handleRestore(scope.$index, scope.row)">回復</el-button>
                        <el-button
                        size="mini"
                        type="danger" v-if="scope.row.isDeleteButtonEnabled"
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
        this.userId = this.$route.params.userId;
    },
    data(){
        return {
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

            numberData: [
                // {
                //     id: 123,
                //     time: '10:00',
                //     timer: 600000,//十分鐘的總秒數
                //     country: '+62indonesia印度尼西亞',
                //     number: 123,
                //     countryAPICode : 123,
                //     service: 'Line33333',
                //     serviceAPICode: 123,
                //     sms: '',
                //     isEnabled: true,
                //     isRestoreButtonEnabled: false,
                //     isDeleteButtonEnabled: true,
                //     isGetMessageButtonVisible: true 
                // }
            ]
            };
    },
    methods:{
        getNumber(){
            if (this.service == '' || this.country == ''){
                this.errorInfo = true;
                this.errInfo = '請選擇服務與國家';
            }
            else{
                this.errorInfo = false;
                this.errInfo = '';
                this.$http.get('/api/user/' + this.userId + '/fund')
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
                                            userId: this.userId,
                                            amount: amount
                                        }).
                                        then(() => {
                                            this.$emit('updateHeader', {
                                                fund: amount
                                            });
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

        handleRestore(index, row){
            row.isEnabled = true;
            row.isDeleteButtonEnabled = true;
            row.isRestoreButtonEnabled = false;
            row.isGetMessageButtonVisible = true;
            row.sms = '';
        },

        handleDelete(index, row){
            row.isEnabled = false;
            row.isRestoreButtonEnabled = true;
            row.isDeleteButtonEnabled = false;
            row.isGetMessageButtonVisible = false;
            row.sms = '';
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
                    row.isDeleteButtonEnabled = false;
                    row.isRestoreButtonEnabled = false;
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
                            row.sms = '請再試一次';
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
                    row.isDeleteButtonEnabled = false;
                    row.isRestoreButtonEnabled = false;
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
                    item.isEnabled = item.isRestoreButtonEnabled = item.isDeleteButtonEnabled = item.isGetMessageButtonVisible = false;
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
                isRestoreButtonEnabled: false,
                isDeleteButtonEnabled: true,
                isGetMessageButtonVisible: true 
            })
        }
    }
}
// //擴充arrary.remove方法
// Array.prototype.remove = function() {
//     var what, a = arguments, L = a.length, ax;
//     while (L && this.length) {
//         what = a[--L];
//         while ((ax = this.indexOf(what)) !== -1) {
//             this.splice(ax, 1);
//         }
//     }
//     return this;
// };
</script>

<style>
  .el-table .deleted-row {
    /* background: lightcoral; */
    opacity: 0.8;
  }
</style>