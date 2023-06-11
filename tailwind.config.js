/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				sm: { min: "00px", max: "767.9px" },

				md: { min: "768px", max: "899.9px" },

				lg: { min: "900px", max: "1023.9px" },

				xl: { min: "1024px", max: "1335.9px" },

				"2xl": "1336px",
			},
		},
	},
	plugins: [],
}
