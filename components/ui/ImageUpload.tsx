import { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useColors } from '@/hooks/useColors';
import { useApp } from '@/context/AppContext';
import { uploadImage } from '@/services/ImageService';

interface ImagePickerProps {
    imageUrl: string;
    setImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<ImagePickerProps> = ({ imageUrl, setImageUrl }) => {
    const [loading, setLoading] = useState(false);
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
            const imageUrl = await uploadImage(result.assets[0], user?.id ?? "", "avatars");
            setImageUrl(imageUrl);
            setLoading(false);
        }
    };

    const renderImage = () => {
        if (!imageUrl) {
            return (
                <View style={styles.noPhotoContainer}>
                    <Ionicons name="images" size={32} color={"white"} />
                    <Text style={[styles.buttonText, { color: "white" }]}>Gallery</Text>
                </View>
            )
        }


        if (imageUrl && loading) {
            return (
                <>
                    <Image blurRadius={50} source={{ uri: imageUrl }} style={styles.uploadingImage} />
                    <ActivityIndicator style={styles.spinner} size="large" color={tint} />

                </>
            )
        }

        return (
            <Image source={{ uri: imageUrl }} style={styles.image} />
        )

    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: `${background}10` }]} onPress={pickImage}>
            {renderImage()}
        </TouchableOpacity>
    );
}

export default ImageUpload;

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        backgroundColor: 'rgba(153, 157, 160, 0.15)',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: 20,
    },
    noPhotoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    uploadingImage: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: 20,
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
