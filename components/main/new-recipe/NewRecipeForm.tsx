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

const noUserInitialValues = {
    email: "",
    bio: "",
    displayName: "",
    id: "",
    profilePicture: "",
    updated_at: new Date(),
};

const NewRecipeForm = () => {
    const { user, fetchUser } = useApp();
    const { showToast } = useToast();
    const initialValues = user ? { ...user } : noUserInitialValues;

    const onSubmitHandler = async (values: typeof initialValues) => {
        const { email, displayName, id, profilePicture, bio } = values;
        try {
            const updates = {
                id,
                display_name: displayName,
                profile_picture: profilePicture,
                email,
                bio,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from("users")
                .update(updates)
                .eq("id", id);

            if (error) {
                console.log(error);
                throw error;
            } else {
                await fetchUser();
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
                    <RecipeImageUpload
                        imageUrl={values.profilePicture as string}
                        setImageUrl={handleChange("profilePicture")}
                    />
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
        alignItems: "center",
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
