const IconButton = ({ imgSrc, name, onClick, className }) => {
  return (
    <button
      className={`icon-button ${className || ""}`}
      onClick={onClick}
      title={name} 
      type="button" 
    >
      <img src={imgSrc} alt={name} />
      <span>{name}</span>
    </button>
  );
};

export default IconButton;
