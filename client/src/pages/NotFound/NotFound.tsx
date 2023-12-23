import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
        <span>😣</span>
        <br />
        404
      </h1>
      <p>К сожалению данная страница отсутствует</p>
    </div>
  );
};
