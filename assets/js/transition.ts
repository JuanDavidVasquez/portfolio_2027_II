import gsap from 'gsap';
import { stack, techGraphic } from './stack';

type Overlay = {
  root: HTMLElement;
  panels: HTMLElement[];
  orbit: HTMLElement;
  icons: HTMLElement[];
  center: HTMLElement;
  label: HTMLElement;
  bar: HTMLElement;
};

type Point = { x: number; y: number };

let overlay: Overlay | undefined;
let intro: gsap.core.Timeline | undefined;
let loops: gsap.core.Tween[] = [];
let positions: Point[] = [];

function build(): Overlay {
  const root = document.createElement('div');
  root.className = 'page-transition';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = `
    <div class="page-transition__panel page-transition__panel--accent"></div>
    <div class="page-transition__panel"></div>
    <div class="page-transition__stage">
      <ul class="page-transition__orbit">
        ${stack.map((tech) => `<li class="page-transition__icon">${techGraphic(tech, 'page-transition__aws')}</li>`).join('')}
      </ul>
      <div class="page-transition__center">
        <span class="page-transition__eyebrow">Juan Vasquez</span>
        <span class="page-transition__label"></span>
        <span class="page-transition__bar"></span>
      </div>
    </div>`;
  document.body.append(root);

  const el = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
  const built: Overlay = {
    root,
    panels: gsap.utils.toArray<HTMLElement>('.page-transition__panel', root),
    orbit: el('.page-transition__orbit'),
    icons: gsap.utils.toArray<HTMLElement>('.page-transition__icon', root),
    center: el('.page-transition__center'),
    label: el('.page-transition__label'),
    bar: el('.page-transition__bar'),
  };

  // The orbit and the label drift in opposite directions to follow the pointer, giving the overlay depth.
  const orbitX = gsap.quickTo(built.orbit, 'x', { duration: 0.8, ease: 'power3' });
  const orbitY = gsap.quickTo(built.orbit, 'y', { duration: 0.8, ease: 'power3' });
  const centerX = gsap.quickTo(built.center, 'x', { duration: 0.8, ease: 'power3' });
  const centerY = gsap.quickTo(built.center, 'y', { duration: 0.8, ease: 'power3' });
  root.addEventListener('pointermove', (event) => {
    const dx = event.clientX / window.innerWidth - 0.5;
    const dy = event.clientY / window.innerHeight - 0.5;
    orbitX(dx * 48);
    orbitY(dy * 48);
    centerX(dx * -16);
    centerY(dy * -16);
  });

  return built;
}

function orbitPositions(count: number): Point[] {
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.34;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
}

// Resolves once the panels hide the page, so Barba can swap containers underneath while the icons keep animating.
export function cover(label: string) {
  const o = (overlay ??= build());
  const accent = getComputedStyle(o.root).getPropertyValue('--accent');
  positions = orbitPositions(o.icons.length);
  o.label.textContent = label;

  gsap.set(o.root, { autoAlpha: 1 });
  gsap.set(o.panels, { scaleY: 0, transformOrigin: '50% 100%' });
  gsap.set(o.icons, { x: 0, y: 0, scale: 0, autoAlpha: 0, rotation: 0, color: '' });
  gsap.set(o.orbit, { rotation: 0 });
  gsap.set([o.label, o.bar], { autoAlpha: 0, y: 0 });
  gsap.set(o.label, { yPercent: 100 });
  gsap.set(o.bar, { scaleX: 0 });

  // The icons counter-rotate so they stay upright while the orbit spins.
  loops = [
    gsap.to(o.orbit, { rotation: 360, duration: 30, ease: 'none', repeat: -1 }),
    gsap.to(o.icons, { rotation: -360, duration: 30, ease: 'none', repeat: -1 }),
    gsap.to(o.icons, { color: accent, duration: 0.3, stagger: { each: 0.06, repeat: -1, yoyo: true, repeatDelay: 0.6 } }),
  ];

  intro = gsap
    .timeline()
    .to(o.panels, { scaleY: 1, duration: 0.5, ease: 'power4.inOut', stagger: 0.08 })
    .addLabel('covered')
    .to(
      o.icons,
      {
        x: (i) => positions[i].x,
        y: (i) => positions[i].y,
        scale: 1,
        autoAlpha: 1,
        duration: 0.45,
        ease: 'back.out(1.7)',
        stagger: 0.015,
      },
      '-=0.25',
    )
    .to(o.label, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }, '<0.05')
    .to(o.bar, { scaleX: 1, autoAlpha: 1, duration: 0.45, ease: 'power2.inOut' }, '<');

  return new Promise<void>((resolve) => intro!.call(resolve, [], 'covered'));
}

export async function uncover() {
  const o = overlay;
  if (!o) return;
  await intro;

  await gsap
    .timeline()
    .to(o.icons, {
      x: (i) => positions[i].x * 1.8,
      y: (i) => positions[i].y * 1.8,
      scale: 0.4,
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power3.in',
      stagger: 0.015,
    })
    .to([o.label, o.bar], { autoAlpha: 0, y: -24, duration: 0.3, ease: 'power2.in' }, '<')
    .to([...o.panels].reverse(), {
      scaleY: 0,
      transformOrigin: '50% 0%',
      duration: 0.55,
      ease: 'power4.inOut',
      stagger: 0.08,
    }, '-=0.25');

  loops.forEach((loop) => loop.kill());
  gsap.set(o.root, { autoAlpha: 0 });
}
