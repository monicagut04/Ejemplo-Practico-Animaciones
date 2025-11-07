// ===== Config: elementos comunes =====
const toast = document.getElementById('toast');
const btnIntro = document.getElementById('btnIntro');
const btnCopiar = document.getElementById('btnCopiar');

// ===== Micro-interacciones =====
document.querySelectorAll('.like, .mini.like').forEach(b => {
  b.addEventListener('click', (e) => {
    b.classList.toggle('liked');
    b.style.transform = 'scale(1.08)';
    setTimeout(()=> b.style.transform = 'scale(1)', 140);
    e.stopPropagation();
  });
});

if (btnCopiar) {
  btnCopiar.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(location.href);
      // Toast simple sin librerías
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      setTimeout(()=>{
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
      }, 1100);
    }catch(err){ alert('No se pudo copiar'); }
  });
}

// ===== Disney: demos con CSS/JS =====
const boxAnt = document.getElementById('boxAnt');
const boxSquash = document.getElementById('boxSquash');
const boxFollow = document.getElementById('boxFollow');
document.getElementById('btnAnticipation').addEventListener('click', ()=>{
  boxAnt.classList.remove('anticipation'); void boxAnt.offsetWidth; boxAnt.classList.add('anticipation');
});
document.getElementById('btnSquash').addEventListener('click', ()=>{
  boxSquash.classList.remove('squash'); void boxSquash.offsetWidth; boxSquash.classList.add('squash');
});
document.getElementById('btnFollow').addEventListener('click', ()=>{
  boxFollow.classList.remove('follow'); void boxFollow.offsetWidth; boxFollow.classList.add('follow');
});

// ===== Modal + GSAP =====
const backdrop = document.getElementById('backdrop');
const modal = document.getElementById('modal');
const btnCerrar = document.getElementById('btnCerrar');
const tituloModal = document.getElementById('tituloModal');
const tagsModal = document.getElementById('tagsModal');

function abrirModal(titulo, tags){
  tituloModal.textContent = titulo || 'Detalle';
  tagsModal.textContent = (tags ? 'Tags: ' + tags : '');
  backdrop.style.display = 'flex';
  backdrop.setAttribute('aria-hidden','false');
  gsap.set(modal, { opacity:0, scale:.92, y:14 });
  gsap.to(backdrop, { duration:.2, opacity:1 });
  gsap.to(modal, { duration:.38, opacity:1, scale:1.02, y:0, ease:'back.out(1.4)' });
  gsap.to(modal, { duration:.16, scale:1, delay:.34 });
}
function cerrarModal(){
  gsap.to(modal, { duration:.2, opacity:0, scale:.97, onComplete:()=>{
    backdrop.style.display='none';
    backdrop.setAttribute('aria-hidden','true');
    gsap.set(modal, {clearProps:'all'});
  }});
}
btnCerrar.addEventListener('click', cerrarModal);
backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) cerrarModal(); });

// Card que abre modal
document.querySelectorAll('.card[data-behavior="modal"]').forEach(card =>{
  card.addEventListener('click', ()=> abrirModal('Proyecto: Modal', 'GSAP'));
});

// ===== Form newsletter =====
const form = document.getElementById('formNews');
const correo = document.getElementById('correo');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const ok = /\S+@\S+\.\S+/.test(correo.value);
  if(!ok){
    correo.classList.add('error');
    msg.textContent = 'Correo inválido, intenta de nuevo.';
    setTimeout(()=> correo.classList.remove('error'), 420);
    return;
  }
  msg.textContent = '¡Suscripción exitosa!';
  correo.value = '';
});

// ===== GSAP: Intro y Secuencia =====
btnIntro.addEventListener('click', ()=>{
  const panels = document.querySelectorAll('h2, #conceptos h1, .grid .card');
  gsap.set(panels, {opacity:0, y:14});
  gsap.to('#conceptos h1', {duration:.34, opacity:1, y:0});
  gsap.to('h2', {duration:.34, opacity:1, y:0, stagger:.06, delay:.05});
  gsap.to('.grid .card', {duration:.3, opacity:1, y:0, stagger:.06, delay:.2});
});

document.getElementById('btnSecuencia').addEventListener('click', ()=>{
  const heads = document.querySelectorAll('#transiciones h2, #keyframes h2, #micro h2, #disney h2, #js h2, #gsap h2');
  gsap.set(heads, {opacity:0, y:10});
  gsap.to(heads, {duration:.26, opacity:1, y:0, stagger:.08, ease:'power2.out'});
});

// ===== Reveal al hacer scroll =====
const io = new IntersectionObserver((ents)=>{
  ents.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.style.transition = 'opacity .4s var(--ease), transform .4s var(--ease)';
      ent.target.style.opacity = '1';
      ent.target.style.transform = 'none';
      io.unobserve(ent.target);
    }
  });
},{ threshold:.2 });

document.querySelectorAll('.appear').forEach(el=> io.observe(el));