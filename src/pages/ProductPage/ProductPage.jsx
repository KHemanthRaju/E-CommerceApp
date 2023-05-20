import { useState } from "react";
import { toast } from "react-hot-toast";

const notifyCart = () => toast.success("Added to Cart");
const notifyWishlist = () => toast.success("Added to Wishlist");

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
};
