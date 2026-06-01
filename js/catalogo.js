const bags=[
  {alt:"Bolso camel",src:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=320&h=320&fit=crop"},
  {alt:"Tote negro",src:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=320&h=320&fit=crop"},
  {alt:"Shopper marrón",src:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=320&h=320&fit=crop"},
  {alt:"Bolso nude",src:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=320&h=320&fit=crop"},
  {alt:"Clutch burdeos",src:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=320&h=320&fit=crop"},
];
const N=bags.length;
let cur=1,busy=false;
const stageEl=document.getElementById('stage');
const dotsEl=document.getElementById('dots');
function mod(a,b){return((a%b)+b)%b;}
function mkSlide(idx,cls){
  const d=document.createElement('div');
  d.className='slide '+cls;
  const img=document.createElement('img');
  img.src=bags[mod(idx,N)].src;
  img.alt=bags[mod(idx,N)].alt;
  d.appendChild(img);
  return d;
}
function buildStage(){
  stageEl.innerHTML='';
  stageEl.appendChild(mkSlide(cur-1,'s-left'));
  stageEl.appendChild(mkSlide(cur,'s-center'));
  stageEl.appendChild(mkSlide(cur+1,'s-right'));
}
function buildDots(){
  dotsEl.innerHTML='';
  bags.forEach((_,i)=>{
    const b=document.createElement('button');
    b.className='dot'+(i===cur?' on':'');
    b.setAttribute('aria-label','Bolso '+(i+1));
    b.onclick=()=>go(i);
    dotsEl.appendChild(b);
  });
}
function syncDots(){
  dotsEl.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('on',i===cur));
}
function go(next){
  if(busy||mod(next,N)===cur)return;
  busy=true;
  next=mod(next,N);
  const dir=(mod(next-cur,N)<=N/2)?1:-1;
  const slides=stageEl.querySelectorAll('.slide');
  const L=slides[0],C=slides[1],R=slides[2];
  if(dir===1){
    L.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
    L.style.opacity='0';L.style.transform='scale(0.5) translateX(-100px) translateY(16px)';
    C.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
    C.classList.remove('s-center');C.classList.add('s-left');
    R.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
    R.classList.remove('s-right');R.classList.add('s-center');
    const NR=mkSlide(next+1,'s-right');
    NR.style.opacity='0';NR.style.transform='scale(0.5) translateX(100px) translateY(16px)';
    stageEl.appendChild(NR);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      NR.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
      NR.style.opacity='1';NR.style.transform='translateY(16px)';
    }));
    setTimeout(()=>{cur=next;L.remove();NR.style.transition='';buildStage();syncDots();busy=false;},440);
  }else{
    R.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
    R.style.opacity='0';R.style.transform='scale(0.5) translateX(100px) translateY(16px)';
    C.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
    C.classList.remove('s-center');C.classList.add('s-right');
    L.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
    L.classList.remove('s-left');L.classList.add('s-center');
    const NL=mkSlide(next-1,'s-left');
    NL.style.opacity='0';NL.style.transform='scale(0.5) translateX(-100px) translateY(16px)';
    stageEl.insertBefore(NL,stageEl.firstChild);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      NL.style.transition='all 0.4s cubic-bezier(.4,0,.2,1)';
      NL.style.opacity='1';NL.style.transform='translateY(16px)';
    }));
    setTimeout(()=>{cur=next;R.remove();NL.style.transition='';buildStage();syncDots();busy=false;},440);
  }
}
document.getElementById('prev').onclick=()=>go(cur-1);
document.getElementById('next').onclick=()=>go(cur+1);
buildStage();
buildDots();


