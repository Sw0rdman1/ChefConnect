import User from "./User";

export default interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  steps: string[];
  bannerImage: string;
  prepareTime: number;
  calories: number;
  isSaved: boolean;
  createdBy: User;
  created_at: string;
}
