import Link from "next/link";
import Input from "../../components/Input";

const index = () => {
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
        Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
        gentrify.
      </p> */}
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="block p-2 w-full h-52 text-sm text-blue-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-gray-800 border-0 py-2 px-8 focus:outline-none hover:bg-gray-900 rounded text-lg">
                  Send
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-indigo-500">mrzahidfaiz@gmail.com</a>
                <p className="leading-normal my-5">
                  7 Redex St.
                  <br />
                  Saint Cloud, MN 56301
                </p>
                <span className="inline-flex">
                  <Link
                    href="https://www.facebook.com/mrzahidfaizlive"
                    target="_blank"
                    className="text-gray-500"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-7 h-7 hover:border"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.twitter.com/mrzahidfaizlive"
                    target="_blank"
                    className="ml-4 text-gray-500"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-7 h-7 hover:border"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/mrzahidfaiz/"
                    target="_blank"
                    className="ml-4 text-gray-500"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-7 h-7 hover:border"
                      viewBox="0 0 24 24"
                    >
                      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/mrzahidfaiz/"
                    target="_blank"
                    className="ml-4 text-gray-500"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-7 h-7 hover:border"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
