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
                    meta: { requiresAuth: true },
                }
            ]
        }
            // children:[
            //     {
            //         name:'卡片 1',
            //         path:'',
            //         component: Child,
            //     }
        //         {
        //             name:'卡片 2',
        //             path:'child2',
        //             component: Child2,
        //         },
        //         {
        //             name:'卡片 2',
        //             path:'child3',
        //             component: Child3,
        //         }
        //     ]
        // },
        // {
        //     name: '分頁2',
        //     path: '/page2',
        //     component: Page2,
        // }
    ]
});