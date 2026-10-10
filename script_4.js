
/* Motion enhancements activate only when a supported observer exists.
   Without JS, all content remains visible. */
(()=>{
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
 const targetList=[...document.querySelectorAll('.ma-visual,.ma-copy')];
 const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ma-enter');io.unobserve(e.target)}});
 },{threshold:0.06,rootMargin:'0px 0px -24px 0px'});
 targetList.forEach(el=>io.observe(el));
 // Prevent any image on the page from being held invisible by animation logic.
 document.querySelectorAll('.ma-visual img').forEach(im=>{im.style.opacity='1'});
})();
