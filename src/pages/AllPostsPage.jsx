import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllPostPage() {
  const posts = useSelector((state) => state.posts.activePosts);
  
  return (
    <Container>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        style={{ gridAutoRows: "30vh" }}
      >
        {posts.length > 0 ? (
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
