import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <>
      <button
        className={css.loadMoreBtn}
        onClick={onLoadMore}
        style={{ margin: "20px auto", display: "block" }}
      >
        Load more...
      </button>
    </>
  );
};

export default LoadMoreBtn;
