(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{104:function(e,t,s){},118:function(e,t,s){},242:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(91),c=s.n(a),r=(s(61),s(31)),o=s(26),l=s(60),i=s(92),d=s(58),b=s(93),u=s(2),j=[{title:"CALENDAR",path:"/pages/Calendar",icon:Object(u.jsx)(d.a,{}),cName:"side-menu-text"},{title:"TASKS",path:"/pages/Tasks",icon:Object(u.jsx)(i.a,{}),cName:"side-menu-text"},{title:"ENERGY",path:"/pages/Energy",icon:Object(u.jsx)(d.b,{}),cName:"side-menu-text"},{title:"LOG OUT",path:"/pages/Logout",icon:Object(u.jsx)(b.a,{}),cName:"side-menu-text"}],h=(s(104),s(0)),m=s.p+"static/media/CrystaLogo.3734c1e1.svg";var x=function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),s=t[0],a=t[1],c=function(){return a(!s)};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(h.b.Provider,{value:{color:"#fff"},children:Object(u.jsx)(o.b,{to:"#",className:"open-menu-arrow",class:"flex m-3 text-2xl flex hover:bg-green-200 rounded-md z-40 fixed",children:Object(u.jsx)(l.b,{onClick:c})})}),Object(u.jsx)("nav",{className:s?"side-menu active":"side-menu",children:Object(u.jsxs)("ul",{className:"side-menu-items",onClick:c,children:[Object(u.jsx)("li",{className:"side-menu-toggle",children:Object(u.jsx)(o.b,{to:"#",className:"open-menu-arrow",class:"text-2xl -pl3 hover:bg-green-200 rounded-md",children:Object(u.jsx)(l.a,{})})}),Object(u.jsx)("div",{className:"crysta-logo",class:"ml-10 -mt-14 mb-5",children:Object(u.jsx)("img",{src:m,alt:"CrystaLogo",class:"content-between"})}),j.map((function(e,t){return Object(u.jsx)("li",{className:e.cName,class:"flex flex-col text-xl pl-3 pt-9 font-semibold hover:bg-green-200 rounded-lg -pt-5 pb-6 pl-20 pr-16",children:Object(u.jsxs)(o.b,{to:e.path,children:[Object(u.jsx)("div",{class:"-ml-9 -mb-6",children:e.icon}),Object(u.jsx)("span",{children:e.title})]})},t)}))]})})]})},g=s(7),f=s(14),p=function(){var e=Object(f.b)().loginWithRedirect;return Object(u.jsx)("button",{className:"btn btn-primary btn-block",class:"font-medium text-gray-50 h-12 w-40 bg-green-400 rounded-3xl hover:bg-blue-400 transition duration-250 ease-linear",onClick:function(){return e()},children:"Log In | Sign Up"})},O=function(){return Object(u.jsx)("div",{className:"NavContainer",class:"flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen",children:Object(u.jsxs)("div",{class:"flex flex-col justify-center items-center bg-gray-50 h-1/3 w-1/3 rounded-3xl shadow-lg ",children:[Object(u.jsx)("div",{className:"crysta-logo",class:"",children:Object(u.jsx)("img",{src:m,alt:"CrystaLogo"})}),Object(u.jsx)("p",{class:"font-normal text-center mb-7 mt-7 mr-5 ml-5 text-xl",children:"Glad to see you! Make sure you've downloaded our energy tracker first."}),Object(u.jsx)("div",{className:"flex justify-center",children:Object(u.jsx)(p,{})})]})})};var v=function(){return Object(u.jsxs)("div",{className:"Calendar",class:"flex items-center justify-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen ",children:[Object(u.jsx)("h1",{class:"fixed text-black font-bold text-8xl",children:"Calendar."}),Object(u.jsx)("h1",{class:"mt-40 text-white font-semibold text-2xl",children:"Coming soon in a later release. In the meanwhile, check out our weekly newseltter for updates!"})]})};var y=function(){return Object(u.jsxs)("div",{className:"Tasks",class:"flex items-center justify-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen",children:[Object(u.jsx)("h1",{class:"fixed text-black font-bold text-8xl",children:"Tasks."}),Object(u.jsx)("h1",{class:"mt-40 text-white font-semibold text-2xl",children:"Coming soon in a later release. In the meanwhile, check out our weekly newseltter for updates!"})]})},w=(s(118),s(3)),N=s(4),k=s(6),C=s(5),I=s(98),D=s(30),S=s.n(D);var L=function(e){Object(k.a)(s,e);var t=Object(C.a)(s);function s(e){var n;return Object(w.a)(this,s),(n=t.call(this,e)).getDataFromDb=function(){},n.state={mongo_data:[],task_switches:[],labels:[],graphData:e.graphData},n}return Object(N.a)(s,[{key:"componentWillMount",value:function(){if(this.getGraphData(),this.getDataFromDb(),!this.state.IntervalIsSet){var e=setInterval(this.getDataFromDb,1e4);this.setState({IntervalIsSet:e})}}},{key:"componentWillUnmount",value:function(){this.state.IntervalIsSet&&(clearInterval(this.state.IntervalIsSet),this.setState({IntervalIsSet:null}))}},{key:"getGraphData",value:function(){var e=this;S.a.get("/api/getData").then((function(t){var s=t.data,n=Object.values(s)[1],a=[],c=[];e.setState({mongo_data:n}),n.forEach((function(e){c.push(e.hour),a.push(e.task_switches)})),console.log(a),console.log(c),console.log("Received task_switches!"),console.log(n),e.setState({graphData:{labels:c,datasets:[{label:"Task Switches",data:a,borderWidth:8,borderColor:"rgba(20, 177, 183, 0.4)",pointBackgroundColor:"rgb(77, 77, 77, 1)",tension:.4,pointRadius:8,legend:{position:"bottom"}}]}})}))}},{key:"render",value:function(){return Object(u.jsx)("div",{className:"energy-graph",children:Object(u.jsx)(I.a,{data:this.state.graphData,width:1580,height:750,options:{maintainAspectRatio:!0,responsive:!0}})})}}]),s}(n.Component);L.defaultProps={legendPosition:"bottom"};var E=L;var T=function(){return Object(u.jsx)("div",{className:"container-energy",class:"flex flex-col top-0 justify-items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen",children:Object(u.jsxs)("div",{className:"energy-menu",class:"flex bg-gray-50 shadow-md rounded-3xl h-5/6 w-5/6 m-auto",children:[Object(u.jsx)("div",{className:"energy-level-heading",class:"flex bg-green-400 h-8 w-64 rounded-3xl mt-2.5 ml-8 justify-center fixed",children:Object(u.jsx)("p",{class:"text-white mt-1.5 font-semibold text-sm",children:"YOUR ENERGY LEVELS"})}),Object(u.jsx)("div",{className:"info-text",class:"flex leading-3 text-xs font-semibold mt-3.5 ml-80 text-left w-2/4 float-right fixed",children:Object(u.jsx)("p",{class:"",children:"Distractions are a sign of low energy. Crysta analyzes the number of task switches you make and updates this graph every hour, calculating your most and least productive times. Lower = more productive (better for focus), Higher = less productive (better for creativity)."})}),Object(u.jsx)("div",{className:"energy-graph-container",class:"flex-1 flex-col ml-8 mt-12 mr-8 w-5/6 h-5/6",children:Object(u.jsx)(E,{})})]})})},R=function(){var e=Object(f.b)().logout;return Object(u.jsx)("button",{className:"btn btn-danger btn-block",class:"font-medium text-gray-50 h-10 w-40 bg-green-400 rounded-3xl hover:bg-blue-400 transition duration-250 ease-linear",onClick:function(){return e({returnTo:window.location.origin})},children:"Log Out"})},A=function(){Object(f.b)().logout;return Object(u.jsx)("div",{className:"NavContainer",class:"flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen",children:Object(u.jsxs)("div",{class:"flex flex-col justify-center items-center bg-gray-50  rounded-3xl h-1/3 w-1/3 rounded-3xl shadow-lg",children:[Object(u.jsx)("div",{className:"crysta-logo",class:"",children:Object(u.jsx)("img",{src:m,alt:"CrystaLogo"})}),Object(u.jsx)("p",{class:"font-medium text-center w-64 mb-4 mt-7 text-xl mr-5 ml-5",children:"We're sad to see you go. \ud83d\ude22 Come back soon!"}),Object(u.jsx)("div",{className:"flex justify-center",children:Object(u.jsx)(R,{})})]})})};var G=function(){var e=Object(f.b)(),t=e.user;if(e.isAuthenticated){var s={username:t.name};S.a.post("http://127.0.0.1:5000/user",s).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)})),S.a.post("/send-user",s).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)}))}return Object(u.jsxs)(o.a,{children:[Object(u.jsx)(g.a,{path:"/",exact:!0,component:O}),Object(u.jsx)(g.a,{path:"/Login",component:O}),Object(u.jsx)(x,{}),Object(u.jsxs)(g.c,{children:[Object(u.jsx)(g.a,{path:"/pages/Calendar",component:v}),Object(u.jsx)(g.a,{path:"/pages/Tasks",component:y}),Object(u.jsx)(g.a,{path:"/pages/Energy",component:T}),Object(u.jsx)(g.a,{path:"/pages/Logout",component:A})]})]})};c.a.render(Object(u.jsx)(f.a,{domain:"crysta.us.auth0.com",clientId:"7wM95Dzz4zhafR6dCBB6PhZdyvKQgDMH",redirectUri:"http://localhost:3000/pages/Energy/continue?state=THE_ORIGINAL_STATE",children:Object(u.jsx)(G,{})}),document.getElementById("root"))},61:function(e,t,s){}},[[242,1,2]]]);
//# sourceMappingURL=main.831d3979.chunk.js.map