import { Formik } from "formik";
import { Text, View } from "../ui/Themed";
import { PasswordInput } from "./AuthInputs";
import { calculateStatus } from "@/utils/helpers";
import { StyleSheet } from "react-native";
import Button from "../ui/Button";
import { registrationValidationSecondStep } from "@/utils/validations";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const SecondStepRegistration = ({ firstStepData }: { firstStepData: any }) => {
  const { signUpWithEmail } = useAuth();

  const onSubmitHandler = async (values: typeof initialValues) => {
    const { email, displayName } = firstStepData;
    const { password } = values;
    const error = await signUpWithEmail(email, password, displayName);

    if (error) {
      //handle Error
    } else {
      router.push("/success");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSecondStep}
      onSubmit={(values) => {
        onSubmitHandler(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Almost there!</Text>
            <Text style={styles.subtitle}>
              Now we need a password to secure your account. Pick a strong one!
            </Text>
          </View>
          <PasswordInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            error={errors.password}
            status={calculateStatus(
              errors.password,
              touched.password,
              values.password
            )}
          />
          <PasswordInput
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            error={errors.confirmPassword}
            status={calculateStatus(
              errors.confirmPassword,
              touched.confirmPassword,
              values.confirmPassword
            )}
            placeholder="Confirm Password"
          />

          <View style={styles.buttonContainer}>
            <Button
              disabled={
                Object.keys(errors).length > 0 ||
                Object.keys(touched).length === 0
              }
              onPress={handleSubmit}
              text={"Create Account"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SecondStepRegistration;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    gap: 25,
  },
  textContainer: {
    gap: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "gray",
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
