export type TService = {
  name: string;
  description: string;
  price: number;
  image: string;
  duration: number; // in minutes
  isDeleted: boolean; // false means it is not deleted
};
