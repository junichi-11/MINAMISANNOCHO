
const phases=[
 {image:'assets/image_03.jpg',title:'01 / SKETCH',copy:'住まいの輪郭を描きながら、建物の佇まいと街並みとの関係を探る。'},
 {image:'assets/image_15.jpg',title:'02 / DESIGN STUDY',copy:'屋根やバルコニーの水平ライン、下屋の重なりを丁寧に整えていく。'},
 {image:'assets/image_02.jpg',title:'03 / COMPLETED IMAGE',copy:'下屋が生む落ち着いた重心と、木調軒天の温もり。和モダンの表情がかたちになる。'}
];
const phasePhoto=document.getElementById('process-photo');
document.querySelectorAll('.process-btn').forEach(btn=>btn.addEventListener('click',()=>{const p=phases[Number(btn.dataset.phase)];phasePhoto.style.opacity='.16';setTimeout(()=>{phasePhoto.src=p.image;phasePhoto.alt=p.title;document.getElementById('process-visual-label').textContent=p.title;document.getElementById('process-caption').textContent=p.copy;phasePhoto.style.opacity='1'},160);document.querySelectorAll('.process-btn').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',b===btn?'true':'false')})}));
