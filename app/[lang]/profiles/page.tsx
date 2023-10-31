import ListProfiles from "./list-profiles";
import ProfileFilter from "./profile-filter";

export default function ProfilePage() {
  return (
    <main className="flex md:flex-row flex-col gap-4 m-8 items-start">
        <ProfileFilter />
        <section className="flex gap-md flex-start justify-center md:flex-row flex-col">
          <ListProfiles />
        </section>
    </main>
  );
}