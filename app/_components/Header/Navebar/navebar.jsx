import { ModeToggle } from "@/app/Elements/mode-toggle";
import Link from "next/link";

export default function Navebar() {
  return (
    <nav className="flex z-50 lg:px-20 md:px-12 sm:px-8 px-1 py-5 items-center justify-between  fixed top-0 left-0 max-w-[100vw] w-full p-4 bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-30 shadow-md">
      <h2 className=" text-2xl font-bold text-pretty bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        <Link href="/">Blog Horizon</Link>
      </h2>
      <ul className="flex sm:gap-x-7 gap-x-3 mr-0 sm:mr-[100px]">
        <li>
          <Link
            href="/"
            className="font-medium text-xl hover:text-[#bc52c8] w-fit transition ease-in-out duration-100"
          >
            Home
          </Link>
        </li>
        <li className="">
          <Link
            href="/Pages/AllPosts"
            className="font-medium text-xl hover:text-[#bc52c8] w-fit transition ease-in-out duration-100"
          >
            Blogs
          </Link>
        </li>
      </ul>
      <ModeToggle />
    </nav>
  );
}
