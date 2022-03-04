export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  brand: string;
  released: string;
}

export interface ProductCart extends Product {
  quantity: number;
}
