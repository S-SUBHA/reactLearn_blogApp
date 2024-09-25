import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import databaseServices from "../services/db.services.js";
import { Container, PostForm } from "../components/index.js";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    databaseServices
      .getPost(postId)
      .then((post) => setPost(post))
      .catch((error) => console.log(error));
  }, [postId]);

  return (
    <div>
      <Container>{post && <PostForm post={post} />}</Container>
    </div>
  );
}

export default EditPostPage;
