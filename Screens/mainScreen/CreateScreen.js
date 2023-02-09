// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

// const CreateScreen = () => {

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("navigation: ", navigation);
  };

  return (
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
          {/* <TextInput
            style={{
              ...styles.input,
              borderColor: !photo ? "#FF6C00" : "#E8E8E8",
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
          /> */}
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.7}
            onPress={() => onSubmitForm()}
          >
            <Text style={styles.btnName}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    color: "#BDBDBD",
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
  },

  inpupWrapper: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
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
