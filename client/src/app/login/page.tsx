import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { source_code } from "../font";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="container min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <Card className={`${source_code.className} w-full max-w-sm`}>
          <form action={login}>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Welcome Back</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <div className="text-center flex gap-4 flex-row items-center">
                <span className="text-sm text-gray-200">
                  Don&apos;t have an account?{" "}
                </span>
                <Link href="/register">
                  <Button variant="link" className="text-sm p-0">
                    Register
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
