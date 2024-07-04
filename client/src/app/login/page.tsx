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

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <form className="mx-auto w-full max-w-sm space-y-2 h-screen flex items-center">
        <Card className={`${source_code.className} `}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button formAction={login} type="submit" className="mx-auto">
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
