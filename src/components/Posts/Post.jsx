/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Button, Image } from "../index.js";
import { useNavigate } from "react-router-dom";
import databaseServices from "../../services/db.services.js";
import storageServices from "../../services/storage.services.js";

export default function Post({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const isAuthor = post.userId === userData.$id;

  async function deletePost() {
    try {
      await storageServices.deleteImage(post.featuredImage);
      await databaseServices.deletePost(post.$id);

      navigate("/all-posts");
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div>
      <h2 className="text-center text-[#00000080] text-4xl sm:text-5xl font-semibold my-4 sm:my-6">
        {post.title}
      </h2>
      <div className="align-middle">
        <Image
          imageId={post.featuredImage}
          altText={post.title}
          className="max-w-[90%] sm:max-w-[60%] max-h-[60vh] m-auto rounded-xl"
        />
      </div>
      <div className="mt-4 w-[90%] m-auto text-black">
        <p className="my-6 sm:text-lg text-justify">{post.content}</p>
        {isAuthor && (
          <div className="text-center">
            <Button
              onClick={() => navigate(`/edit-post/${post.$id}`)}
              className="mx-8 w-24 sm:w-32 py-2 sm:py-3 rounded-lg my-4 font-semibold text-lg"
            >
              Edit
            </Button>
            <Button
              onClick={async () => deletePost()}
              className="mx-8 w-24 sm:w-32 py-2 sm:py-3 rounded-lg my-4 font-semibold text-lg"
              bgColor="bg-red-500"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
