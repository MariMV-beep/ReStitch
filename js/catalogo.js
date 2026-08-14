const bags = [
  { alt: "Tote clásico",   name: "Tote clásico",   src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=320&h=320&fit=crop" },
  { alt: "Crossbody",      name: "Crossbody",      src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=320&h=320&fit=crop" },
  { alt: "Mochila mini",   name: "Mochila mini",   src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=320&h=320&fit=crop" },
  { alt: "Bolso de mano",  name: "Bolso de mano",  src: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=320&h=320&fit=crop" },
  { alt: "Shopper grande", name: "Shopper grande", src: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=320&h=320&fit=crop" },
];

/* ---- Datos de telas(los de las fotos que tengo que buscar) ---- */
const fabrics = [
  {cls:'p1', name:'Girasoles'},
  {cls:'p2', name:'Cuadros crema'},
  {cls:'p3', name:'Estrellas doradas'},
  {cls:'p4', name:'Ondas doradas'},
  {cls:'p5', name:'Cuadros café'},
  {cls:'p6', name:'Puntos dorados'},
  {cls:'p7', name:'Cuadros azules'},
  {cls:'p8', name:'Cuadros diagonal'},
  {cls:'p9', name:'Estrellitas azules'},
  {cls:'p10', name:'Ondas azules'},
  {cls:'p11', name:'Rayas azules'},
  {cls:'p12', name:'Copos de nieve'},
  {cls:'p13', name:'Cuadros vintage'},
  {cls:'p14', name:'Cuadros naranja'},
  {cls:'p15', name:'Argyle café'},
  {cls:'p16', name:'Cuadros rosa'},
  {cls:'p17', name:'Lunares'},
  {cls:'p18', name:'Azul marino'}
];

/* Carousel */
const N = bags.length;
let cur = 0;
let bagSelected = null;
let busy = false;

const stageEl  = document.getElementById('stage');
const dotsEl   = document.getElementById('dots');
const bagName  = document.getElementById('bagName');
const verBtn   = document.getElementById('verBtn');

function mod(a, b) { return ((a % b) + b) % b; }

function mkSlide(idx, extraCls) {
  const d = document.createElement('div');
  d.className = 'slide ' + extraCls;
  const img = document.createElement('img');
  img.src = bags[mod(idx, N)].src;
  img.alt = bags[mod(idx, N)].alt;
  d.appendChild(img);
  // click en el slide central para elegir el bolso
  d.addEventListener('click', () => {
    if (mod(idx, N) === cur) {
      bagSelected = cur;
      updateBagUI();
    }
  });
  return d;
}

function buildStage() {
  stageEl.innerHTML = '';
  const left   = mkSlide(cur - 1, 's-left');
  const center = mkSlide(cur, 's-center' + (bagSelected === cur ? ' selected' : ''));
  const right  = mkSlide(cur + 1, 's-right');
  stageEl.appendChild(left);
  stageEl.appendChild(center);
  stageEl.appendChild(right);
  updateBagUI();
}

function buildDots() {
  dotsEl.innerHTML = '';
  bags.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === cur ? ' on' : '');
    b.setAttribute('aria-label', 'Bolso ' + (i + 1));
    b.onclick = () => go(i);
    dotsEl.appendChild(b);
  });
}

function syncDots() {
  dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('on', i === cur));
}

function updateBagUI() {
  bagName.textContent = bags[cur].name;
  verBtn.textContent = bagSelected === cur ? 'Bolso elegido ✓' : 'Elegir este bolso';
  const centerSlide = stageEl.querySelector('.s-center');
  if (centerSlide) centerSlide.classList.toggle('selected', bagSelected === cur);
}

function go(next) {
  if (busy || mod(next, N) === cur) return;
  busy = true;
  next = mod(next, N);
  const dir = (mod(next - cur, N) <= N / 2) ? 1 : -1;
  const slides = stageEl.querySelectorAll('.slide');
  const L = slides[0], C = slides[1], R = slides[2];

  if (dir === 1) {
    L.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
    L.style.opacity = '0';
    L.style.transform = 'scale(0.5) translateX(-100px) translateY(16px)';
    C.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
    C.classList.remove('s-center'); C.classList.add('s-left');
    R.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
    R.classList.remove('s-right'); R.classList.add('s-center');
    const NR = mkSlide(next + 1, 's-right');
    NR.style.opacity = '0';
    NR.style.transform = 'scale(0.5) translateX(100px) translateY(16px)';
    stageEl.appendChild(NR);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      NR.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
      NR.style.opacity = '1';
      NR.style.transform = 'translateY(16px)';
    }));
    setTimeout(() => { cur = next; L.remove(); NR.style.transition = ''; buildStage(); syncDots(); busy = false; }, 440);
  } else {
    R.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
    R.style.opacity = '0';
    R.style.transform = 'scale(0.5) translateX(100px) translateY(16px)';
    C.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
    C.classList.remove('s-center'); C.classList.add('s-right');
    L.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
    L.classList.remove('s-left'); L.classList.add('s-center');
    const NL = mkSlide(next - 1, 's-left');
    NL.style.opacity = '0';
    NL.style.transform = 'scale(0.5) translateX(-100px) translateY(16px)';
    stageEl.insertBefore(NL, stageEl.firstChild);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      NL.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)';
      NL.style.opacity = '1';
      NL.style.transform = 'translateY(16px)';
    }));
    setTimeout(() => { cur = next; R.remove(); NL.style.transition = ''; buildStage(); syncDots(); busy = false; }, 440);
  }
}

document.getElementById('prev').addEventListener('click', () => go(cur - 1));
document.getElementById('next').addEventListener('click', () => go(cur + 1));
verBtn.addEventListener('click', () => {
  bagSelected = cur;
  updateBagUI();
  const centerSlide = stageEl.querySelector('.s-center');
  if (centerSlide) centerSlide.classList.add('selected');
});

buildStage();
buildDots();

/*  selector de tela  */
const swatchRow = document.getElementById('swatchRow');
const telaPreviewSwatch = document.getElementById('telaPreviewSwatch');
const telaPreviewName = document.getElementById('telaPreviewName');
let telaSelected = null;

fabrics.forEach((f, i) => {
  const sw = document.createElement('button');
  sw.className = 'swatch ' + f.cls;
  sw.title = f.name;
  sw.addEventListener('click', () => {
    telaSelected = i;
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('selected'));
    sw.classList.add('selected');
    telaPreviewSwatch.className = 'tela-preview-swatch ' + f.cls;
    telaPreviewName.textContent = f.name;
  });
  swatchRow.appendChild(sw);
});