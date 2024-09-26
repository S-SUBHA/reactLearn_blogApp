/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import databaseServices from "../../services/db.services";
import storageServices from "../../services/storage.services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Button,
  Image,
  Input,
  LoadingPage,
  Logo,
  RTE,
  Select,
} from "../index.js";
import {
  addActivePost,
  updateActivePost,
  addUserPost,
  updateUserPost,
} from "../../store/features/posts.slice.js";

// TODO: make sure the input 'title' is atmost 36 chars long and the 'content' is 1000 chars long
export default function PostForm({ post }) {
  const [imageUploadError, setImageUploadError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || "active",
      },
    });

  const dispatch = useDispatch();

  async function handlePostForm(data) {
    // console.log(data);
    // return;

    setLoading(true);

    if (post) {
      const newImage = data.image[0]
        ? await storageServices.uploadImage(data.image[0])
        : null;

      if (!newImage && data.image[0]) {
        setImageUploadError(
          new Error(
            "Something went wrong while uploading the image! Please try again!"
          )
        );
        console.log(imageUploadError.message);
        // setLoading(false);
        // return;
      }

      if (newImage) await storageServices.deleteImage(post.featuredImage);

      const updatedPost = await databaseServices.updatePost(post.$id, {
        ...data,
        featuredImage: newImage?.$id || post.featuredImage,
      });

      dispatch(updateUserPost({ postId: updatedPost.$id, post: updatedPost }));
      if (updatedPost.status === "active" || post.status === "active")
        dispatch(
          updateActivePost({ postId: updatedPost.$id, post: updatedPost })
        );

      setLoading(false);
      if (updatedPost) navigate(`/posts/${updatedPost.$id}`);
    } else {
      if (data.slug.length > 36) {
        setInputError(new Error("Title should be within 36 characters!"));
        return;
      }

      const duplicatePost = await databaseServices.getPost(data.slug);

      if (duplicatePost) {
        console.log(duplicatePost);

        setInputError(new Error("Post with same title already exists!"));
        setLoading(false);
        return;
      }

      const newImage = data.image[0]
        ? await storageServices.uploadImage(data.image[0])
        : null;

      if (!newImage) {
        setImageUploadError(
          new Error(
            "Something went wrong while uploading the image! Please try again!"
          )
        );
        console.log(imageUploadError.message);
        setLoading(false);
        return;
      }

      const newPost = await databaseServices.createPost({
        slug: data.slug,
        title: data.title,
        content: data.content,
        featuredImage: newImage?.$id || null,
        status: data.status,
        userId: userData.$id,
      });

      dispatch(addUserPost(newPost));
      newPost.status === "active" && dispatch(addActivePost(newPost));

      setLoading(false);
      if (newPost) navigate("/");
    }
  }

  const slugify = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]/g, "-");
    // .replace(/^[\s]/g, '-');
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugify(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugify, setValue]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div>
      <div className="text-center">
        <Logo />
        <h2 className="mt-2 mb-6 font-semibold">{`${
          post ? `Update` : `Create`
        } Your Post Here`}</h2>
      </div>
      {inputError && (
        <p className="text-red-600 text-center font-semibold py-2">
          {inputError.message}
        </p>
      )}
      <form onSubmit={handleSubmit(handlePostForm)} className="text-center">
        <Select
          options={["active", "inactive"]}
          label="Status: "
          {...register("status", {
            required: true,
          })}
          className="p-2 m-2 ml-4 rounded-lg text-[#000] bg-[#ffffff90]"
        />

        <Input
          // label="Title:"
          type="text"
          placeholder="Title"
          className="px-4 py-2 my-2 w-[100%] sm:w-[80%] rounded-xl bg-[#ffffff90]"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          // label="Slug:"
          type="text"
          hidden={post}
          disabled
          placeholder="Slug"
          className="px-4 py-2 my-2 w-[100%] sm:w-[80%] rounded-xl"
          {...register("slug", {
            required: true,
          })}
        />

        <RTE
          name="content"
          // label="Content"
          control={control}
          defaultvalue={getValues("content")}
          className="px-4 py-4 my-2 w-[100%] sm:w-[80%] h-[30vh] text-black resize-none rounded-xl bg-[#ffffff90]"
        />

        <Input
          // label="Featured Image:"
          type="file"
          accept="image/jpg image/png image/jpeg image/gif"
          className="my-2 bg-[#ffffff90] rounded-xl py-2 px-2 w-[60%]"
          {...register("image", {
            required: !post,
          })}
        />

        {post && (
          <div>
            <Image
              imageId={post.featuredImage}
              altText={post.title}
              className="max-w-[90%] sm:max-w-[60%] max-h-[60vh] m-auto rounded-xl"
            />
          </div>
        )}

        <Button type="submit" className="my-2 py-2 px-6 rounded-lg">{`${
          post ? `Update` : `Create`
        } Post`}</Button>
      </form>
    </div>
  );
}
