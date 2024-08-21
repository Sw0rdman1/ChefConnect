import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { uploadImage } from '@/services/ImageService';
import { Image } from 'expo-image';
import { View } from '@/components/ui/Themed';

const DEFAULT_RECIPE_IMAGE = require('../../../assets/images/main/gallery.png')
const BORDER_RADIUS = 15;
export const IMAGE_SIZE = 155;

interface ImagePickerProps {
    imageUrl: string;
    setImageUrl: (url: string) => void;
}


const RecipeImageUpload: React.FC<ImagePickerProps> = ({ imageUrl, setImageUrl }) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const { tint, background, backgroundDarker } = useColors();
    const { user } = useApp();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setLoading(true);
            setImagePreview(result.assets[0]);
            const imageUrl = await uploadImage(result.assets[0], user?.id ?? "", "avatars");
            setImageUrl(imageUrl);
            setLoading(false);
        }
    };

    const renderImage = () => {
        if (!imagePreview) {
            if (imageUrl) {
                return (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                )
            }
            return (
                <View style={[styles.noPhotoContainer, { backgroundColor: backgroundDarker }]}>
                    <Image source={DEFAULT_RECIPE_IMAGE} contentFit='contain' style={styles.noImage} />
                </View>
            )
        }

        if (imagePreview && loading) {
            return (
                <View style={styles.uploadingImage}>
                    <Image source={imagePreview.uri} style={styles.uploadingImage} />
                    <ActivityIndicator style={styles.spinner} size="large" color={tint} />
                </View>
            )
        }

        return (
            <Image source={imagePreview} style={styles.image} />
        )

    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: `${background}` }]} onPress={pickImage}>
            {renderImage()}
        </TouchableOpacity>
    );
}

export default RecipeImageUpload;

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
        width: IMAGE_SIZE,
        borderRadius: BORDER_RADIUS,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
    },
    noImage: {
        width: "70%",
        height: "70%",
        flex: 1,
        borderRadius: BORDER_RADIUS,
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: BORDER_RADIUS,
    },
    noPhotoContainer: {
        borderRadius: BORDER_RADIUS,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    uploadingImage: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
    },
    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
