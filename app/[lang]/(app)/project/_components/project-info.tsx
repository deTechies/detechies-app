import UploadWorks from "@/components/modal/upload-works";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import Links from "../[address]/links";

export default async function ProjectInfo({ info }: { info: Project }) {

  return (
    <Card className="min-w-[300px] pt-7 px-8 pb-8 gap-7">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-subhead_s">Links</h3>
        {(info.userRole === "member" || info.userRole === "admin") && (
          <UploadWorks />
        )}
      </CardHeader>
      <CardContent>
        {/* urls */}
        {info.urls ? (
          <Links links={info.urls} />
        ) : (
          <p className="text-label_m text-text-secondary text-center">작업 산출물 제출하기</p>
        )}
      </CardContent>
    </Card>
  );
}
