import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { saveStorage } from "@/helpers";
import { IconSymbol } from "@/components/ui/IconSymbol";

const LoginScreen = ({ change }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert(
  //       "Obaveštenje!",
  //       "Da li stvarno želite da izadjete iz aplikacije?",
  //       [
  //         {
  //           text: "Otkaži",
  //           onPress: () => null,
  //           style: "cancel",
  //         },
  //         { text: "Ok", onPress: () => BackHandler.exitApp() },
  //       ]
  //     );
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);
  // React.useLayoutEffect(() => {
  //   // Set custom back button behavior
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.navigate("(tabs)", { screen: "employers" });
  //         }}
  //       >
  //         <Ionicons name="arrow-back-outline" size={32} color="white" />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);

      const x = {
        email,
        password,
      };
      console.log("object", x);
      try {
        await axios
          .post(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, {
            email,
            password,
          })
          .then((res) => {
            console.log("object", res.data);
            saveStorage(res.data.token);
            setIsLoading(false);
            navigation.navigate("(tabs)", { screen: "index" });

            showToast("Login Successfull!");
          })
          .catch((error) => {
            console.log("errorerrorerror", error);
            setIsLoading(false);
          });
      } catch (e) {
        setIsLoading(false);
        console.log("error", e);
      }
    } else {
      showToast("Please enter both email and password");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

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
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

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

  return (
    <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Prijavi se</Text>
      <TextInput
        placeholder="Email"
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

      <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isLoading ? "Prijavljivanje..." : "Prijava"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Registracija {" "}
            <TouchableOpacity onPress={change} style={{ marginTop: 7 }}>
              <Text style={styles.linkText}>ovde.</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: "green",
    fontSize: 12,
    marginBottom: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 10, // Aligns the icon to the right of the TextInput
    top: 10, // Centers the icon vertically inside the input
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    padding: 5,

    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
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
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  text: {
    color: "#6B7280", // Equivalent to text-neutral-500
    textAlign: "center", // Default alignment for smaller screens
    fontSize: 14,
  },
  linkText: {
    color: "white",
    textDecorationLine: "underline",
    cursor: "pointer", // While this doesn't do exactly the same thing as cursor:pointer in web, it works for touch events in React Native
  },
  reactLogo: {
    height: 220,
    width: 250,
    margin: "auto",
    marginTop: 40,
  },
});

export default LoginScreen;
