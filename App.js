import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase/config";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// import { NavigationContainer } from "@react-navigation/native";

// import useRoute from "./router";
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // isAuth();
  // const [user, setUser] = useState(null);

  // console.log("userBefor:", user);

  // const state = useSelector((state) => state);

  // onAuthStateChanged(auth, (user) => {
  //   setUser(user);
  // });
  // console.log("userAfter:", user);
  // async function isAuth() {
  //   try {
  //     await onAuthStateChanged(auth, (user) => {
  //       setUser(user);
  //       // if (user) {
  //       //   console.log(user);
  //       //   const uid = user.uid;
  //       // } else {
  //       //   // User is signed out
  //       //   console.log("User is signed out");
  //       // }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const routing = useRoute(user);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Main />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
