import { Button } from "components";
import { testPageStyles as s } from "./TestPage.styles";

export default function TestPage() {
  return (
    <div className={s.wrapper}>
      <h1 className="text-head1 text-strong mb-6">두록(DoLog) 테마 테스트</h1>

      <div className="flex flex-wrap gap-4">
        <Button>학교 메인 버튼</Button>

        <Button variant="secondary" size="md">
          보조 버튼
        </Button>

        <Button variant="outline" size="md">
          기본 버튼 (Outline)
        </Button>

        <Button size="sm">작은 버튼</Button>
        <Button size="lg">큰 버튼</Button>
      </div>
    </div>
  );
}
