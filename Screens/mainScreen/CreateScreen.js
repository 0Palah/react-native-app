// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  ScrollView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { storage, firestoreDB } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

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

  const { userId, login } = useSelector((state) => state.auth);

  // const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location:", location);
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log(coords);
      setState((state.location = coords));
      console.log("state in useEffect:", state);
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
    // setPhoto(photo.uri);
    setState((prevState) => ({ ...prevState, photo: photo.uri }));
    await MediaLibrary.createAssetAsync(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(state.photo);
    console.log("response:   -----> ", response);
    const file = await response.blob();

    // add uuid or nanoid
    const uniquePostId = Date.now().toString();

    const data = await ref(storage, `postImage/${uniquePostId}`);
    console.log(data);

    await uploadBytes(data, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    const downloadedPhoto = await getDownloadURL(data)
      .then((url) => {
        return url;
        // тут можна вставити фотку в якийсь елемент
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("downloadedPhoto -->", downloadedPhoto);
    return downloadedPhoto;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      console.log(photo);
      const data = {
        ...state,
        photo,
        userId,
        login,
      };
      console.log("data:------------>", data);
      const createPost = await addDoc(collection(firestoreDB, "posts"), data);
      console.log("Document written with ID: ", createPost);
      console.log("Document written with ID: ", createPost.id);
      // console.log(123456);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    uploadPostToServer();
    // uploadPhotoToServer();
    navigation.navigate("DefaultScreen", { ...state });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ScrollView style={styles.container}>
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
          <View style={styles.inpupWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              value={state.location}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, location: value }))
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
      </ScrollView>
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
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
  },

  inpupWrapper: {
    marginBottom: 16,
  },

  input: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    // backgroundColor: "#F6F6F6",
    color: "#212121",
    height: 50,
    // paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  submitBtn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 16,
  },

  btnName: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});
