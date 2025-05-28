import "./LoadingState.scss";

export const LoadingState = () => {
  return (
    <div className="loadingState__container">
      <div className="spinner"></div>
      <p className="text">Loading movies...</p>
    </div>
  );
};
