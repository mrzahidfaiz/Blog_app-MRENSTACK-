import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import { getById, update } from "../../../api/internalApi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const index = () => {
  const router = useRouter();
  const { blogid } = router.query;

  const authorId = useSelector((state) => state.user._id);

  console.log(authorId)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    (async function getByIdApiCall() {
      const response = await getById(blogid);
      if (response.status === 200) {
        setTitle(response.data.blog.title);
        setDescription(response.data.blog.description);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photoPath);
      }
    })();
  }, []);

  // console.log(photo);
  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const updateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        title,
        description,
        content,
        author: authorId,
        blogId: blogid,
      };
    } else {
      data = {
        title,
        description,
        content,
        photo,
        author: authorId,
        blogId: blogid,
      };
    }

    const response = await update(data);
    if (response.status === 200) {
      alert(response.data.message);
      router.push("/blogs");
    }
    if (response.code === "ERR_BAD_REQUEST") {
      alert(response.response.statusText);
      alert("User must be login first");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl">Submit Blog</h1>
      <div className="flex flex-col gap-4 content-center mt-16">
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            id="message"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          />
        </div>
        {photo != "" ? (
          <img src={photo} alt={title} className="w-[150px] h-[150px]" />
        ) : (
          ""
        )}
        <div className="flex items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 bg-slate-50  border-dashed rounded-lg cursor-pointer  hover:bg-gray-100 dark:border-gray-600 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={photoHandler}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
        </div>

        <div>
          <button
            onClick={updateHandler}
            className="block w-full bg-gray-600 hover:bg-gray-800 p-4 rounded text-white transition duration-300"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
