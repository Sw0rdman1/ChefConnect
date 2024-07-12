import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { ImagePickerAsset } from "expo-image-picker";
import { supabase } from "@/config/supabase";

export const uploadImage = async (image: ImagePickerAsset, userID: string, collection: string): Promise<string> => {
    try {
        const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
        const filePath = `${userID}/${new Date().getTime()}.${image.type === 'image' ? 'png' : 'mp4'}`;
        const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';

        const { data: uploadedImage, error } = await supabase.storage
            .from(collection)
            .upload(filePath, decode(base64), { contentType });

        if (error) {
            console.log(error);

        }

        const { data: imageURL } = supabase
            .storage.from(collection).getPublicUrl(uploadedImage?.path as string)


        return imageURL.publicUrl as string;

    } catch (error) {
        console.error('Error uploading image:', (error as Error).message);
        return '';
    }
}


