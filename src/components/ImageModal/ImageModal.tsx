import Modal from "react-modal";

import { FC } from "react"; // FC - Functional Component
import { Image } from "../../App.types";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
}
const ImageModal: FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {image && <img src={image.urls.regular} alt={image.alt_description} />}
      {!image && <p>No image provided</p>}
      <button onClick={onRequestClose}>Close Modal</button>
    </Modal>
  );
};

export default ImageModal;
