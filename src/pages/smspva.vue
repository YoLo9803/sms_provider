<template>
    <div>
            <el-select v-model="service" clearable filterable placeholder="選擇服務或搜尋">
                <el-option
                v-for="item in services"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="country" clearable filterable placeholder="選擇國家">
                <el-option
                v-for="item in countrys"
                :key="item.key"
                :label="item.label"
                :value="item.countryCode">
                <span style="float: left">{{ item.countryCName }}</span>
                <span style="float: left">{{ item.countryEName }}</span>
                <span style="float: left; font-size: 13px">{{ item.countryCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ "$" + item.price }}</span>
                </el-option>
            </el-select>
        <el-button type="primary">快速取碼</el-button>
        <div>
            <el-table
            :data="tableData"
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
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template>
                    <el-button type="text" size="small">回復</el-button>
                    <el-button type="text" size="small">刪除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            services: [{
            value: 'opt37',
            label: 'Line'
            }],
            service: '',

            countrys: [{
            key: 'MY',
            countryCode: '+60',
            countryCName: '馬來西亞',
            countryEName: 'Malaysia',
            price: 35
            }, {
            key: 'ID',
            countryCode: '+62',
            countryCName: '印度尼西亞',
            countryEName: 'Indonesia',
            price: 30
            }, {
            key: 'PT',
            countryCode: '+351',
            countryCName: '葡萄牙',
            countryEName: 'Portugal',
            price: 30
            }],
            country: ''

        };
    }
}
</script>