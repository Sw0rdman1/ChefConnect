import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { uploadImage } from '@/services/ImageService';
import { Image } from 'expo-image';

interface ImagePickerProps {
    imageUrl: string;
    setImageUrl: (url: string) => void;
}

const DEFAULT_AVATAR = require('../../assets/images/main/default-avatar.jpeg')

const ImageUpload: React.FC<ImagePickerProps> = ({ imageUrl, setImageUrl }) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const { tint, background } = useColors();
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
        if (!imageUrl) {
            return (
                <Image source={DEFAULT_AVATAR} style={styles.image} />
            )
        }


        if (imagePreview && loading) {
            return (
                <>
                    <Image blurRadius={50} source={{ uri: imagePreview.uri }} style={styles.uploadingImage} />
                    <ActivityIndicator style={styles.spinner} size="large" color={tint} />

                </>
            )
        }

        return (
            <Image source={imageUrl} style={styles.image} />
        )

    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: `${background}` }]} onPress={pickImage}>
            {renderImage()}
        </TouchableOpacity>
    );
}

export default ImageUpload;

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'rgba(153, 157, 160, 0.15)',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: 100,
    },
    noPhotoContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    uploadingImage: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: 100
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
