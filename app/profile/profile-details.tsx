
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function ProfileDetails({ profile }: { profile: any }) {
  
  const colors = ["red", "blue", "green", "indigo", "gray"];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `bg-${colors[randomIndex]}-300 text-${colors[randomIndex]}-500`;
};

//we want to import here all the valuable data from next.id and make sure that we can easily use it. 






  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2>Introduction</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {profile?.badges && (
          <div className="flex flex-col border rounded-sm px-4 py-3 gap-2">
            <div className="flex gap-2 flex-wrap">
              <span className="text-green-medium">Frontend Dev</span>
              <span>@Kakaobank</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {profile?.badges &&
                profile?.badges.map((badge: any, index: number) => (
                  <Badge className={getRandomColor()} key={index}>
                    {badge.name}
                  </Badge>
                ))}
            </div>
          </div>
        )}
        {profile?.description && (
          <section className="border rounded-sm flex flex-col px-4 py-3 gap-3">
            <h5 className="text-normal text-black-normal font-semibold">Description</h5>

            <p>{profile?.description}</p>
          </section>
        )}
        {profile?.links && (
          <div className="border rounded-sm flex flex-col px-4 py-3 gap-3">
            <span className="text-normal text-black-normal font-semibold">
              Links
            </span>
            <div className="flex gap-4">
              {profile.links.map((link: any, index: number) => (
                <Link
                  href={link.url}
                  target="_blank"
                  className="flex items-center justify-center rounded-full bg-black-100 text-black-300 h-8.25 w-8.25 p-2 hover:text-black"
                  key={index}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
