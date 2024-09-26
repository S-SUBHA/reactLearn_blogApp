/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Image } from "../index.js";

function PostCard({ $id, title, featuredImage, active = true }) {
  return (
    <div className={`${active ? `bg-[#ffffff20]` : `bg-[#ff000040]`} rounded-xl shadow-postCardShadow`}>
      <Link to={`/posts/${$id}`} >
        <div className="w-full h-full p-3 flex flex-col justify-between">
          <Image
            imageId={featuredImage}
            altText={title}
            className="rounded-xl h-5/6 object-cover"
          />

        <h2 className="text-center text-black text-lg font-semibold"> {title} </h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
