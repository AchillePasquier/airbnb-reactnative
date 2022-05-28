// import react from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email, // on écrit juste email et password car la clé et sa valeur ont le même nom
            password,
          }
        );
        console.log(response.data);
        setToken(response.data.token);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.data) {
          setError(error.response.data.error);
        }
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          source={require("../assets/Airbnb-Embleme.jpeg")}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          keyboardType={"email-address"}
          placeholder="email"
          value={email}
          style={styles.formInput}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="password"
          value={password}
          style={styles.formInput}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#717171",
    marginTop: 30,
    marginBottom: 70,
  },
  formInput: {
    width: "80%",
    marginTop: 30,
    borderColor: "#FFBAC0",
    borderBottomWidth: 2,
    height: 35,
  },
  inputDesc: {
    width: "80%",
    marginTop: 30,
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 80,
    paddingTop: 5,
    padding: 7.5,
  },
  errorText: {
    marginTop: 40,
    color: "red",
  },
  submitButton: {
    borderColor: "#EB5A62",
    borderWidth: 3,
    marginTop: 120,
    marginBottom: 20,
    width: "60%",
    height: 60,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#EB5A62",
    fontSize: 18,
    fontWeight: "500",
  },
});
