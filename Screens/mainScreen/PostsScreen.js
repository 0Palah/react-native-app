// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// const PostsScreen = () => {

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }

    // return () => {
    //   second;
    // };
  }, [route.params]);

  console.log("PostsScreen --> posts: ", posts);
  console.log("PostsScreen --> route.params: ", route.params);
  return (
    <View style={styles.container}>
      {/* <View style={styles.heder}>
        <Text>Публикации</Text>
      </View> */}

      <FlatList
        style={styles.list}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <View style={styles.imgWrapper}>
              <Image source={{ uri: item.photo }} style={styles.img} />
            </View>

            <View>
              <Text style={styles.postTitle}>{item.title} </Text>
            </View>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
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

  // heder: {
  //   color: "#212121",
  // },

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

  location: {
    textAlign: "right",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
  },
});

// export default PostsScreen;
