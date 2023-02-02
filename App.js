import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";

export default function App() {
  const [value, setValue] = useState("");
  const inputHandler = (text) => setValue(text);
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
          <View style={styles.test}>
            <TextInput
              style={styles.inputLogin}
              placeholder="Логин"
              value={value}
              onChangeText={inputHandler}
            />
          </View>
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

  titleWrapper: {
    alignItems: "center",
  },

  title: {
    marginTop: 92,
    color: `#212121`,
    fontSize: 30,
    letterSpacing: 0.01,
    // fontWeight: 500,
    // lineHeight: 35,
    // font-family: 'Roboto';
    // font-style: normal;
  },

  formWrapper: {
    height: 550,
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  inputLogin: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  // test: {
  //   flex: 1,
  //   backgroundColor: "transparent",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   paddingBottom: 30,
  // },

  imgBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",

    // alignItems: "center",
  },
});
