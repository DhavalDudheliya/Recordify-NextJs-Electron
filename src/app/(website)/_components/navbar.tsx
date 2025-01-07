import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const LandingPageNavBar = (props: Props) => {
  return (
    <nav className="flex w-full justify-between items-center py-4 px-6">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <MenuIcon className="cursor-pointer" />
        <Link href="/">
          <div className="flex items-center gap-x-2">
            <Image alt="logo" src="/logo.png" width={40} height={40} />
            Recordify
          </div>
        </Link>
      </div>
      <div className="hidden gap-x-10 items-center lg:flex">
        <Link href="/">
          <div className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80">Home</div>
        </Link>
        <Link href="/pricing">
          <div className="text-lg font-medium hover:text-[#7320DD]">Pricing</div>
        </Link>
        <Link href="/contact">
          <div className="text-lg font-medium hover:text-[#7320DD]">Contact</div>
        </Link>
      </div>
      <Link href="/auth/sign-in">
        <div>
          <Button className="text-base flex gap-x-2">
            <User fill="#000" />
            Login
          </Button>
        </div>
      </Link>
    </nav>
  );
};

export default LandingPageNavBar;
