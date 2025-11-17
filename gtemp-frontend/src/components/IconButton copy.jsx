const IconButton = ({ imgSrc, name, onClick, className }) => {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <img src={imgSrc} alt={name} />
    </button>
  );
};
export default IconButton;