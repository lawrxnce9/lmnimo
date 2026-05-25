document.addEventListener('DOMContentLoaded', function(){
  // header transparent-over-hero / solid-on-scroll
  const header = document.querySelector('.site-header');
  const heroForHeader = document.getElementById('heroSlideshow');
  if(header){
    const updateHeader = () => {
      const triggerY = heroForHeader
        ? heroForHeader.offsetHeight - (header.offsetHeight || 64)
        : 80;
      header.classList.toggle('is-solid', window.scrollY > triggerY);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
  }

  // hero slideshow
  const heroEl = document.getElementById('heroSlideshow');
  if(heroEl){
    const slides = Array.from(heroEl.querySelectorAll('.hero-slide'));
    const dots = Array.from(heroEl.querySelectorAll('.hero-dot'));
    const prevEdge = heroEl.querySelector('.hero-edge--prev');
    const nextEdge = heroEl.querySelector('.hero-edge--next');
    let currentSlide = 0;
    let slideTimer = null;
    const SLIDE_INTERVAL = 5500;
    const SWIPE_THRESHOLD = 40;

    function applyTint(index){
      const slide = slides[index];
      if(!slide) return;
      const tint = slide.getAttribute('data-tint');
      if(tint) heroEl.style.setProperty('--hero-tint', tint);
    }

    function goToSlide(index){
      currentSlide = ((index % slides.length) + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
      applyTint(currentSlide);
    }

    function next(){ goToSlide(currentSlide + 1); }
    function prev(){ goToSlide(currentSlide - 1); }

    function startTimer(){
      stopTimer();
      slideTimer = setInterval(next, SLIDE_INTERVAL);
    }
    function stopTimer(){
      if(slideTimer){ clearInterval(slideTimer); slideTimer = null; }
    }
    function bump(){ startTimer(); }

    dots.forEach(d => d.addEventListener('click', () => {
      goToSlide(parseInt(d.getAttribute('data-index'), 10) || 0);
      bump();
    }));

    if(prevEdge) prevEdge.addEventListener('click', () => { prev(); bump(); });
    if(nextEdge) nextEdge.addEventListener('click', () => { next(); bump(); });

    // Touch swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let touching = false;
    heroEl.addEventListener('touchstart', (e) => {
      touching = true;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      stopTimer();
    }, { passive: true });
    heroEl.addEventListener('touchend', (e) => {
      if(!touching) return;
      touching = false;
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;
      if(Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)){
        if(dx < 0) next(); else prev();
      }
      bump();
    }, { passive: true });
    heroEl.addEventListener('touchcancel', () => { touching = false; bump(); }, { passive: true });

    // Pause auto-advance on hover (desktop)
    heroEl.addEventListener('mouseenter', stopTimer);
    heroEl.addEventListener('mouseleave', startTimer);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const t = e.target;
      if(t && t.matches && t.matches('input, textarea, select')) return;
      if(e.key === 'ArrowLeft'){ prev(); bump(); }
      else if(e.key === 'ArrowRight'){ next(); bump(); }
    });

    applyTint(0);
    if(slides.length > 1) startTimer();
  }
});
