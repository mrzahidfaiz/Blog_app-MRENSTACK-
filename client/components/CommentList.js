import React from "react";
import Comment from "./Comment";

const CommentList = ({comments}) => {
  return (
    <>
     <div className="antialiased mx-auto max-w-screen border-t mt-12 pt-12 pb-12 px-4 lg:px-0">
    <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-xl ml-4 ">no Comment Found</div>
      ) : (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}
      </div>
      </div>
    </>
  );
};

export default CommentList;
