import { Card } from "@/components/ui/card";
import Link from "next/link";


const menu = ({links}: {links:any}) => {
  return (
    <Card className="grid items-center">
      <Link className="text-gray-500" href='/mypage/edit'>{links.profile}</Link>
      <p className="text-gray-500">{links.projects}</p>
      <p className="text-gray-500">{links.groups}</p>
      <p className="text-gray-500">{links.settings}</p>
      <p className="text-gray-500">커리어 아바타</p>
    </Card>
  );
};

export default menu;
