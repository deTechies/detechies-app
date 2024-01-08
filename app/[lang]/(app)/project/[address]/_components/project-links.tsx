import UploadWorks from "@/components/modal/upload-works";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import Links from "./links";

export default async function ProjectLinks({ details }: { details: Project }) {

  const dummy_links = [
    "https://www.naver.com",
    "https://www.daum.net",
  ]

  return (
    <Card className="px-6 pt-6 pb-7 gap-7">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-subhead_s">
          작업물
          {/* Links */}
        </h3>
        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && <UploadWorks />}
      </CardHeader>

      <CardContent>
        {/* urls */}

        {dummy_links ? (
          <Links links={dummy_links} />
        ) : (
          <p className="text-center text-label_m text-text-secondary">
            등록된 작업물이 없어요.
          </p>
        )}
        {/* {details.urls ? (
          <Links links={details.urls} />
        ) : (
          <p className="text-center text-label_m text-text-secondary">
            등록된 작업물이 없어요.
          </p>
        )} */}
      </CardContent>
    </Card>
  );
}
