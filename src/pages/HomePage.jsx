import { useEffect, useState } from "react";
import { Container, LoadingPage, PostCard } from "../components/index.js";
import databaseServices from "../services/db.services.js";
import { Link } from "react-router-dom";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseServices
      .getPosts()
      .then((posts) => setPosts(posts.documents.slice(0, 10)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setPosts]);

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-simpleTwoColumn gap-12" style={{gridAutoRows: "60vh"}}>
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

export default HomePage;
