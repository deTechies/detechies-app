import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-10 mx-auto">
        <div className="w-[25vw] h-[25vw] mx-auto relative">
        <Image 
            src="/images/detechies.png"
            alt="landing"
            sizes={"230"}
            fill={true}
            quality={100}
        />
        </div>
       
        <div className="text-4xl flex gap-5 tracking-[6px] mx-auto justify-center">
            <span className="text-text-secondary">
                de
            </span>
            <span className="text-text-primary font-semibold">
                Techies
            </span>
        </div>
    </div>
  )
}
