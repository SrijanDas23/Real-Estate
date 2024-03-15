import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";

const Navbar = () => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <nav>
      <div
        className={` ${flexBetween} fixed top-0 z-40 w-full py-5 bg-gray-200`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`flex w-full md:gap-16 xs:gap-3 smd:${flexBetween}`}>
            {/* icon*/}
            <Link to="/">
              <h1 className="font-bold text-xl flex">
                <span className="text-slate-500">Srijan</span>
                <span className="text-slate-700">Estate</span>
              </h1>
            </Link>

            {/* left side */}

            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <ul className={`${flexBetween} gap-8 text-sm`}>
                  <Link to="/">
                    <li className="hover:underline">Home</li>
                  </Link>
                  <Link to="/about">
                    <li className="hover:underline">About</li>
                  </Link>
                </ul>

                {/* search bar in the middle */}

                <form className="relative ml-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 bg-transparent rounded-lg border-2 border-black pr-8 focus:outline-none sm:w-96 md:w-96 lg:w-[600px]"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
                  </div>
                </form>

                {/* right side */}

                <ul className={`${flexBetween} gap-8`}>
                  <Link to="/sign-in">
                    <li className="hover:underline">Sign In</li>
                  </Link>
                  <Link to="/profile">
                    <li className="hover:underline">profile</li>
                  </Link>
                </ul>
              </div>
            ) : (
              <button
                className="rounded-full p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-black" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed bottom-0 right-0 z-40 h-full w-[300px] bg-gray-200 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <ul className="ml-[15%] flex flex-col gap-10 text-2xl">
            {/* search bar */}
            <form className="relative ml-[-10rem]">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 bg-transparent rounded-lg border-2 border-black pr-8 focus:outline-none w-[255px] ml-[153px]"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
              </div>
            </form>

            {/* link tags */}

            <Link to="/">
              <li className="hover:underline">home</li>
            </Link>
            <Link to="/about">
              <li className="hover:underline">about</li>
            </Link>
            <Link to="/sign-in">
              <li className="hover:underline">Sign In</li>
            </Link>
            <Link to="/profile">
              <li className="hover:underline">profile</li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
