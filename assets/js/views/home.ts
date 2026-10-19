import gsap from 'gsap';
import { initHero } from '../hero';
import { countUp, reveal } from '../reveal';

export function initHome(container: HTMLElement) {
  return gsap.context(() => {
    initHero(container);
    reveal(container);
    countUp(container);
  }, container);
}
