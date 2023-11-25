import Search from "@/components/extra/search";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileFilter() {
  return (
    <Card className="w-full md:max-w-sm">
        <CardHeader>
        <h3 className="text-2xl font-semibold">Profiles</h3>
        </CardHeader>
        <CardContent>
            <Search placeholder="Search by name" />
        </CardContent>
    </Card>
  )
}
