import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [loginValue, setLoginValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputHandlerLogin = (text) => setLoginValue(text);
  const inputHandlerEmail = (text) => setEmailValue(text);
  const inputHandlerPassword = (text) => setPasswordValue(text);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("./assets/photo-bg.jpg")}
        style={styles.imgBG}
      >
        <View style={styles.formWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Регистрация</Text>
          </View>
          <View style={styles.inpupWrapperLoginEmail}>
            <TextInput
              style={styles.inputLoginEmail}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
              value={loginValue}
              onChangeText={inputHandlerLogin}
            />
          </View>
          <View style={styles.inpupWrapperLoginEmail}>
            <TextInput
              style={styles.inputLoginEmail}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
              value={emailValue}
              onChangeText={inputHandlerEmail}
            />
          </View>
          <View style={styles.inpupWrapperPassword}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              value={passwordValue}
              onChangeText={inputHandlerPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            // onPress={onPress}
          >
            <Text style={styles.btnName}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  imgBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },

  formWrapper: {
    height: 550,
    paddingHorizontal: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  titleWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },

  title: {
    // marginTop: 92,
    color: `#212121`,
    fontSize: 30,
    letterSpacing: 0.01,
    // fontWeight: 500,
    // lineHeight: 35,
    // font-family: 'Roboto';
    // font-style: normal;
  },

  inpupWrapperLoginEmail: {
    marginBottom: 16,
  },

  inputLoginEmail: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 16,
    // placeholderTextColor: "#BDBDBD",
  },

  inpupWrapperPassword: {
    marginBottom: 43,
  },

  inputPassword: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 16,
  },

  button: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    paddingVertical: 16,
  },

  btnName: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
});
