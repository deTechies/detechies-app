import ListProfiles from "./list-profiles";

export default function ProfilePage() {
  return (
    <main className="m-8">

        <section className="flex gap-md flex-start justify-center md:flex-row flex-col">
          <ListProfiles />
        </section>
    </main>
  );
}
