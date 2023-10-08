import Onboarding from "./onboard/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to Wagmi
        </h1>
        <p className="text-2xl text-center">
          A social network for DAOs
        </p>
        <section>
        <Onboarding />
      </section>
      </div>
    
    </main>
  )
}
