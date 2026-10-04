// 금액은 API 가 소수 둘째 자리까지 내려줘서 원 단위로 표시
export const formatWon = (value: number) =>
	`${value.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}원`;
