import { useEffect, useState } from "react";
import databaseServices from "../services/db.services.js";
import { Container, LoadingPage, PostCard } from "../components";
import { Link } from "react-router-dom";

export default function AllPostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseServices
      .getPosts()
      .then((posts) => setPosts(posts.documents))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setPosts, setLoading]);

  return (
    <Container>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        style={{ gridAutoRows: "30vh" }}
      >
        {loading ? (
          <LoadingPage />
        ) : posts.length ? (
          posts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
            />
          ))
        ) : (
          <h1 className="text-center">
            No posts to show as of now... <br />
            <Link to="/create-post" className="text-blue-500">
              Add one...
            </Link>
          </h1>
        )}
      </div>
    </Container>
  );
}
