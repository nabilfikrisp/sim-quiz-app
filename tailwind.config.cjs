/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['*.{html, css, js}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif']
                // add more fonts ...name: [...source-of-font]
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    lg: '1024px',
                    xl: '1024px',
                    '2xl': '1024px'
                }
            },
            colors: {
                'custom-black': '#2F2F2F'
                // ...color-name: color-code (hex/hsl/rgb/rgba/hsla...)
            }
        }
    },

    plugins: [require('daisyui')],

    daisyui: {
        themes: ['cyberpunk'],
        styled: true,
        base: true,
        utils: true
        // themes: [
        //     {
        //         mytheme: {
        //             primary: '#61876E',
        //             secondary: '#A6BB8D',
        //             accent: '#1FB2A5',
        //             neutral: '#191D24',
        //             'base-100': '#61876E',
        //             info: '#3ABFF8',
        //             success: '#36D399',
        //             warning: '#EC8F04',
        //             error: '#F87272'
        //         }
        //     }
        // ]
    }
};
