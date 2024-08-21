import { useColors } from '@/hooks/useColors';
import { Image } from 'expo-image';
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface RecipeInfoInputsProps {
    values: {
        title: string;
        description: string;
        calories: string;
    };
    handleChange: any;
}

const RecipeInfoInputs: React.FC<RecipeInfoInputsProps> = ({ values, handleChange }) => {
    const { backgroundDarker } = useColors();

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { backgroundColor: backgroundDarker }]}
                placeholder="Title"
                onChangeText={handleChange("title")}
                value={values.title}
                placeholderTextColor={"gray"}
            />
            <View style={styles.bottomInputs}>
                <View style={[styles.inputWithIconContainer, { backgroundColor: backgroundDarker }]}>
                    <Image
                        source={require("../../../assets/images/main/fire.png")}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="kcal"
                        onChangeText={handleChange("calories")}
                        value={values.calories}
                        placeholderTextColor={"gray"}
                    />
                </View>
                <View style={[styles.inputWithIconContainer, { backgroundColor: backgroundDarker }]}>
                    <Image
                        source={require("../../../assets/images/main/fire.png")}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="min"
                        onChangeText={handleChange("calories")}
                        value={values.calories}
                        placeholderTextColor={"gray"}
                    />
                </View>
            </View>

        </View>
    )
}

export default RecipeInfoInputs

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginVertical: 20,
        gap: 15,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: "bold"
    },
    bottomInputs: {
        flexDirection: "row",
        gap: 15,
    },
    inputWithIconContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        gap: 5,
        flex: 1,
    },
    inputWithIcon: {
        fontSize: 14,
        fontWeight: "bold",
    },
    icon: {
        width: 20,
        height: 20,
    },
})