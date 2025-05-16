const { default: mongoose } = require("mongoose");
const Wishlist = require("../models/wishlist.model");

//add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const { productId, title, price, images } = req.body;

    if (!productId && !title && !price && images) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [{ productId, title, price, images }],
      });
    }

    const itemExists = wishlist.products.some(
      (item) => item.productId === productId
    );
    if (itemExists) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    wishlist.products.push({ productId, title, price, images });

    await wishlist.save();

    res.status(201).json({ message: "Item added to wishlist", wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const itemIndex = wishlist.products.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in wishlist", itemIndex });
    }

    wishlist.products.splice(itemIndex, 1);
    await wishlist.save();

    res.status(200).json({ message: "Item removed from wishlist", wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//get wishlist

exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      res.status(404).json({ error: "No wishlist found." });
    }

    res.status(200).json(wishlist.products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist." });
  }
};
