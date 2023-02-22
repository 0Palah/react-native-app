import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";

import { firestoreDB } from "../../firebase/config";
// import { Ionicons } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";
// import { async } from "@firebase/util";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const querySnapshot = await onSnapshot(
      collection(firestoreDB, "posts"),
      (data) => {
        // console.log("data.docs: ============>", data.docs[0].data());
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  const getCommentsCount = async (postId) => {
    console.log(postId);
    try {
      const docRef = doc(firestoreDB, "posts", postId);
      const commentsRef = collection(docRef, "comments");
      const snapshot = await getDocs(commentsRef);
      console.log(snapshot.size);
      return snapshot.size;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("getCommentsCount", countTTT("bz9bk2xEcNUnBLbLhGEG"));

  useEffect(() => {
    getAllPosts();
    // console.log(posts);
  }, []);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);

  // console.log("PostsScreen --> posts: ", posts);
  // console.log("PostsScreen --> route.params: ", route.params);
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.userWrapper}>
          <Image
            source={require("../../assets/avatarExample.jpg")}
            style={styles.avatarImg}
          />
          <View style={styles.userDesc}>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
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

                <View>
                  <Text style={styles.postTitle}>{item.title} </Text>
                </View>

                <View style={styles.allLinksWrapper}>
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
                      color="#BDBDBD"
                      style={styles.commentIcon}
                    />
                    <Text style={styles.comment}>
                      {/* {console.log("comCount===", comCount)} */}8
                    </Text>
                  </TouchableOpacity>

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
            );
          }}
          keyExtractor={(item, idx) => idx.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  scrollView: {
    paddingTop: 32,
  },

  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  userDesc: {
    marginLeft: 8,
  },

  name: {
    fontFamily: "Roboto-Medium",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  email: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121CC",
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

  commentLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
