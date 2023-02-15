import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
  Pressable,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";

import Svg, { Path } from "react-native-svg";
import SvgCross from "../assets/cross.svg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  // console.log(navigation);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  // const [platform, setPlatform] = useState("");

  // зробити ще одну ф-ю для сабміту, щоб не скидало форму при TouchableWithoutFeedback
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };

  const onSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const togglePasswordHide = () => {
    setIsPasswordHidden(isPasswordHidden === true ? false : true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground
          source={require("../assets/photo-bg.jpg")}
          style={styles.imgBG}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={styles.KAVWrapper}
          >
            {/* <RegistrationScreen></RegistrationScreen> */}

            <View
              style={{
                ...styles.formWrapper,
                marginBottom: isShowKeyboard ? -175 : 0,
              }}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.fotoWrapper}>
                  <Image
                    source={require("../assets/avatarExample.jpg")}
                    // objectFit="contain"
                  />
                </View>

                <Pressable
                  onPress={() => {
                    console.log(123);
                  }}
                  style={styles.addAvatarBtn}
                  // activeOpacity={0.7}
                  // onPress={() => keyboardHide()}
                >
                  <Svg
                    width="13"
                    height="13"
                    viewBox="0 0 32 32"
                    style={{
                      //   transform: [{ rotate: "45deg" }],
                      color: "#ff6c00",
                    }}
                  >
                    <Path
                      fill="currentColor"
                      d="M17.231 0h-2.462v14.769h-14.769v2.462h14.769v14.769h2.462v-14.769h14.769v-2.462h-14.769v-14.769z"
                    />
                  </Svg>
                  {/* <SvgCross
                      width="13"
                      height="13"
                      // fill={"red"}
                      // style={{ transform: [{ rotate: "45deg" }] }}
                    /> */}
                </Pressable>
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
                onPress={() => onSubmitForm()}
              >
                <Text style={styles.btnName}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                // onPress={() => keyboardHide()}
                onPress={() => navigation.navigate("Login")}
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

  avatarWrapper: {
    height: 120,
    width: 120,
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
    top: -60,
  },

  fotoWrapper: {
    overflow: "hidden",
    borderRadius: 16,
  },

  addAvatarBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 16,
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
    fontSize: 16,
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
