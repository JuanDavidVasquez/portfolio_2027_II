import gsap from 'gsap';
import barba from '@barba/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { detectLang, setLang, t, translate } from '../i18n';
import { initHeader, routeFor, setActiveRoute } from './header';
import { cover, uncover } from './transition';
import { initAbout } from './views/about';
import { initHome } from './views/home';
import { initProject } from './views/project';
import { initProjects } from './views/projects';

gsap.registerPlugin(ScrollTrigger);
// Mobile address bars resize the viewport while scrolling; refreshing on that makes pinned sections jump.
ScrollTrigger.config({ ignoreMobileResize: true });

setLang(detectLang());
// Translated text changes element sizes, and the hero's pin and centering are measured from them.
initHeader(() => ScrollTrigger.refresh());

let page: gsap.Context | undefined;

// Barba also runs beforeEnter on the first load, so this is the single entry point for every page.
const view = (namespace: string, init: (container: HTMLElement) => gsap.Context) => ({
  namespace,
  beforeEnter({ next }: { next: { container: HTMLElement } }) {
    translate(next.container);
    setActiveRoute(namespace);
    page = init(next.container);
  },
  afterLeave() {
    page?.revert();
    page = undefined;
  },
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

barba.init({
  views: [
    view('home', initHome),
    view('about', initAbout),
    view('projects', initProjects),
    view('project', initProject),
  ],
  transitions: [
    {
      name: 'stack-orbit',
      async leave(data) {
        if (reducedMotion.matches) {
          await gsap.to(data.current.container, { opacity: 0, duration: 0.3 });
          return;
        }
        // The next namespace isn't known yet (the page is still being fetched), so it is derived from the URL.
        const route = routeFor(data.next.url.path);
        await cover(route ? (t(`nav.${route}`) ?? '') : '');
      },
      async enter(data) {
        if (reducedMotion.matches) {
          await gsap.from(data.next.container, { opacity: 0, duration: 0.3 });
          return;
        }
        await uncover();
      },
    },
  ],
});

// Barba keeps the old container until the new one has entered; removing it earlier lets the next
// page's ScrollTriggers measure a layout that doesn't include it.
barba.hooks.afterLeave((data) => {
  data?.current.container?.remove();
  window.scrollTo(0, 0);
});
