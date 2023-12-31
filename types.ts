export interface Book {
  id: number;
  owner: null | string; // owner can be either null or a string
  title: string;
  writer: string;
  cover_image: string;
  price: number;
  tags: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
}
