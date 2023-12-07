export const productCategories = ["Luku", "Music", "Event"];

export const productSubCategories = {
  Luku: ["Head Wear", "Tops", "Pants"],
  Music: ["Single", "Album"],
  Event: ["Concert", "Confrence"],
};

export const productVariationTypes = {
  Luku: [
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
  owner: "",
  is_product_varied: false,
};
