// 載入官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 匯出給 entry (main.js) 使用
export default new VueRouter({
    // 定義路徑 (routes)
    routes: [
        {
            name: '首頁', // 元件呈現的名稱
            path: '/', // 對應的虛擬路徑
            component: () => import('@/pages/common/header'),
            children:[
                {
                    name:'登入',
                    path:'',
                    component: () => import('@/pages/login'),
                },
                {
                    name:'註冊',
                    path:'register',
                    component: () => import('@/pages/register'),
                },
                {
                    name:'快速取碼',
                    path:'smspva',
                    component: () => import('@/pages/smspva'),
                    // meta: { requiresAuth: true },
                },
                {
                    name:'儲值',
                    path:'deposit',
                    component: () => import('@/pages/deposit'),
                }
            ]
        },
        {
            name: '後台',
            path: '/admin',
            component: () => import('@/pages/admin/common/header'),
            children:[
                {
                    name: '交易紀錄',
                    path:'transactions',
                    component: () => import('@/pages/admin/transactions')
                },
                {
                    name: '會員資料',
                    path:'membersInfo',
                    component: () => import('@/pages/admin/membersInfo')
                }
            ]
        }
    ]
});