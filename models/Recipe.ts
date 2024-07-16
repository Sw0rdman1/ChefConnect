import User from "./User";

export default interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  steps: string[];
  image: string;
  prepareTime: number;
  createdBy: User;
  created_at: string;
}
