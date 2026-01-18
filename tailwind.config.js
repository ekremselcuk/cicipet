/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'bone-white': '#FAF9F6',
                'paw-orange': '#FF8C00',
            },
            fontFamily: {
                sans: ['Arial', 'Helvetica', 'sans-serif'],
            },
            keyframes: {
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                }
            },
            animation: {
                heartbeat: 'heartbeat 1.5s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
