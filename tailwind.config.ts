import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#451e84', // Deep Royal Velvet Indigo - main brand color
        secondary: '#361668', // Deeper Royal Indigo
        accent: '#451e84', // Royal accent
        text: '#171717', // Dark Charcoal text
        'text-gray': '#64748B', // Slate gray text
        'bg-light': '#ECEEF2', // Darker refined background gray
        'border-gray': '#DDE1E8', // Border gray
        'nav-gray': '#E5E9EF', // Navigation bar light gray
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        heading: ['Nunito', 'var(--font-rounded)', 'var(--font-dm-sans)', 'sans-serif'],
        rounded: ['Nunito', 'var(--font-rounded)', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    // line-clamp plugin removed; included by default in Tailwind 3.3+
  ],
}
export default config 