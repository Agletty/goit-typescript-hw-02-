import css from "./ImageCard.module.css";
import { Image } from "../../App.types";

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const { urls, alt_description } = image;

  return (
    <div className={css.imageContainer}>
      <img
        className={css.image}
        src={urls.small}
        alt={alt_description}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
