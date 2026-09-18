export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  models: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  image: string;
  gallery: string[];
  popularity: number;
  colors: ProductColor[];
  features: string[];
  compatibility: string;
  delivery: string;
  warranty: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export interface Review {
  id: string;
  name: string;
  model: string;
  rating: number;
  text: string;
  avatarSeed: number;
  photos: string[];
}
