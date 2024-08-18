
import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '100': '400px',
        '101': '85vh',
        '102': '600px',
        '103': '900px',
        '104': '80vh',
        '105': '80vh',
        '106': '70vh',
        '107': '56vh',
        '109': '50vh'
      },
      width: {
        '101': '50rem',
        '100': '750px',
        '65': '1326px',
        '66': '94vh',
        '108': '130vh'
      },
      fontSize: {
        '11xl': '300px',
        '12xl': '1.8rem'
      },
      textShadow: {
        default: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        md: '3px 3px 6px rgba(0, 0, 0, 0.2)',
        lg: '4px 4px 8px rgba(0, 0, 0, 0.3)',
        none: 'none',
      },
      spacing: {
        '101': '500px',
      },
      scale: {
        '201': '2'
      },
      margin: {
        '65': '450px',
        '66': '450px'
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: { addUtilities: (utilities: Record<string, any>) => void, theme: (path: string) => any }) {
      const textShadow = theme('textShadow') as Record<string, string>;
      const utilities = Object.keys(textShadow).map(key => ({
        [`.text-shadow-${key}`]: {
          textShadow: textShadow[key],
        },
      }));
      addUtilities(Object.assign({}, ...utilities));
    }
  ],
};


export default config;

