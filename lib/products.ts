export interface Product {
  id: number
  name: string
  price: number
  category: "Hair Products" | "Lip Care"
  description: string
  size?: string
  rating?: number
  image: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hydrating & Moisturizing Leave-In Conditioner",
    price: 3000,
    category: "Hair Products",
    description: "Hydrates, detangles, softens without weighing down.",
    size: "250ml",
    rating: 4.6,
    image: "/images/1.jpg",
  },
  {
    id: 2,
    name: "Hair Growth Oil (Small)",
    price: 2500,
    category: "Hair Products",
    description: "Promotes hair growth, repairs breakage, nourishes scalp.",
    size: "50ml",
    rating: 4.6,
    image: "/images/2.jpg",
  },
  {
    id: 3,
    name: "Hair Butter (Big)",
    price: 6000,
    category: "Hair Products",
    description: "Locks in moisture, reduces breakage, adds shine.",
    size: "250g",
    rating: 4.8,
    image: "/images/3.jpg",
  },
  {
    id: 4,
    name: "Edges Regrown Cream",
    price: 4000,
    category: "Hair Products",
    description: "Promotes hair growth along hairline and edges.",
    size: "50g",
    rating: 4.4,
    image: "/images/4.jpg",
  },
  {
    id: 5,
    name: "Full Hair Kit (Big)",
    price: 30000,
    category: "Hair Products",
    description: "Complete hair care routine; comes with free gift.",
    rating: 5.0,
    image: "/images/5.jpg",
  },
  {
    id: 6,
    name: "Hair Growth Oil (Big)",
    price: 5000,
    category: "Hair Products",
    description: "Promotes hair growth, repairs breakage, nourishes scalp.",
    size: "250ml",
    rating: 4.7,
    image: "/images/6.jpg",
  },
  {
    id: 7,
    name: "Lip Moisturizer",
    price: 1000,
    category: "Lip Care",
    description: "Daily hydration for dry/chapped lips.",
    rating: 4.5,
    image: "/images/7.jpg",
  },
  {
    id: 8,
    name: "Lip Scrub",
    price: 1500,
    category: "Lip Care",
    description:
      "Gently exfoliates dead skin cells to reveal softer, smoother lips while improving balm and gloss absorption.",
    image: "/images/8.jpg",
  },
  {
    id: 9,
    name: "Hair Butter (Small)",
    price: 3000,
    category: "Hair Products",
    description: "Locks in moisture, reduces breakage, adds shine.",
    size: "100g",
    rating: 4.4,
    image: "/images/9.jpg",
  },
  {
    id: 10,
    name: "Anti-Dandruff Oil",
    price: 4000,
    category: "Hair Products",
    description: "Eliminates dandruff, soothes itch, strengthens roots.",
    size: "100ml",
    rating: 4.7,
    image: "/images/10.jpg",
  },
  {
    id: 11,
    name: "Mini Lip Kit",
    price: 3700,
    category: "Lip Care",
    description:
      "Everything you need for healthy, plump, glowing lips. Without lip gloss, lip gloss brush and lip mask.",
    image: "/images/11.jpg",
  },
  {
    id: 12,
    name: "Full Lip Kit (Girls)",
    price: 8000,
    category: "Lip Care",
    description:
      "Everything you need for healthy, plump, glowing lips. Comes with lip brush, lip mask and lip gloss.",
    image: "/images/11.jpg",
  },
  {
    id: 13,
    name: "Pink Lips Balm",
    price: 1500,
    category: "Lip Care",
    description: "Adds natural pink tint, heals dry lips.",
    rating: 4.8,
    image: "/images/12.jpg",
  },
  {
    id: 14,
    name: "Herbal Shampoo",
    price: 4000,
    category: "Hair Products",
    description:
      "Cleanses deeply, promotes growth, reduces dandruff, restores shine.",
    size: "250ml",
    rating: 4.5,
    image: "/images/13.jpg",
  },
  {
    id: 15,
    name: "Edges Revive Combo (Big)",
    price: 9000,
    category: "Hair Products",
    description: "Faster hairline growth, fuller hair.",
    rating: 4.8,
    image: "/images/14.jpg",
  },
  {
    id: 16,
    name: "Anti-Dandruff Combo",
    price: 8000,
    category: "Hair Products",
    description: "Eliminates dandruff and dryness; strengthens roots.",
    rating: 4.5,
    image: "/images/15.jpg",
  },
  {
    id: 17,
    name: "Wash Day Combo",
    price: 10000,
    category: "Hair Products",
    description: "Removes buildup, boosts moisture, strengthens roots.",
    rating: 4.9,
    image: "/images/16.jpg",
  },
  {
    id: 18,
    name: "Edges Revive Combo (Small)",
    price: 6500,
    category: "Hair Products",
    description: "Promotes hairline growth & strengthens hair.",
    rating: 4.7,
    image: "/images/17.jpg",
  },
  {
    id: 19,
    name: "Full Hair Kit (Small)",
    price: 25000,
    category: "Hair Products",
    description: "Complete routine; comes with free gift.",
    rating: 4.9,
    image: "/images/18.jpg",
  },
  {
    id: 20,
    name: "Maintenance Kit",
    price: 20000,
    category: "Hair Products",
    description: "Maintain moisture, reduce breakage, clean scalp.",
    rating: 4.6,
    image: "/images/19.jpg",
  },
  {
    id: 21,
    name: "Flirt Mode Gloss",
    price: 3000,
    category: "Lip Care",
    description: "Hydrates lips, gives a luscious pink tint.",
    rating: 4.8,
    image: "/images/20.jpg",
  },
  {
    id: 22,
    name: "Brown Sugar Gloss",
    price: 3000,
    category: "Lip Care",
    description: "Sultry brown tone complementing all skins.",
    rating: 4.6,
    image: "/images/21.jpg",
  },
  {
    id: 23,
    name: "Replenishing Deep-In Conditioner",
    price: 3000,
    category: "Hair Products", // <- corrected: was "Lip Care" previously
    description: "Restores moisture, repairs damage, strengthens strands.",
    size: "250ml",
    rating: 4.6,
    image: "/images/22.jpg",
  },
  {
    id: 24,
    name: "Fruity Lip Scrub",
    price: 1500,
    category: "Lip Care",
    description:
      "Gently exfoliates dead skin cells to reveal softer, smoother lips while improving balm and gloss absorption.",
    image: "/images/23.jpg",
  },
  {
    id: 25,
    name: "Full Lip Kit (Boys)",
    price: 5000,
    category: "Lip Care",
    description:
      "Everything you need for healthy, plump, glowing lips. Comes with lip scrub and lip mask without lip gloss.",
    image: "/images/24.jpg",
  },
  {
    id: 26,
    name: "Crystal Clear Gloss",
    price: 3000,
    category: "Lip Care",
    description: "Lightweight, glassy, hydrating.",
    rating: 4.7,
    image: "/images/25.jpg",
  },
  {
    id: 27,
    name: "Gloss Combo",
    price: 9000,
    category: "Lip Care",
    description: "Comes with free lip liner.",
    rating: 4.9,
    image: "/images/26.jpg",
  },
]

export const products = PRODUCTS
// 
// 
// 
// 
// 
































































