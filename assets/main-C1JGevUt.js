import{c as d,r as i,a as n,g as o,H as h,U as w,b as a,P as p,F as f,L as P}from"./render-BfbZGWin.js";const l="/front_5th_chapter1-2",U=e=>{const{subscribe:c,notify:s}=d(),r=()=>{const t=l;return window.location.pathname.replace(t,"")||"/"},u=()=>e[r()],g=t=>{window.history.pushState(null,null,`${r()}${t}`);{const b=l+t;window.history.pushState(null,null,b)}s()};return window.addEventListener("popstate",()=>s()),{get path(){return r()},push:g,subscribe:c,getTarget:u}};i.set(U({"/":h,"/login":()=>{const{loggedIn:e}=o.getState();if(e)throw new f;return a(P,null)},"/profile":()=>{const{loggedIn:e}=o.getState();if(!e)throw new w;return a(p,null)}}));function m(){i.get().subscribe(n),o.subscribe(n),n()}m();
