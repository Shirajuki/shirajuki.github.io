import{S as H,i as I,s as L,e as w,b as k,n as S,h as d,l as g,u as y,a as C,m as v,p as b,v as E,c as D,J as f,w as P,U as B,q as U}from"../../../chunks/index-1e94f496.js";function j(r,t,e){const s=r.slice();return s[2]=t[e],s}function q(r){let t,e,s,i,c,_,u,h=r[0],o=[];for(let l=0;l<h.length;l+=1)o[l]=A(j(r,h,l));return{c(){t=g("aside"),e=g("h2"),s=y('Posts with category "'),i=y(r[1]),c=y('":'),_=C(),u=g("ul");for(let l=0;l<o.length;l+=1)o[l].c()},l(l){t=v(l,"ASIDE",{});var n=b(t);e=v(n,"H2",{});var a=b(e);s=E(a,'Posts with category "'),i=E(a,r[1]),c=E(a,'":'),a.forEach(d),_=D(n),u=v(n,"UL",{});var m=b(u);for(let p=0;p<o.length;p+=1)o[p].l(m);m.forEach(d),n.forEach(d)},m(l,n){k(l,t,n),f(t,e),f(e,s),f(e,i),f(e,c),f(t,_),f(t,u);for(let a=0;a<o.length;a+=1)o[a].m(u,null)},p(l,n){if(n&2&&P(i,l[1]),n&1){h=l[0];let a;for(a=0;a<h.length;a+=1){const m=j(l,h,a);o[a]?o[a].p(m,n):(o[a]=A(m),o[a].c(),o[a].m(u,null))}for(;a<o.length;a+=1)o[a].d(1);o.length=h.length}},d(l){l&&d(t),B(o,l)}}}function A(r){let t,e,s,i=r[2].meta.title+"",c,_,u,h=r[2].meta.date+"",o,l;return{c(){t=g("li"),e=g("h2"),s=g("a"),c=y(i),u=y(`
          Published `),o=y(h),l=C(),this.h()},l(n){t=v(n,"LI",{});var a=b(t);e=v(a,"H2",{});var m=b(e);s=v(m,"A",{href:!0});var p=b(s);c=E(p,i),p.forEach(d),m.forEach(d),u=E(a,`
          Published `),o=E(a,h),l=D(a),a.forEach(d),this.h()},h(){U(s,"href",_=r[2].path)},m(n,a){k(n,t,a),f(t,e),f(e,s),f(s,c),f(t,u),f(t,o),f(t,l)},p(n,a){a&1&&i!==(i=n[2].meta.title+"")&&P(c,i),a&1&&_!==(_=n[2].path)&&U(s,"href",_),a&1&&h!==(h=n[2].meta.date+"")&&P(o,h)},d(n){n&&d(t)}}}function J(r){let t,e=r[0].length&&q(r);return{c(){e&&e.c(),t=w()},l(s){e&&e.l(s),t=w()},m(s,i){e&&e.m(s,i),k(s,t,i)},p(s,[i]){s[0].length?e?e.p(s,i):(e=q(s),e.c(),e.m(t.parentNode,t)):e&&(e.d(1),e=null)},i:S,o:S,d(s){e&&e.d(s),s&&d(t)}}}const F=async({params:r,fetch:t})=>{const e=r.category;return{props:{posts:(await(await t("/api/posts.json")).json()).filter(_=>_.meta.category===e),category:e}}};function N(r,t,e){let{posts:s}=t,{category:i}=t;return r.$$set=c=>{"posts"in c&&e(0,s=c.posts),"category"in c&&e(1,i=c.category)},[s,i]}class G extends H{constructor(t){super(),I(this,t,N,J,L,{posts:0,category:1})}}export{G as default,F as load};