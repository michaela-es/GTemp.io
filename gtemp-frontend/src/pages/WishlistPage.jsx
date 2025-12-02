import React from "react";
import Header from "../components/display/Header";
import WishListContainer from "../components/WishlistContainer";
const WishlistPage = () => {
  return (
    <>
      <Header />
      <div className="wishlist-page-container" style={{ padding: "2rem" }}>
        <h1>Your Wishlist</h1>
        <WishListContainer />
      </div>
    </>
  );
};

export default WishlistPage;
