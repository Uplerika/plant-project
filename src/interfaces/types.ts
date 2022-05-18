export interface IProduct {
    id: string
    imageUrl: string;
    title: string;
    sizes: number[];
    price: number;
}

export interface ButtonCartProps {
    children?: React.ReactNode;
    onClick?: () => void;
    onSubmit?: () => void;
    type: "button" | "submit" | "reset" | undefined;
    className: string;
    outline?: boolean;
  }

  export interface FormProps {
    title: string;
    handleClickAuth: (email: string, pass: string) => void;
  }