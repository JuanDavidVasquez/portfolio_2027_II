import gsap from 'gsap';

export function reveal(scope: Element) {
  gsap.utils.toArray<HTMLElement>('[data-reveal]', scope).forEach((el) => {
    gsap.from(el, {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}

export function countUp(scope: Element) {
  gsap.utils.toArray<HTMLElement>('[data-count]', scope).forEach((el) => {
    const counter = { value: 0 };
    el.textContent = '0';
    gsap.to(counter, {
      value: Number(el.dataset.count),
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(counter.value));
      },
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}
