import{S as N,i as T,s as W,l as f,m as d,p as _,h as p,q as m,b as z,J as i,n as x,u as S,a as w,x as I,v as b,c as P,y as C,z as j,f as q,t as H,C as M}from"../../chunks/index-1e94f496.js";import{P as B}from"../../chunks/PostList-c23543f2.js";function D(r){let t,e;return{c(){t=f("div"),e=f("input"),this.h()},l(n){t=d(n,"DIV",{class:!0});var o=_(t);e=d(o,"INPUT",{type:!0,placeholder:!0,class:!0}),o.forEach(p),this.h()},h(){m(e,"type","text"),m(e,"placeholder","Search..."),m(e,"class","svelte-1lmlvu1"),m(t,"class","svelte-1lmlvu1")},m(n,o){z(n,t,o),i(t,e)},p:x,i:x,o:x,d(n){n&&p(t)}}}function J(r){return[]}class L extends N{constructor(t){super(),T(this,t,J,D,W,{})}}function O(r){let t,e,n,o,c,g,u,v,y,l,$;return c=new L({}),l=new B({props:{posts:r[0]}}),{c(){t=f("section"),e=f("h1"),n=S("Writing"),o=w(),I(c.$$.fragment),g=w(),u=f("p"),v=S("My blog posts will go here eventually\u2026"),y=w(),I(l.$$.fragment),this.h()},l(s){t=d(s,"SECTION",{});var a=_(t);e=d(a,"H1",{class:!0});var h=_(e);n=b(h,"Writing"),h.forEach(p),o=P(a),C(c.$$.fragment,a),g=P(a),u=d(a,"P",{});var E=_(u);v=b(E,"My blog posts will go here eventually\u2026"),E.forEach(p),y=P(a),C(l.$$.fragment,a),a.forEach(p),this.h()},h(){m(e,"class","titleHeader")},m(s,a){z(s,t,a),i(t,e),i(e,n),i(t,o),j(c,t,null),i(t,g),i(t,u),i(u,v),i(t,y),j(l,t,null),$=!0},p(s,[a]){const h={};a&1&&(h.posts=s[0]),l.$set(h)},i(s){$||(q(c.$$.fragment,s),q(l.$$.fragment,s),$=!0)},o(s){H(c.$$.fragment,s),H(l.$$.fragment,s),$=!1},d(s){s&&p(t),M(c),M(l)}}}const A=async({fetch:r})=>({props:{posts:await(await r("/api/posts.json")).json()}}),F=!0;function U(r,t,e){let{posts:n}=t;return r.$$set=o=>{"posts"in o&&e(0,n=o.posts)},[n]}class G extends N{constructor(t){super(),T(this,t,U,O,W,{posts:0})}}export{G as default,A as load,F as prerender};
