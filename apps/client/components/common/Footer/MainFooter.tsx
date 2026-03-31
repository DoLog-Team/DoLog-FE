import Image from "next/image";

export default function MainFooter() {
  return (
    <footer className="w-full pt-12 pb-24 flex flex-col mt-auto bg-fg-lighter">
      <div className="flex flex-col px-4">
        <Image src="/images/logo.svg" alt="DoLog Logo" width={50} height={25} />
        <div className="h-5 w-full" />
        <div className="flex flex-col gap-1">
          <p className="text-body2 text-lighter">전시를 다르게 보다</p>
          <p className="text-body2 text-lighter">example@example.com</p>
        </div>
        <div className="h-3 w-full" />
        <p className="text-body3-bold text-lightest ">
          Website powered by DOLOG
        </p>
      </div>
    </footer>
  );
}
