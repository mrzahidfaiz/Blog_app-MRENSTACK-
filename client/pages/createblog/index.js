import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import { create } from "../api/internalApi";
import { useSelector } from "react-redux";

const index = () => {
  const authorId = useSelector((state) => state.user._id);

  console.log(authorId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  console.log(photo);
  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const submitHandler = async () => {
    const data = {
      title,
      content,
      photo,
      author: authorId,
    };
    const response = await create(data);
    if (response.status === 201) {
      console.log(response);
    }
    if (response.code === "ERR_BAD_REQUEST") {
      alert(response.response.statusText);
      alert("User must be login first");
    }
  };

  return (
    <div className="p-12">
      <div className="flex flex-col gap-4 content-center mt-16">
        <div>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            onClick={submitHandler}
            className="block w-full bg-gray-600 hover:bg-gray-800 p-4 rounded text-white transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
