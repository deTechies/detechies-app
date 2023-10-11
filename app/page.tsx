import Onboarding from "./onboard/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to the career launchpad,
        </h1>
        <p className="text-2xl text-center">
          We help you launch your career towards your most ideal profile. 
          We help you build your digital identity, according to your personal preferences.
          Share what you like to share, discover by the people you want to be connected with.
        </p>
        <section>
        <Onboarding />
      </section>
      </div>
    
    </main>
  )
}
