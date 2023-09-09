import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'scale-fade-in': {
                    '0%': { transform: 'translateY(50px) scale(0.75)', opacity: '0' },
                    '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
                },
            },
            animation: {
                'scale-fade-in': 'scale-fade-in 300ms ease-out forwards',
                'spin-selection': 'spin 500ms ease-out forwards',
            },
            colors: {
                neutral: {
                    450: '#7A7A7A',
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