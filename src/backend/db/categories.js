import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Tshirt",
    description:
      " Dark Chocolate type of chocolate has a higher percentage of cocoasolids and very little or no added milk content, resulting in a rich, slightly bitter flavor.",
  },
  {
    _id: uuid(),
    categoryName: "Toys",
    description:
      "While technically not a chocolate because it contains no cocoa solids, white chocolate is made with cocoa butter, sugar, and milk solids, giving it a sweet, creamy taste.",
  },
  {
    _id: uuid(),
    categoryName: "Accessories",
    description:
      "Ruby Chocolate is a relatively new type of chocolate that is made from ruby cocoa beans and has a naturally pink color and fruity slightly tart flavor.",
  },
];
