import{S as x,i as y,s as w,l as u,r as P,a as d,w as b,m as h,n as g,u as v,h as _,c as $,x as B,p as E,b as S,J as l,y as j,f as C,t as H,B as W}from"../../chunks/index-2b5eadba.js";import{P as q}from"../../chunks/PostList-1a337f79.js";import"../../chunks/index-94d4402f.js";import"../../chunks/utils-e126d158.js";function I(o){let t,a,r,i,m,f,n,p;return n=new q({props:{posts:o[0]}}),{c(){t=u("section"),a=u("h1"),r=P("Writing"),i=d(),m=u("br"),f=d(),b(n.$$.fragment),this.h()},l(s){t=h(s,"SECTION",{});var e=g(t);a=h(e,"H1",{class:!0});var c=g(a);r=v(c,"Writing"),c.forEach(_),i=$(e),m=h(e,"BR",{}),f=$(e),B(n.$$.fragment,e),e.forEach(_),this.h()},h(){E(a,"class","titleHeader")},m(s,e){S(s,t,e),l(t,a),l(a,r),l(t,i),l(t,m),l(t,f),j(n,t,null),p=!0},p(s,[e]){const c={};e&1&&(c.posts=s[0]),n.$set(c)},i(s){p||(C(n.$$.fragment,s),p=!0)},o(s){H(n.$$.fragment,s),p=!1},d(s){s&&_(t),W(n)}}}const T=async({fetch:o})=>({props:{posts:await(await o("/api/posts.json")).json()}}),k=!0;function J(o,t,a){let{posts:r}=t;return o.$$set=i=>{"posts"in i&&a(0,r=i.posts)},[r]}class z extends x{constructor(t){super(),y(this,t,J,I,w,{posts:0})}}export{z as default,T as load,k as prerender};
