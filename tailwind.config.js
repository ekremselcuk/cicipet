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
            }
        },
    },
    plugins: [],
}
