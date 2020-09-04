// 載入官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Page from '@/pages/page';

Vue.use(VueRouter);

// 匯出給 entry (main.js) 使用
export default new VueRouter({
    // 定義路徑 (routes)
    routes: [
        {
            name: '首頁', // 元件呈現的名稱
            path: '/index', // 對應的虛擬路徑
            component: HelloWorld, // 對應的元件
        },
        {
            name: '分頁',
            path: '/page',
            component: Page,
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