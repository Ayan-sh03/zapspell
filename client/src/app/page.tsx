import { CheckIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { source_code } from "./font";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className={`flex flex-col min-h-[100dvh] ${source_code.className}`}>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <PencilIcon className="h-6 w-6 text-primary" />
          <span className="ml-1 text-lg dark:text-white text-zinc-100">
            ZapSpell
          </span>
        </Link>
        <nav className="ml-auto  items-center flex gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={true}
          >
            Profile
          </Link>

          <Button>
            <Link
              href="/login"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground scroll-smooth"
              prefetch={false}
            >
              Login
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex flex-col flex-grow">
        <section className="flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 min-h-[calc(100vh-3.5rem)]">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Master the Art of Spelling
              </h1>
              <p className="text-lg text-primary-foreground/80 md:text-xl lg:text-2xl">
                Unlock your full potential with our engaging spelling practice
                tool. Improve your vocabulary and become a spelling champion.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link
                  href="/test"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Start Practicing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-background scroll-smooth"
          id="about"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Unlock Your Spelling Potential
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our spelling practice tool is designed to help you improve
                  your vocabulary and become a confident speller. With
                  personalized feedback, and progress tracking, you&apos;ll see
                  results in no time.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium">Gamified Experience</h3>
                    <p className="text-muted-foreground">
                      Earn points, badges, and compete with friends to make
                      learning fun.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium">Progress Tracking</h3>
                    <p className="text-muted-foreground">
                      Monitor your improvement and celebrate your achievements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
