import es from './locales/es.json';
import en from './locales/en.json';

export type Messages = typeof es;
export type Lang = 'es' | 'en';

// Typed against es.json so a key missing from another locale fails type checking.
const locales: Record<Lang, Messages> = { es, en };
const STORAGE_KEY = 'lang';

let current: Lang = 'es';

export const getLang = () => current;

export function detectLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'es' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
}

// Keys are dot paths; numeric segments index into arrays (about.education.items.0).
export function t(key: string): string | undefined {
  const value = key
    .split('.')
    .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], locales[current]);
  return typeof value === 'string' ? value : undefined;
}

// Barba passes the container itself as root, so it has to be matched along with its descendants.
function select(root: ParentNode, selector: string) {
  const found = Array.from(root.querySelectorAll<HTMLElement>(selector));
  return root instanceof HTMLElement && root.matches(selector) ? [root, ...found] : found;
}

export function translate(root: ParentNode = document) {
  select(root, '[data-i18n]').forEach((el) => {
    const value = t(el.dataset.i18n!);
    if (value) el.textContent = value;
  });

  select(root, '[data-i18n-attr]').forEach((el) => {
    for (const pair of el.dataset.i18nAttr!.split(',')) {
      const [attr, key] = pair.split(':').map((part) => part.trim());
      const value = t(key);
      if (value) el.setAttribute(attr, value);
    }
  });

  select(root, '[data-i18n-title]').forEach((el) => {
    const value = t(el.dataset.i18nTitle!);
    if (value) document.title = value;
  });
}

export function setLang(lang: Lang) {
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  translate();
}
