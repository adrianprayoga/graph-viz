(this["webpackJsonpgraph-vizualizer"]=this["webpackJsonpgraph-vizualizer"]||[]).push([[0],{102:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),c=n(10),o=n.n(c),s=n(33),l=n(5),d=n(15),u=n(20),j=n(21),b=n(52),h=(n(102),n(72)),p=n.n(h),f=n(77),O=n.n(f),x=n(78),v=n.n(x),m=n(22),g=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),y=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0),k=300,w=Math.max(20,Math.floor((g-k)/32.5)),M=Math.max(10,Math.floor(y/32.5)),z=w*M,S="wall",C="start",_="target",I="empty",P="traffic",N="not_visited",T="visited_prev",W="visited_curr",E="solution",F=(a={},Object(d.a)(a,4,"DFS"),Object(d.a)(a,1,"BFS"),Object(d.a)(a,2,"DJIKSTRA"),Object(d.a)(a,3,"A*"),a),R="Random Maze",A="Binary Maze",B="DFS Maze",q="Prim's Maze",L="Kruskal Maze",V=[B,q,A,L,R],D=function(e){var t=Math.floor(e/w);return{x:e%w,y:t}},H=function(e,t){var n,a=e.x,r=e.y,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=J({x:a,y:r}),o=(null===(n=t[c])||void 0===n?void 0:n.type)!==S;return 0<=a&&a<w&&0<=r&&r<M&&(i||o)},J=function(e){var t=e.x;return e.y*w+t},K=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=D(t),i=r.x,c=r.y,o=[{x:i+n,y:c},{x:i-n,y:c},{x:i,y:c+n},{x:i,y:c-n}];return o.filter((function(t){return H(t,e,a)})).map((function(e){return J(e)}))},G=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=D(e),a=n.x,r=n.y,i=[{x:a+t,y:r,xWall:a+1,yWall:r},{x:a-t,y:r,xWall:a-1,yWall:r},{x:a,y:r+t,xWall:a,yWall:r+1},{x:a,y:r-t,xWall:a,yWall:r-1}];return i.filter((function(e){return H(e,{},!0)})).map((function(e){return{n:J(e),w:J({x:e.xWall,y:e.yWall})}}))};function Q(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[n],e[n]=a}}var U,X,Y,Z,$,ee,te,ne,ae,re=n(2),ie=m.b.div(U||(U=Object(j.a)(["\n  background: white;\n  border-radius: 0px;\n  border: 0.5px solid lightblue;\n  height: 30px;\n  width: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 30px;\n  color: darkgray;\n\n  ",";\n\n  ",";\n\n  ",";\n"])),(function(e){var t=e.small,n=e.type;return t&&-1!==[C,P,_].indexOf(n)?Object(m.a)(X||(X=Object(j.a)(["\n        height: 20px;\n        width: 20px;\n        font-size: 25px;\n        border: transparent;\n        background: transparent;\n      "]))):t?Object(m.a)(Y||(Y=Object(j.a)(["\n        height: 20px;\n        width: 20px;\n        font-size: 25px;\n      "]))):void 0}),(function(e){var t=e.type;return t===P?Object(m.a)(Z||(Z=Object(j.a)(["\n        color: lightgray;\n      "]))):t===S?Object(m.a)($||($=Object(j.a)(["\n        background: black;\n        border: 0.5px solid black;\n        -webkit-transition: background-color 1000ms linear;\n        -ms-transition: background-color 1000ms linear;\n        transition: background-color 1000ms linear;\n      "]))):t===_||t===C?Object(m.a)(ee||(ee=Object(j.a)(["\n        background: transparent;\n      "]))):void 0}),(function(e){var t=e.state;return t===T?Object(m.a)(te||(te=Object(j.a)(["\n        background-color: lightsteelblue;\n        -webkit-transition: background-color 400ms linear;\n        -ms-transition: background-color 400ms linear;\n        transition: background-color 400ms linear;\n      "]))):t===W?Object(m.a)(ne||(ne=Object(j.a)(["\n        background: steelblue;\n      "]))):t===E?Object(m.a)(ae||(ae=Object(j.a)(["\n        background: lightseagreen;\n        color: black;\n      "]))):void 0})),ce=function(e){var t=e.disabled,n=e.small,a=(e.node,e.type),r=e.state,i=e.handleClick;e.handleDrag;return Object(re.jsxs)(ie,{type:a,state:r,small:n,onClick:function(e){return!t&&i(e)},draggable:!t&&(a===_||a===C),children:[a===C&&Object(re.jsx)(p.a,{color:"inherit",fontSize:"inherit",background:"inherit"}),a===_&&Object(re.jsx)(O.a,{color:"inherit",fontSize:"inherit",background:"inherit"}),a===P&&Object(re.jsx)(v.a,{color:"inherit",fontSize:"inherit",background:"inherit"})]})},oe="set_algo",se="set_step",le="set_algo_status",de="set_maze_gen",ue="set_maze_gen_status",je="running",be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case oe:var n=Object(l.a)(Object(l.a)({},e),{},{algo:t.payload});return n;case se:return Object(l.a)(Object(l.a)({},e),{},{step:t.payload});case le:return Object(l.a)(Object(l.a)({},e),{},{status:t.payload});case de:return Object(l.a)(Object(l.a)({},e),{},{maze_gen:t.payload});case ue:return Object(l.a)(Object(l.a)({},e),{},{maze_gen_status:t.payload});default:return e}},he=n(79),pe=99999999999,fe=function(e,t,n){for(var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:pe,r=arguments.length>5?arguments[5]:void 0,i=r.pathMap||Object(d.a)({},t,void 0),c=r.marked||new Set,o=r.lastVisited||[],s=r.deque||[t],u=0,j=Object(l.a)({},e),b=[],h=function(){var e=s.pop();if(u+=1,n===e)return{v:{solved:!0,inProgress:!1,solution:j=ye(o.concat(b),j),solutionList:ge(i,t,n)}};b.push(e),j[e].state=W,c.has(e)||(c.add(e),K(j,e).filter((function(e){return!c.has(e)})).forEach((function(t){i[t]=e,s.push(t)})))};s.length>0&&u<a;){var p=h();if("object"===typeof p)return p.v}return u===a?{solved:!1,inProgress:!0,solution:j=ye(o,j),interimObj:{pathMap:i,marked:c,lastVisited:b,deque:s}}:{solved:!1,inProgress:!1,solution:j}},Oe=function(e,t,n){for(var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:pe,i=arguments.length>5?arguments[5]:void 0,c=i.distanceMap||Object(d.a)({},t,0),o=i.pathMap||Object(d.a)({},t,void 0),s=i.marked||new Set,u=i.pq||new b.a(w*M),j=i.lastVisited||[],h=0,p=Object(l.a)({},e),f=[],O=function(){var r=u.pop();if(s.add(r),n===r)return{v:{solved:!0,inProgress:!1,solution:p=ye(j.concat(f),p),solutionList:ge(o,t,n)}};f.push(r),p[r].state=W,h+=1;var i=c[r]||0;K(p,r).filter((function(e){return!s.has(e)})).filter((function(t){return i+xe(a,e,t)<me(c,t)})).forEach((function(t){var s=xe(a,e,t);c[t]=i+s,o[t]=r,u.push(t,i+s+ve(a,t,n))}))};0!==u.size&&h<r;){var x=O();if("object"===typeof x)return x.v}return h===r?{solved:!1,inProgress:!0,solution:p=ye(j,p),interimObj:{distanceMap:c,pathMap:o,marked:s,pq:u,lastVisited:f}}:{solved:!1,inProgress:!1,solution:p}},xe=function(e,t,n){return(3===e||2===e)&&t[n].type===P?3:1},ve=function(e,t,n){if(3===e){var a=D(t),r=a.x,i=a.y,c=D(n),o=c.x,s=c.y;return Math.floor(Math.sqrt(Math.pow(r-o,2)+Math.pow(i-s,2)))}return 0},me=function(e,t){return void 0===e[t]?pe:e[t]},ge=function(e,t,n){for(var a=[n],r=e[n];r&&r!==t;)a=a.concat(r),r=e[r];return a=a.concat(t)},ye=function(e,t){var n,a=Object(l.a)({},t),r=Object(he.a)(e);try{for(r.s();!(n=r.n()).done;){var i=n.value;a[i]=Object(l.a)(Object(l.a)({},a[i]),{},{state:T})}}catch(c){r.e(c)}finally{r.f()}return a},ke=n(155),we=n(156),Me=n(162),ze=n(60),Se=n(120),Ce=n(121),_e=n(158),Ie=n(116),Pe=(n(111),n(159)),Ne=n(160),Te=n(84),We=n.n(Te),Ee=n(83),Fe=n.n(Ee),Re=n(149),Ae=n(150),Be=n(57),qe=n.n(Be),Le=n(152),Ve=n(119),De=n(151),He=n(117),Je=n(154),Ke=n(153),Ge=n(80),Qe=n.n(Ge),Ue=Object.keys(F),Xe=function(e){var t=Object(r.useContext)(vt),n=Object(r.useContext)(xt),a=i.a.useState(!1),c=Object(u.a)(a,2),o=c[0],s=c[1],d=i.a.useRef(null),j=function(e){d.current&&d.current.contains(e.target)||s(!1)};return Object(re.jsx)(Re.a,{container:!0,direction:"column",alignItems:"center",children:Object(re.jsxs)(Re.a,{item:!0,xs:12,style:{width:"100%"},children:[Object(re.jsxs)(Ae.a,{variant:"contained",color:"primary",ref:d,"aria-label":"split button",style:{width:"100%"},fullWidth:!0,children:[Object(re.jsx)(Ie.a,{onClick:e.onButtonClick,startIcon:Object(re.jsx)(Qe.a,{}),fullWidth:!0,children:"".concat(n.status===je?"Stop":"Run"," ").concat(F[n.algo])}),Object(re.jsx)(Ie.a,{color:"primary",size:"small","aria-controls":o?"split-button-menu":void 0,"aria-expanded":o?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:function(){s((function(e){return!e}))},style:{width:"15px"},children:Object(re.jsx)(qe.a,{})})]}),Object(re.jsx)(He.a,{open:o,anchorEl:d.current,role:void 0,transition:!0,disablePortal:!0,style:{position:"relative",zIndex:999},children:function(e){var a=e.TransitionProps,r=e.placement;return Object(re.jsx)(Ve.a,Object(l.a)(Object(l.a)({},a),{},{style:{transformOrigin:"bottom"===r?"center top":"center bottom"},children:Object(re.jsx)(De.a,{children:Object(re.jsx)(Le.a,{onClickAway:j,children:Object(re.jsx)(Ke.a,{id:"split-button-menu",children:Ue.map((function(e){return Object(re.jsx)(Je.a,{selected:n.algo===e,onClick:function(){return t({type:oe,payload:parseInt(e)}),void s(!1)},children:F[e]},e)}))})})})}))}})]})})},Ye=n(163),Ze=[{value:1,label:1},{value:2}].concat(Array.from({length:19},(function(e,t){return{value:5*(t+1)}}))).concat({value:100,label:100}),$e=Object(ke.a)({root:{width:"90%"},slider:{marginLeft:"10px",marginRight:"10px"}});function et(){var e=$e(),t=Object(r.useContext)(vt),n=Object(r.useContext)(xt);return Object(re.jsxs)("div",{className:e.root,children:[Object(re.jsx)(ze.a,{id:"discrete-slider-restrict",gutterBottom:!0,children:"Speed"}),Object(re.jsx)(Ye.a,{value:n.step,onChange:function(e,a){a!==n.step&&t({type:se,payload:a})},"aria-labelledby":"discrete-slider-restrict",step:null,min:1,max:100,marks:Ze,className:e.slider})]})}var tt,nt=n(82),at=n.n(nt),rt=function(e){var t=Object(r.useContext)(vt),n=Object(r.useContext)(xt),a=i.a.useState(!1),c=Object(u.a)(a,2),o=c[0],s=c[1],d=i.a.useRef(null),j=function(e){d.current&&d.current.contains(e.target)||s(!1)};return Object(re.jsx)(Re.a,{container:!0,direction:"column",alignItems:"center",style:{width:"100%"},children:Object(re.jsxs)(Re.a,{item:!0,xs:12,style:{width:"100%"},children:[Object(re.jsxs)(Ae.a,{variant:"contained",color:"primary",ref:d,"aria-label":"split button",fullWidth:!0,children:[Object(re.jsx)(Ie.a,{onClick:e.onButtonClick,fullWidth:!0,startIcon:Object(re.jsx)(at.a,{}),children:"".concat(n.maze_gen_status?"Stop":"Create"," ").concat(n.maze_gen)}),Object(re.jsx)(Ie.a,{color:"primary",size:"small","aria-controls":o?"split-button-menu":void 0,"aria-expanded":o?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:function(){s((function(e){return!e}))},style:{width:"15px"},children:Object(re.jsx)(qe.a,{})})]}),Object(re.jsx)(He.a,{open:o,anchorEl:d.current,role:void 0,transition:!0,disablePortal:!0,style:{position:"relative",zIndex:999},children:function(e){var a=e.TransitionProps,r=e.placement;return Object(re.jsx)(Ve.a,Object(l.a)(Object(l.a)({},a),{},{style:{transformOrigin:"bottom"===r?"center top":"center bottom"},children:Object(re.jsx)(De.a,{children:Object(re.jsx)(Le.a,{onClickAway:j,children:Object(re.jsx)(Ke.a,{id:"split-button-menu",children:V.map((function(e){return Object(re.jsx)(Je.a,{selected:n.maze_gen===e,onClick:function(){return t({type:de,payload:e}),void s(!1)},children:e},e)}))})})})}))}})]})})},it=n(157),ct=n(161),ot=(n(4),Object(ke.a)((function(e){return{appBar:{width:"calc(100% - ".concat(k,"px)"),marginRight:k},drawer:{width:k,flexShrink:0},drawerPaper:{width:k,background:"#EFEFEF"},toolbar:e.mixins.toolbar,mainHeader:{background:"#393939"},headerLogo:{margin:"20px",display:"flex",color:"#EFEFEF",justifyContent:"center"},iconMargin:{alignSelf:"center",marginRight:"5px"},content:{flexGrow:1,backgroundColor:e.palette.background.default,padding:e.spacing(3)},infoIcon:{alignSelf:"center",marginLeft:"5px"},listItemText:{display:"flex"}}}))),st=function(e){var t=ot(),n=[{primaryText:"Empty Node"},{primaryText:Object(re.jsxs)("div",{className:t.listItemText,children:["Wall Node",Object(re.jsx)(we.a,{title:"Wall Node is impenetrable",arrow:!0,children:Object(re.jsx)(it.a,{fontSize:"inherit",className:t.infoIcon})})]}),type:S},{primaryText:Object(re.jsxs)("div",{className:t.listItemText,children:["Traffic Node",Object(re.jsx)(we.a,{title:"Traffic Node costs 3x more to traverse",arrow:!0,children:Object(re.jsx)(it.a,{fontSize:"inherit",className:t.infoIcon})})]}),type:P},{primaryText:"Currently Node",state:W},{primaryText:"Visited Node",state:T},{primaryText:"Solution",state:E},{primaryText:"Start Node",type:C},{primaryText:"Target Node",type:_}];return Object(re.jsx)(re.Fragment,{children:Object(re.jsxs)(Me.a,{className:t.drawer,variant:"permanent",color:"secondary",classes:{paper:t.drawerPaper},anchor:"right",children:[Object(re.jsx)("div",{className:t.mainHeader,children:Object(re.jsxs)(ze.a,{variant:"h4",className:t.headerLogo,children:[Object(re.jsx)(Fe.a,{fontSize:"inherit",className:t.iconMargin}),Object(re.jsx)("b",{children:"Maze & Paths"})]})}),Object(re.jsxs)(Se.a,{children:[Object(re.jsx)(Ce.a,{children:Object(re.jsx)(rt,{onButtonClick:e.handleAddMaze})}),Object(re.jsx)(Ce.a,{children:Object(re.jsx)(Xe,{onButtonClick:e.onRunAlgoClick})})]}),Object(re.jsx)(_e.a,{}),Object(re.jsxs)(Se.a,{children:[Object(re.jsxs)(Ce.a,{children:[Object(re.jsx)(Pe.a,{children:Object(re.jsx)(We.a,{})}),Object(re.jsx)(Ne.a,{primary:"Algorithm Settings"})]}),Object(re.jsx)(Ce.a,{children:Object(re.jsx)(et,{})})]}),Object(re.jsx)(_e.a,{}),Object(re.jsxs)(Se.a,{children:[Object(re.jsx)(Ce.a,{children:Object(re.jsx)(Ie.a,{variant:"outlined",onClick:e.handleClearNodes,color:"primary",fullWidth:!0,children:"Clear Board"})}),Object(re.jsx)(Ce.a,{children:Object(re.jsx)(Ie.a,{variant:"outlined",onClick:e.handleAddRandomTrafficNodes,color:"primary",fullWidth:!0,children:"Add Random Traffic"})})]}),Object(re.jsx)(_e.a,{}),Object(re.jsxs)(Se.a,{children:[Object(re.jsxs)(Ce.a,{children:[Object(re.jsx)(Pe.a,{children:Object(re.jsx)(ct.a,{})}),Object(re.jsx)(Ne.a,{primary:"Information"})]}),Object(re.jsx)(Se.a,{dense:!0,children:n.map((function(e){return Object(re.jsxs)(Ce.a,{children:[Object(re.jsx)(Ne.a,{primary:e.primaryText}),Object(re.jsx)(ce,{small:!0,disabled:!0,type:e.type,state:e.state})]})}))})]})]})})},lt=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:I;return Object.keys(e).reduce((function(n,a){return n[a]=dt(e[a],t),n}),{})},dt=function(e,t){var n=e.type,a=n===C||n===_?n:t;return Object(l.a)(Object(l.a)({},e),{},{state:N,type:a})},ut=n(53),jt=n(54),bt=function(){function e(t){Object(ut.a)(this,e),this.disjointSets=t.reduce((function(e,t){return e[t]=t,e}),{})}return Object(jt.a)(e,[{key:"connect",value:function(e,t){if(!this.isConnected(e,t)){var n=e,a=t;t<e&&(n=t,a=e),this.disjointSets[this.findParent(a)]=this.findParent(n)}}},{key:"findParent",value:function(e){var t=this.disjointSets[e];return parseInt(t)===parseInt(e)?e:(this.disjointSets[e]=this.findParent(t),this.disjointSets[e])}},{key:"isConnected",value:function(e,t){return e===t||this.findParent(e)===this.findParent(t)}}]),e}(),ht=function(){var e=[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}][Math.floor(4*Math.random())],t=new Set,n=[J(e)],a=new Set,r=[J(e)];t.add(J(e));for(var i=function(){var e=r.pop();G(e,2).forEach((function(i){t.has(i.n)||(r.push(i.n),t.add(i.n),n.push(i.n)),a.add({wallIndex:i.w,n1Index:e,n2Index:i.n})}))};r.length>0;)i();return{nodes:n,walls:a}},pt=J({x:Math.floor(w/2-8),y:Math.floor(M/2)}),ft=J({x:Math.floor(w/2+8),y:Math.floor(M/2)}),Ot=m.b.div(tt||(tt=Object(j.a)(["\n  display: grid;\n  grid-template-columns: repeat(",", 1fr);\n  gap: 0 0;\n  width: 10px;\n  align-content: center;\n"])),w),xt=i.a.createContext(),vt=i.a.createContext(),mt=function(){var e=Object(r.useState)(function(e,t,n){for(var a={},r=0;r<n;r++)a[r]={type:r===e?C:r===t?_:I};return a}(pt,ft,z)),t=Object(u.a)(e,2),n=t[0],a=t[1],i=Object(r.useState)(pt),c=Object(u.a)(i,2),o=c[0],j=(c[1],Object(r.useState)(ft)),h=Object(u.a)(j,2),p=h[0],f=(h[1],Object(r.useState)(0)),O=Object(u.a)(f,2),x=O[0],v=O[1],m=Object(r.useState)([]),g=Object(u.a)(m,2),y=g[0],k=g[1],T=Object(r.useState)([]),W=Object(u.a)(T,2),F=W[0],V=W[1],K=Object(r.useReducer)(be,{algo:2,step:10,maze_gen:B,maze_gen_status:!1}),U=Object(u.a)(K,2),X=U[0],Y=U[1],Z=Object(r.useMemo)((function(){for(var e=[],t=0;t<z;t++)e.push(t);return e}),[]);Object(r.useEffect)((function(){var e=Object(s.a)(y);0!==e.length&&(a((function(t){for(var n=0;e.length>0&&n<Math.min(X.step/2,5);){var a=e.pop();t[a]=Object(l.a)(Object(l.a)({},t[a]),{},{state:E}),n+=1}return t})),k(e))}),[y]),Object(r.useEffect)((function(){var e=-1!==[L,B,A,q].indexOf(X.maze_gen),t=Object(s.a)(F);X.maze_gen_status&&(0!==t.length?(a((function(n){for(var a=0;t.length>0&&a<X.step;){var r=t.pop();n[r]=dt(n[r],e?I:S),a+=1}return n})),V(t)):(Y({type:ue,payload:!1}),V([])))}),[F,X.maze_gen_status]);return Object(re.jsx)(vt.Provider,{value:Y,children:Object(re.jsx)(xt.Provider,{value:X,children:Object(re.jsxs)("div",{children:[Object(re.jsx)("div",{style:{display:"flex"},children:Object(re.jsx)(Ot,{children:Z.map((function(e){var t,r,i;return Object(re.jsx)(ce,{node:e,type:null===(t=n[e])||void 0===t?void 0:t.type,state:null===(r=n[e])||void 0===r?void 0:r.state,handleClick:(i=e,function(e){var t,r,c=n[i].type;c!==_&&c!==C&&c!==S?(t=S,r=N):c===S&&(t=I,r=N),t&&a(Object(l.a)(Object(l.a)({},n),{},Object(d.a)({},i,Object(l.a)(Object(l.a)({},n[i]),{},{type:t,state:r}))))})},e)}))})}),Object(re.jsx)(st,{onRunAlgoClick:function(){k([]);var e=Object(d.a)({},o,0),t=Object(d.a)({},o,void 0),r=new Set,i=new b.a(w*M),c=[],s=[o];if(i.push(o,0),x)return Y({type:le,payload:void 0}),clearInterval(x),void v(0);Y({type:le,payload:je});var u=function(e){return Object.keys(e).reduce((function(t,n){return t[n]=Object(l.a)(Object(l.a)({},e[n]),{},{state:N}),t}),{})}(n),j=setInterval((function(){var n=4===X.algo?{pathMap:t,marked:r,lastVisited:c,deque:s}:{distanceMap:e,pathMap:t,marked:r,pq:i,lastVisited:c},d=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:pe,i=arguments.length>5?arguments[5]:void 0;return 4===a?fe(e,t,n,a,r,i):Oe(e,t,n,a,r,i)}(u,o,p,X.algo,X.step,n),b=d.solved,h=d.inProgress,f=d.solution,O=d.solutionList,x=d.interimObj;if(h&&(u=Object(l.a)({},f),t=x.pathMap,r=x.marked,c=x.lastVisited,4!==X.algo?(i=x.pq,e=x.distanceMap):s=x.deque),(b||h)&&a(f),!0===b||!1===b&&!1===h)return Y({type:le,payload:void 0}),clearInterval(j),v(0),void(O&&k(O))}),1);v(j)},handleClearNodes:function(){a((function(e){return lt(e)}))},handleAddRandomTrafficNodes:function(){a((function(e){return function(e){return Object.keys(e).reduce((function(t,n){var a=e[n].type;return Math.random()<.2&&a===I?t[n]=Object(l.a)(Object(l.a)({},e[n]),{},{type:P,state:N}):t[n]=Object(l.a)({},e[n]),t}),{})}(e)}))},handleAddMaze:function(){if(X.maze_gen_status)Y({type:ue,payload:!1});else{Y({type:ue,payload:!0});var e=[],t=!1;X.maze_gen===B?(e=function(e,t){for(var n=Math.floor(Math.random()*(z-1));n===e||n===t;)n=Math.floor(Math.random()*(z-1));for(var a=new Set,r=[{n:n}],i=[];r.length>0;){var c=r.pop();if(!a.has(c.n)){c.w&&i.push(c.w),i.push(c.n),a.add(c.n);var o=G(c.n,2).filter((function(e){return!a.has(e.n)}));Q(o),o.forEach((function(e){r.push(e)}))}}return i.reverse(),i}(o,p),t=!0):X.maze_gen===R?e=function(e,t){for(var n=[],a=0;a<z;a++)Math.random()<.35&&a!==e&&a!==t&&n.push(a);return n}(o,p):X.maze_gen===A?(e=function(e,t){for(var n=ht().nodes,a=Object(s.a)(n),r=0;r<n.length;r++){var i=D(n[r]),c={x:i.x+2,y:i.y},o={x:i.x,y:i.y+2},l={x:i.x+1,y:i.y},d={x:i.x,y:i.y+1},u=H(c,{},!0),j=H(o,{},!0);j&&!u?a.push(J(d)):!j&&u?a.push(J(l)):j&&u&&(Math.random()<.5?a.push(J(d)):a.push(J(l)))}return a.reverse(),a}(),t=!0):X.maze_gen===q?(e=function(e,t){for(var n=Math.floor(Math.random()*(z-1));n===e||n===t;)n=Math.floor(Math.random()*(z-1));for(var a=new Set,r=[{n:n}],i=[];r.length>0;){Q(r);var c=r.pop();a.has(c.n)||(c.w&&i.push(c.w),i.push(c.n),a.add(c.n),G(c.n,2).filter((function(e){return!a.has(e.n)})).forEach((function(e){r.push(e)})))}return i.reverse(),i}(o,p),t=!0):X.maze_gen===L&&(e=function(e,t){var n=ht(),a=n.nodes,r=n.walls,i=Object(s.a)(a),c=(new Set,new bt(a)),o=Object(s.a)(r);Q(o);for(var l=0;l<a.length-1&&o.length>0;){var d=o.pop(),u=d.wallIndex,j=d.n1Index,b=d.n2Index;c.isConnected(j,b)||(i.push(u),c.connect(j,b),l+=1)}return i.reverse(),Object(s.a)(i)}(),t=!0),a((function(e){return lt(e,t?S:I)})),V(e)}}})]})})})},gt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,164)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))};o.a.render(Object(re.jsx)(i.a.StrictMode,{children:Object(re.jsx)(mt,{})}),document.getElementById("root")),gt()}},[[113,1,2]]]);
//# sourceMappingURL=main.24fc2ec3.chunk.js.map