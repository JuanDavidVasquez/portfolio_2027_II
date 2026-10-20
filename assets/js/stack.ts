import {
  siAngular,
  siClaude,
  siDocker,
  siGithub,
  siLangchain,
  siLanggraph,
  siModelcontextprotocol,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siReact,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from 'simple-icons';

// Techs without an icon are rendered as their short text instead.
export type Tech = { label: string; icon?: SimpleIcon; short?: string };

// simple-icons no longer ships the AWS logo, so it is rendered as text.
export const stack: Tech[] = [
  { label: 'TypeScript', icon: siTypescript },
  { label: 'Node.js', icon: siNodedotjs },
  { label: 'NestJS', icon: siNestjs },
  { label: 'PostgreSQL', icon: siPostgresql },
  { label: 'Docker', icon: siDocker },
  { label: 'AWS', short: 'aws' },
  { label: 'React', icon: siReact },
  { label: 'Next.js', icon: siNextdotjs },
  { label: 'Vue', icon: siVuedotjs },
  { label: 'Nuxt', icon: siNuxt },
  { label: 'Angular', icon: siAngular },
  { label: 'GitHub', icon: siGithub },
  { label: 'Claude', icon: siClaude },
  { label: 'LangChain', icon: siLangchain },
  { label: 'LangGraph', icon: siLanggraph },
  { label: 'MCP', icon: siModelcontextprotocol },
];

export function techGraphic({ icon, short, label }: Tech, textClass: string) {
  return icon
    ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon.path}"/></svg>`
    : `<span class="${textClass}" aria-hidden="true">${short ?? label}</span>`;
}
