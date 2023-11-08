export interface IProduct {
    id: string
    imageUrl: string;
    title: string;
    price: number;
    rating: number;
    sizes: number[];
    category: number[];
}

  export interface FormProps {
    title: string;
    handleClickAuth: (email: string, pass: string) => void;
  }

  export type ICartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    count: number;
  };