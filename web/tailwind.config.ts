import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        phase: {
          1: '#3b82f6',
          2: '#8b5cf6',
          3: '#f59e0b',
          4: '#10b981',
          5: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
export default config;
