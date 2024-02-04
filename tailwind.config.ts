/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '15px',
			},
			screens: {
				sm: '1240px',
			},
		},
		extend: {
			screens: {
				xs: '300px',
			},
			width: {
				'2full': '200%',
			},
			height: {
				'2full': '200%',
			},
			spacing: {
				'2full': '200%',
			},
			fontFamily: {
				roboto: ['var(--appFont)'],
			},
			colors: {
				'text-color': 'var(--text-color)',
				'svg-color': 'var(--svg-color)',
				'header-link-text-color': 'var(--header-link-text-color)',
				'header-link-icon-color': 'var(--header-link-icon-color)',
				'header-link-hover-text-color': 'var(--header-link-hover-text-color)',
				'header-link-hover-icon-color': 'var(--header-link-hover-icon-color)',
				'burger-color': 'var(--burger-color)',
				'pulse-color': 'var(--pulse-color)',
				'dropdown-bg': 'var(--dropdown-bg)',
				'dropdonw-btn-color': 'var(--dropdonw-btn-color)',
				'dropdonw-btn-icon-color': 'var(--dropdonw-btn-icon-color)',
				'dropdown-box-shadow': 'var(--dropdown-box-shadow)',
				'dropdown-arrow-color': 'var(--dropdown-arrow-color)',
				'dropdown-arrow-hover-color': 'var(--dropdown-arrow-hover-color)',
				'submenu-link-text-color': 'var(--submenu-link-text-color)',
				'submenu-link-icon-color': 'var(--submenu-link-icon-color)',
				'submenu-link-hover-text-color': 'var(--submenu-link-hover-text-color)',
				'submenu-link-hover-icon-color': 'var(--submenu-link-hover-icon-color)',
				'select-bg': 'var(--select-bg)',

				// Social Colors
				facebook: 'var(--facebook)',
				twitter: 'var(--twitter)',
				google: 'var(--google)',
			},
			backgroundImage: {
				'bg-color': 'var(--bg-color)',
				'header-bg': 'var(--header-bg)',
				'nav-bg': 'var(--nav-bg)',
			},
			keyframes: {
				showHeader: {
					'0%': {
						opacity: 0,
						top: '-200px',
					},
					'100%': {
						opacity: 1,
						top: 0,
					},
				},
				leftRoll: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' },
				},
				rightRoll: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				delayOverflow: {
					to: { overflow: 'visible' },
				},
				loading: {
					to: { width: '100%' },
				},
			},
			animation: {
				showHeader: 'showHeader ease-in-out 0.7s',
				leftRoll: 'leftRoll linear 3s infinite both',
				rightRoll: 'rightRoll linear 3s infinite both',
				delayOverflow: 'delayOverflow linear 0.3s',
				loading: 'loading linear 0.7s both',
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }: any) {
			addComponents({
				'.pulse-btn': {
					position: 'relative',
					overflow: 'hidden',
					userSelect: 'none',
				},
			});
		}),
	],
};
