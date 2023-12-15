import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col h-[320px] justify-between items-center">
      <Image
        src={`/images/careerzen.png`}
        width={400}
        height={300}
        alt={"Logo"}
      />
      <div className="flex gap-4 text-md text-gray-500">
        <p>이용 가이드</p>
        <p>FAQ</p>
        <p>백서</p>
        <p>개인정보처리방침</p>
        <p>이용약관</p>
      </div>
      <div className="grid place-content-center justify-center justify-items-center">
        <div className="flex gap-4">
          <Image
            src={`/icons/discord.png`}
            height={24}
            width={24}
            alt={"Discord"}
          />
          <Image
            src={`/icons/telegram.png`}
            height={24}
            width={24}
            alt={"Discord"}
          />
          <Image src={`/icons/x.png`} height={24} width={24} alt={"Discord"} />
        </div>
        <p className="text-gray-300 text-md m-6">
          Copyright © 2023. Careerzen. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
