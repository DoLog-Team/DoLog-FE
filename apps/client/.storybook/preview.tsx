import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import "./storybook.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				mobile: {
					name: "Mobile",
					styles: { width: "375px", height: "812px" },
				},
				desktop: {
					name: "Desktop",
					styles: { width: "1280px", height: "900px" },
				},
			},
		},
	},
	globalTypes: {
		theme: {
			description: "Global theme",
			defaultValue: "light",
			toolbar: {
				title: "Theme",
				icon: "circlehollow",
				items: ["light", "dark"],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme;
			if (typeof document !== "undefined") {
				document.documentElement.classList.toggle("dark", theme === "dark");
			}
			return <Story />;
		},
	],
};

export default preview;
