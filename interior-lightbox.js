(() => {
  const triggers = Array.from(document.querySelectorAll('img[data-interior-lightbox]'));
  const modal = document.getElementById('interior-lightbox');
  const full = document.getElementById('interior-lightbox-img');
  const count = document.getElementById('interior-lightbox-count');
  let index = 0, lastFocus = null, touchStartX = null;
  if (!triggers.length || !modal) return;
  function update(i) {
    index = (i + triggers.length) % triggers.length;
    full.src = triggers[index].getAttribute('src');
    full.alt = triggers[index].getAttribute('alt') || '内観パース';
    count.textContent = `${index + 1} / ${triggers.length}`;
  }
  function open(i) {
    lastFocus = document.activeElement;
    update(i);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('interior-lightbox-lock');
    modal.querySelector('[data-lightbox-close].interior-lightbox__close').focus();
  }
  function close() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('interior-lightbox-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  triggers.forEach((img,i) => {
    img.addEventListener('click',() => open(i));
    img.addEventListener('keydown',(ev) => { if(ev.key === 'Enter' || ev.key === ' '){ev.preventDefault();open(i);} });
  });
  modal.querySelectorAll('[data-lightbox-close]').forEach(el=>el.addEventListener('click',close));
  modal.querySelector('[data-lightbox-prev]').addEventListener('click',()=>update(index-1));
  modal.querySelector('[data-lightbox-next]').addEventListener('click',()=>update(index+1));
  document.addEventListener('keydown',ev=> {
    if(!modal.classList.contains('is-open'))return;
    if(ev.key==='Escape')close();
    if(ev.key==='ArrowLeft')update(index-1);
    if(ev.key==='ArrowRight')update(index+1);
    if(ev.key==='Tab'){
      const buttons = Array.from(modal.querySelectorAll('button'));
      const n = buttons.indexOf(document.activeElement);
      if(ev.shiftKey && n===0){ev.preventDefault();buttons[buttons.length-1].focus();}
      if(!ev.shiftKey && n===buttons.length-1){ev.preventDefault();buttons[0].focus();}
    }
  });
  modal.addEventListener('touchstart',ev=>{touchStartX=ev.changedTouches[0]?.screenX ?? null;},{passive:true});
  modal.addEventListener('touchend',ev=>{
    if(touchStartX===null)return;
    const dist=(ev.changedTouches[0]?.screenX ?? touchStartX)-touchStartX;
    if(Math.abs(dist)>65)update(index+(dist<0?1:-1));
    touchStartX=null;
  },{passive:true});
})();
