import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
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
        setError("Vos mots de passe ne sont pas identiques");
      }
    } else {
      setError("Veuillez remplir tous les champs");
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
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="email"
          keyboardType={"email-address"}
          value={email}
          style={styles.formInput}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="username"
          value={username}
          style={styles.formInput}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Describe yourself in a few words"
          value={description}
          style={styles.inputDesc}
          multiline={true}
          onChangeText={(text) => {
            setDescription(text);
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
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          style={styles.formInput}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          secureTextEntry={true}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Already have an account ? Sign in</Text>
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
    marginTop: 55,
    marginBottom: 20,
    width: "60%",
    height: 60,
    //borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#EB5A62",
    fontSize: 18,
    fontWeight: "500",
  },
});
