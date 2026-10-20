import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: 'index.html',
        about: 'about/index.html',
        skills: 'skills/index.html',
        projects: 'projects/index.html',
        'project-business-verification': 'projects/business-verification/index.html',
        'project-agro-assistant': 'projects/agro-assistant/index.html',
        'project-elections': 'projects/elections/index.html',
        'project-onelessonperday': 'projects/onelessonperday/index.html',
        notfound: '404.html',
      },
    },
  },
});
