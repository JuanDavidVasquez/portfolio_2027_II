import { getLang, setLang, type Lang } from '../i18n';

const routes: Record<string, string> = {
  home: '',
  about: 'about/',
  projects: 'projects/',
};

// Detail pages have their own namespace but belong to the section that lists them.
const sections: Record<string, string> = {
  project: 'projects',
};

// The header lives outside the Barba container, so it is never re-rendered: its relative hrefs would break
// after the first navigation. They are rebuilt from the base path, which is /<repo>/ on GitHub Pages.
export function initHeader(onLangChange: () => void) {
  document.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    link.href = import.meta.env.BASE_URL + routes[link.dataset.route!];
  });

  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang as Lang;
      if (lang === getLang()) return;
      setLang(lang);
      syncLangButtons();
      onLangChange();
    });
  });

  syncLangButtons();
}

// Longest prefix wins, so /projects/<slug>/ resolves to projects instead of home.
export function routeFor(path: string | undefined) {
  if (!path) return undefined;
  return Object.keys(routes)
    .filter((name) => path.startsWith(import.meta.env.BASE_URL + routes[name]))
    .sort((a, b) => routes[b].length - routes[a].length)[0];
}

export function setActiveRoute(namespace: string) {
  const route = sections[namespace] ?? namespace;
  document.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    if (link.dataset.route === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function syncLangButtons() {
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === getLang()));
  });
}
