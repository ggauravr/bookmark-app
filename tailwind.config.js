import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  // SETUP Skeleton UI
  darkMode: 'class',
  // SETUP: Add all the files you want to style
  content: [
      './src/**/*.{html,js,svelte,ts}',
      // Append the path to the skeleton labs files
      join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
    ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
				handwriting: ['Shantell Sans', 'sans-serif'],
				sans: ['Fira Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    skeleton({
      themes: { preset: ['skeleton'] },
    })
  ],
}

