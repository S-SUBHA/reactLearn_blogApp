import { useEffect, useState } from "react";
import { Post } from "../components/index.js";
import databaseServices from "../services/db.services.js";
import { useParams } from "react-router-dom";

function PostPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  // console.log(typeof postId);

  useEffect(() => {
    databaseServices
      .getPost(postId)
      .then((post) => setPost(post))
      .catch((error) => console.log(error));
  }, [setPost, postId]);

  return <div>{post && <Post post={post} />}</div>;
}

export default PostPage;
