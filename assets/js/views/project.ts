import gsap from 'gsap';
import { reveal } from '../reveal';

export function initProject(container: HTMLElement) {
  return gsap.context(() => {
    gsap.from(container.querySelectorAll('.project-page__intro > *'), {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.08,
      delay: 0.2,
      ease: 'power3.out',
    });
    reveal(container);
  }, container);
}
