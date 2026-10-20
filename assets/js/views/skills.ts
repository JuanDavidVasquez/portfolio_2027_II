import gsap from 'gsap';
import { t } from '../../i18n';
import { reveal } from '../reveal';
import { categories, type Skill } from '../skills';
import { techGraphic } from '../stack';

// Rendered text keeps its data-i18n key so a later language switch retranslates it in place.
const translatable = (tag: string, key: string, fallback: string, attrs = '') =>
  `<${tag} data-i18n="${key}"${attrs}>${t(key) ?? fallback}</${tag}>`;

function renderSkill(skill: Skill) {
  const name = skill.key
    ? translatable('h3', `skills.items.${skill.key}`, skill.label, ' class="skill-card__name"')
    : `<h3 class="skill-card__name">${skill.label}</h3>`;
  const detail = skill.detail ? `<p class="skill-card__detail">${skill.detail}</p>` : '';
  const projects = skill.projects?.length
    ? `<ul class="chips" aria-label="${t('skills.usedIn')}" data-i18n-attr="aria-label:skills.usedIn">
        ${skill.projects
          .map((slug) => `<li>${translatable('a', `skills.projects.${slug}`, slug, ` href="../projects/${slug}/" class="chip skill-card__project"`)}</li>`)
          .join('')}
      </ul>`
    : '';

  return `<li class="skill-card">
    <span class="skill-card__icon">${techGraphic(skill, 'skill-card__short')}</span>
    ${name}
    ${detail}
    ${projects}
  </li>`;
}

export function initSkills(container: HTMLElement) {
  const groups = container.querySelector<HTMLElement>('.skills-page__groups')!;
  groups.innerHTML = categories
    .map(
      (category) => `<section class="skills-page__group" data-reveal>
        ${translatable('h2', `skills.categories.${category.id}`, category.id)}
        <ul class="skills-page__grid">${category.skills.map(renderSkill).join('')}</ul>
      </section>`,
    )
    .join('');

  return gsap.context(() => {
    gsap.from(container.querySelectorAll('.skills-page__intro > *'), {
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power3.out',
    });
    reveal(container);
  }, container);
}
