(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  const network = document.querySelector('.network');
  const hero = document.querySelector('.hero-scene');
  let paused = reduced.matches;
  let userChoice = false;
  let frame = 0;
  let replayFrame = 0;
  const revealTargets = document.querySelectorAll('.section-label,.about-layout h2,.about-layout>div,.about-foot,.business-heading,.business-list details,.network-copy,.statement h2,.statement p,.company-layout,.mission-principles article');
  revealTargets.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${(index % 2) * .1}s`);
  });
  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveals.unobserve(entry.target);
        }
      });
    }, {threshold: .08, rootMargin:'0px 0px -25px 0px'});
    revealTargets.forEach(el => reveals.observe(el));
    const mapObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) network.classList.add('is-active'); });
    }, {threshold:.25});
    mapObserver.observe(document.querySelector('.map-wrap'));
    body.classList.add('motion-enabled');
  } else { network.classList.add('is-active'); }
  const clamp = value => Math.max(0, Math.min(1, value));
  function updateScroll() {
    frame = 0;
    const height = root.scrollHeight - innerHeight;
    document.querySelector('.scroll-progress').style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
    if (paused) return;
    const heroRect = hero.getBoundingClientRect();
    root.style.setProperty('--scene-progress', clamp(-heroRect.top / Math.max(1, heroRect.height - innerHeight)));
    const mapRect = network.getBoundingClientRect();
    network.style.setProperty('--network-progress', clamp(-mapRect.top / Math.max(1, mapRect.height - innerHeight)));
  }
  function scheduleScroll() { if (!frame) frame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', scheduleScroll, {passive:true});
  addEventListener('resize', scheduleScroll, {passive:true});
  function setMotion() {
    body.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'アニメーションを再生' : 'アニメーションを停止');
    motionButton.querySelector('span').textContent = paused ? 'OFF' : 'ON';
    document.querySelectorAll('svg').forEach(svg => {
      if (paused && svg.pauseAnimations) svg.pauseAnimations();
      else if (svg.unpauseAnimations) svg.unpauseAnimations();
    });
    scheduleScroll();
  }
  motionButton.addEventListener('click', () => { paused = !paused; userChoice = true; setMotion(); });
  reduced.addEventListener('change', event => { if (!userChoice) { paused=event.matches; setMotion(); } });
  document.querySelector('.replay').addEventListener('click', () => {
    if (paused && !reduced.matches) { paused=false; userChoice=true; setMotion(); }
    network.classList.remove('is-active');
    cancelAnimationFrame(replayFrame);
    replayFrame = requestAnimationFrame(() => {
      network.getBoundingClientRect();
      replayFrame = requestAnimationFrame(() => network.classList.add('is-active'));
    });
  });
  if (matchMedia('(pointer:fine)').matches) {
    document.querySelector('.hero').addEventListener('pointermove', event => {
      if (paused) return;
      root.style.setProperty('--pointer-x', (event.clientX / innerWidth - .5).toFixed(3));
      root.style.setProperty('--pointer-y', (event.clientY / innerHeight - .5).toFixed(3));
    }, {passive:true});
    document.querySelectorAll('.business-list details').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (paused) return;
        const rect=card.getBoundingClientRect();
        card.style.setProperty('--card-x', `${event.clientX-rect.left}px`);
        card.style.setProperty('--card-y', `${event.clientY-rect.top}px`);
      }, {passive:true});
    });
  }
  setMotion();
  updateScroll();
})();
