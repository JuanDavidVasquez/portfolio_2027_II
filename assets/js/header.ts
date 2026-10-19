import { getLang, setLang, type Lang } from '../i18n';

const routes: Record<string, string> = {
  home: '',
  about: 'about/',
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

export function routeFor(path: string | undefined) {
  return Object.keys(routes).find((name) => import.meta.env.BASE_URL + routes[name] === path);
}

export function setActiveRoute(namespace: string) {
  document.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    if (link.dataset.route === namespace) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function syncLangButtons() {
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === getLang()));
  });
}
