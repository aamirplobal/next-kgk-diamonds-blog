import React from "react";

const Post = ({ params }: { params: { id: string } }) => {
  return <div>Id: {params.id}</div>;
};

export default Post;
