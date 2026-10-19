import gsap from 'gsap';
import { stack, techGraphic } from './stack';

const directions = {
  right: { x: '60vw' },
  left: { x: '-60vw' },
  top: { y: '-70vh' },
  bottom: { y: '70vh' },
};

function renderStack(list: HTMLElement) {
  list.innerHTML = stack
    .map((tech) => `<li class="hero__tech">${techGraphic(tech, 'hero__aws')}<span>${tech.label}</span></li>`)
    .join('');
}

// Scoped to the Barba container: during a transition the outgoing page is still in the DOM.
export function initHero(root: ParentNode = document) {
  const hero = root.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  const list = hero.querySelector<HTMLElement>('.hero__stack');
  if (list) renderStack(list);

  const content = hero.querySelector<HTMLElement>('.hero__content');
  // Title and description move as one block so they stay together while scaling.
  const title = content?.querySelector<HTMLElement>('.hero__heading');
  if (!content || !title) return;

  // Offsets are layout-based (not getBoundingClientRect) so the current transform doesn't skew them on refresh.
  const centerX = () =>
    hero.clientWidth / 2 - (content.offsetLeft + title.offsetLeft + title.offsetWidth / 2);
  const centerY = () =>
    hero.clientHeight / 2 - (content.offsetTop + title.offsetTop + title.offsetHeight / 2);
  const centerScale = () => Math.min((hero.clientWidth * 0.85) / title.offsetWidth, 4);

  // The intro must not touch the block's transform: it is owned by placeTitle.
  gsap.from(title, {
    autoAlpha: 0,
    filter: 'blur(12px)',
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out',
  });
  gsap.from(title.querySelector('p'), {
    autoAlpha: 0,
    y: 16,
    duration: 1,
    delay: 0.7,
    ease: 'power3.out',
  });

  // Written straight to the style (not via a GSAP tween) because ScrollTrigger reverts
  // GSAP-managed transforms on refresh, which dropped the centered start state.
  const titleEase = gsap.parseEase('power2.inOut');
  const placeTitle = (time: number) => {
    const rest = 1 - titleEase(gsap.utils.clamp(0, 1, time));
    const scale = 1 + (centerScale() - 1) * rest;
    title.style.transformOrigin = '50% 50%';
    title.style.transform = `translate(${centerX() * rest}px, ${centerY() * rest}px) scale(${scale})`;
  };

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: 'power2.out' },
    onUpdate: () => placeTitle(tl.time()),
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      onRefresh: (self) => placeTitle(self.animation?.time() ?? 0),
    },
  });

  placeTitle(0);

  gsap.utils.toArray<HTMLElement>('.hero__item', hero).forEach((item, i) => {
    const from = item.dataset.from as keyof typeof directions;
    tl.from(item, { ...directions[from], autoAlpha: 0 }, i * 0.3);
  });

  tl.from(hero.querySelectorAll('.hero__tech'), { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 });
}
