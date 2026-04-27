export const dividerStyles = {
	wrapper: {
		width: "calc(100% + 2rem)",
		marginLeft: "-1rem",
		marginRight: "-1rem",
		padding: "20px 0",
		display: "flex",
		flexDirection: "column" as const,
		justifyContent: "center",
	},

	line: {
		width: "100%",
		height: "4px",
		backgroundColor: "var(--color-stroke-lightest)",
	},
};
