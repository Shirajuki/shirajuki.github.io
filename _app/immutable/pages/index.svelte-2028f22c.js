import{S as z,i as G,s as K,l as c,a as T,r as I,w as U,W as V,m as i,h as o,c as w,n as u,u as A,x as X,p as l,I as J,J as t,b as M,y as Y,f as Z,t as tt,B as et,N as st}from"../chunks/index-2b5eadba.js";import{P as at}from"../chunks/PostList-1a337f79.js";import{l as ot}from"../chunks/stores-f88c56d4.js";import"../chunks/index-94d4402f.js";import"../chunks/utils-e126d158.js";import"../chunks/index-af51f98b.js";function lt(p){let r,h,s,a,n,f,b,j,v,E,x,O,g,y,P,C,R,H,F,N,d,S;return d=new at({props:{posts:p[0]}}),{c(){r=c("meta"),h=T(),s=c("section"),a=c("article"),n=c("header"),f=c("h2"),b=I("Hello, i\u2019m"),j=T(),v=c("section"),E=c("h1"),x=I("Shirajuki"),O=T(),g=c("footer"),y=c("h2"),P=I("A CTF player @IQ-toppene"),R=T(),H=c("h1"),F=I("Writings"),N=T(),U(d.$$.fragment),this.h()},l(e){const _=V('[data-svelte="svelte-8gb88t"]',document.head);r=i(_,"META",{name:!0,content:!0}),_.forEach(o),h=w(e),s=i(e,"SECTION",{class:!0});var m=u(s);a=i(m,"ARTICLE",{class:!0});var $=u(a);n=i($,"HEADER",{class:!0});var W=u(n);f=i(W,"H2",{class:!0});var k=u(f);b=A(k,"Hello, i\u2019m"),k.forEach(o),W.forEach(o),j=w($),v=i($,"SECTION",{class:!0});var q=u(v);E=i(q,"H1",{class:!0});var L=u(E);x=A(L,"Shirajuki"),L.forEach(o),q.forEach(o),O=w($),g=i($,"FOOTER",{class:!0});var Q=u(g);y=i(Q,"H2",{class:!0});var B=u(y);P=A(B,"A CTF player @IQ-toppene"),B.forEach(o),Q.forEach(o),$.forEach(o),R=w(m),H=i(m,"H1",{class:!0});var D=u(H);F=A(D,"Writings"),D.forEach(o),N=w(m),X(d.$$.fragment,m),m.forEach(o),this.h()},h(){document.title="Home",l(r,"name","description"),l(r,"content","Svelte demo app"),l(f,"class","svelte-64tum1"),l(n,"class","svelte-64tum1"),l(E,"class","svelte-64tum1"),l(v,"class","svelte-64tum1"),l(y,"class","svelte-64tum1"),l(g,"class","svelte-64tum1"),l(a,"class",C=J(`hero ${p[1]?"hidden":"show"}`)+" svelte-64tum1"),l(H,"class","titleHeader svelte-64tum1"),l(s,"class","svelte-64tum1")},m(e,_){t(document.head,r),M(e,h,_),M(e,s,_),t(s,a),t(a,n),t(n,f),t(f,b),t(a,j),t(a,v),t(v,E),t(E,x),t(a,O),t(a,g),t(g,y),t(y,P),t(s,R),t(s,H),t(H,F),t(s,N),Y(d,s,null),S=!0},p(e,[_]){(!S||_&2&&C!==(C=J(`hero ${e[1]?"hidden":"show"}`)+" svelte-64tum1"))&&l(a,"class",C);const m={};_&1&&(m.posts=e[0]),d.$set(m)},i(e){S||(Z(d.$$.fragment,e),S=!0)},o(e){tt(d.$$.fragment,e),S=!1},d(e){o(r),e&&o(h),e&&o(s),et(d)}}}const ht=async({fetch:p})=>({props:{posts:await(await p("/api/posts.json")).json()}}),dt=!0;function rt(p,r,h){let s;st(p,ot,n=>h(1,s=n));let{posts:a}=r;return p.$$set=n=>{"posts"in n&&h(0,a=n.posts)},[a,s]}class _t extends z{constructor(r){super(),G(this,r,rt,lt,K,{posts:0})}}export{_t as default,ht as load,dt as prerender};
