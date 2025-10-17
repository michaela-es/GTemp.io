import React from "react";
import ListingItem from "./ListingItem.jsx";
import sampleImage from "../../imgs/placeholder.png";
function Listings() {
  const gameListings = [
    {
      id: 1,
      image: sampleImage,
      title: "Epic Quest",
      description: "An epic RPG adventure awaits you.",
      rating: "4.7",
      downloads: "1.5M",
    },
    {
      id: 2,
      image: sampleImage,
      title: "Space Shooter",
      description: "Fast-paced action in space.",
      rating: "4.3",
      downloads: "900K",
    },
    {
      id: 3,
      image: sampleImage,
      title: "Mystery Manor",
      description: "Uncover the secrets of the manor.",
      rating: "4.9",
      downloads: "2.1M",
    },
  ];

  return (
    <div className="listings-container">
      {gameListings.map((game) => (
        <ListingItem
          key={game.id}
          image={game.image}
          title={game.title}
          description={game.description}
          rating={game.rating}
          downloads={game.downloads}
        />
      ))}
    </div>
  );
}

export default Listings;
