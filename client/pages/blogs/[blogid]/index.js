import React, { useEffect, useState } from "react";
import { getById, deleteById } from "../../api/internalApi";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { blogid } = router.query;

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    (async function getByIdApiCall() {
      const response = await getById(blogid);
      if (response.status === 200) {
        // console.log(response);
        setBlog(response.data.blog);
      } else if (response.code === "ERR_BAD_REQUEST") {
        console.log(response.response.errormessage);
      }
    })();
  });

  const deleteBlogHandler = async () => {
    const response = await deleteById(blogid);
    if (response.status === 200) {
      alert(response.data.message);
      router.push('/blogs')
    } else if (response.code === "ERR_BAD_REQUEST") {
      console.log(response.response.errormessage);
    }
  };

  // console.log(blog);
  return (
    <>
      <>
        <div className="max-w-screen-lg mx-auto">
          <main className="mt-10">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
              <div className="px-4 lg:px-0">
                <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                  {blog.title}
                </h2>
                <a
                  href=""
                  className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                >
                  {blog._id}
                </a>
              </div>
              <img
                src={blog.photoPath}
                className="w-full object-cover lg:rounded"
                style={{ height: "28em" }}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                <p className="pb-6">{blog.content}</p>
              </div>
              <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                <div className="p-4 border-t border-b md:border md:rounded">
                  <div className="flex py-2">
                    <img
                      src={blog.photoPath}
                      className="h-10 w-10 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {blog.authorname}
                      </p>
                      <p className="font-semibold text-gray-600 text-xs">
                        {blog.authorusername}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-gray-700 py-3">XYZ</p> */}
                  <button className="px-2 py-1 text-gray-100 bg-gray-700 flex w-full items-center justify-center rounded">
                    Follow
                    <i className="bx bx-user-plus ml-2" />
                  </button>
                  <div className="flex gap-2 p-2">
                    <button
                      onClick={() => router.push(`/blogs/update/${blog._id}`)}
                      className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded"
                    >
                      Edit
                      <i className="bx bx-user-plus ml-2" />
                    </button>
                    <button
                      onClick={deleteBlogHandler}
                      className="px-2 py-1 text-gray-100 bg-red-700 flex w-full items-center justify-center rounded"
                    >
                      Delete
                      <i className="bx bx-user-plus ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* main ends here */}
          {/* footer */}
          <footer className="border-t mt-12 pt-12 pb-32 px-4 lg:px-0">
            <div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                className="h-12 w-12"
                alt="logo"
              />
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-2/5">
                <p className="text-gray-600 hidden lg:block mt-4 p-0 lg:pr-12">
                  Boisterous he on understood attachment as entreaties ye
                  devonshire. In mile an form snug were been sell. Extremely ham
                  any his departure for contained curiosity defective. Way now
                  instrument had eat diminution melancholy expression sentiments
                  stimulated.
                </p>
              </div>
              <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
                <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
                <ul>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Team
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      About us
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Press
                    </a>{" "}
                  </li>
                </ul>
              </div>
              <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
                <h6 className="font-semibold text-gray-700 mb-4">Content</h6>
                <ul>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Blog
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Privacy Policy
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Terms &amp; Conditions
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Documentation
                    </a>{" "}
                  </li>
                </ul>
              </div>
              <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
                <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
                <ul>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Team
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      About us
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="" className="block text-gray-600 py-2">
                      Press
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </>
    </>
  );
};

export default index;
