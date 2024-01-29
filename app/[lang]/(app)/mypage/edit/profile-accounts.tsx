import { Card } from "@/components/ui/card";
import Image from "next/image";

const logos = [
    { src: "/images/socials/dark/google.png", alt: "Icon 1", text: "구글 계정"  },
    { src: "/images/socials/dark/bitcoin.png", alt: "Icon 2", text: "전화번호" },
    { src: "/images/socials/dark/email.png", alt: "Icon 3", text: "텔레그램" },
    { src: "/images/socials/dark/figma.png", alt: "Icon 4", text: "이메일" },
    {
      src: "/images/socials/dark/facebook.png",
      alt: "Icon 1",
      text: "탈중앙화 개인지갑",
    },
    { src: "/images/socials/dark/github.png", alt: "Icon 2", text: "Github" },
    { src: "/images/socials/dark/linkedin.png", alt: "Icon 3", text: "피그마" },
    { src: "/images/socials/dark/phone.png", alt: "Icon 4", text: "핀터레스트" },
    { src: "/images/socials/dark/pinterest.png", alt: "Icon 1", text: "유튜브" },
    { src: "/images/socials/dark/reddit.png", alt: "Icon 2", text: "링크드인" },
    { src: "/images/socials/dark/telegram.png", alt: "Icon 3", text: "페이스북" },
    { src: "/images/socials/dark/youtube.png", alt: "Icon 4", text: "레딧" },
  ];

  
export default function ProfileAccounts() {
  return (
    <Card className="my-8">
    <h1 className="text-subhead_m font-medium mb-6 text-primary ">
      아이덴티티 인증
    </h1>
    {/* 4개씩 3줄짜리 테이블 */}
    <div className="flex flex-wrap justify-evenly gap-2">
      {logos.map((logo, i) => (
        <div
          key={i}
          className={`flex w-[209px] border border-border-div rounded-sm p-4 pb-5 gap-4`}
        >
          <div className="flex justify-center relative aspect-square w-[48px] h-[48px] rounded-full ">
            <Image src={logo.src} fill={true} sizes={"48"} alt={logo.alt} className="aspect-square"/>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="text-title_s">{logo.text}</p>
            <p className="text-label_s text-text-secondary">인증하기</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
  )
}
