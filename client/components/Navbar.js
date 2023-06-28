import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const isAuth = false;

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bg-blue-400 shadow sticky top-0 ">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-2xl font-bold text-gray-800">Blogs</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200 text-center">
                <Link href="/">Home</Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-center">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-center">
                <Link href="/createBlog">Create a Blog</Link>
              </li>
              <li className="text-white hover:text-indigo-200 text-center">
                <Link href="/contact">Contact US</Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              {isAuth ? (
                <>
                <Link
                  href=""
                  className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  SignOut
                </Link>
                <div className="w-full text-center text-white">copyright &copy; 2023</div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Sign up
                  </Link>
                 <div className="w-full text-center text-white">copyright &copy; 2023</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          {isAuth ? (
            <Link
              href=""
              className="px-4 py-2 text-center text-white bg-gray-600  hover:bg-gray-800 transition duration-300 rounded-md shadow "
            >
              SignOut
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-center text-white bg-gray-600  hover:bg-gray-800 transition duration-300 rounded-md shadow "
              >
                Sign in
              </Link>
              <a
                href="/signup"
                className="px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 transition duration-300 "
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
