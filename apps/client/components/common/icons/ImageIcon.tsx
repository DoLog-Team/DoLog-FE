interface ImageIconProps {
	size?: number;
	className?: string;
}

export function ImageIcon({ size = 32, className }: ImageIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<title>전시된 작품</title>
			<mask
				id="mask0_1554_177462"
				style={{ maskType: "alpha" }}
				maskUnits="userSpaceOnUse"
				x="5"
				y="5"
				width="22"
				height="22"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M24.5132 5.33325C25.1265 5.33325 25.6394 5.53889 26.0509 5.95044C26.4625 6.362 26.6677 6.87487 26.6668 7.4882V24.5129C26.6668 25.1263 26.4616 25.6391 26.0509 26.0507C25.6403 26.4623 25.127 26.6675 24.5119 26.6666H7.48844C6.87422 26.6666 6.36135 26.4614 5.95068 26.0507C5.54003 25.64 5.33438 25.1267 5.3335 24.5116V7.4882C5.3335 6.87398 5.53913 6.36111 5.95068 5.95044C6.36224 5.53977 6.87511 5.33414 7.48844 5.33325H24.5132ZM10.3002 21.5999C10.1766 21.7647 10.2942 21.9999 10.5002 21.9999H21.7013C21.9081 21.9999 22.0255 21.763 21.9001 21.5985L19.7807 18.8155C19.6832 18.6874 19.4919 18.6836 19.3893 18.8075L17.4537 21.146C17.3523 21.2685 17.1637 21.2664 17.065 21.1416L13.971 17.2285C13.8693 17.0999 13.6733 17.1024 13.5749 17.2336L10.3002 21.5999Z"
					fill="black"
				/>
			</mask>
			<g mask="url(#mask0_1554_177462)">
				<rect width="32" height="32" fill="currentColor" />
			</g>
		</svg>
	);
}
