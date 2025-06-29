/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '4rem',
  			xl: '5rem',
  			'2xl': '6rem'
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		}
  	},
  	screens: {
  		xs: '475px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		colors: {
  			border: 'var(--ast-global-color-8)',
  			input: 'var(--ast-global-color-8)',
  			ring: 'var(--ast-global-color-2)',
  			background: 'var(--ast-global-color-7)',
  			foreground: 'var(--ast-global-color-5)',
  			primary: {
  				DEFAULT: 'var(--ast-global-color-0)',
  				foreground: 'var(--ast-global-color-7)'
  			},
  			secondary: {
  				DEFAULT: 'var(--ast-global-color-1)',
  				foreground: 'var(--ast-global-color-0)'
  			},
  			destructive: {
  				DEFAULT: 'var(--ast-global-color-6)',
  				foreground: 'var(--ast-global-color-7)'
  			},
  			muted: {
  				DEFAULT: 'var(--ast-global-color-4)',
  				foreground: 'var(--ast-global-color-3)'
  			},
  			accent: {
  				DEFAULT: 'var(--ast-global-color-2)',
  				foreground: 'var(--ast-global-color-7)'
  			},
  			popover: {
  				DEFAULT: 'var(--ast-global-color-7)',
  				foreground: 'var(--ast-global-color-5)'
  			},
  			card: {
  				DEFAULT: 'var(--ast-global-color-7)',
  				foreground: 'var(--ast-global-color-5)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter var',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			collapse: {
  				from: {
  					height: 'var(--radix-collapsible-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			expand: {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-collapsible-content-height)'
  				}
  			},
  			'slide-up-to-top': {
  				'0%': {
  					transform: 'translateY(0)',
  					opacity: 1
  				},
  				'100%': {
  					transform: 'translateY(-100%)',
  					opacity: 0
  				}
  			},
  			'slide-down-from-top': {
  				'0%': {
  					transform: 'translateY(-100%)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: 1
  				}
  			},
  			'collapse-up': {
  				'0%': {
  					height: 'var(--radix-collapsible-content-height)'
  				},
  				'100%': {
  					height: 0
  				}
  			},
  			'collapse-down': {
  				'0%': {
  					height: 0
  				},
  				'100%': {
  					height: 'var(--radix-collapsible-content-height)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			collapse: 'collapse 0.2s ease-in-out',
  			expand: 'expand 0.2s ease-in-out',
  			'slide-up-to-top': 'slide-up-to-top 0.2s ease-out',
  			'slide-down-from-top': 'slide-down-from-top 0.2s ease-out',
  			'collapse-up': 'collapse-up 0.2s ease-in-out',
  			'collapse-down': 'collapse-down 0.2s ease-in-out'
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
} 