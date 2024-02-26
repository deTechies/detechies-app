import Image from "next/image";

export default function OnboardLoading() {
  return (
    <div className="h-[100vh] w-[100vw] absolute top-0 left-0">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Image
          src="/images/connectfast.png"
          alt="ConnectFast"
          width={300}
          height={50}
          className="block object-contain h-12 mx-auto dark:hidden animate-pulse"
        />
        <Image
          src="/images/logo-invert.png"
          alt="ConnectFast"
          width={300}
          height={50}
          className="hidden object-contain h-12 mx-auto dark:block animate-pulse"
        />
      </div>
    </div>
  );
}
