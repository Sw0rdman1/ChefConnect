import { supabase } from "@/config/supabase";

export const calculateStatus = (
  error: string | undefined,
  touched: boolean | undefined,
  value: string
) => {
  if (!value || !touched) return "empty";
  if (touched && error) return "error";
  return "success";
};

export const getPublicURL = (bucketName: string, path: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
};
