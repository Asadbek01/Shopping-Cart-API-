import Products from "./products.js";
import Review from "./reviews.js";


Products.hasMany(Review, { onDelete: "CASCADE"  });
Review.belongsTo(Products,  { onDelete: "CASCADE"  });

export {Products, Review }