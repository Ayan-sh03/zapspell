import {  PencilIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <>
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
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={true}
          >
            Profile
          </Link>

          <Button>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground scroll-smooth"
              prefetch={false}
            >
              Login
            </Link>
          </Button>
        </nav>
      </header>
    </>
  )
}

export default Navbar
