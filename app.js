(function(){
'use strict';
const W=1600,H=900;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const slides=$$('.slide'),N=slides.length;
const chapters=['פתיחה','הבסיס המדעי','הפער במחקר','הרעיון והמערכת','אפיון הממשק','נתונים וניתוח','גבולות ואתיקה','שיתוף פעולה מחקרי','סיכום','מקורות'];
const bgEl=$('#bg'),strip=$('#strip'),vp=$('#viewport'),fill=$('#fill'),blip=$('#blip'),track=$('#track');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ───────── References (single source for tooltips and the list) ───────── */
const D='https://doi.org/';
const REFS={
 1:['van Dillen, L. F., & Koole, S. L. (2007). Clearing the mind: A working memory model of distraction from negative mood. Emotion, 7(4), 715–723.',D+'10.1037/1528-3542.7.4.715'],
 2:['van Dillen, L. F., Heslenfeld, D. J., & Koole, S. L. (2009). Tuning down the emotional brain: An fMRI study of the effects of cognitive load on the processing of affective images. NeuroImage, 45(4), 1212–1219.',D+'10.1016/j.neuroimage.2009.01.016'],
 3:['Webb, T. L., Miles, E., & Sheeran, P. (2012). Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the process model of emotion regulation. Psychological Bulletin, 138(4), 775–808.',D+'10.1037/a0027600'],
 4:['Skorka-Brown, J., Andrade, J., Whalley, B., & May, J. (2015). Playing Tetris decreases drug and other cravings in real world settings. Addictive Behaviors, 51, 165–170.',D+'10.1016/j.addbeh.2015.07.020'],
 5:['Albulescu, P., et al. (2022). "Give me a break!" A systematic review and meta-analysis on the efficacy of micro-breaks for increasing well-being and performance. PLOS ONE, 17(8), e0272460.',D+'10.1371/journal.pone.0272460'],
 6:['Rupp, M. A., et al. (2017). Searching for affective and cognitive restoration: Examining the restorative effects of casual video game play. Human Factors, 59(7), 1096–1107.',D+'10.1177/0018720817715360'],
 7:['Collins, E., Cox, A., Wilcock, C., & Sethu-Jones, G. (2019). Digital games and mindfulness apps: Comparison of effects on post work recovery. JMIR Mental Health, 6(7), e12853.',D+'10.2196/12853'],
 8:['Meyer, T., et al. (2020). Arresting visuospatial stimulation is insufficient to disrupt analogue traumatic intrusions. PLOS ONE, 15(2), e0228416.',D+'10.1371/journal.pone.0228416'],
 9:['de Segovia Vicente, D., et al. (2026). Tapping into feelings: An experience sampling study examining the dynamics of smartphone-based emotion regulation and negative affect. Emotion, 26(2), 326–339.',D+'10.1037/emo0001584'],
 10:['Shi, Y., et al. (2023). "Instant Happiness": Smartphones as tools for everyday emotion regulation. International Journal of Human–Computer Studies, 170, 102958.',D+'10.1016/j.ijhcs.2022.102958'],
 11:['Tam, K. Y. Y., & Inzlicht, M. (2024). Fast-forward to boredom: How switching behavior on digital media makes people more bored. Journal of Experimental Psychology: General, 153(10), 2409–2426.',D+'10.1037/xge0001639'],
 12:['Skorka-Brown, J. (2015). Cognitive processes in craving: From the laboratory to the real world [PhD thesis, University of Plymouth]. PEARL.','https://pearl.plymouth.ac.uk/cgi/viewcontent.cgi?article=1123&context=psy-theses','PEARL'],
 13:['Spangler, D. P., & Friedman, B. H. (2017). A little goes a long way: Low working memory load is associated with optimal distractor inhibition and increased vagal control under anxiety. Frontiers in Human Neuroscience, 11, 43.',D+'10.3389/fnhum.2017.00043'],
 14:['Liu, W., et al. (2023). Antecedents and outcomes of work-related flow: A meta-analysis. Journal of Vocational Behavior, 144, 103891.',D+'10.1016/j.jvb.2023.103891'],
 15:['Hatano, A., et al. (2022). Thinking about thinking: People underestimate how enjoyable and engaging just waiting is. Journal of Experimental Psychology: General, 151(12), 3213–3229.',D+'10.1037/xge0001255'],
 16:['Versluis, A., et al. (2016). Changing mental health and positive psychological well-being using ecological momentary interventions: A systematic review and meta-analysis. JMIR, 18(6), e152.',D+'10.2196/jmir.5642'],
 17:['Businelle, M. S., et al. (2024). Investigating best practices for ecological momentary assessment: Nationwide factorial experiment. JMIR, 26, e50275.',D+'10.2196/50275'],
 18:['Wessel, I., et al. (2025). Evidence that Tetris reduces immediate but not subsequent daily intrusions of a trauma film: A multilab replication study. Collabra: Psychology, 11(1), 130791.',D+'10.1525/collabra.130791'],
 19:['Kool, W., McGuire, J. T., Rosen, Z. B., & Botvinick, M. M. (2010). Decision making and the avoidance of cognitive demand. Journal of Experimental Psychology: General, 139(4), 665–682.',D+'10.1037/a0020198'],
 20:['Shiffman, S., Stone, A. A., & Hufford, M. R. (2008). Ecological momentary assessment. Annual Review of Clinical Psychology, 4, 1–32.',D+'10.1146/annurev.clinpsy.3.022806.091415'],
 21:['Klasnja, P., et al. (2015). Microrandomized trials: An experimental design for developing just-in-time adaptive interventions. Health Psychology, 34(Suppl), 1220–1228.',D+'10.1037/hea0000305'],
 22:['Nahum-Shani, I., & Murphy, S. A. (2026). Just-in-time adaptive interventions: Where are we now and what is next? Annual Review of Psychology, 77, 679–703.',D+'10.1146/annurev-psych-121024-044244'],
 23:['Arévalo Avalos, M. R., et al. (2025). Personalizing a mental health texting intervention using reinforcement learning. npj Mental Health Research, 4, 64.',D+'10.1038/s44184-025-00173-3'],
 24:['Catalogna, M., Somerville, Y., Saporta, N., Nathansohn-Levi, B., Shelly, S., Edry, L., Zagoory-Sharon, O., Feldman, R., & Amedi, A. (2025). Brain connectivity correlates of the impact of a digital intervention for individuals with subjective cognitive decline on depression and IL-18. Scientific Reports, 15, 6863.',D+'10.1038/s41598-025-91457-3'],
 25:['Catalogna, M., Saporta, N., Nathansohn-Levi, B., Tamir, T., Shahaf, A., Molcho, S., Erlich, S., Shelly, S., & Amedi, A. (2025). Mobile application leads to psychological improvement and correlated neuroimmune function change in subjective cognitive decline. npj Digital Medicine, 8, 359.',D+'10.1038/s41746-025-01765-1'],
 26:['Amedi, A., Shelly, S., Saporta, N., & Catalogna, M. (2024). Perceptual learning and neural correlates of virtual navigation in subjective cognitive decline: A pilot study. iScience, 27(12), 111411.',D+'10.1016/j.isci.2024.111411'],
 27:['Schwartz, N., Snir, A., & Amedi, A. (2025). Feeling the music: Exploring emotional effects of auditory-tactile musical experiences. Frontiers in Virtual Reality, 6, 1592652.',D+'10.3389/frvir.2025.1592652'],
 28:['Catalogna, M., & Amedi, A. (2026). Digital neuroplasticity modulation of the brain–immune axis: Translational strategies for neurodegenerative, psychiatric, and aging-related conditions. Neural Regeneration Research, 21(10), 4914–4915.',D+'10.4103/NRR.NRR-D-25-01728']
};
const linkLabel=(u,l)=>l||('doi:'+u.replace(D,''));
const refList=$('#refs-l');
const groups=[['פסיכולוגיה קוגניטיבית, ויסות רגשי והתערבויות דיגיטליות',[...Array(23)].map((_,i)=>String(i+1))],['התערבות דיגיטלית רב-חושית (מעבדת עמדי, אוניברסיטת רייכמן)',['24','25','26','27','28']]];
groups.forEach(([title,keys])=>{
  const h=document.createElement('h4');h.textContent=title;h.style.direction='rtl';h.style.textAlign='right';refList.appendChild(h);
  const ul=document.createElement('ul');
  keys.forEach(k=>{const [t,u,l]=REFS[k];const li=document.createElement('li');li.id='ref-'+k;
    li.innerHTML='<span class="n">['+k+']</span><span>'+esc(t)+' <a href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(linkLabel(u,l))+'</a></span>';ul.appendChild(li);});
  refList.appendChild(ul);
});
$$('.c[data-r]').forEach(c=>c.dataset.r.split(',').forEach(n=>{const b=document.createElement('button');b.textContent=n;b.dataset.n=n;b.setAttribute('aria-label','מקור '+n);c.appendChild(b);}));
const tip=$('#cite');
const touchUI=()=>document.body.classList.contains('portrait')||matchMedia('(hover: none)').matches;
let tipT=0;const hideTip=()=>{clearTimeout(tipT);tip.classList.remove('show');};
function showTip(b){const k=b.dataset.n,[t,u,l]=REFS[k];
  tip.innerHTML='<b>['+k+']</b> '+esc(t)+'<br><span style="color:#b9d1ea">'+esc(linkLabel(u,l))+'</span><small>'+(touchUI()?'הרשימה המלאה בשקף המקורות בסוף המצגת':'לחיצה תעביר לרשימת המקורות')+'</small>';
  const r=b.getBoundingClientRect();tip.classList.add('show');
  const tw=tip.offsetWidth,th=tip.offsetHeight;
  const x=Math.min(innerWidth-tw-12,Math.max(12,r.left+r.width/2-tw/2));let y=r.top-th-10;if(y<70)y=r.bottom+10;
  tip.style.left=x+'px';tip.style.top=y+'px';}
document.addEventListener('mouseover',e=>{const b=e.target.closest&&e.target.closest('.c button');if(b)showTip(b);});
document.addEventListener('mouseout',e=>{if(touchUI())return;if(e.target.closest&&e.target.closest('.c button'))tip.classList.remove('show');});
document.addEventListener('focusin',e=>{const b=e.target.closest&&e.target.closest('.c button');if(b)showTip(b);else tip.classList.remove('show');});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.c button');
  if(!b){if(tip.classList.contains('show')&&touchUI())hideTip();return;}
  e.stopPropagation();
  if(touchUI()){e.preventDefault();showTip(b);clearTimeout(tipT);tipT=setTimeout(hideTip,5000);return;}
  tip.classList.remove('show');
  const k=b.dataset.n;go(slides.findIndex(s=>s.id==='refs'));
  $$('.refs li').forEach(l=>l.classList.remove('hi'));const li=$('#ref-'+k);
  setTimeout(()=>{li.classList.add('hi');li.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});},portrait?500:950);
});

/* ───────── Deck engine ───────── */
const pages=slides.map(s=>{const p=document.createElement('div');p.className='page';const f=document.createElement('div');f.className='frame';s.parentNode.insertBefore(p,s);f.appendChild(s);p.appendChild(f);return p;});
const wps=chapters.map((name,c)=>{const i=slides.findIndex(s=>+s.dataset.ch===c);if(i<0)return null;
  const b=document.createElement('button');b.className='wp';b.setAttribute('aria-label','מעבר אל '+name);
  b.style.right=(i/(N-1)*100)+'%';b.innerHTML='<span>'+name+'</span>';if(c%2)b.classList.add('up');
  b.addEventListener('click',()=>go(i));track.appendChild(b);return {b,i,c};}).filter(Boolean);
$$('[data-go]').forEach(a=>{const f=e=>{if(e.target.closest&&e.target.closest('.c'))return;const i=slides.findIndex(s=>s.id===a.dataset.go);if(i>=0)go(i);};
  a.addEventListener('click',f);if(a.getAttribute('role')==='link')a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f(e);}});});

let cur=-1,portrait=false,pageH=0,lock=0;
const pad=n=>String(n).padStart(2,'0');
function setChrome(i){
  const s=slides[i],ch=+s.dataset.ch;
  $('#chap').textContent=chapters[ch];
  $('#idx').innerHTML=pad(i+1)+' <i>/ '+N+'</i>';
  bgEl.className='t-'+(s.dataset.bg||'green');
  const pct=i/(N-1)*100;fill.style.width=pct+'%';blip.style.right=pct+'%';
  wps.forEach(w=>{w.b.classList.toggle('done',w.i<=i);w.b.classList.toggle('cur',w.c===ch);});
}
function activate(i){
  slides.forEach((s,k)=>{if(k!==i&&!portrait)s.classList.remove('on');});
  const s=slides[i];
  if(!portrait){s.classList.remove('on');void s.offsetWidth;}
  s.classList.add('on');
  document.dispatchEvent(new CustomEvent('slide',{detail:{id:s.id,i}}));
}
/* count-up for the headline numbers on each slide */
function countUp(slide){
  $$('.stat .v, .sc .big, .fc .fvn',slide).forEach(el=>{
    const tn=[...el.childNodes].find(n=>n.nodeType===3&&/\d/.test(n.textContent));if(!tn)return;
    if(tn._orig==null)tn._orig=tn.textContent;const o=tn._orig;const m=o.match(/\d[\d,]*(\.\d+)?/);if(!m)return;
    const raw=m[0],to=parseFloat(raw.replace(/,/g,'')),dec=(raw.split('.')[1]||'').length,sep=raw.includes(',');
    const fmt=v=>{let t=v.toFixed(dec);if(sep)t=Number(t).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});return o.slice(0,m.index)+t+o.slice(m.index+raw.length);};
    cancelAnimationFrame(tn._r);if(reduce){tn.textContent=o;return;}
    const t0=performance.now()+250,d=1400;
    const step=t=>{const p=Math.max(0,Math.min(1,(t-t0)/d)),e=1-Math.pow(1-p,3);tn.textContent=fmt(to*e);if(p<1)tn._r=requestAnimationFrame(step);else tn.textContent=o;};
    tn._r=requestAnimationFrame(step);});
}
document.addEventListener('slide',e=>countUp(slides[e.detail.i]));
function go(i,instant){
  i=Math.max(0,Math.min(N-1,i));
  if(portrait){pages[i].scrollIntoView({behavior:instant||reduce?'auto':'smooth',block:'start'});return;}
  if(i===cur)return;
  const prev=cur;
  if(prev>=0&&!instant&&!reduce){const ps=slides[prev];ps.classList.add('leave');clearTimeout(ps._lt);ps._lt=setTimeout(()=>ps.classList.remove('leave'),950);}
  slides[i].classList.remove('leave');
  cur=i;
  strip.style.transition=instant||reduce?'none':'transform .9s cubic-bezier(.65,0,.25,1)';
  strip.style.transform='translateY('+(-i*pageH)+'px)';
  setChrome(i);activate(i);
  try{history.replaceState(null,'','#'+slides[i].id);}catch(e){}
}
function layout(){
  const was=portrait;
  portrait=innerWidth<860||innerWidth/innerHeight<0.95;
  document.body.classList.toggle('portrait',portrait);
  if(portrait){
    pages.forEach(p=>{p.style.height='';$('.frame',p).style.transform='';});
    strip.style.transform='';
    if(!was){slides.forEach(s=>s.classList.remove('on'));observe();}
    return;
  }
  if(was&&io){io.disconnect();io=null;}
  pageH=vp.clientHeight;const w=vp.clientWidth;
  const sc=Math.min(w/W,pageH/H);
  pages.forEach(p=>{p.style.height=pageH+'px';$('.frame',p).style.transform='translate(-50%,-50%) scale('+sc+')';});
  const c=cur<0?0:cur;cur=-1;
  strip.style.transition='none';
  if(was)slides.forEach(s=>s.classList.remove('on'));
  go(c,true);
}
let io=null;
function observe(){
  io=new IntersectionObserver(es=>{es.forEach(e=>{const s=$('.slide',e.target);const i=slides.indexOf(s);
    if(e.isIntersecting){if(!s.classList.contains('on')){s.classList.add('on');document.dispatchEvent(new CustomEvent('slide',{detail:{id:s.id,i}}));}
      if(e.intersectionRatio>.35){cur=i;setChrome(i);}}
  });},{threshold:[0,.35,.6]});
  pages.forEach(p=>io.observe(p));
}
addEventListener('resize',()=>{clearTimeout(layout.t);layout.t=setTimeout(layout,80);});
const step=d=>{const now=Date.now();if(now<lock)return;lock=now+750;go(cur+d);};
$('#nav-next').addEventListener('click',()=>portrait?go(cur+1):go(cur+1));
$('#nav-prev').addEventListener('click',()=>go(cur-1));
$('#nav-top').addEventListener('click',()=>{closeMenu();go(0);});
addEventListener('scroll',()=>{if(touchUI()&&tip.classList.contains('show'))hideTip();},{passive:true});
/* chapter menu */
const menu=$('#menu'),menuBtn=$('#menu-btn');
const MENU=[
  {id:'cover',t:'פתיח',d:'אפליקציית WELLNESS להפחתת מועקה'},
  {id:'opening',t:'הרעיון בפסקה אחת',d:'הבסיס בקצרה'},
  {id:'abstract',t:'תקציר',d:'משימה, מדידה ולמידה'},
  {id:'agenda',t:'מבנה המצגת',d:'תשעה פרקים'},
  {ch:1,t:'הבסיס המדעי',d:'חמש שורות של ממצאים'},
  {ch:2,t:'הפער שהמחקרים השאירו פתוח',d:'ארבע השאלות הפתוחות'},
  {ch:3,t:'הרעיון והמערכת',d:'מאגר, עקרונות ומשפחות משימה'},
  {ch:4,t:'אפיון הממשק',d:'מסכים, מערכת עיצוב והדגמה חיה'},
  {ch:5,t:'נתונים וניתוח',d:'רשומה, הקצאה וניתוח'},
  {ch:6,t:'גבולות ואתיקה',d:'כלי רווחה, לא טיפול'},
  {ch:7,t:'הצעה לשיתוף פעולה מחקרי',d:'הזרוע החסרה, קוהורט ומסגרות'},
  {ch:8,t:'סיכום',d:'למשתמש, למחקר ולשותפות'},
  {ch:9,t:'מקורות',d:'28 מקורות'}];
MENU.forEach(m=>{const i=m.id?slides.findIndex(s=>s.id===m.id):slides.findIndex(s=>+s.dataset.ch===m.ch);if(i<0)return;m.i=i;const li=document.createElement('li');
  li.innerHTML='<button data-i="'+i+'"'+(m.ch?' data-c="'+m.ch+'"':' data-id="'+m.id+'"')+(m.ch?'':' class="plain"')+'><span class="mn">'+(m.ch||'')+'</span><span><b>'+esc(m.t)+'</b><small>'+esc(m.d)+'</small></span><span class="ms ltr">'+pad(i+1)+'</span></button>';$('#menu-l').appendChild(li);});
function openMenu(){const sl=slides[Math.max(0,cur)],ch=+sl.dataset.ch;$$('#menu-l button').forEach(b=>b.classList.toggle('cur',b.dataset.c?+b.dataset.c===ch:b.dataset.id===sl.id));menu.hidden=false;requestAnimationFrame(()=>menu.classList.add('open'));menuBtn.setAttribute('aria-expanded','true');}
function closeMenu(){if(menu.hidden)return;menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');setTimeout(()=>{if(!menu.classList.contains('open'))menu.hidden=true;},250);}
menuBtn.addEventListener('click',e=>{e.stopPropagation();menu.hidden?openMenu():closeMenu();});
$('#menu-l').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;closeMenu();go(+b.dataset.i);});
document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('#menu,#menu-btn'))closeMenu();});
addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
$('#fs').addEventListener('click',()=>{try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{});}catch(e){}});
const inScroller=t=>{const r=t.closest&&t.closest('.refs');return r&&r.scrollHeight>r.clientHeight+2?r:null;};
addEventListener('wheel',e=>{if(portrait)return;const sc=inScroller(e.target);
  if(sc){const atTop=sc.scrollTop<=0,atEnd=sc.scrollTop+sc.clientHeight>=sc.scrollHeight-2;if(!(e.deltaY<0&&atTop)&&!(e.deltaY>0&&atEnd))return;}
  e.preventDefault();if(Math.abs(e.deltaY)<14)return;step(e.deltaY>0?1:-1);},{passive:false});
addEventListener('keydown',e=>{if(portrait||!$('#menu').hidden)return;const t=e.target;if(t.matches&&t.matches('input,textarea,select'))return;
  if(['ArrowDown','PageDown',' ','ArrowLeft'].includes(e.key)){e.preventDefault();step(1);}
  else if(['ArrowUp','PageUp','ArrowRight'].includes(e.key)){e.preventDefault();step(-1);}
  else if(e.key==='Home'){e.preventDefault();go(0);}else if(e.key==='End'){e.preventDefault();go(N-1);}
  else if(e.key==='f'||e.key==='F'){$('#fs').click();}});
let ty=null;
addEventListener('touchstart',e=>{if(portrait)return;const t=e.target;ty=(t.closest('input,canvas,.agrid,.refs,.phone'))?null:e.touches[0].clientY;},{passive:true});
addEventListener('touchend',e=>{if(portrait||ty===null)return;const d=ty-e.changedTouches[0].clientY;if(Math.abs(d)>60)step(d>0?1:-1);ty=null;},{passive:true});

/* ───────── Shared helpers ───────── */
const PAL={A:{bg:'#fbf9ff',sf:'#ece7ff',ac:'#8f7ce8',tx:'#2c2849'},B:{bg:'#f6fbff',sf:'#e3f1fd',ac:'#7fbbec',tx:'#2c2849'},C:{bg:'#f5fcf8',sf:'#e0f6ec',ac:'#6fcfa6',tx:'#2c2849'}};
const ST={blue:'#3d86c6',orange:'#e8875e',violet:'#6f5bd6',rose:'#d9679b',grey:'#a79ee0'};
function setPhonePal(ph,p){ph.classList.remove('pB','pC');if(p!=='A')ph.classList.add('p'+p);}
function drawGraph(el,pairs,newLast){
  $$('.ln,.pt',el).forEach(n=>n.remove());
  const n=pairs.length;if(!n)return;
  const w=100/(n+1);
  pairs.forEach(([a,b],i)=>{const x=(i+1)*w;const ya=8+(10-a)/10*76,yb=8+(10-b)/10*76;
    const ln=document.createElement('i');ln.className='ln';ln.style.left=x+'%';ln.style.top=Math.min(ya,yb)+'%';ln.style.height=Math.abs(ya-yb)+'%';
    const p1=document.createElement('i');p1.className='pt pre';p1.style.left=x+'%';p1.style.top=ya+'%';
    const p2=document.createElement('i');p2.className='pt post';p2.style.left=x+'%';p2.style.top=yb+'%';
    if(newLast&&i===n-1){[ln,p1,p2].forEach(z=>z.classList.add('new'));}
    el.append(ln,p1,p2);});
}
$$('[data-graph]').forEach(el=>drawGraph(el,el.dataset.graph.split(',').map(s=>s.split(':').map(Number))));
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296;};}

/* ───────── Working memory ───────── */
(function(){const seg=$('#wmseg');if(!seg)return;const slots=$$('#wmslots .slot');
  const P=[['ru','"למה אמרתי את זה"'],['ru','"מה אם מחר…"'],['ru','מחשבה שחוזרת'],['ru','"עוד סרטון"']];
  const T=[['tk','מסלול של 4 עיגולים'],['tk b','איפה היה הכחול?'],['tk g','קצב שנפסק'],['ru','מחשבה שחוזרת']];
  seg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',seg).forEach(x=>x.classList.toggle('sel',x===b));
    const m=+b.dataset.m,set=m?T:P;slots.forEach((s,i)=>{s.className='slot '+set[i][0];s.textContent=set[i][1];});
    $('#wmA').style.width=m?'25%':'85%';$('#wmB').style.width=m?'75%':'15%';$('#wmAv').textContent=m?'נמוך':'גבוה';$('#wmBv').textContent=m?'גבוה':'נמוך';});
})();

/* ───────── Inverted U ───────── */
(function(){const path=$('#uperf');if(!path)return;const L=path.getTotalLength();
  function upd(){const v=+$('#uload').value;const x=30+v/100*380;
    let lo=0,hi=L;for(let k=0;k<24;k++){const m=(lo+hi)/2;if(path.getPointAtLength(m).x<x)lo=m;else hi=m;}
    const p=path.getPointAtLength(lo);$('#udot').setAttribute('cx',p.x);$('#udot').setAttribute('cy',p.y);$('#ucur').setAttribute('x1',p.x);$('#ucur').setAttribute('x2',p.x);
    $('#utext').textContent=v<35?'עומס נמוך: הביצוע הטוב ביותר במחקר של Spangler ו-Friedman.':v<65?'עומס בינוני: הביצוע יורד, והחרדה ממשיכה לעלות עם העומס.':'עומס גבוה: ביצוע נמוך וחרדה גבוהה. לכן בשיא המועקה מוצעת משימה קלה יותר.';}
  $('#uload').addEventListener('input',upd);upd();})();

/* ───────── Canvas animations (illustrative tasks) ───────── */
function mazeGen(n,seed){const r=rng(seed);const cells=[...Array(n*n)].map(()=>({w:[1,1,1,1]}));const vis=new Set([0]);const st=[0];
  while(st.length){const c=st[st.length-1],x=c%n,y=(c/n)|0;const nb=[[0,-1,0,2],[1,0,1,3],[0,1,2,0],[-1,0,3,1]].map(([dx,dy,a,b])=>[x+dx,y+dy,a,b]).filter(([X,Y])=>X>=0&&Y>=0&&X<n&&Y<n&&!vis.has(Y*n+X));
    if(!nb.length){st.pop();continue;}const [X,Y,a,b]=nb[(r()*nb.length)|0];const k=Y*n+X;cells[c].w[a]=0;cells[k].w[b]=0;vis.add(k);st.push(k);}
  const prev={0:-1},q=[0];while(q.length){const c=q.shift();if(c===n*n-1)break;const x=c%n,y=(c/n)|0;[[0,-1,0],[1,0,1],[0,1,2],[-1,0,3]].forEach(([dx,dy,a])=>{if(cells[c].w[a])return;const k=(y+dy)*n+x+dx;if(!(k in prev)){prev[k]=c;q.push(k);}});}
  const path=[];for(let c=n*n-1;c!==-1;c=prev[c])path.unshift(c);return{cells,path,n};}
const MAZE=mazeGen(7,11);
const MOTS={};
function anim(type,ctx,t,W2,H2,st){
  const S=W2;ctx.clearRect(0,0,W2,H2);ctx.lineCap='round';ctx.lineJoin='round';
  if(type==='maze'){const {cells,path,n}=MAZE;const pd=S*.08,cs=(S-2*pd)/n;const lvl=Math.floor(t/5)%3;
    const prog=(t%5)/5;const idx=prog*(path.length-1);const i0=Math.floor(idx),f=idx-i0;
    const cxy=c=>[pd+(c%n+.5)*cs,pd+(((c/n)|0)+.5)*cs];
    const [ax,ay]=cxy(path[i0]),[bx,by]=cxy(path[Math.min(i0+1,path.length-1)]);const px=ax+(bx-ax)*f,py=ay+(by-ay)*f;
    if(lvl===2){ctx.fillStyle='rgba(44,40,73,.82)';ctx.fillRect(0,0,W2,H2);}
    ctx.strokeStyle=ST.grey;ctx.lineWidth=S*.012;
    const r=rng(5);
    cells.forEach((c,k)=>{const x=pd+(k%n)*cs,y=pd+((k/n)|0)*cs;const segs=[[x,y,x+cs,y],[x+cs,y,x+cs,y+cs],[x,y+cs,x+cs,y+cs],[x,y,x,y+cs]];
      c.w.forEach((w,j)=>{const hide=r()<.5;if(!w)return;if(lvl===2)return;ctx.globalAlpha=lvl===1&&hide?.12:1;ctx.beginPath();ctx.moveTo(segs[j][0],segs[j][1]);ctx.lineTo(segs[j][2],segs[j][3]);ctx.stroke();});});
    ctx.globalAlpha=1;
    const [gx,gy]=cxy(n*n-1);const g=ctx.createRadialGradient(gx,gy,0,gx,gy,cs*.6);g.addColorStop(0,'#fbfdfc');g.addColorStop(.4,'#cfc4fb');g.addColorStop(1,'rgba(143,124,232,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(gx,gy,cs*.6,0,7);ctx.fill();
    if(lvl===2){for(let k=0;k<3;k++){const rr=((t*1.4+k/3)%1)*cs*1.4;ctx.strokeStyle='rgba(191,221,216,'+(1-rr/(cs*1.4))*.8+')';ctx.lineWidth=S*.006;ctx.beginPath();ctx.arc(px,py,rr,0,7);ctx.stroke();}}
    ctx.fillStyle=ST.blue;ctx.beginPath();ctx.arc(px,py,cs*.22,0,7);ctx.fill();
    ctx.fillStyle=lvl===2?'#e8e4fb':'#6c6889';ctx.font=(S*.045)+'px Heebo';ctx.textAlign='center';ctx.fillText(['רמה 1 · מבוך גלוי','רמה 2 · חצי מוסתר','רמה 3 · צליל בלבד'][lvl],S/2,S*.05);
  }
  else if(type==='sound'){ctx.fillStyle='#ffd5e6';ctx.fillRect(0,0,W2,H2);const cx=S/2,cy=S/2;
    ctx.fillStyle='#2F3E34';ctx.beginPath();ctx.arc(cx,cy,S*.025,0,7);ctx.fill();
    const cyc=3.2,ph=t%cyc,k=Math.floor(t/cyc);const r=rng(k*7+3);const ang=r()*6.28,rad=S*(.22+r()*.18);const sx=cx+Math.cos(ang+ph*.25)*rad,sy=cy+Math.sin(ang+ph*.25)*rad;
    if(ph<2){for(let j=0;j<3;j++){const rr=((ph*1.2+j/3)%1)*S*.16;ctx.strokeStyle='rgba(59,110,168,'+(1-rr/(S*.16))*.7+')';ctx.lineWidth=S*.008;ctx.beginPath();ctx.arc(sx,sy,rr,0,7);ctx.stroke();}}
    if(ph>1.6&&ph<2.6){const tx=sx+S*.05,ty=sy-S*.03;ctx.strokeStyle='#2F3E34';ctx.lineWidth=S*.008;ctx.beginPath();ctx.arc(tx,ty,S*.04,0,7);ctx.stroke();}
    if(ph>2.2){ctx.fillStyle=ST.violet;ctx.globalAlpha=Math.min(1,(ph-2.2)*3);ctx.beginPath();ctx.arc(sx,sy,S*.03,0,7);ctx.fill();ctx.globalAlpha=1;}
  }
  else if(type==='music'){const cx=S/2,cy=S/2;const seg=Math.floor(t/4)%2;const bpm=seg?92:66;const ph=(t*bpm/60)%1;const br=Math.pow(Math.sin(ph*Math.PI),2);
    ctx.fillStyle='rgba(47,62,52,.6)';ctx.font=(S*.045)+'px Assistant';ctx.textAlign='center';ctx.fillText('השיר שבחרת',cx,S*.12);
    ctx.fillStyle='rgba(233,139,181,.25)';ctx.beginPath();ctx.arc(cx,cy,S*(.26+br*.06),0,7);ctx.fill();
    ctx.fillStyle='#e98bb5';ctx.beginPath();ctx.arc(cx,cy,S*(.18+br*.04),0,7);ctx.fill();
    const ch=(t%4);if(ch<.5){ctx.strokeStyle='#fbfdfc';ctx.lineWidth=S*.014;ctx.globalAlpha=1-ch*2;ctx.beginPath();ctx.arc(cx,cy,S*.18,0,7);ctx.stroke();ctx.globalAlpha=1;}
    for(let j=0;j<5;j++){const x=cx+(j-2)*S*.06,h=S*.03*(1+Math.sin(t*8+j)*.6);ctx.fillStyle='rgba(47,62,52,.35)';ctx.fillRect(x-S*.01,S*.88-h,S*.02,h);}
  }
  else if(type==='map'){const pd=S*.08;ctx.fillStyle='#fde7f0';ctx.fillRect(0,0,W2,H2);const cyc=7,ph=t%cyc;const rot=Math.floor(t/cyc)%2;
    ctx.save();if(rot&&ph>3){ctx.translate(S/2,S/2);ctx.rotate(Math.PI/2);ctx.translate(-S/2,-S/2);}
    ctx.fillStyle='#fbfdfc';for(let i=0;i<4;i++){ctx.fillRect(pd,pd+i*S*.22,S-2*pd,S*.035);ctx.fillRect(pd+i*S*.24,pd,S*.035,S*.72);}
    ctx.fillStyle='#ffd5e6';[[.2,.17],[.45,.17],[.7,.4],[.2,.62],[.45,.4],[.7,.62]].forEach(([x,y])=>{ctx.fillRect(S*x,S*y,S*.13,S*.1);});
    const items=[[.27,.22,ST.blue],[.77,.45,ST.orange],[.27,.67,ST.violet],[.52,.45,ST.grey]];
    items.forEach(([x,y,c],j)=>{let X=S*x,Y=S*y,show=ph<2.5;
      if(ph>=3.5){const pp=Math.min(1,Math.max(0,(ph-3.5-j*.6)/.7));const sx=S*(.2+j*.2),sy=S*.9;X=sx+(X-sx)*pp;Y=sy+(Y-sy)*pp;show=true;}
      if(show){ctx.fillStyle=c;ctx.beginPath();ctx.arc(X,Y,S*.035,0,7);ctx.fill();}});
    ctx.restore();
    if(ph>=2.5){items.forEach(([x,y,c],j)=>{const pp=(ph-3.5-j*.6)/.7;if(pp>=1)return;if(ph>=3.5&&pp>0)return;ctx.fillStyle=c;ctx.beginPath();ctx.arc(S*(.2+j*.2),S*.9,S*.035,0,7);ctx.fill();});}
  }
  else if(type==='mot'){if(!st.mot){const r=rng(9);st.mot=[...Array(9)].map((_,i)=>({x:.2+r()*.6,y:.2+r()*.6,vx:(r()-.5)*.3,vy:(r()-.5)*.3,tg:i<3}));st.last=t;}
    const dt=Math.min(.05,t-st.last);st.last=t;const cyc=6,ph=t%cyc;const moving=ph>1.5&&ph<4.5;
    st.mot.forEach(o=>{if(moving){o.x+=o.vx*dt;o.y+=o.vy*dt;if(o.x<.1||o.x>.9)o.vx*=-1;if(o.y<.1||o.y>.9)o.vy*=-1;}
      const X=o.x*S,Y=o.y*S,R=S*.045;const flash=ph<1.5&&o.tg;const sel=ph>4.6&&o.tg&&(ph-4.6)>(st.mot.indexOf(o))*.3;
      if(flash){ctx.fillStyle=ST.blue;ctx.beginPath();ctx.arc(X,Y,R,0,7);ctx.fill();}
      else if(ph<1.5){ctx.strokeStyle=ST.grey;ctx.lineWidth=S*.012;ctx.beginPath();ctx.arc(X,Y,R*.85,0,7);ctx.stroke();}
      else{ctx.fillStyle=sel?'#e98bb5':ST.grey;ctx.beginPath();ctx.arc(X,Y,R,0,7);ctx.fill();}});
  }
  else if(type==='rhythm'){const cx=S/2,cy=S/2;const beat=.75,ph=(t%beat)/beat;const sil=Math.floor(t/4)%2===1;
    const pulse=sil?0:Math.max(0,1-ph*3);ctx.fillStyle='rgba(143,124,232,.2)';ctx.beginPath();ctx.arc(cx,cy,S*(.25+pulse*.06),0,7);ctx.fill();
    ctx.fillStyle=sil?'#ddd3ff':'#8f7ce8';ctx.beginPath();ctx.arc(cx,cy,S*(.18+pulse*.04),0,7);ctx.fill();
    const tap=Math.max(0,1-((t+.04)%beat)/beat*2.5);ctx.strokeStyle='rgba(47,62,52,'+tap*.6+')';ctx.lineWidth=S*.012;ctx.beginPath();ctx.arc(cx,cy,S*(.2+(1-tap)*.12),0,7);ctx.stroke();
    ctx.fillStyle='#6c6889';ctx.font=(S*.045)+'px Heebo';ctx.textAlign='center';ctx.fillText(sil?'הצליל נפסק · ממשיכים בקצב':'מקישים עם הקצב',cx,S*.9);
    ctx.save();ctx.translate(S*.82,S*.12);ctx.strokeStyle='#6c6889';ctx.lineWidth=S*.008;ctx.beginPath();ctx.moveTo(-S*.03,-S*.015);ctx.lineTo(-S*.015,-S*.015);ctx.lineTo(0,-S*.03);ctx.lineTo(0,S*.03);ctx.lineTo(-S*.015,S*.015);ctx.lineTo(-S*.03,S*.015);ctx.closePath();ctx.stroke();
    if(sil){ctx.beginPath();ctx.moveTo(S*.015,-S*.015);ctx.lineTo(S*.045,S*.015);ctx.moveTo(S*.045,-S*.015);ctx.lineTo(S*.015,S*.015);ctx.stroke();}else{ctx.beginPath();ctx.arc(S*.01,0,S*.025,-.8,.8);ctx.stroke();}ctx.restore();
  }
  else if(type==='grid'){const n=4,pd=S*.06,g=S*.035,ts=(S-2*pd-(n-1)*g)/n;const cyc=5.2,ph=t%cyc,k=Math.floor(t/cyc);const r=rng(k*5+2);
    const pos=[];while(pos.length<3){const q=(r()*16)|0;if(!pos.includes(q))pos.push(q);}const cols=[ST.violet,ST.rose,ST.blue];
    for(let i=0;i<16;i++){const x=pd+(i%n)*(ts+g),y=pd+((i/n)|0)*(ts+g);ctx.fillStyle='#ece7ff';rr(ctx,x,y,ts,ts,ts*.22);ctx.fill();}
    pos.forEach((q,j)=>{const cx=pd+(q%n)*(ts+g)+ts/2,cy=pd+((q/n)|0)*(ts+g)+ts/2;let sc=0;
      if(ph<1.8)sc=Math.min(1,ph/.25);else if(ph<2.1)sc=1-(ph-1.8)/.3;
      const tt=2.4+j*.7;if(ph>tt){sc=Math.min(1,(ph-tt)/.25);const rp=Math.min(1,(ph-tt)/.5);ctx.strokeStyle='rgba(47,62,52,'+(1-rp)*.6+')';ctx.lineWidth=S*.012;ctx.beginPath();ctx.arc(cx,cy,ts*.3+rp*ts*.3,0,7);ctx.stroke();}
      if(sc>0){ctx.fillStyle=cols[j];ctx.beginPath();ctx.arc(cx,cy,ts*.3*sc,0,7);ctx.fill();}});
  }
  else if(type==='ai'){const n=5,pd=S*.14,cs=(S-2*pd)/n;const k=Math.floor(t/3.5);const r=rng(k*13+1);const odd=(r()*n*n)|0;const ph=t%3.5;
    for(let i=0;i<n*n;i++){const x=pd+(i%n+.5)*cs,y=pd+(((i/n)|0)+.5)*cs;const isO=i===odd;
      ctx.fillStyle=isO&&ph>2.2?'#8FB39A':ST.grey;ctx.save();ctx.translate(x,y);ctx.rotate(isO?.5:0);
      if(isO&&ph>2.2){ctx.beginPath();ctx.arc(0,0,cs*.32,0,7);ctx.fill();}
      ctx.fillStyle=isO&&ph>2.2?'#fbfdfc':ST.grey;ctx.beginPath();ctx.moveTo(0,-cs*.22);ctx.lineTo(cs*.2,cs*.16);ctx.lineTo(-cs*.2,cs*.16);ctx.closePath();ctx.fill();ctx.restore();}
    ctx.fillStyle='#62737f';ctx.font=(S*.045)+'px Heebo';ctx.textAlign='center';ctx.fillText('מצא/י את השונה',S/2,S*.08);
  }
}
const ANIMS=[];
$$('canvas[data-anim]').forEach(c=>ANIMS.push({c,ctx:c.getContext('2d'),type:c.dataset.anim,slide:c.closest('.slide'),st:{}}));
const famCv=$('#famcv');if(famCv)ANIMS.push({c:famCv,ctx:famCv.getContext('2d'),type:'maze',slide:famCv.closest('.slide'),st:{}});
const introCv=$('#introcv');if(introCv)ANIMS.push({c:introCv,ctx:introCv.getContext('2d'),type:'grid',slide:introCv.closest('.slide'),st:{},cond:()=>demo.k===4});
const t0=performance.now();
function loop(now){const t=(now-t0)/1000;
  ANIMS.forEach(a=>{if(!a.slide.classList.contains('on'))return;if(a.cond&&!a.cond())return;if(portrait){const r=a.c.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;}
    anim(a.type,a.ctx,reduce?2.2:t,a.c.width,a.c.height,a.st);});
  if(demo.task)taskFrame(now);
  requestAnimationFrame(loop);}

/* ───────── Families ───────── */
const FAM=[
 {n:'מבוך עם הסרת ראייה',a:'maze',kv:[['מה עושים','מנווטים במבוך אל יעד; צליל מציין מרחק מקיר'],['ערוץ / תחום','רב-חושי / מרחבי'],['כל הפעלה','מבוך חדש, פרוצדורלי, 6×6 עד 10×10']],lv:['מבוך גלוי, מפה בהתחלה','50% מוסתר','צליל בלבד']},
 {n:'איתור צליל נע',a:'sound',kv:[['מה עושים','מסמנים על המסך מאיפה מגיע צליל (אוזניות)'],['ערוץ / תחום','שמיעתי / מרחבי'],['כל הפעלה','מסלולי תנועה אקראיים']],lv:['צליל אחד איטי','שני צלילים','רעש רקע + מהיר']},
 {n:'מוזיקה ברטט',a:'music',kv:[['מה עושים','מאזינים לשיר שבחרו עם רטט מסונכרן, ומקישים כשהקצב משתנה'],['ערוץ / תחום','רב-חושי / קשב'],['כל הפעלה','ניתוח קצב של השיר שנבחר']],lv:['שינויים גסים','עדינים','שני כלים במקביל']},
 {n:'מפה שנעלמת',a:'map',kv:[['מה עושים','רואים פריטים על מפה, המפה נעלמת, ומשחזרים מיקום'],['ערוץ / תחום','חזותי / זיכרון עבודה'],['כל הפעלה','מפה ופריטים אקראיים']],lv:['4 פריטים, 10 שנ׳','7 פריטים, 5 שנ׳','7 פריטים, והמפה מסתובבת']},
 {n:'מעקב מטרות',a:'mot',kv:[['מה עושים','עוקבים אחרי עצמים נעים בין מסיחים, ומזהים בסוף'],['ערוץ / תחום','חזותי / קשב'],['כל הפעלה','מסלולים אקראיים']],lv:['2 מטרות','4 מטרות','5 + עצמים מתחלפים']},
 {n:'קצב בלי צליל',a:'rhythm',kv:[['מה עושים','מקישים לפי קצב, וממשיכים אותו כשהצליל נפסק'],['ערוץ / תחום','רב-חושי / מוטורי-קצבי'],['כל הפעלה','רצף קצב אקראי']],lv:['קצב קבוע','משתנה בהדרגה','המשך בשקט']},
 {n:'מאגר מיוצר AI',a:'ai',kv:[['מה עושים','משימות סטטיות שמודל שפה מייצר: רשתות איתור, רצפים מספריים, השוואת דפוסים'],['ערוץ / תחום','חזותי-סטטי / לפי הסיווג'],['לפני המאגר','בדיקה אוטומטית של פתירות וקושי']],lv:['אותם ארבעה צירים','חזותיות-סטטיות בלבד','לא מחליפות את המנועים הרב-חושיים']}
];
function setFam(i){const f=FAM[i];$('#fname').textContent=f.n;
  $('#fkv').innerHTML=f.kv.map(([k,v])=>'<dt>'+k+'</dt><dd>'+v+'</dd>').join('');
  $('#flv').innerHTML=f.lv.map((v,j)=>'<div><b>'+(i===6?['סיווג','ערוץ','גבול'][j]:'רמה '+(j+1))+'</b>'+v+'</div>').join('');
  const a=ANIMS.find(x=>x.c===famCv);if(a){a.type=f.a;a.st={};}
  $$('#famlist .fmb').forEach((b,j)=>b.classList.toggle('sel',j===i));}
if($('#famlist')){$('#famlist').addEventListener('click',e=>{const b=e.target.closest('.fmb');if(b)setFam(+b.dataset.f);});setFam(0);}

/* ───────── Screen map ───────── */
const SCR={
 '0.1':['פתיחה','להסביר במשפט מה זה: "כשמעיק, משימה קצרה שתופסת את הראש." ומיד: "לא טיפול. לא תחליף לטיפול."','התחל',''],
 '0.2':['הסכמה','שני מתגים נפרדים: תנאי שימוש (חובה) ושימוש מחקרי בלי פרט מזהה (רשות).','המשך','consent_terms,consent_research'],
 '0.3':['שאלון היכרות','6 מסכים, שאלה בכל אחד, התקדמות אוטומטית. שלוש שאלות חובה ושלוש רשות.','בחירה','profile'],
 '0.4':['ערכה ותזכורת','שלושה ריבועים בלי שם, ובורר שעה. הרשאת התראות רק אחרי "סיימתי".','סיימתי','palette,reminder_time'],
 '1':['בית','כפתור עגול אחד, "עכשיו", וגרף אישי של השבוע. אין כותרת, ברכה או תאריך.','עכשיו','app_open'],
 '2':['לפני','"כמה מעיק עכשיו?" סליידר 0–10, ואז Affect Grid. אחרי זה המערכת מגרילה משפחה ורמה ובודקת מצב צליל.','המשך','suds_pre,grid_pre'],
 '3':['בחירת אורך','"כמה זמן יש לך?" שני כרטיסים, 2/4 או 4/6 לפי ההגרלה. איזו משימה הוגרלה עדיין לא מוצג.','2 דק׳ / 4 דק׳','length,music_on'],
 '4':['פתיחת משימה','שם המשימה, הוראה עד 12 מילים, והדגמה של 2 שניות בלולאה. "לא עכשיו" חוזר לבית.','התחל','abandoned_at = 0'],
 '5':['המשימה','מסך מלא, טיימר טבעת בלי ספרות, X ליציאה בלי דיאלוג. שיחה נכנסת עוצרת את הטיימר.','(המשימה)','accuracy,mean_rt,adjustments,actual_min'],
 '6':['מעבר','דעיכה של 400ms ומסך neutral ריק ל-2 שניות, בלי טקסט ובלי צליל.','אוטומטי',''],
 '7':['אחרי','5 מסכים: מועקה, Affect Grid, "מרגיש/ה טוב יותר?", "מה היית מעדיף/ה לעשות עכשיו?", "כמה זה היה קשה?"','בחירה','suds_post,grid_post,better,prefer_now,difficulty'],
 '8':['סגירה','הגרף האישי, הנקודה החדשה נכנסת מימין. שורה אחת: "לפני: 7 · אחרי: 4". בלי פרשנות.','סיימתי',''],
 'w':['שבועי','בכניסה הראשונה ביום קבוע, רק אם היו 3+ סשנים. שני מסכים, "דלג" גלוי.','דלג / בחירה','weekly'],
 'n':['תזכורת','התראה אחת בלבד: "רגע לראש?" פותחת ישירות את מסך 2a.','—',''],
 's':['רשת ביטחון','"נראה שהתקופה הזו קשה." שלושה כרטיסים: ער"ן 1201, סה"ר, קופת החולים. אין "אל תציגו שוב".','הבנתי',''],
 'g':['הגדרות','צבע, תזכורת, מוזיקה, שליטה במבוך, הסכמה מחקרית, ייצוא ומחיקה, ומקורות מדעיים.','—','palette'],
 'h':['היסטוריה','הגרף בגודל מלא, שבוע או חודש. לחיצה על נקודה: יום, שעה, משפחה, לפני/אחרי. זהו.','—','']
};
function setScr(k){const [n,d,a,l]=SCR[k];$$('#smap .sn').forEach(b=>b.classList.toggle('sel',b.dataset.s===k));
  $('#sinfo').innerHTML='<div><small>מסך '+esc(k)+' · '+esc(n)+'</small><p>'+esc(d)+'</p></div><div><small>פעולה ראשית</small><p>'+esc(a)+'</p></div><div><small>מה נרשם</small><p>'+(l?l.split(',').map(x=>'<code>'+esc(x)+'</code>').join(' '):'—')+'</p></div>';}
if($('#smap')){$('#smap').addEventListener('click',e=>{const b=e.target.closest('.sn');if(b)setScr(b.dataset.s);});$$('#smap .sn').forEach(b=>b.addEventListener('mouseenter',()=>setScr(b.dataset.s)));setScr('1');}

/* ───────── Design system palettes ───────── */
if($('#pals')){$('#pals').addEventListener('click',e=>{const b=e.target.closest('.pal');if(!b)return;const p=b.dataset.p;
  $$('#pals .pal').forEach(x=>x.classList.toggle('sel',x===b));setPhonePal($('#dsphone'),p);
  $$('#hexes .hx').forEach(h=>{const i=$('i',h),k=i.dataset.k;if(k==='ne')return;i.style.background=PAL[p][k];$('b',h).textContent=PAL[p][k];});});
  $$('#hexes .hx i').forEach(i=>{if(i.dataset.k!=='ne')i.style.background=PAL.A[i.dataset.k];});}

/* ───────── Onboarding phone ───────── */
const ob={o:0,prof:{feel:[],channel:[]},palette:'A'};
function obShow(o){ob.o=o;$$('#obphone .v').forEach(v=>v.classList.toggle('sel',+v.dataset.o===o));
  $$('#obsteps .stp').forEach(s=>{const k=+s.dataset.o;s.classList.toggle('sel',k===o);s.classList.toggle('done',k<o);});obRec();}
function obRec(){const r=[['consent_terms',$('#ob-c1').checked],['consent_research',$('#ob-c2').checked],['profile.feel',ob.prof.feel],['profile.channel',ob.prof.channel],['palette',ob.palette],['reminder_time',ob.o>=5?'20:00':null]];
  $('#obrec').innerHTML=r.map(([k,v])=>'<div><span class="k">'+k+'</span>: '+(v===null||(Array.isArray(v)&&!v.length)?'<span class="z">—</span>':typeof v==='boolean'?'<span class="n">'+v+'</span>':'<span class="s">'+esc(JSON.stringify(v))+'</span>')+'</div>').join('');}
if($('#obphone')){obRec();
  $('#obsteps').addEventListener('click',e=>{const b=e.target.closest('.stp');if(b)obShow(+b.dataset.o);});
  $('#obphone').addEventListener('click',e=>{const t=e.target;
    if(t.closest('[data-next]')&&!t.closest('[data-next]').disabled){obShow(ob.o<5?ob.o+1:0);return;}
    const c=t.closest('.multi .pcard');if(c){c.classList.toggle('sel');const v=c.closest('.v');const vals=$$('.pcard.sel',v).map(x=>x.textContent);if(+v.dataset.o===2)ob.prof.feel=vals;else ob.prof.channel=vals;obRec();return;}
    const p=t.closest('#obpal button');if(p){ob.palette=p.dataset.p;$$('#obpal button').forEach(x=>x.style.borderColor=x===p?PAL[x.dataset.p].ac:'transparent');setPhonePal($('#obphone'),ob.palette);setPhonePal($('#dphone'),ob.palette);demo.rec.palette=ob.palette;renderRec();obRec();}
  });
  ['ob-c1','ob-c2'].forEach(id=>$('#'+id).addEventListener('change',()=>{$('#ob-cont').disabled=!$('#ob-c1').checked;obRec();}));
}

/* ───────── Live core demo ───────── */
const demo={k:0,hist:[[7,4],[6,4],[8,5],[5,3],[6,3]],rec:{},task:null};
const TASK_SEC=30;
function freshRec(){demo.rec={user_id:'anon_7f3a',palette:ob.palette||'A',assignment:null,family:null,level:null,mechanism:null,length:null,suds_pre:null,grid_pre:null,accuracy:null,mean_rt:null,adjustments:null,abandoned_at:null,suds_post:null,grid_post:null,better:null,prefer_now:null,difficulty:null};demo.changed=new Set();}
function setR(k,v){demo.rec[k]=v;demo.changed.add(k);}
function renderRec(){const el=$('#drec');if(!el)return;
  el.innerHTML='{<br>'+Object.entries(demo.rec).map(([k,v])=>{const val=v===null?'<span class="z">null</span>':typeof v==='number'?'<span class="n">'+v+'</span>':Array.isArray(v)?'<span class="n">['+v.join(', ')+']</span>':'<span class="s">"'+esc(v)+'"</span>';
    return '<div'+(demo.changed&&demo.changed.has(k)?' class="new"':'')+'>&nbsp;&nbsp;<span class="k">'+k+'</span>: '+val+',</div>';}).join('')+'}';
  demo.changed=new Set();}
function dShow(k){demo.k=k;$$('#dphone .v').forEach(v=>v.classList.toggle('sel',+v.dataset.k===k));
  const sk=$$('#demosteps .stp');let best=null;sk.forEach(s=>{if(+s.dataset.k<=k)best=s;});sk.forEach(s=>{s.classList.toggle('sel',s===best);s.classList.toggle('done',+s.dataset.k<+(best?best.dataset.k:0));});
  $('#dphone .scr').classList.toggle('blank',k===6);
  renderRec();}
function levelFor(s){const p=s<=4?[1/3,1/3,1/3]:s<=7?[.45,.35,.2]:[.6,.3,.1];const r=Math.random();return r<p[0]?1:r<p[0]+p[1]?2:3;}
function gridBind(el,cb){const dot=$('.dot',el);
  function at(e){const r=el.getBoundingClientRect();const x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));dot.style.left=x*100+'%';dot.style.top=y*100+'%';cb([+((0.5-x)*2).toFixed(2),+((0.5-y)*2).toFixed(2)],x,y);}
  let down=false;el.addEventListener('pointerdown',e=>{down=true;el.setPointerCapture(e.pointerId);at(e);});el.addEventListener('pointermove',e=>{if(down)at(e);});el.addEventListener('pointerup',()=>down=false);
  return (x,y)=>{dot.style.left=x*100+'%';dot.style.top=y*100+'%';};}
let gridPreXY=[.5,.5];
const setPostDot=$('#gridPost')?gridBind($('#gridPost'),v=>{setR('grid_post',v);renderRec();}):null;
if($('#gridPre'))gridBind($('#gridPre'),(v,x,y)=>{gridPreXY=[x,y];setR('grid_pre',v);$('#gridPreBtn').disabled=false;renderRec();});
function dReset(){demo.task=null;freshRec();$('#sudsPre').value=5;$('#sudsPreV').textContent='5';$('#gridPreBtn').disabled=true;$('#gridPre .dot').style.left='50%';$('#gridPre .dot').style.top='50%';drawGraph($('#dgraph'),demo.hist);dShow(0);}
if($('#dphone')){
  freshRec();drawGraph($('#dgraph'),demo.hist);renderRec();
  $('#sudsPre').addEventListener('input',e=>{$('#sudsPreV').textContent=e.target.value;setR('suds_pre',+e.target.value);renderRec();});
  $('#sudsPost').addEventListener('input',e=>{$('#sudsPostV').textContent=e.target.value;setR('suds_post',+e.target.value);renderRec();});
  $('#dreset').addEventListener('click',dReset);
  $('#demosteps').addEventListener('click',e=>{const b=e.target.closest('.stp');if(!b)return;const k=+b.dataset.k;if(k===5)return;demo.task=null;
    if(k>=1&&demo.rec.suds_pre===null)setR('suds_pre',+$('#sudsPre').value);
    if(k>=3&&!demo.rec.family){assign();}
    if(k===7)prepPost();if(k===12)prepClose();dShow(k);});
  $('#dphone').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act;
    if(a==='start'){freshRec();dShow(1);setR('suds_pre',+$('#sudsPre').value);renderRec();}
    else if(a==='next'){if(demo.k===2){assign();dShow(3);}else if(demo.k===8){dShow(9);}else dShow(demo.k+1);}
    else if(a==='len'){setR('length',+b.dataset.len);dShow(4);}
    else if(a==='task'){startTask();}
    else if(a==='home'){if(demo.k===4){setR('abandoned_at',0);renderRec();}if(demo.k===12){demo.hist.push([demo.rec.suds_pre,demo.rec.suds_post]);if(demo.hist.length>7)demo.hist.shift();}
      const keep=demo.k;drawGraph($('#dgraph'),demo.hist);dShow(0);if(keep===4||keep===12){setTimeout(()=>{freshRec();$('#gridPreBtn').disabled=true;},50);}}
    else if(a==='abandon'){setR('abandoned_at',+((performance.now()-demo.task.t0)/1000).toFixed(1));demo.task=null;dShow(0);}
    else if(a==='pick'){$$('.pcard',b.closest('.v')).forEach(x=>x.classList.toggle('sel',x===b));setR(b.dataset.f,b.dataset.f==='difficulty'?+b.dataset.v:b.dataset.v);renderRec();
      setTimeout(()=>{if(demo.k===11){prepClose();dShow(12);}else dShow(demo.k+1);},280);}
    else if(a==='skip'){setR('skipped_rest',true);prepClose();dShow(12);}
  });
}
function assign(){const s=demo.rec.suds_pre??5;setR('assignment','random');setR('family','F4');setR('level',levelFor(s));setR('mechanism','quantity');renderRec();}
function prepPost(){const s=demo.rec.suds_pre??5;$('#sudsPost').value=s;$('#sudsPostV').textContent=s;setR('suds_post',s);setR('grid_post',demo.rec.grid_pre||[0,0]);if(setPostDot)setPostDot(gridPreXY[0],gridPreXY[1]);
  $$('#dphone [data-k="9"] .pcard,#dphone [data-k="10"] .pcard,#dphone [data-k="11"] .pcard').forEach(x=>x.classList.remove('sel'));}
function prepClose(){const a=demo.rec.suds_pre??5,b=demo.rec.suds_post??a;$('#closeLine').textContent='לפני: '+a+' · אחרי: '+b;drawGraph($('#cgraph'),[...demo.hist,[a,b]].slice(-7),true);}

/* Memory-grid task in the phone (illustrative, simplified F4) */
const taskCv=$('#taskcv'),tctx=taskCv?taskCv.getContext('2d'):null;
const GRID={n:4,top:96,pad:36,gap:16};
function gridGeom(S){const w=Math.min(S-2*GRID.pad,S-GRID.top-8),ts=(w-(GRID.n-1)*GRID.gap)/GRID.n;return{ts,x0:(S-w)/2,y0:GRID.top};}
function startTask(){const lvl=demo.rec.level||1;
  demo.task={t0:performance.now(),lvl,nT:[3,4,5][lvl-1],showT:[3,2.6,2.2][lvl-1],round:null,hits:0,tot:0,rts:[],adj:0,streakOk:0,streakBad:0};newRound();dShow(5);}
function newRound(){const T=demo.task;const pos=[];while(pos.length<T.nT){const q=(Math.random()*16)|0;if(!pos.includes(q))pos.push(q);}
  const cols=[ST.violet,ST.rose,ST.blue,ST.orange,ST.violet];
  T.round={items:pos.map((q,i)=>({q,c:cols[i]})),start:performance.now(),phase:'show',taps:{},picks:0,recallAt:0,endAt:0};}
function taskFrame(now){const T=demo.task;if(!T||!tctx)return;const el=(now-T.t0)/1000;
  const fr=Math.max(0,1-el/TASK_SEC);$('#tfg').style.strokeDashoffset=(81.7*(1-fr)).toFixed(2);
  if(el>=TASK_SEC){endTask();return;}
  const R=T.round,rt=(now-R.start)/1000;
  if(R.phase==='show'&&rt>T.showT){R.phase='hide';R.hideAt=rt;}
  if(R.phase==='hide'&&rt>R.hideAt+.35){R.phase='recall';R.recallAt=now;}
  if(R.phase==='reveal'&&(now-R.endAt)>1100){newRound();return;}
  const S=taskCv.width,{ts,x0,y0}=gridGeom(S);const ph=$('#dphone');const cs=getComputedStyle(ph);
  const sf=cs.getPropertyValue('--sf').trim()||'#ece7ff',tx=cs.getPropertyValue('--tx').trim()||'#2c2849',ac=cs.getPropertyValue('--ac').trim()||'#8f7ce8';
  tctx.clearRect(0,0,S,S);
  // phase indicator: eye + time bar while memorising, slots while recalling
  const cy=44;tctx.lineCap='round';
  if(R.phase==='show'||R.phase==='hide'){
    tctx.strokeStyle=tx;tctx.globalAlpha=.55;tctx.lineWidth=5;tctx.beginPath();tctx.ellipse(S/2-150,cy,26,15,0,0,7);tctx.stroke();tctx.fillStyle=tx;tctx.beginPath();tctx.arc(S/2-150,cy,7,0,7);tctx.fill();tctx.globalAlpha=1;
    const p=Math.max(0,1-rt/T.showT);tctx.fillStyle=sf;rr(tctx,S/2-100,cy-7,300,14,7);tctx.fill();tctx.fillStyle=ac;if(p>0){rr(tctx,S/2-100+300*(1-p),cy-7,300*p,14,7);tctx.fill();}
  }else{
    for(let i=0;i<T.nT;i++){const x=S/2+(i-(T.nT-1)/2)*44;tctx.beginPath();tctx.arc(x,cy,12,0,7);if(i<R.picks){tctx.fillStyle=ac;tctx.fill();}else{tctx.strokeStyle=tx;tctx.globalAlpha=.35;tctx.lineWidth=3;tctx.stroke();tctx.globalAlpha=1;}}
  }
  for(let i=0;i<16;i++){const x=x0+(i%4)*(ts+GRID.gap),y=y0+((i/4)|0)*(ts+GRID.gap);const tp=R.taps[i];
    tctx.fillStyle=sf;if(tp&&tp.miss&&(now-tp.t)<450){tctx.globalAlpha=.55;}rr(tctx,x,y,ts,ts,ts*.22);tctx.fill();tctx.globalAlpha=1;
    if(R.phase==='recall'&&!tp){const pulse=Math.max(0,1-(now-R.recallAt)/700);if(pulse>0){tctx.strokeStyle=ac;tctx.globalAlpha=pulse;tctx.lineWidth=4;rr(tctx,x+2,y+2,ts-4,ts-4,ts*.2);tctx.stroke();tctx.globalAlpha=1;}}}
  R.items.forEach((it,j)=>{const cx=x0+(it.q%4)*(ts+GRID.gap)+ts/2,cyy=y0+((it.q/4)|0)*(ts+GRID.gap)+ts/2;let sc=0,ring=false;
    if(R.phase==='show')sc=Math.min(1,rt/.25+(-j*.08));else if(R.phase==='hide')sc=Math.max(0,1-(rt-R.hideAt)/.35);
    const tp=R.taps[it.q];if(tp&&!tp.miss)sc=Math.min(1,(now-tp.t)/220);
    if(R.phase==='reveal'&&!tp)ring=true;
    if(sc>0){tctx.fillStyle=it.c;tctx.beginPath();tctx.arc(cx,cyy,ts*.3*Math.max(0,sc),0,7);tctx.fill();}
    if(tp&&!tp.miss){const rp=Math.min(1,(now-tp.t)/500);if(rp<1){tctx.strokeStyle=it.c;tctx.globalAlpha=1-rp;tctx.lineWidth=4;tctx.beginPath();tctx.arc(cx,cyy,ts*.3+rp*ts*.25,0,7);tctx.stroke();tctx.globalAlpha=1;}}
    if(ring){tctx.strokeStyle=it.c;tctx.globalAlpha=.6;tctx.lineWidth=4;tctx.setLineDash([8,8]);tctx.beginPath();tctx.arc(cx,cyy,ts*.3,0,7);tctx.stroke();tctx.setLineDash([]);tctx.globalAlpha=1;}});
}
if(taskCv)taskCv.addEventListener('pointerdown',e=>{const T=demo.task;if(!T)return;const R=T.round;if(R.phase!=='recall')return;
  const r=taskCv.getBoundingClientRect(),S=taskCv.width;const x=(e.clientX-r.left)/r.width*S,y=(e.clientY-r.top)/r.height*S;const {ts,x0,y0}=gridGeom(S);
  const c=Math.floor((x-x0)/(ts+GRID.gap)),rw=Math.floor((y-y0)/(ts+GRID.gap));if(c<0||c>3||rw<0||rw>3)return;const q=rw*4+c;if(R.taps[q])return;
  const hit=R.items.some(it=>it.q===q);R.taps[q]={t:performance.now(),miss:!hit};R.picks++;T.tot++;if(hit)T.hits++;T.rts.push(performance.now()-R.recallAt);
  try{navigator.vibrate&&navigator.vibrate(10);}catch(_){}
  if(R.picks>=T.nT){const ok=R.items.every(it=>R.taps[it.q]);
    if(ok){T.streakOk++;T.streakBad=0;if(T.streakOk>=4){T.showT=Math.max(1.4,T.showT-.3);T.adj++;T.streakOk=0;}}else{T.streakBad++;T.streakOk=0;if(T.streakBad>=2){T.showT+=.3;T.adj++;T.streakBad=0;}}
    R.phase='reveal';R.endAt=performance.now();}
});
function endTask(){const T=demo.task;demo.task=null;
  setR('accuracy',T.tot?+(T.hits/T.tot).toFixed(2):0);setR('mean_rt',T.rts.length?Math.round(T.rts.reduce((a,b)=>a+b,0)/T.rts.length):null);setR('adjustments',T.adj);setR('actual_min',+(TASK_SEC/60).toFixed(2));
  dShow(6);setTimeout(()=>{if(demo.k===6){prepPost();dShow(7);}},2000);}
document.addEventListener('slide',e=>{if(e.detail.id!=='demo'&&demo.task){demo.task=null;dShow(0);}});

/* ───────── Allocation ───────── */
(function(){const s=$('#biasS');if(!s)return;
  function upd(){const v=+s.value;$('#biasV').textContent=v;const p=v<=4?[33.3,33.3,33.3]:v<=7?[45,35,20]:[60,30,10];
    $$('#lvbars .lvb').forEach((r,i)=>{$('i',r).style.width=p[i]+'%';$('b',r).textContent=(v<=4?'⅓':p[i]+'%');});}
  s.addEventListener('input',upd);upd();
  const n=$('#recN'),dots=$('#dots20');for(let i=0;i<20;i++)dots.appendChild(document.createElement('i'));
  function upd2(){const v=+n.value;$('#recV').textContent=v;$$('i',dots).forEach((d,i)=>d.classList.toggle('on',i<v));
    const on=v>=20;$('#spR').style.flex=on?30:100;$('#spM').style.flex=on?70:0;$('#spR').textContent=on?'אקראי 30%':'אקראי 100% · עד 20 רשומות';$('#spM').textContent=on?'מודל מותאם 70%':'';}
  n.addEventListener('input',upd2);upd2();})();

/* ───────── Frameworks ───────── */
const FW=[
 ['המעבדה מספקת פיקוח מדעי, כלים מתוקפים ואישור ועדת אתיקה; אנחנו מספקים את הפלטפורמה, ההפעלה והקוהורט. הפלטפורמה, המנוע והמאגר נשארים בבעלות החברה; ה-IP הקודם של המעבדה נשאר שלה; ממצאים חדשים משותפים. המעבדה מקבלת גישה לנתונים מותממים בהסכם שיתוף נתונים, למטרה ולתקופה מוגדרות. פרסומים בשם שני הצדדים, עם חלון סקירה הדדי.',['שותפה מחקרית, לא ספקית','IP קודם נשאר אצל כל צד','ממצאים חדשים משותפים','נתונים מותממים בהסכם']],
 ['בקשה משותפת לתוכנית שמיועדת לשיתוף אקדמיה–תעשייה, למשל מגנטון או נופר של רשות החדשנות. המענק מממן את הפיתוח בצד החברה ואת המחקר בצד המעבדה. דורש מכתב תמיכה מהמעבדה והסכם שיתוף פעולה חתום.',['מגנטון','נופר','רשות החדשנות','מכתב תמיכה + הסכם חתום']],
 ['אחרי שיש נתונים: רישוי מנוע המשימות והטקסונומיה כרכיב במוצר דיגיטלי-טיפולי, או הסכם גישה למאגר בדמי רישוי שנתיים. בלעדיות, אם תידרש, היא בתמורה (תשלום או הון), לא ברירת מחדל. סעיף אי-תחרות שמונע פיתוח מוצר wellness מקביל מתוך הנתונים לתקופה מוגדרת.',['רישוי מנוע וטקסונומיה','גישה למאגר בדמי רישוי','בלעדיות בתמורה בלבד','אי-תחרות לתקופה מוגדרת']],
 ['חברה משותפת או הסכם פיתוח עם תשלומי אבני דרך ואופציה לרכישה. מתאים רק אחרי שהמסגרות הקודמות הוכיחו את הערך, וכשיש צד שמביא הון.',['חברה משותפת','אבני דרך','אופציה לרכישה','צד שמביא הון']]
];
function setFw(i){$$('#fw .fwb').forEach((b,j)=>b.classList.toggle('sel',j===i));$('#fwd').innerHTML='<p>'+esc(FW[i][0])+'</p><div class="chips">'+FW[i][1].map(c=>'<span>'+esc(c)+'</span>').join('')+'</div>';}
if($('#fw')){$('#fw').addEventListener('click',e=>{const b=e.target.closest('.fwb');if(b)setFw(+b.dataset.w);});setFw(0);}

/* ───────── Boot ───────── */
const h0=(location.hash||'').slice(1);const hi=slides.findIndex(s=>s.id===h0);
if(hi>0)cur=hi;
layout();
if(hi>0&&portrait)setTimeout(()=>go(hi,true),60);
addEventListener('hashchange',()=>{const i=slides.findIndex(s=>s.id===location.hash.slice(1));if(i>=0&&i!==cur)go(i);});
// keep focus-driven scrolling of the clipped viewport in sync with the deck
vp.addEventListener('scroll',()=>{if(portrait)return;const st=vp.scrollTop;if(!st)return;vp.scrollTop=0;const t=cur+Math.round(st/pageH);if(t!==cur)go(t,true);});
requestAnimationFrame(loop);
})();
