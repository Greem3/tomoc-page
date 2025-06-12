"use client";

import locale from "@/data/root.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "./NavBar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { useState } from "react";
import TosmocLogo from "../TosmocLogo";

const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-18 px-6 md:px-10 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <Link href="/" aria-label="home page" className="flex items-center group">
            <div className="w-[100px] h-[75px] relative flex justify-center transition-transform duration-300 group-hover:scale-105">
              <TosmocLogo
                variant='dark'
                imageHeight={48}
                imageWidth={48}
              />
            </div>
          </Link>
          <span className="text-text-primary font-semibold text-lg hidden sm:inline ml-2 transition-colors duration-300 group-hover:text-primary">
            
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavBar />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center justify-end min-w-[200px] gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
              onClick={() => handleNavigation(locale.NAVBAR.LINK_REGISTER)}
            >
              {locale.NAVBAR.REGISTER_BUTTON}
            </Button>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white font-medium shadow-sm hover:shadow transition-all duration-300"
              onClick={() => handleNavigation(locale.NAVBAR.LINK_LOGIN)}
            >
              {locale.NAVBAR.LOGIN_BUTTON}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition-all duration-300"
            onClick={() => setIsMobile(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNav isOpen={isMobile} onClose={() => setIsMobile(false)} />}
    </header>
  );
};

export default Header;