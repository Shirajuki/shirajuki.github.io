import{S as x,i as ee,s as te,l as p,a as L,r as B,m as d,n as $,c as O,u as D,h as m,p as h,b as M,J as _,v as F,K as ae,L as le,M as se,G as z,e as Q,f as S,g as re,d as oe,t as H,X as ne,w as ie,x as ce,y as fe,B as ue}from"./index-f2a82808.js";import{a as _e,f as he}from"./index-57d47233.js";import{d as V}from"./utils-e126d158.js";function W(o){let e,s,a,t;return{c(){e=p("figure"),s=p("img"),this.h()},l(i){e=d(i,"FIGURE",{class:!0});var l=$(e);s=d(l,"IMG",{src:!0,alt:!0,class:!0}),l.forEach(m),this.h()},h(){z(s.src,a=o[0].meta.thumbnail)||h(s,"src",a),h(s,"alt",t=`post image of ${o[0].meta.title}`),h(s,"class","svelte-vq2r5c"),h(e,"class","svelte-vq2r5c")},m(i,l){M(i,e,l),_(e,s)},p(i,l){l&1&&!z(s.src,a=i[0].meta.thumbnail)&&h(s,"src",a),l&1&&t!==(t=`post image of ${i[0].meta.title}`)&&h(s,"alt",t)},d(i){i&&m(e)}}}function me(o){let e,s,a,t,i=o[0].meta.title+"",l,n,r,v,k=o[0].meta.description+"",R,T,q,b,P=V(o[0].meta.date)+"",y,w,g,A,C,G,I,E,u=o[0].meta.thumbnail&&W(o);return{c(){e=p("article"),u&&u.c(),s=L(),a=p("header"),t=p("h2"),l=B(i),n=L(),r=p("section"),v=p("p"),R=B(k),T=L(),q=p("footer"),b=p("p"),y=B(P),w=L(),g=p("a"),this.h()},l(f){e=d(f,"ARTICLE",{class:!0});var c=$(e);u&&u.l(c),s=O(c),a=d(c,"HEADER",{});var N=$(a);t=d(N,"H2",{class:!0});var J=$(t);l=D(J,i),J.forEach(m),N.forEach(m),n=O(c),r=d(c,"SECTION",{});var K=$(r);v=d(K,"P",{class:!0});var U=$(v);R=D(U,k),U.forEach(m),K.forEach(m),T=O(c),q=d(c,"FOOTER",{});var X=$(q);b=d(X,"P",{class:!0});var j=$(b);y=D(j,P),j.forEach(m),X.forEach(m),w=O(c),g=d(c,"A",{href:!0,class:!0,"aria-label":!0}),$(g).forEach(m),c.forEach(m),this.h()},h(){h(t,"class","svelte-vq2r5c"),h(v,"class","svelte-vq2r5c"),h(b,"class","svelte-vq2r5c"),h(g,"href",A=o[0].path),h(g,"class","link svelte-vq2r5c"),h(g,"aria-label",C=`post link to ${o[0].meta.title}`),h(e,"class","svelte-vq2r5c")},m(f,c){M(f,e,c),u&&u.m(e,null),_(e,s),_(e,a),_(a,t),_(t,l),_(e,n),_(e,r),_(r,v),_(v,R),_(e,T),_(e,q),_(q,b),_(b,y),_(e,w),_(e,g),E=!0},p(f,[c]){f[0].meta.thumbnail?u?u.p(f,c):(u=W(f),u.c(),u.m(e,s)):u&&(u.d(1),u=null),(!E||c&1)&&i!==(i=f[0].meta.title+"")&&F(l,i),(!E||c&1)&&k!==(k=f[0].meta.description+"")&&F(R,k),(!E||c&1)&&P!==(P=V(f[0].meta.date)+"")&&F(y,P),(!E||c&1&&A!==(A=f[0].path))&&h(g,"href",A),(!E||c&1&&C!==(C=`post link to ${f[0].meta.title}`))&&h(g,"aria-label",C)},i(f){E||(ae(()=>{I&&I.end(1),G=le(e,_e,{x:25,duration:1e3}),G.start()}),E=!0)},o(f){G&&G.invalidate(),I=se(e,he,{}),E=!1},d(f){f&&m(e),u&&u.d(),f&&I&&I.end()}}}function pe(o,e,s){let{post:a}=e;return o.$$set=t=>{"post"in t&&s(0,a=t.post)},[a]}class de extends x{constructor(e){super(),ee(this,e,pe,me,te,{post:0})}}function Y(o,e,s){const a=o.slice();return a[1]=e[s],a}function Z(o){let e,s;return e=new de({props:{post:o[1]}}),{c(){ie(e.$$.fragment)},l(a){ce(e.$$.fragment,a)},m(a,t){fe(e,a,t),s=!0},p(a,t){const i={};t&1&&(i.post=a[1]),e.$set(i)},i(a){s||(S(e.$$.fragment,a),s=!0)},o(a){H(e.$$.fragment,a),s=!1},d(a){ue(e,a)}}}function ve(o){let e,s,a=o[0],t=[];for(let l=0;l<a.length;l+=1)t[l]=Z(Y(o,a,l));const i=l=>H(t[l],1,1,()=>{t[l]=null});return{c(){for(let l=0;l<t.length;l+=1)t[l].c();e=Q()},l(l){for(let n=0;n<t.length;n+=1)t[n].l(l);e=Q()},m(l,n){for(let r=0;r<t.length;r+=1)t[r].m(l,n);M(l,e,n),s=!0},p(l,[n]){if(n&1){a=l[0];let r;for(r=0;r<a.length;r+=1){const v=Y(l,a,r);t[r]?(t[r].p(v,n),S(t[r],1)):(t[r]=Z(v),t[r].c(),S(t[r],1),t[r].m(e.parentNode,e))}for(re(),r=a.length;r<t.length;r+=1)i(r);oe()}},i(l){if(!s){for(let n=0;n<a.length;n+=1)S(t[n]);s=!0}},o(l){t=t.filter(Boolean);for(let n=0;n<t.length;n+=1)H(t[n]);s=!1},d(l){ne(t,l),l&&m(e)}}}function ge(o,e,s){let{posts:a}=e;return o.$$set=t=>{"posts"in t&&s(0,a=t.posts)},[a]}class ke extends x{constructor(e){super(),ee(this,e,ge,ve,te,{posts:0})}}export{ke as P};