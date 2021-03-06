module.exports = {
    prefix: '',
    purge: {
        enabled: false,
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        margin: ['responsive'],
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
