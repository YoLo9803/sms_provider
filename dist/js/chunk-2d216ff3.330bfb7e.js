(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216ff3"],{c59d:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-input",{attrs:{type:"text",placeholder:"請輸入儲值金額"},model:{value:t.amount,callback:function(e){t.amount=t._n(e)},expression:"amount"}}),t.errorInfo?r("div",[r("span",{staticStyle:{color:"red"}},[t._v(t._s(t.errorInfoText))])]):t._e(),r("el-button",{attrs:{type:"primary"},on:{click:function(e){return e.preventDefault(),t.handleDeposit(e)}}},[t._v("儲值(點選後將直接開始付款!)")])],1)},o=[],a={data:function(){return{payment:this.payment,amount:this.amount,errorInfo:!1,errorInfoText:"",rules:{amount:[{required:!0,message:"請輸入儲值金額",trigger:"blur"},{type:"number",message:"只能輸入數字",trigger:"blur"}]}}},methods:{handleDeposit:function(){void 0==this.amount||""==this.amount?(this.errorInfo=!0,this.errorInfoText="請輸入儲值金額"):this.amount>3e3?(this.errorInfo=!0,this.errorInfoText="儲值金額請在3000元以下"):this.amount<0?(this.errorInfo=!0,this.errorInfoText="請輸入有效的儲值金額"):(this.errorInfo=!1,this.errorInfoText="",console.log("金額無誤, 跳至付款畫面"),this.$http.get("/api/user/payment").then((function(t){return console.log(t.data),t.data})))}}},s=a,i=r("2877"),u=Object(i["a"])(s,n,o,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d216ff3.330bfb7e.js.map