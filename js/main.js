gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mm = gsap.matchMedia();
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  event.preventDefault();
  gsap.to(window, { duration: 1.15, scrollTo: { y: target }, ease: 'power3.inOut' });
}));

mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 701px)' }, (context) => {
  const { motion, desktop } = context.conditions;
  if (!motion) { gsap.set('.reveal, .reveal-hero', { autoAlpha: 1, y: 0 }); return; }
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
  intro.from('.nav', { y: -30, autoAlpha: 0, duration: .7 })
    .from('.hero-meta', { y: 14, autoAlpha: 0, duration: .6 }, '-=.3')
    .from('.reveal-word', { y: 30, autoAlpha: 0, duration: .7, stagger: .12 }, '-=.3')
    .from('.reveal-hero', { y: 35, autoAlpha: 0, duration: .8, stagger: .13 }, '-=.25');
  gsap.to('.orbit-one', { rotation: 80, y: 100, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.hero-portrait img', { yPercent: 7, scale: 1.035, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.manifesto-copy', { yPercent: -11, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.utils.toArray('.reveal').forEach((element) => gsap.fromTo(element, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 83%', once: true } }));
  gsap.from('.skill-tile', { y: 55, autoAlpha: 0, stagger: .11, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.skills-grid', start: 'top 78%', once: true } });
  if (desktop) {
    const track = document.querySelector('.project-track');
    const progress = document.querySelector('.project-progress i');
    const gallery = document.querySelector('.project-track-wrap');
    const travel = () => Math.max(track.scrollWidth - window.innerWidth + window.innerWidth * .1, window.innerWidth * 1.5);
    const horizontal = gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * .1), ease: 'none', scrollTrigger: { trigger: gallery, start: 'top top', end: () => `+=${travel()}`, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } });
    gsap.to(progress, { width: '100%', ease: 'none', scrollTrigger: { trigger: gallery, start: 'top top', end: () => `+=${travel()}`, scrub: 1 } });
    gsap.from('.project-intro h2', { x: -45, autoAlpha: 0, duration: .9, scrollTrigger: { trigger: '.project-stage', start: 'top 75%', once: true } });
    gsap.utils.toArray('.project-card').forEach((card) => gsap.from(card, { rotation: 2, scale: .94, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left 85%', end: 'left 25%', scrub: 1 } }));
  }
});

const cursor = document.querySelector('.cursor-glow');
const moveX = gsap.quickTo(cursor, 'x', { duration: .8, ease: 'power3' });
const moveY = gsap.quickTo(cursor, 'y', { duration: .8, ease: 'power3' });
const portrait = document.querySelector('.hero-portrait');
const tiltX = gsap.quickTo(portrait, 'rotationY', { duration: .65, ease: 'power3.out' });
const tiltY = gsap.quickTo(portrait, 'rotationX', { duration: .65, ease: 'power3.out' });
window.addEventListener('pointermove', (event) => {
  moveX(event.clientX); moveY(event.clientY);
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && innerWidth > 700) {
    tiltX((event.clientX / innerWidth - .5) * 5);
    tiltY((event.clientY / innerHeight - .5) * -3);
  }
}, { passive: true });
document.fonts?.ready.then(() => ScrollTrigger.refresh());
