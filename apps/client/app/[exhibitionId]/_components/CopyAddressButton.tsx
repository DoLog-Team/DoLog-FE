"use client";

interface CopyAddressButtonProps {
	address: string;
}

export function CopyAddressButton({ address }: CopyAddressButtonProps) {
	const handleCopy = () => {
		navigator.clipboard.writeText(address);
		alert("주소가 복사되었습니다.");
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="text-body1 text-lightest underline text-left cursor-pointer"
		>
			주소 복사하기 →
		</button>
	);
}
