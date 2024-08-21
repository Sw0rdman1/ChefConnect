import { StyleSheet } from "react-native";
import { View } from "@/components/ui/Themed";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import { supabase } from "@/config/supabase";
import { Formik } from "formik";
import { editProfileValidation } from "@/utils/validations";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import RecipeImageUpload from "./RecipeImageUpload";
import RecipeInfoInputs from "./RecipeInfoInputs";

const initialValues = {
    title: "",
    description: "",
    category: "",
    ingredients: "",
    steps: "",
    bannerImage: "",
    createdAt: new Date().toISOString(),
    prepareTime: 0,
};

const NewRecipeForm = () => {
    const { showToast } = useToast();

    const onSubmitHandler = async (values: typeof initialValues) => {
        const { } = values;
        try {
            const updates = {

            };

            const { error } = await supabase
                .from("users")
                .update(updates)

            if (error) {
                console.log(error);
                throw error;
            } else {
                showToast({
                    text: "Profile updated successfully",
                    severity: "success",
                });
                router.back();
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast({
                    text: error.message,
                    severity: "error",
                });
            }
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={editProfileValidation}
            onSubmit={(values) => {
                onSubmitHandler(values);
            }}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
            }) => (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <RecipeImageUpload
                            imageUrl={values.bannerImage as string}
                            setImageUrl={handleChange("profilePicture")}
                        />
                        <RecipeInfoInputs values={values} handleChange={handleChange} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            disabled={Object.keys(errors).length > 0}
                            onPress={handleSubmit}
                            text={"Edit Profile"}
                        />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default NewRecipeForm;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 30,
        gap: 25,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 30,
        gap: 25,
    },
    buttonContainer: {
        width: "60%",
        marginTop: 10,
        marginHorizontal: 20,
    },
});
