import Image from "next/image";
import { Button } from "components";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <Image src="/images/logo.svg" alt="DoLog" width={47} height={20} priority />
      <Button variant="assistive" size="sm">
        문의하기
      </Button>
    </header>
  );
};
