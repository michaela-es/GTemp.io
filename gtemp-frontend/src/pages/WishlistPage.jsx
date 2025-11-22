import React from "react";
import HeaderBar from "../components/HeaderBar";
import WishListContainer from "../components/WishlistContainer";
const WishlistPage = () => {
  return (
    <>
      <HeaderBar />
      <div className="wishlist-page-container" style={{ padding: "2rem" }}>
        <h1>Your Wishlist</h1>
        <WishListContainer />
      </div>
    </>
  );
};

export default WishlistPage;
