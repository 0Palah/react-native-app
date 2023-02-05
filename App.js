import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regulat": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
//   });
// };

// import RegistrationScreen from "./Screens/RegistrationScreen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // const [platform, setPlatform] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regulat": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // зробити ще одну ф-ю для сабміту, щоб не скидало форму при TouchableWithoutFeedback
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };

  const togglePasswordHide = () => {
    setIsPasswordHidden(isPasswordHidden === true ? false : true);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <ImageBackground
          source={require("./assets/photo-bg.jpg")}
          style={styles.imgBG}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.KAVWrapper}
          >
            {/* <RegistrationScreen></RegistrationScreen> */}

            <View
              style={{
                ...styles.formWrapper,
                marginBottom: isShowKeyboard ? -175 : 0,
              }}
            >
              <View style={styles.avatar}>
                <Image />
                <TouchableOpacity
                  style={styles.addAvatarBtn}
                  activeOpacity={0.7}
                  // onPress={() => keyboardHide()}
                ></TouchableOpacity>
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Регистрация</Text>
              </View>
              <View style={styles.inpupWrapperLoginEmail}>
                <TextInput
                  style={{
                    ...styles.inputLoginEmail,
                    borderColor:
                      isInputOnFocus === "login" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsInputOnFocus("login");
                  }}
                  onBlur={() => {
                    setIsInputOnFocus(false);
                  }}
                />
              </View>
              <View style={styles.inpupWrapperLoginEmail}>
                <TextInput
                  style={{
                    ...styles.inputLoginEmail,
                    borderColor:
                      isInputOnFocus === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsInputOnFocus("email");
                  }}
                  onBlur={() => {
                    setIsInputOnFocus(false);
                  }}
                />
              </View>
              <View style={styles.inpupWrapperPassword}>
                <TextInput
                  style={{
                    ...styles.inputPassword,
                    borderColor:
                      isInputOnFocus === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  secureTextEntry={isPasswordHidden ? true : false}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsInputOnFocus("password");
                  }}
                  onBlur={() => {
                    setIsInputOnFocus(false);
                  }}
                />
                <TouchableOpacity
                  style={styles.btnToglePassword}
                  activeOpacity={0.7}
                  onPress={() => togglePasswordHide()}
                >
                  <Text style={styles.toglePasswordText}>
                    {isPasswordHidden ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
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
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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

  KAVWrapper: {
    // flex: 1,
    justifyContent: "flex-end",
  },

  formWrapper: {
    // height: 550,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  avatar: {
    height: 120,
    width: 120,
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
    top: -60,
  },

  addAvatarBtn: {
    position: "absolute",
    right: -12,
    bottom: 14,
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: "#FF6C00",
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
    fontWeight: "500",
    fontFamily: "Roboto-Medium",

    // fontWeight: 500,
    // lineHeight: 35,
    // font-style: normal;
  },

  inpupWrapperLoginEmail: {
    marginBottom: 16,
  },

  inputLoginEmail: {
    borderWidth: 1,
    // borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    height: 50,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    // placeholderTextColor: "#BDBDBD",
  },

  inpupWrapperPassword: {
    marginBottom: 43,
  },

  inputPassword: {
    borderWidth: 1,
    // borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    height: 50,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
  },

  btnToglePassword: {
    position: "absolute",
    bottom: 15,
    right: 16,
  },

  toglePasswordText: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },

  link: {
    marginTop: 16,
  },

  linkName: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});
