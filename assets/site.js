(()=>{
const P=document.body.dataset.page,$=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const OMNI='https://trux-ai-workspace.trux.website/',CODE='https://trux-code.trux.website/';
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const links=[['Home','/','home'],['TruX-Omni','/omni','omni'],['TruX-Code','/code','code'],['About Us','/about','about'],['Newsroom','https://technology.trux.website/','']];
document.body.insertAdjacentHTML('afterbegin',`<div class="aurora"><i></i><i></i></div><div id="bar"></div><header class="hdr"><div class="wrap nv"><a class="brand" href="/" aria-label="TruX Technologies home"><img src="/icon-48.svg" width="30" height="30" alt="">TruX</a><nav id="nav" aria-label="Main">${links.map(([n,h,k])=>`<a href="${h}"${k===P?' class="on"':''}>${n}</a>`).join('')}<a class="mob" href="${OMNI}">Launch TruX-Omni ↗</a><a class="mob" href="${CODE}">Launch TruX-Code ↗</a></nav><div class="nact"><a class="btn sm cd" href="${CODE}">TruX-Code ↗</a><a class="btn sm pri" href="${OMNI}">TruX-Omni ↗</a><button id="mb" aria-label="Menu" aria-expanded="false"><i></i><i></i></button></div></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer class="wrap ftr"><div>© 2026 TruX-Technology</div><nav><a href="${OMNI}">Launch TruX-Omni</a><a href="${CODE}">Launch TruX-Code</a><a href="https://technology.trux.website/">Newsroom</a><a href="/about">About Us</a><a href="https://privacy.trux.website">Privacy</a><a href="mailto:trux.ai.support@gmail.com?subject=TruX%20Support">Support</a></nav></footer>`);
const hdr=$('.hdr'),bar=$('#bar'),nav=$('#nav'),mb=$('#mb');
const onScroll=()=>{hdr.classList.toggle('s',scrollY>20);const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${m>0?scrollY/m:0})`};
addEventListener('scroll',onScroll,{passive:true});onScroll();
mb.onclick=()=>{const o=nav.classList.toggle('o');mb.setAttribute('aria-expanded',o)};
nav.onclick=e=>{if(e.target.closest('a')){nav.classList.remove('o');mb.setAttribute('aria-expanded',false)}};
$$('[data-split]').forEach(h=>{let i=0;h.innerHTML=h.innerHTML.split(/(<[^>]+>)/).map(p=>p.startsWith('<')?p:p.split(' ').filter(Boolean).map(w=>`<span class="w" style="--i:${i++}">${w}</span>`).join(' ')).join('')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
$$('.grid,.cta,.hd').forEach(g=>$$(':scope > .rv',g).forEach((c,i)=>c.style.setProperty('--d',i*90+'ms')));
$$('.rv').forEach(e=>io.observe(e));
addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
const win=$('.win');
if(win){
const S={omni:[['u','Compare three launch plans and draft a one-page summary.'],['m','Model chosen automatically · reasoning'],['a','Here are the three plans ranked by effort, risk and likely impact, with a short recommendation for each…']],code:[['m','Repository connected · branch main'],['a','Reading project structure · 14 files in 3 folders'],['a','Proposed edits to 3 files, ready to review'],['u','Commit them as a single change.']]};
const body=$('.wbody',win),tabs=$$('.tabs button',win),sleep=ms=>new Promise(r=>setTimeout(r,ms));let tok=0;
const play=async key=>{const my=++tok;tabs.forEach(t=>t.classList.toggle('on',t.dataset.k===key));body.innerHTML='';for(const [k,t] of S[key]){const d=document.createElement('div');d.className='ln '+k+' t';body.append(d);if(RM){d.textContent=t}else for(const ch of t){if(my!==tok)return false;d.textContent+=ch;await sleep(k==='m'?9:17)}d.classList.remove('t');if(!RM)await sleep(400)}if(!RM)await sleep(3200);return my===tok};
const loop=async()=>{let i=0;const ks=Object.keys(S);while(!RM){const ok=await play(ks[i%2]);if(ok)i++;else await sleep(50)}};
let started=false;const st=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!started){started=true;RM?play('omni'):loop()}});st.observe(win);
tabs.forEach(t=>t.onclick=()=>{tok++;play(t.dataset.k)});
}
const feed=$('#feed');
if(feed){
const O='https://technology.trux.website',st=$('#fstat'),ck=$('#fchk');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=v=>{try{const u=new URL(String(v??''),O+'/');return u.origin===O?u.href:null}catch{return null}};
const card=s=>{const u=url(s.url);if(!u||!String(s.headline??'').trim())return'';const d=new Date(s.datePublished),ok=!isNaN(d);return`<a class="card ncard rv in" href="${esc(u)}"><div class="nmeta"><span>${esc(s.category||'Update')}</span><time>${ok?new Intl.DateTimeFormat(undefined,{year:'numeric',month:'short',day:'numeric'}).format(d):''}</time></div><h3>${esc(s.headline)}</h3><p>${esc(s.description||'Read the full update in the newsroom.')}</p></a>`};
const load=async()=>{try{const r=await fetch(O+'/data/news-index.json',{cache:'no-store'});if(!r.ok)throw 0;const a=await r.json();if(!Array.isArray(a))throw 0;const c=a.sort((x,y)=>new Date(y.datePublished)-new Date(x.datePublished)).slice(0,3).map(card).filter(Boolean);feed.innerHTML=c.length?c.join(''):'<p class="empty">No stories published yet. Check the newsroom soon.</p>';st.textContent='Live feed connected'}catch{feed.innerHTML='<p class="empty">The live feed is unavailable right now. Open the newsroom for current updates.</p>';st.textContent='Feed unavailable'}ck.textContent='Checked '+new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(new Date())};
load();setInterval(()=>{if(document.visibilityState==='visible')load()},3e5);
}
})();
