// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [state, setState] = useState("");
  //   const [loginValue, setLoginValue] = useState("");
  //   const [emailValue, setEmailValue] = useState("");
  //   const [passwordValue, setPasswordValue] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [platform, setPlatform] = useState("");

  //   const inputHandlerLogin = (text) => setLoginValue(text);
  //   const inputHandlerEmail = (text) => setEmailValue(text);
  //   const inputHandlerPassword = (text) => setPasswordValue(text);
  console.log(Platform.OS);
  console.log(isShowKeyboard);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
  };

  return (
    <View
      style={{
        ...styles.formWrapper,
        marginBottom: isShowKeyboard ? -175 : 0,
      }}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Регистрация</Text>
      </View>
      <View style={styles.inpupWrapperLoginEmail}>
        <TextInput
          style={styles.inputLoginEmail}
          placeholder="Логин"
          placeholderTextColor="#BDBDBD"
          value={state.login}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, login: value }))
          }
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
      </View>
      <View style={styles.inpupWrapperLoginEmail}>
        <TextInput
          style={styles.inputLoginEmail}
          placeholder="Адрес электронной почты"
          placeholderTextColor="#BDBDBD"
          value={state.email}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))
          }
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
      </View>
      <View style={styles.inpupWrapperPassword}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          value={state.password}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))
          }
          secureTextEntry={true}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => keyboardHide()}
      >
        <Text style={styles.btnName}>Зарегистрироваться</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        activeOpacity={0.7}
        onPress={() => keyboardHide()}
      >
        <Text style={styles.linkName}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    // height: 550,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
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

  btn: {
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

  link: {
    marginTop: 16,
  },

  linkName: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },

  // // варіанти по заданню різних платформ
  // test: {
  //   backgroundColor: Platform.OS === "ios" ? "red" : "green", // варіант  через тернарник

  //   // Варіант через select який повертає обєкт
  //   ...Platform.select({
  //     ios: {
  //       backgroundColor: "red",
  //     },
  //     android: {
  //       backgroundColor: "green",
  //     },
  //     default: {
  //       // other platforms, web for example
  //       backgroundColor: "blue",
  //     },
  //   }),
  // },
});
