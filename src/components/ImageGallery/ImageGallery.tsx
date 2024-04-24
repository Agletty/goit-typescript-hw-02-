import css from "./ImageGallery.module.css";
import { Image } from "../../App.types";
import ImageCard from "../ImageCard/ImageCard";

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: any) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.galleryList}>
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <li className={css.galleryItem} key={index}>
            <ImageCard image={image} openModal={openModal} />
          </li>
        ))
      ) : (
        <p>No images available</p>
      )}
    </ul>
  );
};

export default ImageGallery;
