export default interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  steps: string[];
  image: string;
  prepareTime: number;
  created_by: string; // User ID
  created_at: string;
}
