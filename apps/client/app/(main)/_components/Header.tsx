import { Button } from "components";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <Image
        src="/images/logo.svg"
        alt="DoLog"
        width={47}
        height={20}
        priority
      />
      <a
        href="https://www.instagram.com/dolog.archive/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="assistive" size="sm">
          문의하기
        </Button>
      </a>
    </header>
  );
};
