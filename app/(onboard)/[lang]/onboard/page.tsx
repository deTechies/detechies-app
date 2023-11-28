import Image from "next/image";
import LoginButtons from "./login-buttons";

export default async function OnboardPage() {
  
  return (
    <div className="flex flex-col gap-8">
      <Image
        src={`/images/careerzen.png`}
        height={40}
        width={400}
        alt={`careerzen Logo`}
      />
      <h1 className="text-xl font-medium tracking-wider text-center">
        전문가들의 커리어 인증은 다르다.
      </h1>
      <h5 className="text-text-secondary font-light text-center">
        이미 계정이 있다면 기존 계정을 사용해 Careerzen에 로그인 합니다.
      </h5>
      <div className="flex flex-col space-y-1 gap-4">
        <LoginButtons />
      </div>
    </div>
  );
}
