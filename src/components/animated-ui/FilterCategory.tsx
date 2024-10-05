"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";

const categories = [
  {
    name: "Law firm",
    href: "/directory?customer=Law%20firms",
    img: "/lawfirmicon.svg",
    description: "Expert legal services team",
  },
  
  {
    name: "Enterprise",
    href: "/directory?customer=Enterprises",
    img: "/enterpriceicon.svg",
    description: "Corporate legal powerhouses",
  },
 {
   name: "Individual Practitioner",
   href: "/directory?customer=Individual%20Practitioner",
   img: "/prac.svg",
   description: "Independent legal experts and chambers",
 },
  {
    name: "Startup",
    href: "/directory?customer=Startups",
    img: "/startupicon.svg",
    description: "Young-age entities",
  },
  {
    name: "Government  Department",
    href: "/directory?customer=Government%20departments",
    img: "/govdepticon.svg",
    description: "Public sector legal teams",
  },
  {
    name: "Judiciary",
    href: "/directory?customer=Judiciary",
    img: "/judge1.svg",
    description: "Courtroom justice servers",
  },
  {
    name: "In-House Counsel",
    href: "/directory?customer=In-House%20Counsels",
    img: "/lawyers.svg",
    description: "Legal experts navigating companies",
  },

];

function FilterCategory() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex rounded-full gap-3 px-6 bg-white hover:bg-white hover:border-primary1">
              <Image
                src={"/filtericon.svg"}
                width={20}
                height={20}
                alt="icon"
              ></Image>
              <span>What describes you?</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col gap-3 px-2 md:p-6 bg-white w-full md:w-[400px] rounded-lg shadow-md ">
                {categories.map((category, idx) => (
                  
                  <li key={idx}>
                    <a href={category.href}>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-[#e1e7ffc3] px-3 py-4 rounded-lg">
                      <Image
                        src={category.img}
                        width={28}
                        height={28}
                        alt="icon"
                      />
                      <div className=" inline-flex justify-between w-full items-center">
                        <div className="inline-block">
                          <div className="font-bold text-xs text-[#0c1830]">
                            {category.name}
                          </div>
                          <div className="text-[#575c66] text-xs font-medium">
                            {category.description}
                          </div>
                        </div>
                        <MdArrowForward className="text-[#0c1830] text-lg" />
                      </div>
                    </div>
                    </a>
                  </li>
                 
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default FilterCategory;
