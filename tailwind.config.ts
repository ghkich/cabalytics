import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'slide-in-short': {
                    '0%': { transform: 'translateY(15px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-long': {
                    '0%': { transform: 'translateY(25px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            animation: {
                'slide-in-short': 'slide-in-short 500ms ease-out forwards',
                'slide-in-long': 'slide-in-long 200ms ease-out forwards',
                'spin-selection': 'spin 500ms ease-out forwards',
            },
            colors: {
                neutral: {
                    450: '#818181',
                    825: '#202020',
                    850: '#1C1C1C',
                    875: '#191919',
                    910: '#161616',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('@tailwindcss/container-queries')],
}
export default config