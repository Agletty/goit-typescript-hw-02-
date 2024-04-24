import { useState, useEffect } from "react";
import Modal from "react-modal";


import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import fetchPhotos from "./components/servises/api";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { Image } from "./App.types";
import { ApiResponse } from "./App.types";

Modal.setAppElement("#root");

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        let data: ApiResponse = await fetchPhotos(query, page);

        setImages((prevImages) => {
          if (query) {
            return page === 1 ? data.results : [...prevImages, ...data.results];
          } else {
            const dataArray = Array.isArray(data) ? data : [data]; // перетворення в масив, якщо data не є масивом
            return [...prevImages, ...dataArray];
          }
        });

        setTotalPages(data.total_pages);

        setShowBtn(data.total_pages !== null && data.total_pages !== page);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />

      {isError && <ErrorMessage />}

      {!images || images.length === 0 ? (
        <p>No images available</p>
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isLoading && <Loader />}

      {showBtn && totalPages !== null && (
        <LoadMoreBtn
          onLoadMore={handleNextPage}
          disabled={page === totalPages}
        />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
