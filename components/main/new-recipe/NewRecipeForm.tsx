import { StyleSheet } from "react-native";
import { ScrollView, View } from "@/components/ui/Themed";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import { supabase } from "@/config/supabase";
import { Formik } from "formik";
import { editProfileValidation, newRecipeValidation } from "@/utils/validations";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import RecipeImageUpload from "./RecipeImageUpload";
import RecipeInfoInputs from "./RecipeInfoInputs";
import NewRecipeCategorySelect from "./NewRecipeCategorySelect";
import SelectIngredients from "./SelectIngredients";
import InstructionInput from "./InstructionInput";
import { camelToSnake } from "@/utils/caseConverter";

const initialValues = {
    title: "",
    description: "",
    calories: "",
    prepareTime: "",
    category: "",
    ingredients: [] as string[],
    instructions: [""] as string[],
    bannerImage: "",
    createdAt: new Date().toISOString(),
};

const NewRecipeForm = () => {
    const { showToast } = useToast();
    const { user } = useApp();

    const onSubmitHandler = async (values: typeof initialValues) => {
        try {
            const { ingredients, ...restValues } = values;


            const newRecipe = {
                ...camelToSnake(restValues),
                instructions: values.instructions.filter((instruction) => instruction.trim() !== ""),
                created_by: user?.id,
            }

            const { data, error } = await supabase.from("recipes").insert([newRecipe]);

            if (error) {
                console.log(error);
                throw error;
            } else {
                showToast({
                    text: "Recipe created successfully",
                    severity: "success",
                });
                router.push("/(main)");
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
            validationSchema={newRecipeValidation}
            onSubmit={(values) => {
                onSubmitHandler(values);
            }}
        >
            {({ handleChange, setFieldValue, handleSubmit, values, errors }) => (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <RecipeImageUpload
                            imageUrl={values.bannerImage as string}
                            handleChange={setFieldValue}
                        />
                        <RecipeInfoInputs values={values} handleChange={handleChange} />
                    </View>
                    <NewRecipeCategorySelect values={values} handleChange={handleChange} />
                    <SelectIngredients values={values} setFieldValue={setFieldValue} />
                    <InstructionInput values={values} handleChange={setFieldValue} />
                    <View style={styles.buttonContainer}>
                        <Button
                            disabled={Object.keys(errors).length > 0}
                            onPress={handleSubmit}
                            text={"Create Recipe"}
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
        flex: 1,
        width: "100%",
        paddingHorizontal: 10,
        paddingBottom: 10,
        gap: 25,
        alignItems: "center",
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        paddingTop: 30,
        gap: 15,
    },
    buttonContainer: {
        width: "60%",
        marginTop: 10,
        marginHorizontal: 20,
        position: "absolute",
        bottom: 30,
    },
});
