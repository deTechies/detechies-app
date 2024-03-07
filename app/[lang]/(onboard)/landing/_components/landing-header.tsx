import Image from "next/image";

export default function LandingHeader() {
  return (
    <div className="flex gap-4 text-3xl text-[#939499] items-center mx-auto tracking-[.1em] w-full justify-center">
      <Image src="/images/detechies.png" alt="logo" width={50} height={50} />
      <div className="flex items-center gap-1">
        <span className="font-light">de</span>
        <span className="font-semibold">Techies</span>
      </div>
    </div>
  );
}
