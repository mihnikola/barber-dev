import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { LABEL_VALUES } from "@/constants";
import { useNavigation } from "expo-router";
import axios from "axios";
import { IconSymbol } from "@/components/ui/IconSymbol";

const register = ({change}) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);

  // Strong password regex pattern
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle email change
  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim().toLowerCase();

    setEmail(trimmedEmail);

    // Validate email format
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigation = useNavigation();

  const handleSubmit = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
          name: userName,
          email,
          password,
        })
        .then((result) => {
          if (result.status === 200) {
            showToast("User created successfully!");
            setTimeout(() => {
              navigation.navigate("components/login/index");
            }, 1000);
          }
        })
        .catch((errorx) => {
          showToast("then & catch error: ", errorx);
        });
    } catch (e) {
      showToast(" try/catch error ", e);

    }
  };
  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  // Handle password change
  const handlePasswordChange = (text) => {
    const trimmedPass = text.trim();

    setPassword(trimmedPass);

    // Validate password strength
    setTimeout(() => {
      if (!strongPasswordRegex.test(trimmedPass)) {
        setPasswordError(
          "At least 8 characters long, one uppercase letter, one number, and one special character."
        );
      } else {
        setPasswordError("");
      }
    }, 2000);
  };
  // Handle password change
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);

    // Validate password strength
    setTimeout(() => {
      if (!strongPasswordRegex.test(text)) {
        setPasswordConfirmError(
          "At least 8 characters long, one uppercase letter, one number, and one special character."
        );
      } else {
        setPasswordConfirmError("");
      }
    }, 2000);
  };

  const togglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  return (
    <ScrollView style={styles.form}>
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.logoImageImg}
      />
      <View>
        <Text style={styles.title}>Registruj se</Text>
      </View>
      <View style={styles.formContent}>
        <TextInput
          placeholder="Unesi ime i prezime "
          value={userName}
          onChangeText={setUserName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Unesi email "
          value={email}
          onChangeText={handleEmailChange}
          style={styles.textInput}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible} // If false, the password is visible
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
          >
            <IconSymbol
              name={isPasswordVisible ? "visible" : "not.visible"}
              size={25}
              color="gray"
            />
          </TouchableOpacity>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            secureTextEntry={!isPasswordConfirmVisible} // If false, the password is visible
          />
          <TouchableOpacity
            onPress={togglePasswordConfirmVisibility}
            style={styles.iconContainer}
          >
            <IconSymbol
              name={isPasswordConfirmVisible ? "visible" : "not.visible"}
              size={25}
              color="gray"
            />
          </TouchableOpacity>
          {passwordConfirmError ? (
            <Text style={styles.errorText}>{passwordConfirmError}</Text>
          ) : null}
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{LABEL_VALUES.REGISTER}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Imate nalog? Klikni {" "}
            <TouchableOpacity
              onPress={change}
              style={{ marginTop: 7 }}
            >
              <Text style={styles.linkText}>ovde.</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default register;

const styles = StyleSheet.create({
  errorText: {
    color: "green",
    fontSize: 12,
    marginBottom: 10,
  },
  formContent: {
    display: "flex",
    gap: 5,
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    position: "absolute",
    right: 10, // Aligns the icon to the right of the TextInput
    top: 10, // Centers the icon vertically inside the input
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  button: {
    margin: 10,
    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    // marginBottom: 20,
    // marginTop: 5,
    marginVertical: 10,
    textAlign: "center",
  },
  logoImageImg: {
    height: 220,
    width: 250,
    margin: "auto",
    marginTop: 40,
  },
  textInput: {
    margin: "auto",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    color: "black",
  },
  container: {
    marginTop: 10,
    flexDirection: "column", // This is similar to flex-col in Tailwind
    justifyContent: "space-between",
    gap: 10, // React Native doesn't have a gap utility like Tailwind, but you can achieve spacing using margin or padding
  },
  textContainer: {
    alignItems: "center", // For centering the text on smaller screens
    flexDirection: "row", // Flex row for larger screens (equivalent to md:flex-row in Tailwind)
    justifyContent: "space-between",
    alignSelf:'center'
  },
  text: {
    color: "#6B7280", // Equivalent to text-neutral-500
    textAlign: "center", // Default alignment for smaller screens
  },
  linkText: {
    textAlign: "center", // Default alignment for smaller screens
    color: "white",
    textDecorationLine: "underline",
    cursor: "pointer", // While this doesn't do exactly the same thing as cursor:pointer in web, it works for touch events in React Native
  },
});
