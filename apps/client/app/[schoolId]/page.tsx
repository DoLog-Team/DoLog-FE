import { testPageStyles as s } from "./TestPage.styles";

export default function TestPage() {
  return (
    <div className={s.wrapper}>
      <h1 className="text-head1 text-strong">두록(DoLog) 테마 테스트</h1>

      <div className="flex flex-wrap gap-4">
        {/* 학교 메인 버튼 */}
        <button className={s.mainButton}>학교 메인 버튼</button>

        {/* CVA 적용 버튼 - outline 모드 */}
        <button className={s.customButton({ intent: "outline" })}>
          기본 버튼 (custom1 & 2)
        </button>

        {/* CVA 적용 버튼 - primary 모드 */}
        <button className={s.customButton({ intent: "primary" })}>
          강조 버튼
        </button>

        <div className={s.chip}>Chip 확인</div>
      </div>
    </div>
  );
}
