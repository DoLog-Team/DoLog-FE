import Image from "next/image";

interface SchoolFooterProps {
  logoSrc?: string;
  title: string;
  department: string;
  address: string;
  addressDetail: string;
  email: string;
  copyright: string;
}

export default function SchoolFooter({
  logoSrc,
  title,
  department,
  address,
  addressDetail,
  email,
  copyright,
}: SchoolFooterProps) {
  return (
    <footer className="w-full pt-12 pb-24 flex flex-col mt-auto bg-fg-lighter">
      <div className="flex flex-col px-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-body1-bold text-light">{title}</h3>
          <div className="h-5 w-full" />
          <p className="text-body2 text-lighter">{department}</p>
          <div>
            <p className="text-body2 text-lighter">{address}</p>
            <p className="text-body2 text-lighter">{addressDetail}</p>
          </div>
          <p className="text-body2 text-lighter">{email}</p>
        </div>
        <div className="h-3 w-full" />
        <p className="text-lightest text-body3-bold">
          {copyright} <br />
          All Rights reserved.
        </p>
        <div className="h-7 w-full" />
        <Image
          src={logoSrc || "/images/logo.svg"}
          alt={`${title} Logo`}
          width={60}
          height={18}
        />
      </div>
    </footer>
  );
}
