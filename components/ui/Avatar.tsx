import { useColors } from '@/hooks/useColors';
import { Image } from 'expo-image'
import { router } from 'expo-router';
import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';

interface AvatarProps {
    source?: string;
    size: number;
    href?: string;
}

const DEFAULT_AVATAR = require('../../assets/images/main/default-avatar.jpeg')

const Avatar: React.FC<AvatarProps> = forwardRef(({ source, size, href }, ref) => {
    const { text } = useColors()

    const onPress = () => {
        if (href) {
            router.push(href)
        }
    }

    if (!source) {
        source = DEFAULT_AVATAR
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6} style={{
                borderRadius: 100,
                shadowColor: text,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 1.84,
                elevation: 5,
            }}>
            <Image source={source} style={{ width: size, height: size, borderRadius: size / 2 }} />
        </TouchableOpacity >
    )
})

export default Avatar
