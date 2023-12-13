export const productCategories = ["Wardrobe", "Music", "Event"];

export const productSubCategories = {
  Wardrobe: ["Head Wear", "Tops", "Pants", "Full	Body"],
  Music: ["Single", "Album"],
  Event: ["Concert", "Confrence"],
};

export const productVariationTypes = {
  Wardrobe: [
    {
      type: "color",
      placeholder: "Eg. Red, Blue, Green",
    },
    {
      type: "size",
      placeholder: "Eg. S, M, L, XL",
    },
  ],
  Music: ["mp3 128kbps", "mp3 320kbps"],
  Event: ["VIP", "Regular"],
};

export const productInputDefaults = {
  category: "",
  sub_category: "",
  product_name: "",
  price: 0,
  product_variations: {},
  product_description: "",
  image_urls: [],
  is_published: false,
  is_product_varied: false,
};
