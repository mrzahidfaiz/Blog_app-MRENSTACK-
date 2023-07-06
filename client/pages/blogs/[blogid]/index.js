import React, { useEffect, useState } from "react";
import { getById, deleteById, createComment, getCommentById } from "../../api/internalApi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import CommentList from "@/components/CommentList";

const index = () => {
  const router = useRouter();
  const { blogid } = router.query;

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]); // display
  const [blogOwner, setBlogOwner] = useState(false); //
  const [comment, setComment] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getBlogDetailsApiCall() {
      const blogResponse = await getById(blogid);
      if (blogResponse.status === 200) {
        setBlogOwner(username === blogResponse.data.blog.authorUsername);
        setBlog(blogResponse.data.blog);
      } 
      const commentResponse = await getCommentById(blogid);
      if(commentResponse.status === 200) {
        setComments(commentResponse.data.comments);
      }
    };

    getBlogDetailsApiCall();
  }, [reload]);

  const deleteBlogHandler = async () => {
    const response = await deleteById(blogid);
    if (response.status === 200) {
      alert(response.data.message);
      router.push("/blogs");
    } else if (response.code === "ERR_BAD_REQUEST") {
      alert(response.response.data.message);
    }
  };

  const CommentHandler = async () => {
    const data = {
      content: comment,
      blog: blogid,
      author: userId
    }
    const response = await createComment(data);
    if(response.status === 201){
      setComment('');
      setReload(!reload);
      alert(response.data.message);
    } else if(response.code === 'ERR_BAD_REQUEST'){
      console.log(response.response.data.mesage);
    }
  }
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
                  {blog.category}
                </a>
              </div>
              <img
                src={blog.photo}
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
                      src={blog.photo}
                      className="h-10 w-10 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {blog.authorName}
                      </p>
                      <p className="font-semibold text-gray-600 text-xs">
                        {blog.authorUsername}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-gray-700 py-3">XYZ</p> */}
                  <button className="px-2 py-1 text-gray-100 bg-gray-700 flex w-full items-center justify-center rounded">
                    Follow
                    <i className="bx bx-user-plus ml-2" />
                  </button>
                  {blogOwner && (
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
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Comments */}
          <div>
            <CommentList comments={comments} />
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Post Comments
              </h3>
            </div>
            <div className="flex flex-row">
              <Input 
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder= "Post Comments..."
              />
              <button onClick={CommentHandler} className="ml-6 px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-700">
                Post
              </button>
            </div>
          </div>

          {/* footer */}
          <Footer />
        </div>
      </>
    </>
  );
};

export default index;
