/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import storageServices from "../../services/storage.services";

function Image({ imageId, altText, className = "" }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    storageServices
      .getImagePreview(imageId)
      .then((imageURL) => setImageURL(imageURL))
      .catch((error) => console.log(error));
  }, [imageId]);

  return <img src={imageURL} alt={altText} className={`${className}`} />;
}

export default Image;
