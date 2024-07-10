import AppleSignButton from '@/components/auth/AppleSignButton'
import Banner from '@/components/auth/Banner'
import RegistrationForm from '@/components/auth/RegistrationForm'
import SwitchForm from '@/components/auth/SwitchForm'
import { StyleSheet, View } from 'react-native'

const RegistrationScreen = () => {
    return (
        <View style={styles.container}>
            <Banner
                source={require('../../assets/images/auth/login-banner.jpg')}
                height={200}
            />
            <RegistrationForm />
            <AppleSignButton isLogin={false} />
            <SwitchForm isLogin={false} />
        </View>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        height: 200,
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderBottomStartRadius: 250,
        borderBottomEndRadius: 250,
        overflow: 'hidden',
    },
    imageChildContainer: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
})