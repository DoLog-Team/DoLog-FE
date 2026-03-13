import { Button, Typography } from "components";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg-normal p-8 flex flex-col gap-12 transition-colors duration-300">
      <section className="flex justify-end">
        <ThemeToggle />
      </section>

      {/* 1. 타이포그래피 테스트 */}
      <section className="flex flex-col gap-4">
        <Typography type="head1" color="strong">
          두록(DoLog) 디자인 시스템 테스트
        </Typography>
        <Typography type="body1" color="light">
          이 텍스트는 다크 모드에서 자동으로 밝은 회색(mono-100)으로 변함
        </Typography>
      </section>

      <hr className="border-stroke-lighter" />

      {/* 2. 버튼 및 컬러 시스템 체크 */}
      <section className="flex flex-col gap-6">
        <Typography type="head2">Color System Check</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Foreground Lighter 테스트 */}
          <div className="p-6 rounded-xl bg-fg-lighter border border-stroke-lighter">
            <Typography type="body2Bold" color="strong">
              Foreground Lighter Box
            </Typography>
            <Typography type="body3" color="light">
              라이트: mono-050 / 다크: mono-900
            </Typography>
          </div>

          {/* Inverse 테스트 */}
          <div className="p-6 rounded-xl bg-bg-inverse">
            <Typography type="body2Bold" color="inverse">
              Inverse Background
            </Typography>
            <Typography type="body3" color="inverse" className="opacity-80">
              라이트: mono-black / 다크: mono-white(유지)
            </Typography>
          </div>
        </div>
      </section>

      <section className="flex gap-4">
        <Button variant="primary" size="lg">
          시작하기
        </Button>
        <Button variant="outline" size="lg">
          더보기
        </Button>
      </section>
    </main>
  );
}
