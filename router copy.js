// import React from "react";

// import { StatusBar } from "expo-status-bar";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

// import { StyleSheet, View, Button, Pressable } from "react-native";

// const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

// import RegistrationScreen from "./Screens/RegistrationScreen";
// import LoginScreen from "./Screens/LoginScreen";
// import PostsScreen from "./Screens/mainScreen/PostsScreen";
// import CreateScreen from "./Screens/mainScreen/CreateScreen";
// import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

// const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen
//           options={{
//             headerShown: false,
//           }}
//           name="Registration"
//           component={RegistrationScreen}
//         />
//         <AuthStack.Screen
//           options={{
//             headerShown: false,
//           }}
//           name="Login"
//           component={LoginScreen}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     // <MainTab.Navigator screenOptions={styles.mainTabContainer}>
//     <MainTab.Navigator screenOptions={styles.mainTabContainer}>
//       <MainTab.Screen
//         name="Posts"
//         component={PostsScreen}
//         options={{
//           headerShown: false,

//           tabBarShowLabel: false,

//           tabBarIcon: (focused, color, size) => (
//             <SimpleLineIcons name="grid" size={24} color="#212121CC" />
//           ),
//         }}
//       />
//       <MainTab.Screen
//         name="Create post"
//         component={CreateScreen}
//         options={{
//           title: "Создать публикацию",
//           headerStyle: {
//             height: 83,
//             borderBottomWidth: 1,
//             borderColor: "#E8E8E8",
//             // paddingBottom: 11,
//             // backgroundColor: "red",
//           },

//           tabBarStyle: {
//             display: "none",
//           },

//           headerTitleContainerStyle: {
//             // height: 88,
//             paddingBottom: 11,
//             marginLeft: 0,
//           },

//           headerTitleStyle: {
//             fontWeight: "500",
//             fontSize: 17,
//             letterSpacing: -0.408,
//             color: "#212121",
//             marginTop: "auto",
//           },

//           headerLeftContainerStyle: {
//             paddingLeft: 16,
//             marginTop: "auto",
//             marginBottom: 11,
//           },

//           headerLeft: (focused, color, size) => (
//             // <Pressable
//             //   onPress={() => {
//             //     console.log(123);
//             //     navigation.navigate("Login");
//             //   }}
//             // >
//             //   <Feather name="log-out" size={24} color="black" />
//             // </Pressable>
//             <AntDesign
//               name="arrowleft"
//               size={24}
//               color="#212121CC"
//               onPress={() => {}}
//             />
//           ),

//           tabBarShowLabel: false,
//           // tabBarLabel: (focused, color) => (
//           //   <View style={styles.mainTabBtn}>
//           //     <AntDesign name="plus" size={13} color="#FFFFFF" />
//           //   </View>
//           // ),

//           tabBarIcon: (focused, color, size) => (
//             <View style={styles.mainTabBtn}>
//               <AntDesign name="plus" size={13} color="#FFFFFF" />
//             </View>
//           ),
//         }}
//       />
//       <MainTab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarIcon: (focused, color, size) => (
//             <Feather name="user" size={24} color="#212121CC" />
//           ),
//         }}
//       />
//     </MainTab.Navigator>
//   );
// };

// export default useRoute;

// const styles = StyleSheet.create({
//   mainTabContainer: {
//     headerTitleAlign: "center",

//     tabBarStyle: {
//       height: 83,
//       paddingTop: 9,
//       paddingBottom: 34,
//       paddingHorizontal: 82,
//     },
//   },

//   mainTabBtn: {
//     height: 40,
//     width: 70,
//     borderWidth: 0,
//     borderRadius: 20,
//     backgroundColor: "#FF6C00",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

//==============================================
//===========================
// ===================================================

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Image,
//   TextInput,
//   KeyboardAvoidingView,
//   Keyboard,
//   ScrollView,
// } from "react-native";
// import { Camera, CameraType } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
// import { MaterialIcons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import { storage, firestoreDB } from "../../firebase/config";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";

// // const CreateScreen = () => {

// const initialState = {
//   photo: "",
//   title: "",
//   location: "",
// };

// export default function CreateScreen({ navigation }) {
//   const [state, setState] = useState(initialState);
//   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
//   const [isInputOnFocus, setIsInputOnFocus] = useState(false);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   // const [photo, setPhoto] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       // let location = await Location.getCurrentPositionAsync({});
//       // console.log("location:", location);
//       // const coords = {
//       //   latitude: location.coords.latitude,
//       //   longitude: location.coords.longitude,
//       // };
//       // console.log(coords);
//       // setState((state.location = coords));
//       // console.log("state in useEffect:", state);
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const keyboardHide = () => {
//     setIsShowKeyboard(false);
//     Keyboard.dismiss();
//   };

//   const takePhoto = async () => {
//     const photo = await camera.takePictureAsync();

//     setState((prevState) => ({ ...prevState, photo: photo.uri }));

//     let location = await Location.getCurrentPositionAsync({});
//     // console.log("location:", location);
//     const coords = {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//     };
//     // console.log(coords);
//     setState((state.location = coords));

//     await MediaLibrary.createAssetAsync(photo.uri);
//   };

//   const uploadPhotoToServer = async () => {
//     console.log(0);
//     const response = await fetch(state.photo);
//     console.log(1);
//     const file = await response.blob();
//     console.log(2);
//     // add uuid or nanoid
//     const uniquePostId = Date.now().toString();
//     console.log(3);
//     const data = await ref(storage, `postImage/${uniquePostId}`);
//     console.log(data);

//     await uploadBytes(data, file).then((snapshot) => {
//       console.log("Uploaded a blob or file!");
//     });

//     const downloadedPhoto = await getDownloadURL(data)
//       .then((url) => {
//         return url;
//         // тут можна вставити фотку в якийсь елемент
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     return downloadedPhoto;
//   };

//   const sendPhoto = () => {
//     setIsShowKeyboard(false);
//     Keyboard.dismiss();
//     setState(initialState);
//     uploadPostToServer();

//     navigation.navigate("DefaultScreen", { ...state });
//   };

//   const uploadPostToServer = async () => {
//     try {
//       console.log(123);
//       const photo = await uploadPhotoToServer();
//       console.log(photo);
//       const docRef = await addDoc(collection(firestoreDB, "posts"), {
//         ...state,
//         photo: photo,
//       });
//       console.log(qwe);
//       console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={keyboardHide}>
//       <ScrollView style={styles.container}>
//         <View style={styles.cameraWrapper}>
//           {/* <View>
//           <Image
//             source={{
//               uri: photo,
//             }}
//             style={{ height: 200, width: 200 }}
//           />
//         </View> */}
//           <Camera style={styles.camera} ref={setCamera}>
//             <TouchableOpacity style={styles.snapBtn} onPress={takePhoto}>
//               <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
//             </TouchableOpacity>
//           </Camera>
//         </View>

//         <View style={styles.formWrapper}>
//           <Text style={styles.photoDesc}>Загрузите фото</Text>
//           <View style={styles.inpupWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="Название..."
//               placeholderTextColor="#BDBDBD"
//               value={state.title}
//               onChangeText={(value) =>
//                 setState((prevState) => ({ ...prevState, title: value }))
//               }
//               onFocus={() => {
//                 setIsShowKeyboard(true);
//                 // setIsInputOnFocus("email");
//               }}
//               onBlur={() => {
//                 setIsInputOnFocus(false);
//               }}
//             />
//           </View>
//           <View style={styles.inpupWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="Местность..."
//               placeholderTextColor="#BDBDBD"
//               value={state.location}
//               onChangeText={(value) =>
//                 setState((prevState) => ({ ...prevState, location: value }))
//               }
//               onFocus={() => {
//                 setIsShowKeyboard(true);
//                 // setIsInputOnFocus("email");
//               }}
//               onBlur={() => {
//                 setIsInputOnFocus(false);
//               }}
//             />
//           </View>
//           <TouchableOpacity
//             style={styles.submitBtn}
//             activeOpacity={0.7}
//             onPress={() => sendPhoto()}
//           >
//             <Text style={styles.btnName}>Опубликовать</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 32,
//     paddingHorizontal: 16,
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   cameraWrapper: {
//     color: "#212121",
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//     borderRadius: 8,
//     overflow: "hidden",
//   },

//   camera: {
//     height: 240,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   snapBtn: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#ffffff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   formWrapper: {
//     marginTop: 8,
//   },
//   photoDesc: {
//     marginBottom: 32,
//     color: "#BDBDBD",
//     fontSize: 16,
//     fontWeight: "400",
//     fontFamily: "Roboto-Regular",
//   },

//   inpupWrapper: {
//     marginBottom: 16,
//   },

//   input: {
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     borderRightWidth: 0,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E8E8E8",
//     // backgroundColor: "#F6F6F6",
//     color: "#212121",
//     height: 50,
//     // paddingHorizontal: 16,
//     fontSize: 16,
//     fontFamily: "Roboto-Regular",
//   },

//   submitBtn: {
//     backgroundColor: "#FF6C00",
//     height: 51,
//     borderRadius: 100,
//     paddingVertical: 16,
//     marginTop: 16,
//   },

//   btnName: {
//     fontSize: 16,
//     color: "#ffffff",
//     textAlign: "center",
//     fontFamily: "Roboto-Regular",
//   },
// });
