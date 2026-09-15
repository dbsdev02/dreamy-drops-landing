export const product = {
  brand: "Lumelle",
  name: "Moonmist",
  price: "₹XXX",
  size: "XX ml",
  description: "Alcohol-free, naturally inspired fragrance made for kids.",
  ageRecommendation: "Update with the recommended age range on the final product label.",
  cta: "SHOP THE MAGIC",
  ingredients: [
    { name: "Plant-inspired notes", detail: "Replace with the verified fragrance note story." },
    { name: "Naturally derived ingredients", detail: "Update with verified formulation information." },
    { name: "Alcohol-free formulation", detail: "Made without alcohol for a kid-focused fragrance experience." },
  ],
  benefits: [
    { title: "Alcohol-Free", text: "A fragrance experience without alcohol." },
    { title: "Naturally Inspired", text: "Thoughtfully selected fragrance ingredients inspired by nature." },
    { title: "Gentle Everyday Fragrance", text: "Created for light, everyday fragrance moments." },
    { title: "Simple & Special", text: "One beautiful fragrance without overwhelming choices." },
  ],
  testimonials: [
    { quote: "My daughter absolutely loves using it before going out.", name: "Parent review placeholder" },
    { quote: "Such a fun little part of our getting-ready routine.", name: "Parent review placeholder" },
    { quote: "The fragrance is playful without feeling overpowering.", name: "Parent review placeholder" },
  ],
  guidance: [
    { title: "How to use", text: "Apply according to the final directions on the product label." },
    { title: "Recommended age", text: "Add the verified age recommendation from the product label." },
    { title: "Patch testing", text: "Follow label guidance and patch test when recommended." },
    { title: "Storage", text: "Add the final storage instructions shown on the product packaging." },
    { title: "Support", text: "Add the brand’s verified customer support details here." },
    { title: "Ingredient clarity", text: "Publish the complete verified ingredient list before launch." },
  ],
  faqs: [
    { q: "Is the perfume alcohol-free?", a: "Yes. This product is positioned as an alcohol-free fragrance. Confirm the wording against the final formulation and label before launch." },
    { q: "Is it suitable for children?", a: "It is made specifically for kids. Add the exact recommended age range shown on the final product label here." },
    { q: "What ingredients are used?", a: "Add the complete, verified ingredient list from the final product packaging here." },
    { q: "How should it be applied?", a: "Follow the directions on the final product label. Replace this text with those exact directions before launch." },
    { q: "Can it be used every day?", a: "Daily-use guidance should follow the final formulation and product label instructions." },
    { q: "What if my child has sensitive skin?", a: "Check the full ingredient list, follow any patch-test guidance on the label, and consult a qualified professional if you have concerns." },
    { q: "How long does the fragrance last?", a: "Add a duration based on verified product testing." },
    { q: "What is your return policy?", a: "Add the business’s final return and refund policy here before launch." },
  ],
  shipping: "Shipping, inventory, cart, and payment connections are placeholders until checkout is configured.",
} as const;

export type Product = typeof product;