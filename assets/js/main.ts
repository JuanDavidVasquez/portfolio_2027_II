import gsap from 'gsap';
import barba from '@barba/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHero } from './hero';

gsap.registerPlugin(ScrollTrigger);
// Mobile address bars resize the viewport while scrolling; refreshing on that makes pinned sections jump.
ScrollTrigger.config({ ignoreMobileResize: true });

barba.init({
  transitions: [
    {
      name: 'fade',
      leave(data) {
        return gsap.to(data.current.container, { opacity: 0, duration: 0.4 });
      },
      enter(data) {
        return gsap.from(data.next.container, { opacity: 0, duration: 0.4 });
      },
    },
  ],
});

initHero();
