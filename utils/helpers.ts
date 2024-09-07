import { supabase } from "@/config/supabase";
import { Image } from "expo-image";
import { Asset } from 'expo-asset';

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


export function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
