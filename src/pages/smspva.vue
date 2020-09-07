<template>
    <div>
            <el-select value-key="value" v-model="service" clearable filterable placeholder="選擇服務或搜尋">
                <el-option
                v-for="service in services"
                :key="service.value"
                :label="service.name"
                :value="service">
                </el-option>
            </el-select>
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
            <div v-if="errorInfo">
                    <span style="color: red">{{errInfo}}</span>
            </div>
        <el-button type="primary" @click.prevent="getNumber">快速取碼</el-button>
        <div>
            <el-table
            :data="numberData"
            style="width: 100%">
            <el-table-column
                prop="time"
                label="倒數時間"
                width="180">
            </el-table-column>
            <el-table-column
                prop="country"
                label="國家"
                width="180">
            </el-table-column>
            <el-table-column
                prop="number"
                label="號碼">
            </el-table-column>
            <el-table-column
                prop="sms"
                label="接收代碼">
                <!-- <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">回復</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
                </template> -->
            </el-table-column>
            <el-table-column
                prop="sms"
                label="接收代碼">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">回復</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
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

            numberData: [{
                time: '13:01',
                country: '馬來西亞',
                number: '097912044',
                sms : '123'
                }, {
                time: '13:01',
                country: '馬來西亞',
                number: '123323213',
                sms : '訊息'
                }, {
                time: '13:02',
                country: '葡萄牙',
                number: '424234234',
                sms : '訊息'
                }, {
                time: '17:22',
                country: '印度尼西亞',
                number: '123123123123',
                sms : ''
                }],
                search: ''

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
                // console.log(this.service.value + this.country.value + this.country.price);
                this.$http.get('/api/user/' + this.userId + '/fund')
                    .then((res) => {
                        var fund = res.data.fund;
                        if (fund >= this.country.price){
                            this.$http.get('/api/smspva/getnumber', {
                                params: {service: this.service.value, 
                                        country: this.country.value}
                                })
                                .then((response) => {
                                    // console.log(response.data['number']);
                                    if(response.data['response'] == "1"){
                                        // TODO: 取碼table影響寫這
                                        console.log('扣款');
                                        var amount  = fund -= this.country.price;
                                        this.$http.post('api/user/setAmountOfFund', {
                                            userId: this.userId,
                                            amount: amount
                                        }).
                                        then(() => {
                                            console.log(amount);
                                            this.$emit('updateHeader', {
                                                fund: amount
                                            });
                                            console.log(response.data);
                                            console.log('取碼成功');

                                        });
                                    }
                                    else{
                                        this.errorInfo = true;
                                        this.errInfo = '取碼失敗, 取消扣款, 請再試一次';
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
                
                // this.$http.get('/api/smspva/getnumber', {
                //         params: {service: this.service.value, 
                //                 country: this.country.value}
                //         })
                //     .then((response) => {
                //         console.log(response.data);
                //     })
                // console.log(accountId);
            }
        }
    }
}
</script>