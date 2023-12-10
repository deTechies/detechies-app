import { Card } from "@/components/ui/card";
import Link from "next/link";


const menu = () => {
  return (
    <Card className="m-8 grid items-center">
      <Link className="text-gray-500" href='/mypage/edit'>포트폴리오</Link>
      <p className="text-gray-500">프로필 수정</p>
      <p className="text-gray-500">평가 요청 내역</p>
      <p className="text-gray-500">평판 조회 내역</p>
      <p className="text-gray-500">커리어 아바타</p>
    </Card>
  );
};

export default menu;
