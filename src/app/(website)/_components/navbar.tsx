import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const LandingPageNavBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <MenuIcon />
        <Image alt="logo" src="/logo.png" width={40} height={40} />
        Recordify
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button className="text-base flex gap-x-2">
          <User fill="#000"/>
          Login
        </Button>
      </Link>
    </div>
  );
};

export default LandingPageNavBar;
