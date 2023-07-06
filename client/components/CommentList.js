import React from "react";
import Comment from "./Comment";

const CommentList = ({comments}) => {
  return (
    <>
      {comments.length === 0 ? (
        <div>no Comment</div>
      ) : (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}
    </>
  );
};

export default CommentList;
