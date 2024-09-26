import { Container, PostCard } from "../components/index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const posts = useSelector((state) => state.posts.activePosts.slice(0, 10));

  return (
    <Container>
      <div
        className="grid grid-cols-1 sm:grid-cols-simpleTwoColumn gap-12"
        style={{ gridAutoRows: "60vh" }}
      >
        {posts.length ? (
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
            <Link to="/create-post" className="text-amber-200">
              Add one...
            </Link>
          </h1>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
