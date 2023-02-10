// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";

// const CreateScreen = () => {

const initialState = {
  photo: "",
  title: "",
  location: "",
};

export default function CreateScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    await MediaLibrary.createAssetAsync(photo.uri);
  };

  const sendPhoto = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    navigation.navigate("Posts", { photo });

    console.log("navigation: ", navigation);
    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.cameraWrapper}>
          {/* <View>
          <Image
            source={{
              uri: photo,
            }}
            style={{ height: 200, width: 200 }}
          />
        </View> */}
          <Camera style={styles.camera} ref={setCamera}>
            <TouchableOpacity style={styles.snapBtn} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.photoDesc}>Загрузите фото</Text>
          <View style={styles.inpupWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              value={state.title}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, title: value }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
                // setIsInputOnFocus("email");
              }}
              onBlur={() => {
                setIsInputOnFocus(false);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.7}
            onPress={() => sendPhoto()}
          >
            <Text style={styles.btnName}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
    // alignItems: "center",
    // justifyContent: "center",
  },
  cameraWrapper: {
    color: "#212121",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },

  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },

  snapBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  formWrapper: {
    marginTop: 8,
  },
  photoDesc: {
    marginBottom: 32,
    color: "#BDBDBD",
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
  },

  inpupWrapper: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    // borderRadius: 8,

    backgroundColor: "#F6F6F6",
    color: "#212121",
    height: 50,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
  },

  submitBtn: {
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
});
