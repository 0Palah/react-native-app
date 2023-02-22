import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
  FlatList,
} from "react-native";

import Svg, { Path } from "react-native-svg";

import { useDispatch, useSelector } from "react-redux";
import {
  authSignOutUser,
  authSignUpUser,
} from "../../redux/auth/authOperations";

import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";

import { firestoreDB } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";

export default function ProfileScreen({ route, navigation }) {
  const { userId, login } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      const querySnapshot = await onSnapshot(
        query(collection(firestoreDB, "posts"), where("userId", "==", userId)),
        (data) => {
          // console.log("data.docs: ============>", data);
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getPosts();
    // console.log(posts);
  }, []);

  const addLikes = () => {
    console.log("addLike");
  };

  return (
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ImageBackground
        source={require("../../assets/photo-bg.jpg")}
        style={styles.imgBG}
      >
        {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={styles.KAVWrapper}
          > */}
        <View
          style={{
            ...styles.formWrapper,
            // marginBottom: isShowKeyboard ? -175 : 0,
          }}
        >
          <View style={styles.avatarWrapper}>
            <View style={styles.fotoWrapper}>
              <Image
                source={require("../../assets/avatarExample.jpg")}
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

          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.7}
            onPress={() => {
              dispatch(authSignOutUser());
            }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{login}</Text>
          </View>
          <FlatList
            style={styles.list}
            data={posts}
            // extraData={posts}
            renderItem={({ item }) => {
              // console.log(item);
              // const comCount = getCommentsCount(item.id);
              return (
                <View style={styles.postWrapper}>
                  <View style={styles.imgWrapper}>
                    <Image source={{ uri: item.photo }} style={styles.img} />
                  </View>
                  <View style={styles.descWrapper}>
                    <View>
                      <Text style={styles.postTitle}>{item.title} </Text>
                    </View>
                    <View style={styles.allLinksWrapper}>
                      <View style={styles.commentsAndLikes}>
                        <TouchableOpacity
                          style={styles.commentLinkWrapper}
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate("CommentsScreen", {
                              postId: item.id,
                              uri: item.photo,
                            })
                          }
                        >
                          <Feather
                            name="message-circle"
                            size={24}
                            color="#FF6C00"
                            style={styles.commentIcon}
                          />
                          <Text style={styles.comment}>
                            {/* {console.log("comCount===", comCount)} */}8
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.likeLinkWrapper}
                          activeOpacity={0.7}
                          onPress={() => addLikes()}
                        >
                          <Feather name="thumbs-up" size={24} color="#FF6C00" />
                          <Text style={styles.like}>
                            {/* {console.log("comCount===", comCount)} */}8
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        style={styles.mapLinkWrapper}
                        activeOpacity={0.7}
                        onPress={() =>
                          navigation.navigate("MapScreen", {
                            location: {
                              name: item.location,
                              latitude: item.latitude,
                              longitude: item.longitude,
                            },
                          })
                        }
                      >
                        <Feather
                          name="map-pin"
                          size={24}
                          color="#BDBDBD"
                          style={styles.mapPin}
                        />
                        <Text style={styles.location}>{item.location}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </View>
    // </TouchableWithoutFeedback>
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
    marginBottom: -100,
  },

  KAVWrapper: {
    // flex: 1,
    justifyContent: "flex-end",
  },

  formWrapper: {
    // height: 550,
    paddingHorizontal: 16,
    paddingBottom: 43,
    paddingTop: 92,
    // paddingBottom: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    marginTop: 200,
    marginBottom: 83,
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

  logoutBtn: {
    position: "absolute",
    right: 16,
    top: 22,
  },

  titleWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    // marginTop: 92,
    color: `#212121`,
    fontSize: 30,
    letterSpacing: 0.01,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    letterSpacing: 0.01,
  },

  list: {},

  postWrapper: {
    marginTop: 32,
  },

  imgWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: 340,
    height: 240,
    borderRadius: 8,
    objectFit: "cover",
  },

  descWrapper: { paddingHorizontal: 16 },

  postTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },

  allLinksWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  commentsAndLikes: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },

  commentLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 24,
  },

  comment: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },

  commentIcon: {
    // flexDirection: "row",
    transform: [{ scaleX: -1 }],
  },

  likeLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },

  like: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },

  likeIcon: {
    // flexDirection: "row",
  },

  mapLinkWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  mapPin: {},

  location: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
    color: "#212121",
    marginLeft: 3,
  },
});
