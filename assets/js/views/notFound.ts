import gsap from 'gsap';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initNotFound(container: HTMLElement) {
  return gsap.context(() => {
    const content = container.querySelectorAll('.not-found__content > *');
    const code = container.querySelector('.not-found__code');
    const cup = container.querySelector('.not-found__cup');

    if (reducedMotion.matches) {
      gsap.set([...content, code, cup], { autoAlpha: 1 });
      return;
    }

    gsap.from(content, {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power3.out',
    });

    gsap
      .timeline({ delay: 0.3 })
      .from(code, { yPercent: 20, autoAlpha: 0, duration: 0.9, ease: 'power3.out' })
      // The cup's resting rotation comes from the stylesheet, so it falls upright and tips over on landing.
      .from(cup, { yPercent: -400, rotation: 0, autoAlpha: 0, duration: 1.1, ease: 'bounce.out' }, '<0.2');
  }, container);
}
