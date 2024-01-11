import { Card } from "@/components/ui/card";
import Image from "next/image";

const logos = [
    { src: "/icons/identity_google.png", alt: "Icon 1", text: "구글 계정" },
    { src: "/icons/identity_phone.png", alt: "Icon 2", text: "전화번호" },
    { src: "/icons/identity_telegram.png", alt: "Icon 3", text: "텔레그램" },
    { src: "/icons/identity_mail.png", alt: "Icon 4", text: "이메일" },
    {
      src: "/icons/identity_bitcoin.png",
      alt: "Icon 1",
      text: "탈중앙화 개인지갑",
    },
    { src: "/icons/identity_github.png", alt: "Icon 2", text: "Github" },
    { src: "/icons/identity_figma.png", alt: "Icon 3", text: "피그마" },
    { src: "/icons/identity_pinterest.png", alt: "Icon 4", text: "핀터레스트" },
    { src: "/icons/identity_youtube.png", alt: "Icon 1", text: "유튜브" },
    { src: "/icons/identity_linkedIn.png", alt: "Icon 2", text: "링크드인" },
    { src: "/icons/identity_facebook.png", alt: "Icon 3", text: "페이스북" },
    { src: "/icons/identity_reddit.png", alt: "Icon 4", text: "레딧" },
  ];

  
export default function ProfileAccounts() {
  return (
    <Card className="my-8">
    <h1 className="text-2xl font-medium mb-6 text-primary">
      아이덴티티 인증
    </h1>
    {/* 4개씩 3줄짜리 테이블 */}
    <div className="flex flex-wrap justify-evenly gap-2">
      {logos.map((logo, i) => (
        <div
          key={i}
          className={`flex w-[209px] border border-border-div rounded-sm mt-2 mr-4`}
        >
          <div className="flex justify-center m-4">
            <Image src={logo.src} width={50} height={50} alt={logo.alt} className="aspect-square"/>
          </div>
          <div className="flex flex-col justify-center m-2">
            <p className="text-md">{logo.text}</p>
            <p className="text-sm text-gray-400 mt-1">인증하기</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
  )
}
