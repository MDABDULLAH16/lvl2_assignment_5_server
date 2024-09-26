export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  isDeleted: boolean; // false means it is not deleted
};
