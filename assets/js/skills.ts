import {
  siAngular,
  siClaude,
  siClickup,
  siDocker,
  siGit,
  siGithubactions,
  siGooglegemini,
  siGraphql,
  siJavascript,
  siJira,
  siLangchain,
  siLanggraph,
  siLaravel,
  siMariadb,
  siModelcontextprotocol,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNuxt,
  siOpencv,
  siPhp,
  siPostgresql,
  siReact,
  siTypescript,
  siVuedotjs,
} from 'simple-icons';
import type { Tech } from './stack';

export type ProjectSlug = 'business-verification' | 'agro-assistant' | 'elections' | 'onelessonperday';

// `key` points to skills.items.<key> for names that change with the language.
export type Skill = Tech & { key?: string; detail?: string; projects?: ProjectSlug[] };
export type SkillCategory = { id: string; skills: Skill[] };

const allProjects: ProjectSlug[] = ['business-verification', 'agro-assistant', 'elections', 'onelessonperday'];

export const categories: SkillCategory[] = [
  {
    id: 'languages',
    skills: [
      { label: 'TypeScript', icon: siTypescript, projects: ['business-verification', 'onelessonperday'] },
      { label: 'JavaScript', icon: siJavascript },
      { label: 'PHP', icon: siPhp },
      { label: 'SQL', short: 'sql', projects: ['elections', 'onelessonperday'] },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { label: 'Nuxt', icon: siNuxt, projects: allProjects },
      { label: 'Vue', icon: siVuedotjs, projects: allProjects },
      { label: 'React', icon: siReact },
      { label: 'Next.js', icon: siNextdotjs },
      { label: 'Angular', icon: siAngular },
    ],
  },
  {
    id: 'backend',
    skills: [
      { label: 'NestJS', icon: siNestjs, projects: allProjects },
      { label: 'Node.js', icon: siNodedotjs, projects: ['elections'] },
      { label: 'Laravel', icon: siLaravel },
      { label: 'REST APIs', key: 'rest', short: 'rest', projects: allProjects },
      { label: 'GraphQL', icon: siGraphql },
      { label: 'WebSockets', short: 'ws' },
    ],
  },
  {
    id: 'databases',
    skills: [
      { label: 'PostgreSQL', icon: siPostgresql, projects: ['elections', 'onelessonperday'] },
      { label: 'MongoDB', icon: siMongodb, projects: ['agro-assistant', 'onelessonperday'] },
      { label: 'MySQL', icon: siMysql },
      { label: 'MariaDB', icon: siMariadb },
    ],
  },
  {
    id: 'cloud',
    skills: [
      { label: 'AWS', short: 'aws', detail: 'EC2 · RDS · S3 · Textract', projects: ['business-verification', 'elections'] },
      { label: 'Docker', icon: siDocker, projects: ['elections'] },
      { label: 'Docker Compose', icon: siDocker },
      { label: 'NGINX', icon: siNginx },
      { label: 'GitHub Actions', icon: siGithubactions },
    ],
  },
  {
    id: 'ai',
    skills: [
      { label: 'Gemini API', icon: siGooglegemini, projects: ['agro-assistant'] },
      { label: 'RAG', short: 'rag', detail: 'Gemini File Search', projects: ['agro-assistant'] },
      { label: 'Computer vision', key: 'vision', short: 'cv', projects: ['agro-assistant'] },
      { label: 'OpenCV', icon: siOpencv },
      { label: 'OpenAI API', short: 'oai' },
      { label: 'LangChain', icon: siLangchain },
      { label: 'LangGraph', icon: siLanggraph },
      { label: 'Claude', icon: siClaude },
      { label: 'MCP', icon: siModelcontextprotocol },
    ],
  },
  {
    id: 'tools',
    skills: [
      { label: 'Git', icon: siGit },
      { label: 'Scrum', short: 'scrum' },
      { label: 'Jira', icon: siJira },
      { label: 'ClickUp', icon: siClickup },
    ],
  },
];
