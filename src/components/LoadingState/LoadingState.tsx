import "./LoadingState.scss";

interface Props {
  text: string;
}

export const LoadingState = ({ text }: Props) => {
  return (
    <div className="loadingState__container">
      <div className="spinner"></div>
      <p className="text">{text}</p>
    </div>
  );
};
